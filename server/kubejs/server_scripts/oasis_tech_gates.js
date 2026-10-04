// Oasis — tech progression (existing items/recipes only)
// Chain: Create (I) -> Immersive Engineering (II) -> AE2 (III) -> Mekanism (IV)
// No new items. Original recipe IDs kept for EMI/JEI.

ServerEvents.recipes(event => {
  // =========================================================================
  // Tech I leftovers — late Create pulls a bit of IE (optional bridge)
  // =========================================================================

  // Mechanical Crafter: crafting table -> IE engineer's crafting table
  event.replaceInput(
    { id: 'create:crafting/kinetics/mechanical_crafter' },
    'minecraft:crafting_table',
    'immersiveengineering:craftingtable'
  )

  // Mechanical Arm: andesite alloy -> IE iron component
  event.replaceInput(
    { id: 'create:crafting/kinetics/mechanical_arm' },
    'create:andesite_alloy',
    'immersiveengineering:component_iron'
  )

  // =========================================================================
  // Tech II — Immersive Engineering needs Create
  // =========================================================================

  event.replaceInput(
    { id: 'immersiveengineering:crafting/craftingtable' },
    'minecraft:crafting_table',
    'create:precision_mechanism'
  )

  event.replaceInput(
    { id: 'immersiveengineering:crafting/basic_engineering' },
    '#c:ingots/iron',
    'create:andesite_alloy'
  )

  event.replaceInput(
    { id: 'immersiveengineering:crafting/light_engineering' },
    '#c:ingots/copper',
    'create:electron_tube'
  )

  event.replaceInput(
    { id: 'immersiveengineering:crafting/heavy_engineering' },
    '#c:ingots/electrum',
    'create:precision_mechanism'
  )

  event.replaceInput(
    { id: 'immersiveengineering:crafting/rs_engineering' },
    '#c:ingots/copper',
    'create:electron_tube'
  )

  // Dynamo: iron component -> electron tube
  event.replaceInput(
    { id: 'immersiveengineering:crafting/dynamo' },
    'immersiveengineering:component_iron',
    'create:electron_tube'
  )

  // Furnace heater: redstone -> electron tube
  event.replaceInput(
    { id: 'immersiveengineering:crafting/furnace_heater' },
    '#c:dusts/redstone',
    'create:electron_tube'
  )

  // MV coil: iron core -> precision mechanism
  event.replaceInput(
    { id: 'immersiveengineering:crafting/coil_mv' },
    '#c:ingots/iron',
    'create:precision_mechanism'
  )

  // =========================================================================
  // Tech III — AE2 needs Create + IE (storage before Mek)
  // =========================================================================

  event.replaceInput(
    { id: 'ae2:network/blocks/inscribers' },
    '#c:ingots/copper',
    'immersiveengineering:component_electronic'
  )

  event.remove({ id: 'ae2:network/blocks/controller' })
  event.shaped('ae2:controller', [
    'ABA',
    'MPE',
    'ABA'
  ], {
    A: 'ae2:smooth_sky_stone_block',
    B: 'ae2:fluix_crystal',
    M: 'create:precision_mechanism',
    P: 'ae2:engineering_processor',
    E: 'immersiveengineering:component_electronic'
  }).id('ae2:network/blocks/controller')

  event.replaceInput(
    { id: 'ae2:network/blocks/energy_energy_acceptor' },
    '#c:ingots/copper',
    'immersiveengineering:coil_lv'
  )
  event.replaceInput(
    { id: 'ae2:network/blocks/energy_energy_acceptor_alt' },
    '#c:ingots/copper',
    'immersiveengineering:coil_lv'
  )

  event.remove({ id: 'ae2:network/blocks/storage_drive' })
  event.shaped('ae2:drive', [
    'ABA',
    'C C',
    'AMA'
  ], {
    A: '#c:ingots/iron',
    B: 'ae2:engineering_processor',
    C: 'ae2:fluix_glass_cable',
    M: 'create:precision_mechanism'
  }).id('ae2:network/blocks/storage_drive')

  event.replaceInput(
    { id: 'ae2:network/blocks/crystal_processing_charger' },
    '#c:ingots/copper',
    'immersiveengineering:wirecoil_copper'
  )

  // Cell housing: copper -> IE iron component
  event.replaceInput(
    { id: 'ae2:network/cells/item_cell_housing' },
    '#c:ingots/copper',
    'immersiveengineering:component_iron'
  )

  // Interface: glass -> Create electron tube (both glass slots)
  event.replaceInput(
    { id: 'ae2:network/blocks/interfaces_interface' },
    '#c:glass_blocks/cheap',
    'create:electron_tube'
  )
  event.replaceInput(
    { id: 'ae2:network/blocks/interfaces_interface_alt' },
    '#c:glass_blocks/cheap',
    'create:electron_tube'
  )

  // Pattern provider: crafting table -> IE engineer's table
  event.replaceInput(
    { id: 'ae2:network/blocks/pattern_providers_interface' },
    'minecraft:crafting_table',
    'immersiveengineering:craftingtable'
  )
  event.replaceInput(
    { id: 'ae2:network/blocks/pattern_providers_interface_alt' },
    'minecraft:crafting_table',
    'immersiveengineering:craftingtable'
  )

  // Growth accelerator: iron -> IE steel component
  event.replaceInput(
    { id: 'ae2:network/blocks/crystal_processing_growth_accelerator' },
    '#c:ingots/iron',
    'immersiveengineering:component_steel'
  )

  // Formation / annihilation cores: logic processor stays; fluix dust -> Create powdered? 
  // Soft IE touch: nether/certus side unchanged; add Create brass via reshape would change counts.
  // Instead: cores keep vanilla; gated by processor + earlier Inscriber gate.

  // =========================================================================
  // Tech IV — Mekanism needs IE + AE2 (+ Create)
  // =========================================================================

  event.remove({ id: 'mekanism:metallurgic_infuser' })
  event.shaped('mekanism:metallurgic_infuser', [
    'IFI',
    'RPR',
    'IFI'
  ], {
    I: '#c:ingots/iron',
    F: 'minecraft:furnace',
    R: 'immersiveengineering:component_electronic',
    P: 'ae2:logic_processor'
  }).id('mekanism:metallurgic_infuser')

  event.replaceInput(
    { id: 'mekanism:steel_casing' },
    '#c:ingots/osmium',
    'create:precision_mechanism'
  )

  event.remove({ id: 'mekanism:enrichment_chamber' })
  event.shaped('mekanism:enrichment_chamber', [
    'APA',
    'IXI',
    'ACA'
  ], {
    A: '#mekanism:alloys/basic',
    P: 'ae2:engineering_processor',
    C: '#c:circuits/basic',
    I: '#c:ingots/iron',
    X: 'mekanism:steel_casing'
  }).id('mekanism:enrichment_chamber')

  event.remove({ id: 'mekanism:crusher' })
  event.shaped('mekanism:crusher', [
    'RCR',
    'BXB',
    'PCR'
  ], {
    R: '#c:dusts/redstone',
    C: '#c:circuits/basic',
    B: '#c:buckets/lava',
    X: 'mekanism:steel_casing',
    P: 'ae2:calculation_processor'
  }).id('mekanism:crusher')

  // Energized smelter: glass -> IE coke brick
  event.remove({ id: 'mekanism:energized_smelter' })
  event.shaped('mekanism:energized_smelter', [
    'ACA',
    'KXK',
    'ACA'
  ], {
    A: '#mekanism:alloys/basic',
    C: '#c:circuits/basic',
    X: 'mekanism:steel_casing',
    K: 'immersiveengineering:cokebrick'
  }).id('mekanism:energized_smelter')

  // Precision sawmill: one infused alloy -> IE sawblade
  event.remove({ id: 'mekanism:precision_sawmill' })
  event.shaped('mekanism:precision_sawmill', [
    'ICI',
    'SXA',
    'ICI'
  ], {
    I: '#c:ingots/iron',
    C: '#c:circuits/basic',
    A: '#mekanism:alloys/infused',
    S: 'immersiveengineering:sawblade',
    X: 'mekanism:steel_casing'
  }).id('mekanism:precision_sawmill')

  // Osmium compressor: center bucket stays; one alloy -> AE2 formation core
  event.remove({ id: 'mekanism:osmium_compressor' })
  event.shaped('mekanism:osmium_compressor', [
    'ACA',
    'BXB',
    'AFA'
  ], {
    A: '#mekanism:alloys/infused',
    C: '#c:circuits/advanced',
    B: 'minecraft:bucket',
    X: 'mekanism:steel_casing',
    F: 'ae2:formation_core'
  }).id('mekanism:osmium_compressor')

  // Electric pump: bottom osmium row center -> IE fluid pipe
  event.remove({ id: 'mekanism:electric_pump' })
  event.shaped('mekanism:electric_pump', [
    ' B ',
    'AXA',
    'OPO'
  ], {
    B: 'minecraft:bucket',
    A: '#mekanism:alloys/infused',
    X: 'mekanism:steel_casing',
    O: '#c:ingots/osmium',
    P: 'immersiveengineering:fluid_pipe'
  }).id('mekanism:electric_pump')

  // Universal cable: redstone -> certus (not fluix — cheaper mid-game)
  event.replaceInput(
    { id: 'mekanism:transmitter/universal_cable/basic' },
    '#c:dusts/redstone',
    'ae2:certus_quartz_crystal'
  )

  // Logistical transporter: basic circuit -> quartz fiber
  event.replaceInput(
    { id: 'mekanism:transmitter/logistical_transporter/basic' },
    '#c:circuits/basic',
    'ae2:quartz_fiber'
  )

  // Energy cube: basic alloys -> certus (not fluix)
  event.replaceInput(
    { id: 'mekanism:energy_cube/basic' },
    '#mekanism:alloys/basic',
    'ae2:certus_quartz_crystal'
  )

  // Energy tablet: gold -> charged certus (encourages AE2 charger)
  event.replaceInput(
    { id: 'mekanism:energy_tablet' },
    '#c:ingots/gold',
    'ae2:charged_certus_quartz_crystal'
  )

  // Advanced control circuit (shaped): infused alloy -> formation core
  event.replaceInput(
    { id: 'mekanism:control_circuit/advanced' },
    '#mekanism:alloys/infused',
    'ae2:formation_core'
  )

  // Electrolytic core: osmium dust -> certus dust
  event.replaceInput(
    { id: 'mekanism:electrolytic_core' },
    '#c:dusts/osmium',
    'ae2:certus_quartz_dust'
  )

  // ----- Metallurgic Infuser machine recipes -----

  // Basic control circuit: osmium -> AE2 silicon (smelt certus dust — accessible)
  event.remove({ id: 'mekanism:control_circuit/basic' })
  event.custom({
    type: 'mekanism:metallurgic_infusing',
    chemical_input: { amount: 20, tag: 'mekanism:redstone' },
    item_input: { count: 1, item: 'ae2:silicon' },
    output: { count: 1, id: 'mekanism:basic_control_circuit' },
    per_tick_usage: false
  }).id('mekanism:control_circuit/basic')

  // Infused alloy: copper -> certus crystal (NOT fluix — early Mek friendly)
  event.remove({ id: 'mekanism:metallurgic_infusing/alloy/infused' })
  event.custom({
    type: 'mekanism:metallurgic_infusing',
    chemical_input: { amount: 10, tag: 'mekanism:redstone' },
    item_input: { count: 1, item: 'ae2:certus_quartz_crystal' },
    output: { count: 1, id: 'mekanism:alloy_infused' },
    per_tick_usage: false
  }).id('mekanism:metallurgic_infusing/alloy/infused')

  // Advanced circuit (infuser alt path): basic circuit -> logic processor
  event.remove({ id: 'mekanism:control_circuit/infused_advanced' })
  event.custom({
    type: 'mekanism:metallurgic_infusing',
    chemical_input: { amount: 60, tag: 'mekanism:redstone' },
    item_input: { count: 1, item: 'ae2:logic_processor' },
    output: { count: 1, id: 'mekanism:advanced_control_circuit' },
    per_tick_usage: false
  }).id('mekanism:control_circuit/infused_advanced')
})
