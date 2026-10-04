$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$h = @{ Accept = 'application/json'; 'User-Agent' = 'OasisBuilder/1.1' }
$api = 'https://api.curse.tools/v1/cf'
$root = 'D:\DATOS USUARIO\Documentos\Servidores Minecraft\Oasis'
$serverMods = Join-Path $root 'server\mods'
$clientMods = Join-Path $root 'client\mods'
$cfMods = 'C:\Users\Ivan\curseforge\minecraft\Instances\Oasis\mods'
$logPath = Join-Path $root 'docs\phase-worldgen-download-log.csv'

# slug -> prefer NeoForge 1.21.1 latest (or specific)
$wanted = @(
  @{ slug = 'oh-the-biomes-weve-gone'; kind = 'update'; match = 'NeoForge' }
  @{ slug = 'dense-vegetation'; kind = 'add'; match = 'NeoForge' }
  @{ slug = 'repurposed-structures'; kind = 'add'; match = 'NeoForge' }
  @{ slug = 'create-oh-the-biomes-weve-gone-compat'; kind = 'add'; match = $null }
  @{ slug = 'oh-the-biomes-weve-engineered'; kind = 'add'; match = 'NeoForge' }
)

function Get-ModBySlug([string]$slug) {
  $r = Invoke-RestMethod "$api/mods/search?gameId=432&classId=6&slug=$([uri]::EscapeDataString($slug))&pageSize=5" -Headers $h
  if (-not $r.data -or $r.data.Count -eq 0) { return $null }
  return $r.data[0]
}

function Get-BestFile($modId, $matchLoader) {
  $files = Invoke-RestMethod "$api/mods/$modId/files?gameVersion=1.21.1&pageSize=50" -Headers $h
  $list = @($files.data)
  if ($list.Count -eq 0) { return $null }
  $neo = @($list | Where-Object { $_.gameVersions -contains 'NeoForge' -or $_.gameVersions -contains 'neoforge' })
  if ($matchLoader -eq 'NeoForge' -and $neo.Count -gt 0) {
    return ($neo | Sort-Object fileDate -Descending)[0]
  }
  # Forge+NeoForge dual loaders ok
  $any = @($list | Where-Object {
      $_.gameVersions -contains 'NeoForge' -or
      $_.gameVersions -contains 'Forge' -or
      ($_.sortableGameVersions | Where-Object { $_.gameVersionName -eq 'NeoForge' })
    })
  if ($any.Count -gt 0) { return ($any | Sort-Object fileDate -Descending)[0] }
  return ($list | Sort-Object fileDate -Descending)[0]
}

function Download-CfFile($file, [string]$destDir) {
  $urlInfo = Invoke-RestMethod "$api/mods/$($file.modId)/files/$($file.id)/download-url" -Headers $h
  $url = $urlInfo.data
  if (-not $url) { throw "No download URL for $($file.fileName)" }
  $out = Join-Path $destDir $file.fileName
  Write-Host "DL $($file.fileName) -> $out"
  Invoke-WebRequest -Uri $url -OutFile $out -Headers @{ 'User-Agent' = 'OasisBuilder/1.1' }
  return $out
}

$rows = New-Object System.Collections.Generic.List[object]
$results = @()

foreach ($w in $wanted) {
  Write-Host "=== $($w.slug) ==="
  $mod = Get-ModBySlug $w.slug
  if (-not $mod) {
    Write-Host "MISSING SLUG $($w.slug)"
    $rows.Add([pscustomobject]@{ slug = $w.slug; status = 'MISSING_SLUG'; fileName = ''; projectID = 0; fileID = 0 }) | Out-Null
    continue
  }
  $file = Get-BestFile $mod.id $w.match
  if (-not $file) {
    Write-Host "NO 1.21.1 FILE $($w.slug)"
    $rows.Add([pscustomobject]@{ slug = $w.slug; status = 'NO_FILE'; fileName = ''; projectID = $mod.id; fileID = 0 }) | Out-Null
    continue
  }
  Write-Host "Picked $($file.fileName) id=$($file.id) date=$($file.fileDate)"

  if ($w.kind -eq 'update') {
    # remove old BWG jars
    Get-ChildItem $serverMods,$clientMods,$cfMods -Filter 'Oh-The-Biomes-Weve-Gone*.jar' -ErrorAction SilentlyContinue | ForEach-Object {
      Write-Host "RM old $($_.FullName)"
      Remove-Item -Force $_.FullName
    }
  }

  foreach ($dir in @($serverMods, $clientMods, $cfMods)) {
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
    # skip re-download if same file exists
    $dest = Join-Path $dir $file.fileName
    if (-not (Test-Path $dest)) {
      Download-CfFile $file $dir | Out-Null
    } else {
      Write-Host "exists $dest"
    }
  }

  $rows.Add([pscustomobject]@{
      slug = $mod.slug
      name = $mod.name
      status = 'OK'
      fileName = $file.fileName
      projectID = [int]$mod.id
      fileID = [int]$file.id
      kind = $w.kind
    }) | Out-Null
  $results += @{ projectID = [int]$mod.id; fileID = [int]$file.id; fileName = $file.fileName; slug = $mod.slug }
}

$rows | Export-Csv -NoTypeInformation -Encoding UTF8 $logPath
Write-Host "LOG $logPath"

# Patch curseforge/manifest.json
$manifestPath = Join-Path $root 'curseforge\manifest.json'
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
$files = [System.Collections.Generic.List[object]]::new()
foreach ($f in $manifest.files) {
  # drop old BWG project if updating
  $bwgPid = ($rows | Where-Object { $_.slug -eq 'oh-the-biomes-weve-gone' -and $_.status -eq 'OK' }).projectID
  if ($bwgPid -and [int]$f.projectID -eq [int]$bwgPid) { continue }
  # drop future duplicates of new mods
  $dup = $false
  foreach ($r in $rows) {
    if ($r.status -eq 'OK' -and [int]$f.projectID -eq [int]$r.projectID) { $dup = $true; break }
  }
  if (-not $dup) { $files.Add([ordered]@{ projectID = [int]$f.projectID; fileID = [int]$f.fileID; required = $true }) | Out-Null }
}
foreach ($r in $rows) {
  if ($r.status -ne 'OK') { continue }
  $files.Add([ordered]@{ projectID = [int]$r.projectID; fileID = [int]$r.fileID; required = $true }) | Out-Null
}
$manifest.files = @($files | Sort-Object projectID)
$manifest.version = '1.1.1'
$json = $manifest | ConvertTo-Json -Depth 8
# ConvertTo-Json may mess indentation; fine for CF
Set-Content -Path $manifestPath -Value $json -Encoding UTF8
Write-Host "manifest files=$($manifest.files.Count) version=$($manifest.version)"

# Append to cf-manifest-files.csv
$csvPath = Join-Path $root 'docs\cf-manifest-files.csv'
$existing = Import-Csv $csvPath
$byPid = @{}
foreach ($e in $existing) { $byPid[[string]$e.projectID] = $e }
foreach ($r in $rows) {
  if ($r.status -ne 'OK') { continue }
  $byPid[[string]$r.projectID] = [pscustomobject]@{
    fileName = $r.fileName
    projectID = $r.projectID
    fileID = $r.fileID
    slug = $r.slug
    name = $r.name
  }
}
$byPid.Values | Sort-Object { [int]$_.projectID } | Export-Csv -NoTypeInformation -Encoding UTF8 $csvPath
Write-Host 'DONE mods'
foreach ($r in $rows) { Write-Host ("{0}: {1} {2}" -f $r.slug, $r.status, $r.fileName) }
