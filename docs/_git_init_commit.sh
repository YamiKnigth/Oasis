#!/usr/bin/env bash
set -euo pipefail
cd "/d/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis"

git rev-parse --is-inside-work-tree
git branch -M main 2>/dev/null || true

git add -A

echo "=== staged sample ==="
git status --porcelain | head -40
echo "=== count ==="
git status --porcelain | wc -l

if git status --porcelain | grep -iE '\.jar$|/mods/'; then
  echo "ERROR: jars or mods would be committed"
  git status --porcelain | grep -iE '\.jar$|/mods/' | head
  exit 1
fi

git commit -m "Initial commit: Oasis pack configs, KubeJS, FTB Quests, and CurseForge profile."
git log -1 --oneline
git status -sb
