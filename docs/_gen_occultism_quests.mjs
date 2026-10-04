import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const questsRoot = path.join(root, 'server/config/ftbquests/quests');
const chapterPath = path.join(questsRoot, 'chapters/occultism.snbt');
const langPath = path.join(questsRoot, 'lang/en_us.snbt');
const tableId = '8856416108613626146L';
const chapterId = 'A84248B82104D208';
const groupId = '7726645EE79AB0A8';
const id = (key) => crypto.createHash('md5').update(`oasis-occultism-${key}`).digest('hex').toUpperCase().slice(0, 16);

const defs = [];
const q = (key, deps, item, count, x, y, title, subtitle, desc, opts = {}) => {
  defs.push({ key, deps, item, count, x, y, title, subtitle, desc, ...opts });
};

// HUB
q('intro', [], 'checkmark', 1, 0, 0, 'Occultism', 'Espiritus, circulo y minas', [
  'Occultism invoca espiritus (foliot/djinni/afrit/marid) con circulo de chalk + bowls.',
  '&6Oasis:&r Magia de automatizacion/mineria paralela. No bloquea Create ni Mek; combina con storage del pack.',
], { shape: 'gear', size: 2.0 });

q('dictionary', ['intro'], 'occultism:dictionary_of_spirits', 1, 2, 0, 'Dictionary of Spirits', 'Tu biblia oculta', [
  'Guia del mod: rituales, espiritus y progresion. Consultalo antes de dibujar circulo a ciegas.',
]);
q('divination', ['dictionary'], 'occultism:divination_rod', 1, 4, 0, 'Divination Rod', 'Busca otherstone', [
  'Apunta a otherstone/otherworld ores. Primer paso para salir del overworld "normal".',
]);
q('otherstone', ['divination'], 'occultism:otherstone', 16, 6, 0, 'Otherstone', 'Piedra del otro lado', [
  'Bloque base de pedestals, bowls y decor occult. Mina con la rod como guia.',
]);
q('spirit_fire', ['otherstone'], 'occultism:spirit_fire', 1, 8, 0, 'Spirit Fire', 'Fuego espiritual', [
  'Fuego especial para purificar chalk impure y procesar materiales occult.',
  'Haz stock: vas a quemar mucha chalk impure.',
]);
q('brush', ['spirit_fire'], 'occultism:brush', 1, 10, 0, 'Brush', 'Borra el circulo', [
  'Limpia chalk del suelo. Obligatorio cuando fallas un ritual o rediseñas.',
]);

// DATURA / TALLOW / CANDLES
q('sec_mats', ['dictionary'], 'checkmark', 1, 2, 2, 'Materiales de ritual', 'Datura, tallow, velas', [
  'Los rituales piden ofrendas. Siembra datura y prepara tallow/candles.',
], { shape: 'hexagon', size: 1.5 });
q('datura_seeds', ['sec_mats'], 'occultism:datura_seeds', 8, 4, 2, 'Datura Seeds', 'Siembra demonica', [
  'Cultivo clave. Crece datura para comida/ofrendas de ritual.',
]);
q('datura', ['datura_seeds'], 'occultism:datura', 16, 6, 2, 'Datura', 'Fruto ritual', [
  'Ingrediente frecuente. Stockea antes de spamear bindings.',
]);
q('tallow', ['sec_mats'], 'occultism:tallow', 16, 4, 3.5, 'Tallow', 'Sebo', [
  'Base de velas grandes. Farms de animales ayudan.',
]);
q('candle', ['tallow'], 'occultism:large_candle', 8, 6, 3.5, 'Large Candle', 'Vela de circulo', [
  'Ilumina y completa patrones de ritual. Hay tintadas si te gusta el aesthetic.',
]);
q('otherworld_ashes', ['spirit_fire'], 'occultism:otherworld_ashes', 16, 8, 2, 'Otherworld Ashes', 'Cenizas', [
  'Subproducto/purificacion. Entra en crafts de chalk y essentials.',
], { hide: true });
q('otherworld_essence', ['otherworld_ashes'], 'occultism:otherworld_essence', 8, 10, 2, 'Otherworld Essence', 'Esencia', [
  'Essence procesada para crafts mid.',
], { hide: true });

// CHALKS
q('sec_chalk', ['spirit_fire'], 'checkmark', 1, 8, -2.5, 'Chalks', 'Dibuja el circulo', [
  'White/Gold/Purple/Red definen el tier y tipo de ritual. Impure -> pure en Spirit Fire.',
], { shape: 'hexagon', size: 1.5 });
q('chalk_white_impure', ['sec_chalk'], 'occultism:chalk_white_impure', 4, 10, -2.5, 'White Chalk Impure', 'Primer trazo', [
  'Craft impure, quema en Spirit Fire para pure white chalk.',
]);
q('chalk_white', ['chalk_white_impure'], 'occultism:chalk_white', 4, 12, -2.5, 'White Chalk', 'Circulos basicos', [
  'Tier de entrada. Foliots y rituales simples.',
]);
q('chalk_gold', ['chalk_white'], 'occultism:chalk_gold', 2, 14, -2.5, 'Golden Chalk', 'Circulos mid', [
  'Siguiente escalon. Mas rituales / mejores espiritus.',
]);
q('chalk_purple', ['chalk_gold'], 'occultism:chalk_purple', 2, 16, -2.5, 'Purple Chalk', 'Circulos altos', [
  'Tier serio. Afrits y contenido peligroso.',
]);
q('chalk_red', ['chalk_purple'], 'occultism:chalk_red', 1, 18, -2.5, 'Red Chalk', 'Circulos top', [
  'Tier maximo de chalk clasico. Marids y endgame occult.',
]);
q('chalk_red_impure', ['chalk_purple'], 'occultism:chalk_red_impure', 2, 16, -4, 'Red Chalk Impure', 'Antes del fuego', [
  'Purifica en Spirit Fire. No dibujes con impure si la receta pide pure.',
], { hide: true });
q('chalk_purple_impure', ['chalk_gold'], 'occultism:chalk_purple_impure', 2, 14, -4, 'Purple Chalk Impure', 'Purificar', [
  'Spirit Fire -> purple chalk.',
], { hide: true });

// BOWLS / CIRCLE GEAR
q('sec_circle', ['chalk_white', 'candle'], 'checkmark', 1, 8, 2, 'Circulo de invocacion', 'Bowls y pedestal', [
  'Sacrificial Bowl + chalk + candles + ofrendas. El Dictionary muestra el patron exacto.',
], { shape: 'hexagon', size: 1.5 });
q('bowl', ['sec_circle'], 'occultism:sacrificial_bowl', 1, 10, 2, 'Sacrificial Bowl', 'Cuenco central', [
  'Bowl basico del ritual. Coloca items de ofrenda segun la pagina del Dictionary.',
]);
q('golden_bowl', ['bowl', 'chalk_gold'], 'occultism:golden_sacrificial_bowl', 1, 12, 2, 'Golden Sacrificial Bowl', 'Bowl mid', [
  'Requerido por rituales mejores. Upgrade natural del bowl basico.',
]);
q('silver_bowl', ['golden_bowl'], 'occultism:silver_sacrificial_bowl', 1, 14, 2, 'Silver Sacrificial Bowl', 'Bowl plata', [
  'Variante de bowl para ciertos rituales mid/high.',
], { hide: true });
q('iesnium_bowl', ['silver_bowl', 'iesnium'], 'occultism:iesnium_sacrificial_bowl', 1, 16, 2, 'Iesnium Sacrificial Bowl', 'Bowl late', [
  'Bowl de iesnium para rituales endgame.',
], { hide: true });
q('pedestal', ['otherstone'], 'occultism:otherstone_pedestal', 4, 6, -2.5, 'Otherstone Pedestal', 'Soportes', [
  'Pedestals alrededor del circulo / decor funcional.',
], { hide: true });
q('spirit_torch', ['spirit_fire'], 'occultism:spirit_torch', 8, 8, -4, 'Spirit Torch', 'Luz occult', [
  'Iluminacion tematica. No sustituye candles de ritual.',
], { hide: true });
q('spirit_campfire', ['spirit_torch'], 'occultism:spirit_campfire', 1, 10, -4, 'Spirit Campfire', 'Fogata espiritual', [
  'Utilidad/ambient. Buena en bases occult.',
], { hide: true });
q('spirit_grindstone', ['otherstone'], 'occultism:spirit_grindstone', 1, 6, 3.5, 'Spirit Grindstone', 'Muele con espiritus', [
  'Procesado early/mid con ayuda espiritual.',
], { hide: true });

// BINDING BOOKS / SPIRITS
q('sec_spirits', ['bowl', 'chalk_white'], 'checkmark', 1, 12, 0, 'Espiritu y bindings', 'Foliot -> Marid', [
  'Books of Binding + ritual = espiritu bound. Luego Books of Calling les dan trabajo.',
], { shape: 'hexagon', size: 1.5 });
q('binding_empty', ['sec_spirits'], 'occultism:book_of_binding_empty', 4, 14, 0, 'Empty Binding Book', 'Libro vacio', [
  'Base craftable. Especializalo en foliot/djinni/afrit/marid.',
]);
q('binding_foliot', ['binding_empty'], 'occultism:book_of_binding_foliot', 2, 16, 0, 'Binding: Foliot', 'Espiritu menor', [
  'Primer espiritu util: transporte, lumber, cleaner, farmer...',
]);
q('bound_foliot', ['binding_foliot', 'bowl'], 'occultism:book_of_binding_bound_foliot', 1, 18, 0, 'Bound Foliot', 'Foliot capturado', [
  'Resultado del ritual de binding. Ya puedes craftar calling books.',
]);
q('call_transport', ['bound_foliot'], 'occultism:book_of_calling_foliot_transport_items', 1, 20, 0, 'Calling: Transport', 'Mueve items', [
  'Foliot que transporta items entre inventarios. Tu primer automator occult.',
]);
q('call_lumber', ['bound_foliot'], 'occultism:book_of_calling_foliot_lumberjack', 1, 20, 1.5, 'Calling: Lumberjack', 'Tala', [
  'Foliot lenador. Tree farms sin Create (o junto a Create).',
], { hide: true });
q('call_cleaner', ['bound_foliot'], 'occultism:book_of_calling_foliot_cleaner', 1, 20, -1.5, 'Calling: Cleaner', 'Limpia drops', [
  'Recoge basura del suelo. QoL enorme en bases sucias.',
], { hide: true });
q('call_farmer', ['bound_foliot'], 'occultism:book_of_calling_foliot_farmer', 1, 18, 1.5, 'Calling: Farmer', 'Cultivos', [
  'Foliot granjero. Synergy con Cocina Oasis.',
], { hide: true });
q('binding_djinni', ['bound_foliot', 'chalk_gold'], 'occultism:book_of_binding_djinni', 1, 16, -1.5, 'Binding: Djinni', 'Espiritu medio', [
  'Mas poder que foliot. Manage machine y miners mejores.',
]);
q('bound_djinni', ['binding_djinni'], 'occultism:book_of_binding_bound_djinni', 1, 18, -1.5, 'Bound Djinni', 'Djinni listo', [
  'Djinni bound tras el ritual correcto.',
]);
q('call_machine', ['bound_djinni'], 'occultism:book_of_calling_djinni_manage_machine', 1, 20, -3, 'Calling: Manage Machine', 'Cuida maquinas', [
  'Djinni que gestiona maquinas. Puente cozy hacia tech.',
], { hide: true });
q('binding_afrit', ['bound_djinni', 'chalk_purple'], 'occultism:book_of_binding_afrit', 1, 16, 3, 'Binding: Afrit', 'Espiritu alto', [
  'Peligroso y potente. Preparate antes del ritual.',
]);
q('bound_afrit', ['binding_afrit'], 'occultism:book_of_binding_bound_afrit', 1, 18, 3, 'Bound Afrit', 'Afrit listo', [
  'Afrit bound. Deep miners y essence.',
]);
q('afrit_essence', ['bound_afrit'], 'occultism:afrit_essence', 4, 20, 3, 'Afrit Essence', 'Esencia afrit', [
  'Material late de afrits.',
], { hide: true });
q('binding_marid', ['bound_afrit', 'chalk_red'], 'occultism:book_of_binding_marid', 1, 16, 4.5, 'Binding: Marid', 'Espiritu maximo', [
  'Top tier. Master miner y crafts finales.',
]);
q('bound_marid', ['binding_marid'], 'occultism:book_of_binding_bound_marid', 1, 18, 4.5, 'Bound Marid', 'Marid listo', [
  'Marid bound. Enhorabuena, occultist.',
]);
q('marid_essence', ['bound_marid'], 'occultism:marid_essence', 2, 20, 4.5, 'Marid Essence', 'Esencia marid', [
  'Essence endgame occult.',
], { hide: true });

// SILVER / IESNIUM
q('sec_metals', ['divination'], 'checkmark', 1, 2, -2.5, 'Metales occult', 'Silver e Iesnium', [
  'Silver aparece en el camino; Iesnium es el metal late del mod.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('silver_ore', ['sec_metals'], 'occultism:silver_ore', 8, 0, -2.5, 'Silver Ore', 'Plata', [
  'Mina silver. Tambien deepslate variant.',
], { hide: true });
q('silver_ingot', ['silver_ore'], 'occultism:silver_ingot', 16, 0, -4, 'Silver Ingot', 'Lingote plata', [
  'Crafts de bowls y gear occult.',
], { hide: true });
q('raw_iesnium', ['bound_djinni'], 'occultism:raw_iesnium', 8, 14, 6, 'Raw Iesnium', 'Mineral raro', [
  'Iesnium se obtiene con progresion/miners/otherworld. JEI + Dictionary.',
]);
q('iesnium', ['raw_iesnium'], 'occultism:iesnium_ingot', 16, 16, 6, 'Iesnium Ingot', 'Metal late', [
  'Base de pickaxe, bowls y equipos top Occultism.',
]);
q('iesnium_pick', ['iesnium'], 'occultism:iesnium_pickaxe', 1, 18, 6, 'Iesnium Pickaxe', 'Pico occult', [
  'Pico late del mod. Buen partner de miners dimensionales.',
]);
q('infused_pick', ['iesnium_pick'], 'occultism:infused_pickaxe', 1, 20, 6, 'Infused Pickaxe', 'Pico imbuido', [
  'Upgrade espiritual del pico.',
], { hide: true });
q('otherworld_goggles', ['spirit_fire'], 'occultism:otherworld_goggles', 1, 4, -4, 'Otherworld Goggles', 'Ve lo oculto', [
  'Revela bloques/otherworld hidden. Equipalas al explorar.',
], { hide: true });

// MINERS / DIMENSIONAL
q('sec_miners', ['bound_foliot'], 'checkmark', 1, 22, 0, 'Miners dimensionales', 'Mineshaft occult', [
  'Los miner spirits trabajan en el Dimensional Mineshaft. Pack-friendly ore processing.',
], { shape: 'hexagon', size: 1.5 });
q('mineshaft', ['sec_miners'], 'occultism:dimensional_mineshaft', 1, 24, 0, 'Dimensional Mineshaft', 'Pozo de miners', [
  'Estructura/maquina donde insertas miner spirits + fuel/time.',
  'Lee el Dictionary: cada miner trae tablas de loot distintas.',
]);
q('miner_foliot', ['mineshaft', 'bound_foliot'], 'occultism:miner_foliot_unspecialized', 1, 26, 0, 'Miner: Foliot', 'Minero basico', [
  'Primer miner. Loot general, perfecto para empezar la shaft.',
]);
q('miner_djinni', ['miner_foliot', 'bound_djinni'], 'occultism:miner_djinni_ores', 1, 28, 0, 'Miner: Djinni Ores', 'Minero de ores', [
  'Mejor enfoque en ores. Gran salto de throughput.',
]);
q('miner_afrit', ['miner_djinni', 'bound_afrit'], 'occultism:miner_afrit_deeps', 1, 28, 1.5, 'Miner: Afrit Deeps', 'Deep loot', [
  'Minero deep/tier alto. Mas peligro, mejor paga.',
], { hide: true });
q('miner_marid', ['miner_afrit', 'bound_marid'], 'occultism:miner_marid_master', 1, 28, 3, 'Miner: Marid Master', 'Master miner', [
  'Top miner craftable. Objetivo endgame Occultism.',
]);
q('miner_eldritch', ['miner_marid'], 'occultism:miner_ancient_eldritch', 1, 30, 1.5, 'Miner: Ancient Eldritch', 'Trofeo', [
  'Miner legendario/especial. No obligatorio para divertirse.',
], { hide: true });
q('dim_matrix', ['mineshaft'], 'occultism:dimensional_matrix', 1, 24, 1.5, 'Dimensional Matrix', 'Componente dimensional', [
  'Pieza de crafts dimensionales / wormholes.',
], { hide: true });
q('magic_lamp', ['bound_djinni'], 'occultism:magic_lamp_empty', 1, 22, 1.5, 'Magic Lamp (Empty)', 'Lampara', [
  'Contenedor/utility de espiritus. Revisa usos en JEI.',
], { hide: true });

// STORAGE
q('sec_storage', ['bound_djinni'], 'checkmark', 1, 12, -4.5, 'Storage occult', 'Controller y wormholes', [
  'Sistema de almacenamiento dimensional. Complementa Sophisticated/AE2.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('storage_base', ['sec_storage'], 'occultism:storage_controller_base', 1, 14, -4.5, 'Storage Controller Base', 'Base del controller', [
  'Parte inferior/estructura del storage controller.',
], { hide: true });
q('storage_controller', ['storage_base'], 'occultism:storage_controller', 1, 16, -4.5, 'Storage Controller', 'Red occult', [
  'Corazon del storage Occultism. Enlaza estabilizadores y accesos.',
], { hide: true });
q('stab0', ['storage_controller'], 'occultism:storage_stabilizer_tier0', 2, 18, -4.5, 'Stabilizer T0', 'Primer boost', [
  'Aumenta capacidad/canales segun tier. Sube de T0 a T5 con el tiempo.',
], { hide: true });
q('stab1', ['stab0'], 'occultism:storage_stabilizer_tier1', 2, 20, -4.5, 'Stabilizer T1', 'Mas espacio', [
  'Siguiente tier de estabilizador.',
], { hide: true });
q('stab3', ['stab1'], 'occultism:storage_stabilizer_tier3', 1, 22, -4.5, 'Stabilizer T3', 'Mid storage', [
  'Buen objetivo mid. T4/T5 cuando ya vivas en occult storage.',
], { hide: true });
q('stab5', ['stab3'], 'occultism:storage_stabilizer_tier5', 1, 24, -4.5, 'Stabilizer T5', 'Top stabilizer', [
  'Tier maximo de stabilizer.',
], { hide: true });
q('storage_remote', ['storage_controller'], 'occultism:storage_remote', 1, 16, -6, 'Storage Remote', 'Acceso remoto', [
  'Mando del storage. Linkea al controller.',
], { hide: true });
q('wormhole_frame', ['dim_matrix'], 'occultism:wormhole_frame', 2, 24, 3, 'Wormhole Frame', 'Marco de portal', [
  'Base para wormholes estables.',
], { hide: true });
q('stable_wormhole', ['wormhole_frame', 'storage_controller'], 'occultism:stable_wormhole', 2, 26, 3, 'Stable Wormhole', 'Portal de items', [
  'Conecta inventarios/areas a distancia dentro del ecosistema occult.',
], { hide: true });

// CRYSTALS / GEMS / SOULS
q('sec_crystals', ['spirit_fire', 'chalk_gold'], 'checkmark', 1, 8, 5, 'Cristales y almas', 'Attunement', [
  'Gems/cristales attuned y soul gems para captura/utility.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('spirit_gem', ['sec_crystals'], 'occultism:spirit_attuned_gem', 4, 10, 5, 'Spirit Attuned Gem', 'Gema sintonizada', [
  'Componente mid de crafts espirituales.',
], { hide: true });
q('spirit_crystal', ['spirit_gem'], 'occultism:spirit_attuned_crystal', 2, 12, 5, 'Spirit Attuned Crystal', 'Cristal', [
  'Crystal attuned para maquinas/rituales.',
], { hide: true });
q('soul_gem', ['sec_crystals'], 'occultism:soul_gem', 1, 10, 6.5, 'Soul Gem', 'Captura almas', [
  'Captura entidades. Hay fragile variants para early.',
], { hide: true });
q('fragile_soul', ['sec_crystals'], 'occultism:fragile_soul_gem', 2, 8, 6.5, 'Fragile Soul Gem', 'Captura frágil', [
  'Version temprana/fragil del soul gem.',
], { hide: true });
q('lenses', ['spirit_gem'], 'occultism:lenses', 4, 12, 6.5, 'Lenses', 'Lentes', [
  'Craft component; infused lenses despues.',
], { hide: true });
q('infused_lenses', ['lenses'], 'occultism:infused_lenses', 2, 14, 6.5, 'Infused Lenses', 'Lentes imbuidas', [
  'Usadas en goggles y equipo de vision.',
], { hide: true });
q('familiar_ring', ['bound_djinni'], 'occultism:familiar_ring', 1, 18, -3, 'Familiar Ring', 'Familiar curio', [
  'Anillo para familiars. Curios slot friendly.',
], { hide: true });
q('satchel', ['bound_foliot'], 'occultism:satchel', 1, 14, 4.5, 'Satchel', 'Bolsa occult', [
  'Inventario extra tematico.',
], { hide: true });
q('ritual_satchel', ['satchel'], 'occultism:ritual_satchel_t1', 1, 14, 6, 'Ritual Satchel T1', 'Kit de ritual', [
  'Satchel de ritual. Hay T2 luego.',
], { hide: true });

// OTHERWORLD TREE
q('other_sapling', ['otherworld_goggles'], 'occultism:otherworld_sapling', 4, 2, -5.5, 'Otherworld Sapling', 'Arbol occult', [
  'Arbol del otherworld. Log/leaves para crafts y ambient.',
], { hide: true });
q('other_log', ['other_sapling'], 'occultism:otherworld_log', 16, 0, -5.5, 'Otherworld Log', 'Madera occult', [
  'Madera del otro lado.',
], { hide: true });

// FINALE
q('finale', ['miner_marid', 'iesnium_pick', 'call_transport', 'chalk_red'], 'checkmark', 1, 30, 0, 'Occultist Oasis', 'Occultism completo', [
  'Tienes circulo top, marid miner, iesnium y automatizacion con foliots.',
  'Usa la mineshaft como ingreso de ores y los calling books como helpers de base.',
  '&6Oasis:&r Occultism es paralelo: vuelve a Ars/Iron\'s/Malum o a Create cuando quieras.',
], { shape: 'hexagon', size: 2.0 });

console.log('Quest defs:', defs.length);

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const num = (n) => Number(n).toString();

let snbt = '{\n';
snbt += '\tdefault_hide_dependency_lines: false\n';
snbt += '\tdefault_quest_shape: ""\n';
snbt += '\tfilename: "occultism"\n';
snbt += `\tgroup: "${groupId}"\n`;
snbt += '\ticon: "occultism:dictionary_of_spirits"\n';
snbt += `\tid: "${chapterId}"\n`;
snbt += '\timages: [ ]\n';
snbt += '\torder_index: 3\n';
snbt += '\tquest_links: [ ]\n';
snbt += '\tquests: [\n';

for (const d of defs) {
  const qid = id(d.key);
  snbt += '\t\t{\n';
  if (d.deps.length === 1) snbt += `\t\t\tdependencies: ["${id(d.deps[0])}"]\n`;
  else if (d.deps.length > 1) {
    snbt += '\t\t\tdependencies: [\n';
    for (const dep of d.deps) snbt += `\t\t\t\t"${id(dep)}"\n`;
    snbt += '\t\t\t]\n';
  }
  if (d.hide) snbt += '\t\t\thide_dependency_lines: true\n';
  snbt += `\t\t\tid: "${qid}"\n`;
  if (d.item !== 'checkmark') {
    snbt += '\t\t\trewards: [\n';
    for (const n of [1, 2]) {
      snbt += '\t\t\t\t{\n';
      snbt += '\t\t\t\t\texclude_from_claim_all: true\n';
      snbt += `\t\t\t\t\tid: "${id(`rew${n}-${d.key}`)}"\n`;
      snbt += `\t\t\t\t\ttable_id: ${tableId}\n`;
      snbt += '\t\t\t\t\ttype: "random"\n';
      snbt += '\t\t\t\t}\n';
    }
    snbt += '\t\t\t]\n';
  }
  if (d.shape) snbt += `\t\t\tshape: "${d.shape}"\n`;
  if (d.size) snbt += `\t\t\tsize: ${num(d.size)}d\n`;
  const tid = id('task-' + d.key);
  if (d.item === 'checkmark') {
    snbt += '\t\t\ttasks: [{\n';
    snbt += `\t\t\t\tid: "${tid}"\n`;
    snbt += '\t\t\t\ttype: "checkmark"\n';
    snbt += '\t\t\t}]\n';
  } else {
    snbt += '\t\t\ttasks: [{\n';
    if (d.count > 1) snbt += `\t\t\t\tcount: ${d.count}L\n`;
    snbt += `\t\t\t\tid: "${tid}"\n`;
    snbt += `\t\t\t\titem: { count: 1, id: "${d.item}" }\n`;
    snbt += '\t\t\t\ttype: "item"\n';
    snbt += '\t\t\t}]\n';
  }
  snbt += `\t\t\tx: ${num(d.x)}d\n`;
  snbt += `\t\t\ty: ${num(d.y)}d\n`;
  snbt += '\t\t}\n';
}
snbt += '\t]\n}\n';
fs.writeFileSync(chapterPath, snbt, 'utf8');
console.log('Wrote', chapterPath);

const rewardTablePath = path.join(questsRoot, 'reward_tables/occultism.snbt');
const rewardTableId = crypto.createHash('md5').update('oasis-reward-occultism').digest('hex').toUpperCase().slice(0, 16);
if (!fs.existsSync(rewardTablePath)) {
  fs.writeFileSync(rewardTablePath, `{\n\tid: "${rewardTableId}"\n\tloot_size: 1\n\torder_index: 13\n\trewards: [{ id: "${id('rt-apple')}", item: { count: 1, id: "minecraft:apple" } }]\n}\n`, 'utf8');
}

let langLines = fs.readFileSync(langPath, 'utf8').split(/\r?\n/).filter((line) => {
  if (/^\s*[{}]\s*$/.test(line)) return false;
  if (line.includes(`chapter.${chapterId}.title:`)) return false;
  if (/quest\.[A-Fa-f0-9]{32}\./.test(line)) return false;
  return true;
});

let langAdd = `\tchapter.${chapterId}.title: "&8&lOccultism"\n`;
for (const d of defs) {
  const qid = id(d.key);
  langAdd += `\tquest.${qid}.title: "${esc(d.title)}"\n`;
  langAdd += `\tquest.${qid}.quest_subtitle: "${esc(d.subtitle)}"\n`;
  if (d.desc.length === 1) langAdd += `\tquest.${qid}.quest_desc: ["${esc(d.desc[0])}"]\n`;
  else {
    langAdd += `\tquest.${qid}.quest_desc: [\n`;
    for (const line of d.desc) langAdd += `\t\t"${esc(line)}"\n`;
    langAdd += '\t]\n';
  }
}

fs.writeFileSync(langPath, '{\n' + langLines.filter(Boolean).join('\n') + '\n' + langAdd + '}\n', 'utf8');
console.log('Updated lang');

for (const dest of [
  path.join(root, 'client/config/ftbquests/quests'),
  path.join(root, 'curseforge/overrides/config/ftbquests/quests'),
]) {
  fs.mkdirSync(path.join(dest, 'chapters'), { recursive: true });
  fs.mkdirSync(path.join(dest, 'reward_tables'), { recursive: true });
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/occultism.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
  if (fs.existsSync(rewardTablePath)) {
    fs.copyFileSync(rewardTablePath, path.join(dest, 'reward_tables/occultism.snbt'));
  }
}
console.log('Synced. DONE occultism quests=', defs.length);
