# Oasis — instalacion

## Perfil generado (jugadores)

Archivo: `curseforge/Oasis-1.1.6.zip`

Contiene:
- `manifest.json` — MC **1.21.1** + NeoForge **21.1.253** + mods del pack (projectID/fileID)
- `modlist.html` — lista legible
- `minecraftinstance.json` — RAM recomendada **6144 MB**
- `overrides/` — kubejs, FTB Quests, configs del pack (**sin jars**)

## Jugadores (CurseForge App)

1. Instalar [CurseForge App](https://www.curseforge.com/download/app) y **Java 21**.
2. Minecraft → **Create Custom Profile** / **Import** → seleccionar `Oasis-1.1.6.zip`.
3. Esperar a que la App descargue los mods.
4. El perfil trae **6144 MB (6 GB)** en `minecraftinstance.json`. Si al importar queda en 4 GB: Profile Options → Custom RAM → 6144.
5. Jugadores → cuenta Microsoft de Minecraft seleccionada (no basta con login de CurseForge).
6. Shaders: **Iris 1.8.12 + Sodium 0.6.13** (cliente). No uses Sodium 0.8.x con esta Iris (crash).
   - Sin Embeddium/Monocle. Packs en `shaderpacks/` → Opciones → Shaders (tecla **O** también abre Iris).
7. Jugar / conectar al servidor cuando exista.

Si ya tenías `1.1.5`, actualiza a **1.1.6** (Sodium pin 0.6.13). **Server no cambia**.

## Servidor (Pterodactyl)

Script: `scripts/pterodactyl/install.sh`

1. **Push** del repo a GitHub (configs en `server/` + `curseforge/manifest.json`).
2. Egg NeoForge / generico con **Java 21**. Preferible **sin subir el .sh desde Windows** (CRLF rompe bash):
   ```bash
   curl -fsSL "https://raw.githubusercontent.com/YamiKnigth/Oasis/<BRANCH>/scripts/pterodactyl/install.sh" | bash
   ```
   Si ya subiste el archivo y ves `$'\r': command not found`:
   ```bash
   sed -i 's/\r$//' install.sh && bash install.sh
   ```
3. Variables recomendadas del egg:
   - `OASIS_REPO` = `https://github.com/YamiKnigth/Oasis`
   - `OASIS_BRANCH` = branch con el pack (ej. `main` o `feat/mods-and-quests`)
   - `NEOFORGE_VERSION` = `21.1.253`
   - `MC_VERSION` = `1.21.1`
   - RAM del server: **16384 MB** (el script deja ~2G de headroom → heap ~12G)
4. **Startup** del egg (sin `-Xmx` extra):
   ```bash
   bash start.sh
   ```
   Equivalente: `java @user_jvm_args.txt @libraries/net/neoforged/neoforge/21.1.253/unix_args.txt nogui`
5. El install:
   - baja el tarball del branch
   - copia `server/config`, `kubejs`, `defaultconfigs`, `server.properties`
   - instala NeoForge
   - descarga mods CurseForge (salta client-only)
   - escribe `user_jvm_args.txt` con flags **Aikar** (`Xms=Xmx`, G1)

Heap manual: `OASIS_MEMORY=12288` (MB). No dupliques memoria en el campo Startup.

## Notas

- No hace falta pasar la carpeta `mods` a mano (ni en cliente ni en Pterodactyl).
- Rewards de quests: tablas placeholder; rellenar en FTB o editando `overrides/config/ftbquests/quests/reward_tables/`.
- Lista project/file: `docs/cf-manifest-files.csv`.
- Mods elegidos: `docs/MODS_CANDIDATES.md`.
