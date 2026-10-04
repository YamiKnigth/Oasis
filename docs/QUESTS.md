# Oasis — FTB Quests

**Ruta:** `config/ftbquests/quests/` (espejo en `client/`, `server/` y `curseforge/overrides/`)  
**Rama:** `feat/mods-and-quests`  
**Modo:** `progression_mode: flexible` (capítulos visibles; el orden es guía, no candado duro)

## Grupos

| Grupo | Capítulos |
|---|---|
| General | Guía Oasis |
| Cozy | Cocina y BBQ, Almacenamiento, Construcción Cozy |
| Exploración | Exploración Oasis, Aether, Dragona |
| Tecnología | Create, Immersive Engineering, AE2, Mekanism |
| Magia | Malum, Iron's Spells, Ars Nouveau, Occultism |

## Capítulos y escala

| Capítulo | Quests (aprox.) | Notas |
|---|---:|---|
| `guia_oasis` | 26 | Roadmap del pack |
| `create` | 124 | Tech I completa + addons |
| `cocina_bbq` | 140 | FD / BBQ / Brewin / MND / FAC / Create Food |
| `construccion_cozy` | 39 | Macaw, Chipped, Copycats, furniture |
| `storage_oasis` | 40 | Sophisticated backpacks + storage |
| `immersive_engineering` | (ATM base) | Hub con nota Oasis Create→IE |
| `applied_energistics_2` | (ATM base) | Hub con nota Oasis |
| `mekanism` | (ATM base) | Hub Tech IV |
| `irons_spells` | 112 | Combate, tintas, escuelas |
| `ars_nouveau` | 114 | Source, glyphs, familiars |
| `occultism` | 87 | Chalk, spirits, miners |
| `malum` | 75 | Pulido IDs 1.8 + nota Oasis |
| `exploracion_oasis` | 14 | Brújulas, waystones, tips |
| `aether` | 20 | Portal, ores, dungeons |
| `dragona` | 33 | End Remastered + Cataclysm |

## Generadores

Scripts en `docs/_gen_*.mjs` (Node). Regeneran capítulo + `lang/en_us.snbt` (ES) y sincronizan a client/CF overrides.

## Reward tables

`reward_tables/<capitulo>.snbt` — placeholder `minecraft:apple`. Rellena loot real en el editor FTB cuando quieras.

## Cadena tech

**Create → Immersive Engineering → AE2 → Mekanism** — detalle en `docs/TECH_PROGRESSION.md`.

Magia y cozy son **paralelos** (no gatean la tech).
