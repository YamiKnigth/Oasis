#!/usr/bin/env bash
# Oasis â€” Pterodactyl install script
# Descarga NeoForge + configs/kubejs del repo + mods CurseForge (sin client-only)
# y escribe JVM args estilo Aikar (Xms=Xmx) aptos para packs moddeados.
#
# Variables de egg (opcionales):
#   OASIS_REPO          default: https://github.com/YamiKnigth/Oasis
#   OASIS_BRANCH        default: main
#   MC_VERSION          default: 1.21.1
#   NEOFORGE_VERSION    default: 21.1.253
#   SERVER_MEMORY       MB del panel (si existe); si no, OASIS_MEMORY / 12288
#   OASIS_MEMORY        heap MB explÃ­cito (sobrescribe el cÃ¡lculo)
#   OASIS_MEMORY_HEADROOM  MB a restar del panel (default 2048)
#   DOWNLOAD_WORKERS    descargas paralelas de mods (default 6)
#   FORCE_CONFIGS       1 = sobrescribir configs aunque existan (default 1 en install fresco)
#
# Startup recomendado del egg:
#   bash start.sh
# o:
#   java @user_jvm_args.txt @libraries/net/neoforged/neoforge/21.1.253/unix_args.txt nogui

set -euo pipefail

# ---------------------------------------------------------------------------
# Paths / defaults
# ---------------------------------------------------------------------------
# Egg install: /mnt/server. Contenedor en marcha: /home/container (cwd).
if [[ -n "${SERVER_DIR:-}" ]]; then
  ROOT="$SERVER_DIR"
elif [[ -d /mnt/server && -w /mnt/server ]]; then
  ROOT="/mnt/server"
else
  ROOT="$(pwd)"
fi
cd "$ROOT"

OASIS_REPO="${OASIS_REPO:-https://github.com/YamiKnigth/Oasis}"
OASIS_BRANCH="${OASIS_BRANCH:-main}"
MC_VERSION="${MC_VERSION:-1.21.1}"
NEOFORGE_VERSION="${NEOFORGE_VERSION:-21.1.253}"
DOWNLOAD_WORKERS="${DOWNLOAD_WORKERS:-6}"
OASIS_MEMORY_HEADROOM="${OASIS_MEMORY_HEADROOM:-2048}"
FORCE_CONFIGS="${FORCE_CONFIGS:-1}"

TMP="${ROOT}/.oasis-install"
STAGING="${TMP}/pack"
MANIFEST=""
CSV=""

# Client-only projectIDs (no deben ir al server)
CLIENT_ONLY_IDS="60089 250398 254284 257814 448233 686911 858542 908741 1390302"

log()  { printf '[Oasis] %s\n' "$*"; }
warn() { printf '[Oasis] WARN: %s\n' "$*" >&2; }
die()  { printf '[Oasis] ERROR: %s\n' "$*" >&2; exit 1; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Falta comando: $1"
}

# ---------------------------------------------------------------------------
# Heap (Aikar: Xms == Xmx; dejar headroom al contenedor)
# ---------------------------------------------------------------------------
calc_heap_mb() {
  local panel heap
  if [[ -n "${OASIS_MEMORY:-}" ]]; then
    printf '%s' "$OASIS_MEMORY"
    return
  fi
  panel="${SERVER_MEMORY:-12288}"
  if [[ "$panel" -gt 4096 ]]; then
    heap=$((panel - OASIS_MEMORY_HEADROOM))
  else
    heap=$((panel * 75 / 100))
  fi
  if [[ "$heap" -lt 4096 ]]; then
    warn "Heap calculado ${heap}M es bajo para Oasis; recomendado >= 10240M"
  fi
  printf '%s' "$heap"
}

HEAP_MB="$(calc_heap_mb)"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
is_client_only() {
  local id="$1"
  for x in $CLIENT_ONLY_IDS; do
    [[ "$x" == "$id" ]] && return 0
  done
  return 1
}

download() {
  # download <url> <out>
  local url="$1" out="$2"
  curl -fsSL --retry 3 --retry-delay 2 \
    -A "Oasis-Pterodactyl-Install/1.0" \
    -o "$out" "$url"
}

write_aikar_args() {
  local heap="$1"
  local out="${ROOT}/user_jvm_args.txt"
  cat >"$out" <<EOF
# Oasis NeoForge ${NEOFORGE_VERSION} â€” Aikar G1 (mod-friendly)
# Xms=Xmx obligatorio con estos flags. No dupliques -Xmx en el Startup del panel.
# Generado por scripts/pterodactyl/install.sh (${heap}M)
-Xms${heap}M
-Xmx${heap}M
-XX:+UseG1GC
-XX:+ParallelRefProcEnabled
-XX:MaxGCPauseMillis=200
-XX:+UnlockExperimentalVMOptions
-XX:+DisableExplicitGC
-XX:+AlwaysPreTouch
-XX:G1NewSizePercent=30
-XX:G1MaxNewSizePercent=40
-XX:G1HeapRegionSize=8M
-XX:G1ReservePercent=20
-XX:G1HeapWastePercent=5
-XX:G1MixedGCCountTarget=4
-XX:InitiatingHeapOccupancyPercent=15
-XX:G1MixedGCLiveThresholdPercent=90
-XX:G1RSetUpdatingPauseTimePercent=5
-XX:SurvivorRatio=32
-XX:+PerfDisableSharedMem
-XX:MaxTenuringThreshold=1
-Dusing.aikars.flags=https://mcflags.emc.gs
-Daikars.new.flags=true
-Dfile.encoding=UTF-8
EOF
  log "JVM args Aikar â†’ user_jvm_args.txt (${heap}M)"
}

write_start_sh() {
  cat >"${ROOT}/start.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
cd "\$(dirname "\$0")"
exec java @user_jvm_args.txt @libraries/net/neoforged/neoforge/${NEOFORGE_VERSION}/unix_args.txt nogui
EOF
  chmod +x "${ROOT}/start.sh"
  log "start.sh listo (usa user_jvm_args + NeoForge unix_args)"
}

# ---------------------------------------------------------------------------
# Preflight
# ---------------------------------------------------------------------------
need_cmd curl
need_cmd java
need_cmd tar

JAVA_VER="$(java -version 2>&1 | head -n1 || true)"
log "Java: ${JAVA_VER}"
log "Destino: ${ROOT}"
log "Repo: ${OASIS_REPO} @ ${OASIS_BRANCH}"
log "MC ${MC_VERSION} / NeoForge ${NEOFORGE_VERSION} / heap ${HEAP_MB}M"

mkdir -p "$TMP" mods config kubejs defaultconfigs

# ---------------------------------------------------------------------------
# 1) Pack sources (configs + manifest) desde GitHub
# ---------------------------------------------------------------------------
log "Descargando pack desde GitHub..."
ARCHIVE_URL="${OASIS_REPO}/archive/refs/heads/${OASIS_BRANCH}.tar.gz"
rm -rf "$STAGING"
mkdir -p "$STAGING"
if ! curl -fsSL --retry 3 -A "Oasis-Pterodactyl-Install/1.0" "$ARCHIVE_URL" | tar -xz -C "$STAGING" --strip-components=1; then
  die "No se pudo descargar ${ARCHIVE_URL}. Revisa OASIS_REPO / OASIS_BRANCH (Â¿pusheaste el branch?)."
fi

if [[ -f "${STAGING}/curseforge/manifest.json" ]]; then
  MANIFEST="${STAGING}/curseforge/manifest.json"
elif [[ -f "${STAGING}/manifest.json" ]]; then
  MANIFEST="${STAGING}/manifest.json"
else
  die "manifest.json no encontrado en el repo"
fi

if [[ -f "${STAGING}/docs/cf-manifest-files.csv" ]]; then
  CSV="${STAGING}/docs/cf-manifest-files.csv"
fi

copy_tree() {
  local src="$1" dest="$2"
  [[ -d "$src" ]] || return 0
  mkdir -p "$dest"
  # Prefer rsync if present; else cp -a
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete "${src}/" "${dest}/"
  else
    rm -rf "${dest:?}/"*
    cp -a "${src}/." "$dest/"
  fi
}

log "Aplicando configs / kubejs / defaultconfigs / server.properties..."
if [[ "$FORCE_CONFIGS" == "1" ]]; then
  if [[ -d "${STAGING}/server/config" ]]; then
    copy_tree "${STAGING}/server/config" "${ROOT}/config"
  elif [[ -d "${STAGING}/curseforge/overrides/config" ]]; then
    copy_tree "${STAGING}/curseforge/overrides/config" "${ROOT}/config"
  fi

  if [[ -d "${STAGING}/server/kubejs" ]]; then
    copy_tree "${STAGING}/server/kubejs" "${ROOT}/kubejs"
  elif [[ -d "${STAGING}/curseforge/overrides/kubejs" ]]; then
    copy_tree "${STAGING}/curseforge/overrides/kubejs" "${ROOT}/kubejs"
  fi

  if [[ -d "${STAGING}/server/defaultconfigs" ]]; then
    copy_tree "${STAGING}/server/defaultconfigs" "${ROOT}/defaultconfigs"
  fi

  if [[ -f "${STAGING}/server/server.properties" ]]; then
    cp -f "${STAGING}/server/server.properties" "${ROOT}/server.properties"
  fi
else
  log "FORCE_CONFIGS=0 â€” se conservan configs existentes"
fi

# ---------------------------------------------------------------------------
# 2) NeoForge server install
# ---------------------------------------------------------------------------
INSTALLER="neoforge-${NEOFORGE_VERSION}-installer.jar"
INSTALLER_URL="https://maven.neoforged.net/releases/net/neoforged/neoforge/${NEOFORGE_VERSION}/neoforge-${NEOFORGE_VERSION}-installer.jar"
UNIX_ARGS="libraries/net/neoforged/neoforge/${NEOFORGE_VERSION}/unix_args.txt"

if [[ ! -f "$UNIX_ARGS" ]]; then
  log "Instalando NeoForge ${NEOFORGE_VERSION}..."
  download "$INSTALLER_URL" "$INSTALLER"
  java -jar "$INSTALLER" --installServer
  rm -f "$INSTALLER" "${INSTALLER}.log" installer.log 2>/dev/null || true
  [[ -f "$UNIX_ARGS" ]] || die "NeoForge no generÃ³ ${UNIX_ARGS}"
else
  log "NeoForge ya instalado (${UNIX_ARGS})"
fi

# ---------------------------------------------------------------------------
# 3) Mods CurseForge (skip client-only)
# ---------------------------------------------------------------------------
log "Descargando mods desde CurseForge..."
MODLIST="${TMP}/modfiles.tsv"
: >"$MODLIST"

build_modlist_from_csv() {
  local src="$1" dst="$2"
  if command -v python3 >/dev/null 2>&1; then
    python3 - "$src" "$dst" <<'PY'
import csv, sys
src, dst = sys.argv[1], sys.argv[2]
with open(src, newline="", encoding="utf-8") as f, open(dst, "w", encoding="utf-8") as out:
    for row in csv.DictReader(f):
        out.write(f"{row['projectID']}\t{row['fileID']}\t{row['fileName']}\n")
PY
    return
  fi
  # "fileName","projectID","fileID",...
  tail -n +2 "$src" | sed 's/\r$//' | while IFS= read -r line; do
    line="${line//\"/}"
    IFS=',' read -r fname pid fid _ <<<"$line"
    printf '%s\t%s\t%s\n' "$pid" "$fid" "$fname"
  done >"$dst"
}

build_modlist_from_manifest() {
  local src="$1" dst="$2"
  if command -v python3 >/dev/null 2>&1; then
    python3 - "$src" "$dst" <<'PY'
import json, sys
data = json.load(open(sys.argv[1], encoding="utf-8"))
with open(sys.argv[2], "w", encoding="utf-8") as out:
    for f in data.get("files", []):
        out.write(f"{f['projectID']}\t{f['fileID']}\tmod-{f['projectID']}-{f['fileID']}.jar\n")
PY
    return
  fi
  if command -v jq >/dev/null 2>&1; then
    jq -r '.files[] | "\(.projectID)\t\(.fileID)\tmod-\(.projectID)-\(.fileID).jar"' "$src" >"$dst"
    return
  fi
  die "Se necesita python3 o jq para leer manifest.json"
}

if [[ -n "$CSV" && -f "$CSV" ]]; then
  build_modlist_from_csv "$CSV" "$MODLIST"
fi
if [[ ! -s "$MODLIST" ]]; then
  build_modlist_from_manifest "$MANIFEST" "$MODLIST"
fi
[[ -s "$MODLIST" ]] || die "No se pudo construir la lista de mods"

download_one() {
  local pid="$1" fid="$2" name="$3"
  local out="mods/${name}"
  local url_cf="https://www.curseforge.com/api/v1/mods/${pid}/files/${fid}/download"
  local a=$((fid / 1000))
  local b=$((fid % 1000))
  local url_cdn="https://mediafilez.forgecdn.net/files/${a}/${b}/${name}"

  if is_client_only "$pid"; then
    printf 'skip-client\t%s\t%s\n' "$pid" "$name"
    return 0
  fi

  if [[ -f "$out" && -s "$out" ]]; then
    printf 'exists\t%s\n' "$name"
    return 0
  fi

  local tmp="${out}.part"
  if curl -fsSL --retry 3 --retry-delay 2 \
      -A "Oasis-Pterodactyl-Install/1.0" \
      -L -o "$tmp" "$url_cf" \
      || curl -fsSL --retry 3 --retry-delay 2 \
      -A "Oasis-Pterodactyl-Install/1.0" \
      -L -o "$tmp" "$url_cdn"; then
    mv -f "$tmp" "$out"
    printf 'ok\t%s\n' "$name"
  else
    rm -f "$tmp"
    printf 'FAIL\t%s\t%s\n' "$pid" "$fid" >&2
    return 1
  fi
}
export -f download_one is_client_only
export CLIENT_ONLY_IDS

FAILS=0
RESULTS="${TMP}/download-results.txt"
: >"$RESULTS"
if command -v xargs >/dev/null 2>&1; then
  set +e
  # shellcheck disable=SC2016
  tr '\t' '\n' <"$MODLIST" | xargs -P "$DOWNLOAD_WORKERS" -n 3 bash -c 'download_one "$@"' _ | tee -a "$RESULTS"
  set -e
else
  while IFS=$'\t' read -r pid fid name; do
    download_one "$pid" "$fid" "$name" | tee -a "$RESULTS" || FAILS=$((FAILS + 1))
  done <"$MODLIST"
fi
FAILS="$(grep -c '^FAIL' "$RESULTS" 2>/dev/null || true)"
if [[ "${FAILS:-0}" -gt 0 ]]; then
  warn "${FAILS} descargas fallaron â€” revisa la salida arriba"
fi

# Contar jars
MOD_COUNT="$(find mods -maxdepth 1 -type f -name '*.jar' | wc -l | tr -d ' ')"
log "Mods en disco: ${MOD_COUNT}"

# Limpieza client-only por si quedaron de un install anterior
for pid in $CLIENT_ONLY_IDS; do
  # borrar por patrÃ³n del CSV si existe
  true
done
# Borrado explÃ­cito por nombres conocidos
rm -f \
  mods/MouseTweaks*.jar \
  mods/Controlling-*.jar \
  mods/Searchables-*.jar \
  mods/AmbientSounds*.jar \
  mods/CreativeCore*.jar \
  mods/PresenceFootsteps-*.jar \
  mods/embeddium-*.jar \
  mods/entityculling-*.jar \
  mods/ImmediatelyFast-*.jar \
  2>/dev/null || true

MOD_COUNT="$(find mods -maxdepth 1 -type f -name '*.jar' | wc -l | tr -d ' ')"
log "Mods server finales: ${MOD_COUNT}"

# ---------------------------------------------------------------------------
# 4) JVM + start + eula
# ---------------------------------------------------------------------------
write_aikar_args "$HEAP_MB"
write_start_sh

if [[ ! -f eula.txt ]]; then
  printf 'eula=true\n' >eula.txt
  log "eula.txt creado (eula=true)"
fi

# ---------------------------------------------------------------------------
# Cleanup staging (dejar mods/configs)
# ---------------------------------------------------------------------------
rm -rf "$TMP"

log "Install completo."
log "Startup del egg: bash start.sh"
log "Heap: ${HEAP_MB}M (panel SERVER_MEMORY=${SERVER_MEMORY:-n/a})"
log "No pongas otro -Xmx en el campo Startup del panel."
