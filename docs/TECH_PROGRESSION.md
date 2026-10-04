# Oasis — progresión tech (KubeJS)

**Cadena:** Create (I) → Immersive Engineering (II) → AE2 (III) → Mekanism (IV)

- Solo items/máquinas **existentes** (sin items nuevos).
- Crafting **y** recetas de máquina (metallurgic infuser).
- **Recipe ids originales** → EMI/JEI muestran la receta del mod con ingredientes Oasis.
- Script: `kubejs/server_scripts/oasis_tech_gates.js`
- Cozy / magia / deco: sin cambios.

---

## Flujo

1. **Create** early libre; late Create (crafter/arm) pide un poco de IE.
2. **IE** — engineering/dynamo/heater/coils piden Create.
3. **AE2** — Inscriber→processors→storage (Drive/Controller) con IE+Create; **antes de Mek**.
4. **Mekanism** — crafts + Infuser usan AE2/IE/Create. Alloy infused usa **certus** (no fluix).

Early storage: Sophisticated · Mid: AE2 · End tech: Mek.

---

## Tabla de cambios

### Create (puente hacia IE)

| Receta id | Resultado | Cambio |
|---|---|---|
| `create:crafting/kinetics/mechanical_crafter` | Mechanical Crafter | crafting table → `immersiveengineering:craftingtable` |
| `create:crafting/kinetics/mechanical_arm` | Mechanical Arm | andesite alloy → `immersiveengineering:component_iron` |

### IE ← Create

| Receta id | Resultado | Cambio |
|---|---|---|
| `immersiveengineering:crafting/craftingtable` | Engineer's Crafting Table | crafting table → `create:precision_mechanism` |
| `immersiveengineering:crafting/basic_engineering` | Basic Engineering | iron → `create:andesite_alloy` |
| `immersiveengineering:crafting/light_engineering` | Light Engineering | copper → `create:electron_tube` |
| `immersiveengineering:crafting/heavy_engineering` | Heavy Engineering | electrum → `create:precision_mechanism` |
| `immersiveengineering:crafting/rs_engineering` | RS Engineering | copper → `create:electron_tube` |
| `immersiveengineering:crafting/dynamo` | Dynamo | iron component → `create:electron_tube` |
| `immersiveengineering:crafting/furnace_heater` | Furnace Heater | redstone → `create:electron_tube` |
| `immersiveengineering:crafting/coil_mv` | MV Coil | iron → `create:precision_mechanism` |

### AE2 ← Create + IE

| Receta id | Resultado | Cambio |
|---|---|---|
| `ae2:network/blocks/inscribers` | Inscriber | copper → `immersiveengineering:component_electronic` |
| `ae2:network/blocks/controller` | Controller | sky/fluix + `precision_mechanism` + `engineering_processor` + `component_electronic` |
| `ae2:network/blocks/energy_energy_acceptor` (+alt) | Energy Acceptor | copper → `immersiveengineering:coil_lv` |
| `ae2:network/blocks/storage_drive` | ME Drive | un hierro → `create:precision_mechanism` |
| `ae2:network/blocks/crystal_processing_charger` | Charger | copper → `immersiveengineering:wirecoil_copper` |
| `ae2:network/cells/item_cell_housing` | Item Cell Housing | copper → `immersiveengineering:component_iron` |
| `ae2:network/blocks/interfaces_interface` (+alt) | ME Interface | glass → `create:electron_tube` |
| `ae2:network/blocks/pattern_providers_interface` (+alt) | Pattern Provider | crafting table → IE crafting table |
| `ae2:network/blocks/crystal_processing_growth_accelerator` | Growth Accelerator | iron → `immersiveengineering:component_steel` |

### Mekanism ← IE + AE2 + Create

| Receta id | Tipo | Resultado | Cambio |
|---|---|---|---|
| `mekanism:metallurgic_infuser` | craft | Metallurgic Infuser | electronic + `ae2:logic_processor` |
| `mekanism:steel_casing` | craft | Steel Casing | osmium → `create:precision_mechanism` |
| `mekanism:enrichment_chamber` | craft | Enrichment Chamber | un alloy → `ae2:engineering_processor` |
| `mekanism:crusher` | craft | Crusher | un redstone → `ae2:calculation_processor` |
| `mekanism:energized_smelter` | craft | Energized Smelter | glass → `immersiveengineering:cokebrick` |
| `mekanism:precision_sawmill` | craft | Precision Sawmill | un alloy → `immersiveengineering:sawblade` |
| `mekanism:osmium_compressor` | craft | Osmium Compressor | un alloy → `ae2:formation_core` |
| `mekanism:electric_pump` | craft | Electric Pump | un osmium → `immersiveengineering:fluid_pipe` |
| `mekanism:transmitter/universal_cable/basic` | craft | Universal Cable | redstone → **`ae2:certus_quartz_crystal`** |
| `mekanism:transmitter/logistical_transporter/basic` | craft | Logistical Transporter | circuit → `ae2:quartz_fiber` |
| `mekanism:energy_cube/basic` | craft | Basic Energy Cube | alloys → **certus** (no fluix) |
| `mekanism:energy_tablet` | craft | Energy Tablet | gold → `ae2:charged_certus_quartz_crystal` |
| `mekanism:control_circuit/advanced` | craft | Advanced Circuit | infused alloy → `ae2:formation_core` |
| `mekanism:electrolytic_core` | craft | Electrolytic Core | osmium dust → `ae2:certus_quartz_dust` |
| `mekanism:control_circuit/basic` | **infuser** | Basic Control Circuit | osmium → **`ae2:silicon`** |
| `mekanism:metallurgic_infusing/alloy/infused` | **infuser** | Infused Alloy | copper → **`ae2:certus_quartz_crystal`** (no fluix) |
| `mekanism:control_circuit/infused_advanced` | **infuser** | Advanced Circuit | basic circuit → **`ae2:logic_processor`** |

---

## Hints FTB Quests

| Capítulo | Objetivos |
|---|---|
| Tech I Create | Andesite line; electron tube; precision mechanism; (opcional) mechanical crafter tras IE table |
| Tech II IE | Engineer's table; basic/light eng; dynamo/heater; electronic component; heavy/MV |
| Tech III AE2 | Inscriber; silicon/processors; charger; housing; drive; controller; interface |
| Tech IV Mek | Infuser; casing; silicon→basic circuit; certus→infused alloy; enrichment/crusher/smelter; cables |

---

## Balance notes

- **Fluix no se usa** en alloy/cables/cube early Mek (demasiado caro antes de farm AE2).
- Certus / silicon / charged certus / quartz fiber son el “lenguaje” AE2 mid.
- Fluix sigue en Controller AE2 (tier storage serio), no en el primer alloy Mek.
