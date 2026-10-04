# Oasis — FTB Quests

**Ruta:** `config/ftbquests/quests/` (espejo en `client/` y `server/`)

Smoke base: **6 groups**, **11 chapters**.  
**Create (Tech I) reescrito:** ~**124** quests estilo ATM/Mekanism (addons + gates Oasis). Pendiente smoke tras reload.

## Grupos

| Grupo | Capítulos |
|---|---|
| General | Guía Oasis |
| Cozy | Cocina y BBQ, Almacenamiento |
| Exploracion | Aether, Dragona |
| Tecnologia | Create, Immersive Engineering, AE2, Mekanism |
| Magia | Malum, Iron's Spells |

Todos los capítulos están **siempre visibles** (`progression_mode: flexible` en el libro).

## Reward tables

Una tabla random por capítulo en `reward_tables/<capitulo>.snbt`.  
Placeholder actual: `minecraft:apple`. **Rellena tú los items** en el editor FTB / editando el snbt.

## Capítulos nuevos (Oasis)

- `guia_oasis` — roadmap del servidor
- `create` — Tech I + Create Deco + Craft & Additions
- `cocina_bbq` — FD + Barbeque's Delight + Brewin
- `storage_oasis` — Sophisticated + Lootr
- `irons_spells` — ruta corta
- `aether` — portal + Bronze obligatorio
- `dragona` — ojos End Remastered + egg

## Capítulos reutilizados (tus ejemplos)

Adaptados (grupo, ids, `table_id` → reward del capítulo) + nota Oasis al inicio:

- `immersive_engineering`
- `applied_energistics_2`
- `mekanism`
- `malum` (mayoría intacta)

## Cadena tech (recordatorio)

Create → IE → AE2 → Mekanism — ver `TECH_PROGRESSION.md`.
