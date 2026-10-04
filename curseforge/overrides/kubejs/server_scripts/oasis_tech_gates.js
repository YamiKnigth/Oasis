// Oasis — tech progression (existing items/recipes only)
// Chain: Create (I) -> Immersive Engineering (II) -> AE2 (III) -> Mekanism (IV)
// No new items. Original recipe IDs kept for EMI.
// Prefer remove+readd over replaceInput so EMI always sees the shaped/custom form.

ServerEvents.recipes(event => {
  // =========================================================================
  // Tech I leftovers — late Create pulls a bit of IE
  // =========================================================================

  // Mechanical Crafter: crafting table -> IE engineer's crafting table
  event.remove({ id: 'create:crafting/kinetics/mechanical_crafter' })
  event.shaped('3x create:mechanical_crafter', [
    'B',
    'C',
    'R'
  ], {
    B: 'create:electron_tube',
    C: 'create:brass_casing',
    R: 'immersiveengineering:craftingtable'
  }).id('create:crafting/kinetics/mechanical_crafter')

  // Mechanical Arm: andesite alloy -> IE iron component
  event.remove({ id: 'create:crafting/kinetics/mechanical_arm' })
  event.shaped('create:mechanical_arm', [
    'LLA',
    'L  ',
    'IC '
  ], {
    L: '#c:plates/brass',
    A: 'immersiveengineering:component_iron',
    I: 'create:precision_mechanism',
    C: 'create:brass_casing'
  }).id('create:crafting/kinetics/mechanical_arm')

  // =========================================================================
  // Tech II — Immersive Engineering needs Create
  // =========================================================================

  event.remove({ id: 'immersiveengineering:crafting/craftingtable' })
  event.shaped('immersiveengineering:craftingtable', [
    'sss',
    'rcr',
    'r r'
  ], {
    s: '#immersiveengineering:treated_wood_slab',
    r: '#c:rods/treated_wood',
    c: 'create:precision_mechanism'
  }).id('immersiveengineering:crafting/craftingtable')

  event.remove({ id: 'immersiveengineering:crafting/basic_engineering' })
  event.shaped('4x immersiveengineering:basic_engineering', [
    'iwi',
    'w w',
    'iwi'
  ], {
    i: 'create:andesite_alloy',
    w: '#immersiveengineering:treated_wood'
  }).id('immersiveengineering:crafting/basic_engineering')

  event.remove({ id: 'immersiveengineering:crafting/light_engineering' })
  event.shaped('4x immersiveengineering:light_engineering', [
    'igi',
    'gcg',
    'igi'
  ], {
    i: '#c:sheetmetals/iron',
    g: 'immersiveengineering:component_iron',
    c: 'create:electron_tube'
  }).id('immersiveengineering:crafting/light_engineering')

  event.remove({ id: 'immersiveengineering:crafting/heavy_engineering' })
  event.shaped('4x immersiveengineering:heavy_engineering', [
    'igi',
    'geg',
    'igi'
  ], {
    i: '#c:sheetmetals/steel',
    g: 'immersiveengineering:component_steel',
    e: 'create:precision_mechanism'
  }).id('immersiveengineering:crafting/heavy_engineering')

  // Custom IE recipe type — keep turn_and_copy so EMI/IE still recognize it
  event.remove({ id: 'immersiveengineering:crafting/rs_engineering' })
  event.custom({
    type: 'immersiveengineering:turn_and_copy',
    category: 'misc',
    eight_turn: true,
    key: {
      c: { item: 'create:electron_tube' },
      i: { tag: 'c:sheetmetals/iron' },
      r: { tag: 'c:dusts/redstone' }
    },
    pattern: [
      'iri',
      'rcr',
      'iri'
    ],
    result: { count: 4, id: 'immersiveengineering:rs_engineering' }
  }).id('immersiveengineering:crafting/rs_engineering')

  event.remove({ id: 'immersiveengineering:crafting/dynamo' })
  event.shaped('immersiveengineering:dynamo', [
    'rcr',
    'ili'
  ], {
    r: '#c:dusts/redstone',
    c: 'create:electron_tube',
    i: '#c:ingots/iron',
    l: 'immersiveengineering:coil_lv'
  }).id('immersiveengineering:crafting/dynamo')

  event.remove({ id: 'immersiveengineering:crafting/furnace_heater' })
  event.shaped('immersiveengineering:furnace_heater', [
    'pwp',
    'wsw',
    'ptp'
  ], {
    p: '#c:plates/copper',
    w: 'immersiveengineering:wirecoil_copper',
    s: '#c:sheetmetals/iron',
    t: 'create:electron_tube'
  }).id('immersiveengineering:crafting/furnace_heater')

  event.remove({ id: 'immersiveengineering:crafting/coil_mv' })
  event.shaped('immersiveengineering:coil_mv', [
    'www',
    'wiw',
    'www'
  ], {
    w: 'immersiveengineering:wirecoil_electrum',
    i: 'create:precision_mechanism'
  }).id('immersiveengineering:crafting/coil_mv')

  // =========================================================================
  // Tech III — AE2 needs Create + IE
  // =========================================================================

  event.remove({ id: 'ae2:network/blocks/inscribers' })
  event.shaped('ae2:inscriber', [
    'aba',
    'c a',
    'aba'
  ], {
    a: '#c:ingots/iron',
    b: 'minecraft:piston',
    c: 'immersiveengineering:component_electronic'
  }).id('ae2:network/blocks/inscribers')

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

  // Only the real acceptor craft (alt is cable <-> block conversion — leave alone)
  event.remove({ id: 'ae2:network/blocks/energy_energy_acceptor' })
  event.shaped('ae2:energy_acceptor', [
    'aba',
    'bcb',
    'aba'
  ], {
    a: '#c:ingots/iron',
    b: 'ae2:quartz_glass',
    c: 'immersiveengineering:coil_lv'
  }).id('ae2:network/blocks/energy_energy_acceptor')

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

  event.remove({ id: 'ae2:network/blocks/crystal_processing_charger' })
  event.shaped('ae2:charger', [
    'aba',
    'a  ',
    'aba'
  ], {
    a: '#c:ingots/iron',
    b: 'immersiveengineering:wirecoil_copper'
  }).id('ae2:network/blocks/crystal_processing_charger')

  event.remove({ id: 'ae2:network/cells/item_cell_housing' })
  event.shaped('ae2:item_cell_housing', [
    'aba',
    'b b',
    'cdc'
  ], {
    a: 'ae2:quartz_glass',
    b: '#c:dusts/redstone',
    c: '#c:ingots/iron',
    d: 'immersiveengineering:component_iron'
  }).id('ae2:network/cells/item_cell_housing')

  // Only the real interface craft (alt is cable conversion)
  event.remove({ id: 'ae2:network/blocks/interfaces_interface' })
  event.shaped('ae2:interface', [
    'aba',
    'c d',
    'aba'
  ], {
    a: '#c:ingots/iron',
    b: 'create:electron_tube',
    c: 'ae2:annihilation_core',
    d: 'ae2:formation_core'
  }).id('ae2:network/blocks/interfaces_interface')

  event.remove({ id: 'ae2:network/blocks/pattern_providers_interface' })
  event.shaped('ae2:pattern_provider', [
    'aba',
    'c d',
    'aba'
  ], {
    a: '#c:ingots/iron',
    b: 'immersiveengineering:craftingtable',
    c: 'ae2:annihilation_core',
    d: 'ae2:formation_core'
  }).id('ae2:network/blocks/pattern_providers_interface')

  event.remove({ id: 'ae2:network/blocks/crystal_processing_growth_accelerator' })
  event.shaped('ae2:growth_accelerator', [
    'aba',
    'cdc',
    'aba'
  ], {
    a: 'immersiveengineering:component_steel',
    b: 'ae2:fluix_glass_cable',
    c: 'ae2:quartz_glass',
    d: 'ae2:fluix_block'
  }).id('ae2:network/blocks/crystal_processing_growth_accelerator')

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

  event.remove({ id: 'mekanism:steel_casing' })
  event.shaped('mekanism:steel_casing', [
    'SGS',
    'GMG',
    'SGS'
  ], {
    S: '#c:ingots/steel',
    G: '#c:glass_blocks/cheap',
    M: 'create:precision_mechanism'
  }).id('mekanism:steel_casing')

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

  event.remove({ id: 'mekanism:transmitter/universal_cable/basic' })
  event.shaped('8x mekanism:basic_universal_cable', [
    'SCS'
  ], {
    S: '#c:ingots/steel',
    C: 'ae2:certus_quartz_crystal'
  }).id('mekanism:transmitter/universal_cable/basic')

  event.remove({ id: 'mekanism:transmitter/logistical_transporter/basic' })
  event.shaped('8x mekanism:basic_logistical_transporter', [
    'SQS'
  ], {
    S: '#c:ingots/steel',
    Q: 'ae2:quartz_fiber'
  }).id('mekanism:transmitter/logistical_transporter/basic')

  // mek_data type preserved for NBT-safe energy cube crafts
  event.remove({ id: 'mekanism:energy_cube/basic' })
  event.custom({
    type: 'mekanism:mek_data',
    category: 'misc',
    key: {
      A: { item: 'ae2:certus_quartz_crystal' },
      E: { item: 'mekanism:energy_tablet' },
      I: { tag: 'c:ingots/iron' },
      P: { item: 'mekanism:steel_casing' }
    },
    pattern: [
      'AEA',
      'IPI',
      'AEA'
    ],
    result: { count: 1, id: 'mekanism:basic_energy_cube' }
  }).id('mekanism:energy_cube/basic')

  event.remove({ id: 'mekanism:energy_tablet' })
  event.shaped('mekanism:energy_tablet', [
    'RIR',
    'AIA',
    'RIR'
  ], {
    R: '#c:dusts/redstone',
    I: 'ae2:charged_certus_quartz_crystal',
    A: '#mekanism:alloys/infused'
  }).id('mekanism:energy_tablet')

  event.remove({ id: 'mekanism:control_circuit/advanced' })
  event.shaped('mekanism:advanced_control_circuit', [
    'ACA'
  ], {
    A: 'ae2:formation_core',
    C: '#c:circuits/basic'
  }).id('mekanism:control_circuit/advanced')

  event.remove({ id: 'mekanism:electrolytic_core' })
  event.shaped('mekanism:electrolytic_core', [
    'AOA',
    'IAG',
    'AOA'
  ], {
    A: '#mekanism:alloys/infused',
    O: 'ae2:certus_quartz_dust',
    I: '#c:dusts/iron',
    G: '#c:dusts/gold'
  }).id('mekanism:electrolytic_core')

  // ----- Metallurgic Infuser machine recipes -----

  event.remove({ id: 'mekanism:control_circuit/basic' })
  event.custom({
    type: 'mekanism:metallurgic_infusing',
    chemical_input: { amount: 20, tag: 'mekanism:redstone' },
    item_input: { count: 1, item: 'ae2:silicon' },
    output: { count: 1, id: 'mekanism:basic_control_circuit' },
    per_tick_usage: false
  }).id('mekanism:control_circuit/basic')

  event.remove({ id: 'mekanism:metallurgic_infusing/alloy/infused' })
  event.custom({
    type: 'mekanism:metallurgic_infusing',
    chemical_input: { amount: 10, tag: 'mekanism:redstone' },
    item_input: { count: 1, item: 'ae2:certus_quartz_crystal' },
    output: { count: 1, id: 'mekanism:alloy_infused' },
    per_tick_usage: false
  }).id('mekanism:metallurgic_infusing/alloy/infused')

  event.remove({ id: 'mekanism:control_circuit/infused_advanced' })
  event.custom({
    type: 'mekanism:metallurgic_infusing',
    chemical_input: { amount: 60, tag: 'mekanism:redstone' },
    item_input: { count: 1, item: 'ae2:logic_processor' },
    output: { count: 1, id: 'mekanism:advanced_control_circuit' },
    per_tick_usage: false
  }).id('mekanism:control_circuit/infused_advanced')
})
