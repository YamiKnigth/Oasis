# Oasis

Modpack y servidor cozy-adventure para hasta 5 jugadores.

## Plataforma

| Item | Valor |
|---|---|
| Nombre | **Oasis** |
| Minecraft | 1.21.1 |
| Loader | NeoForge **21.1.253** |
| Java | 21 |
| Cliente RAM | 6144 MB (6 GB) |
| Server RAM | 10–12 GB (host hasta 16 GB) |
| Tope de mods | **160** |
| Fuente de mods | **Solo CurseForge** |
| Armas | Simply Swords |
| Armaduras | Immersive Armors |
| Inventario | Sophisticated Backpacks + Storage |
| Cofres | Lootr (per-player) |

## Vision

Explorar un Overworld hermoso, construir casas, cocinar (carnita asada), progresar en tech con gates, magia suave opcional, y cerrar con una dragona exigente. Sin tryhard experto en cozy/deco.

## Pilares

1. Overworld wow (Terralith + Tectonic + Oh The Biomes We've Gone)
2. Cocina BBQ (Farmer's Delight + Barbeque's Delight + addons)
3. Tech progresiva: Create → Immersive Engineering → Mekanism → AE2
4. Magia: Iron's Spells + Malum (paralela)
5. Dimensiones: Aether + BetterNether + BetterEnd
6. Social: FTB Teams / Chunks / Quests

## Estructura del proyecto

```
Oasis/                 # carpeta del proyecto (antes Nuevo)
  plan.md              # plan maestro
  PACK.md              # este archivo
  mods-core.md         # lista de mods (conteo ≤160)
  .gitignore           # excluye mods/jars/mundos/logs
  client/              # desarrollo local (mods locales + configs)
  server/              # smoke tests locales (NO es el host final)
  curseforge/          # manifest + overrides + zip de perfil (fase)
  docs/                # instalacion y notas
```

## Distribucion

- **Jugadores:** perfil CurseForge (`manifest.json` + overrides); la App descarga los mods.
- **GitHub:** configs, scripts KubeJS, quests, perfiles CF, docs — **sin jars**.
- **Pregen:** no en este workspace; solo en el servidor final.

## Cliente

- Via preferida: importar zip Oasis en **CurseForge App**, RAM **6144 MB**, Java 21
- Desarrollo: `client/` con NeoForge 21.1.253
- Mods client-only solo en `client/mods` (no copiar al server)

## Servidor

- Pruebas: carpeta `server/` en este PC
- Host final: otro entorno; nombre Oasis (`server.properties`)
- JVM: flags Aikar en `server/user_jvm_args.txt` (`Xms=Xmx`, ~10–12G de host 16G)
- Host Pterodactyl: `scripts/pterodactyl/install.sh` + Startup `bash start.sh`
- Arranque local: `run.sh` / `run.bat` (leen `user_jvm_args.txt`)

## Reglas de cupo

- Max 160 jars de mods (libs cuentan)
- Si entra un mod, sale otro de la misma categoria
- Recorte bajo presion: deco Macaw/Let's Do → Cataclysm → estructuras pesadas
- Nunca recortar Terralith/Tectonic/BWG ni el pilar BBQ antes que deco

## Estado

- [x] Scaffold NeoForge 21.1.253 + carpetas
- [x] Performance + FTB + QoL
- [x] Overworld + combate + cocina/deco
- [x] Dimensiones Aether + BetterNether/End New Dawn
- [x] Tech Create→IE→AE2→Mek + KubeJS gates + JEI
- [x] Magia Iron’s + Malum + Ars + Occultism; End Remastered + Cataclysm
- [x] FTB Quests + perfil CF
- [x] Wave cozy/QoL — smoke OK · perfil actual `Oasis-1.1.3.zip`
- [ ] Ajuste misiones FTB a mods nuevos




