import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const questsRoot = path.join(root, 'server/config/ftbquests/quests');
const langPath = path.join(questsRoot, 'lang/en_us.snbt');

const writeChapter = ({ filename, chapterId, groupId, tableId, orderIndex, icon, titleColor, title, prefix, defs, oldIds = [] }) => {
  const id = (key) => crypto.createHash('md5').update(`${prefix}-${key}`).digest('hex').toUpperCase().slice(0, 16);
  const chapterPath = path.join(questsRoot, `chapters/${filename}.snbt`);
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const num = (n) => Number(n).toString();

  let snbt = '{\n\tdefault_hide_dependency_lines: false\n\tdefault_quest_shape: ""\n';
  snbt += `\tfilename: "${filename}"\n\tgroup: "${groupId}"\n\ticon: "${icon}"\n\tid: "${chapterId}"\n`;
  snbt += `\timages: [ ]\n\torder_index: ${orderIndex}\n\tquest_links: [ ]\n\tquests: [\n`;
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
        snbt += `\t\t\t\t{\n\t\t\t\t\texclude_from_claim_all: true\n\t\t\t\t\tid: "${id(`rew${n}-${d.key}`)}"\n\t\t\t\t\ttable_id: ${tableId}\n\t\t\t\t\ttype: "random"\n\t\t\t\t}\n`;
      }
      snbt += '\t\t\t]\n';
    }
    if (d.shape) snbt += `\t\t\tshape: "${d.shape}"\n`;
    if (d.size) snbt += `\t\t\tsize: ${num(d.size)}d\n`;
    const tid = id('task-' + d.key);
    if (d.item === 'checkmark') snbt += `\t\t\ttasks: [{\n\t\t\t\tid: "${tid}"\n\t\t\t\ttype: "checkmark"\n\t\t\t}]\n`;
    else {
      snbt += '\t\t\ttasks: [{\n';
      if (d.count > 1) snbt += `\t\t\t\tcount: ${d.count}L\n`;
      snbt += `\t\t\t\tid: "${tid}"\n\t\t\t\titem: { count: 1, id: "${d.item}" }\n\t\t\t\ttype: "item"\n\t\t\t}]\n`;
    }
    snbt += `\t\t\tx: ${num(d.x)}d\n\t\t\ty: ${num(d.y)}d\n\t\t}\n`;
  }
  snbt += '\t]\n}\n';
  fs.writeFileSync(chapterPath, snbt, 'utf8');

  const rewardTablePath = path.join(questsRoot, `reward_tables/${filename}.snbt`);
  if (!fs.existsSync(rewardTablePath)) {
    fs.writeFileSync(rewardTablePath, `{\n\tid: "${id('reward-table')}"\n\tloot_size: 1\n\torder_index: ${20 + orderIndex}\n\trewards: [{ id: "${id('rt-apple')}", item: { count: 1, id: "minecraft:apple" } }]\n}\n`, 'utf8');
  }

  // lang accumulate via global
  return { id, defs, chapterId, titleColor, title, chapterPath, rewardTablePath, oldIds, filename };
};

const qlist = (arr, fn) => { const defs = []; const q = (...a) => { fn(defs, ...a); }; return { defs, q }; };
const add = (defs, key, deps, item, count, x, y, title, subtitle, desc, opts = {}) => {
  defs.push({ key, deps, item, count, x, y, title, subtitle, desc, ...opts });
};

// ========== EXPLORACION ==========
{
  const defs = [];
  const q = (k, d, i, c, x, y, t, s, desc, o) => add(defs, k, d, i, c, x, y, t, s, desc, o);
  q('intro', [], 'checkmark', 1, 0, 0, 'Exploracion Oasis', 'Biomas, estructuras y fotos', [
    'Terralith / Biomes We\'ve Gone / YUNG / Naturalist: el overworld es el contenido.',
    '&6Oasis:&r Lleva comida del capitulo Cocina, una mochila y Waystones. Aether y Dragona son arcos aparte.',
  ], { shape: 'gear', size: 2.0 });
  q('natures', ['intro'], 'naturescompass:naturescompass', 1, 2, 0, "Nature's Compass", 'Busca biomas', [
    'Senala el bioma que elijas. Imprescindible con Terralith/BWG.',
  ]);
  q('explorers', ['intro'], 'explorerscompass:explorerscompass', 1, 2, 1.5, "Explorer's Compass", 'Busca estructuras', [
    'Encuentra estructuras (caves temples, etc.). Combina con YUNG Better series.',
  ]);
  q('waystone', ['intro'], 'waystones:waystone', 1, 2, -1.5, 'Waystone', 'TP de base', [
    'Coloca waystones en hubs. El warp stone es tu teletransporte personal.',
  ]);
  q('warp_stone', ['waystone'], 'waystones:warp_stone', 1, 4, -1.5, 'Warp Stone', 'TP a waystones', [
    'Teletransportate a waystones activados. Gestiona cooldowns.',
  ]);
  q('camera', ['intro'], 'exposure:camera', 1, 0, 2, 'Camera', 'Fotos de viaje', [
    'Exposure: documenta biomas y builds. Pure cozy content.',
  ], { hide: true });
  q('venison', ['intro'], 'naturalist:cooked_venison', 8, 0, -2, 'Cooked Venison', 'Fauna Naturalist', [
    'Naturalist anade animales. Caza/cocina venison en tus rutas.',
  ], { hide: true });
  q('lootr', ['explorers'], 'lootr:trophy', 1, 4, 1.5, 'Lootr Trophy', 'Loot por jugador', [
    'Los chests Lootr son por-jugador. Explora sin pelearte por loot con el equipo.',
  ], { hide: true });
  q('sword', ['intro'], 'simplyswords:iron_longsword', 1, -2, 0, 'Iron Longsword', 'Simply Swords', [
    'Simply Swords: mas opciones de melee para rutas peligrosas.',
  ], { hide: true });
  q('sec_tips', ['natures', 'explorers'], 'checkmark', 1, 6, 0, 'Rutas recomendadas', 'Como explorar en Oasis', [
    '1) Casa + waystone 2) Nature/Explorer compass 3) Comida FD/BBQ 4) Backpack 5) Aether cuando quieras cielo.',
    'YUNG Better Caves/Dungeons cambian el underground: ve preparado.',
  ], { shape: 'hexagon', size: 1.5 });
  q('torch', ['sec_tips'], 'minecraft:torch', 64, 8, 0, 'Antorchas', 'Ilumina rutas', [
    'Stock de luces. O usa Macaw Lights si vas aesthetic.',
  ], { hide: true });
  q('map', ['sec_tips'], 'minecraft:map', 4, 8, 1.5, 'Mapa', 'Cartografia', [
    'Mapas vanilla + brujulas del pack. Marca biomas raros.',
  ], { hide: true });
  q('boat', ['sec_tips'], 'minecraft:oak_boat', 1, 8, -1.5, 'Barco', 'Costas y rios', [
    'Terralith tiene costas savias: un barco ayuda.',
  ], { hide: true });
  q('finale', ['natures', 'explorers', 'waystone'], 'checkmark', 1, 6, -2, 'Explorador Oasis', 'Listo para el mundo', [
    'Tienes brujulas y waystones. Siguiente: Aether en el cielo o Dragona cuando juntes ojos.',
  ], { shape: 'hexagon', size: 2.0 });

  globalThis.__explore = writeChapter({
    filename: 'exploracion_oasis', chapterId: '9EFBBC32CAB947A6', groupId: '6441F8F3D6741F60',
    tableId: '2585968095554153317L', orderIndex: 2, icon: 'naturescompass:naturescompass',
    titleColor: '&2&l', title: 'Exploracion Oasis', prefix: 'oasis-explore', defs,
  });
  console.log('exploracion', defs.length);
}

// ========== AETHER ==========
{
  const defs = [];
  const q = (k, d, i, c, x, y, t, s, desc, o) => add(defs, k, d, i, c, x, y, t, s, desc, o);
  q('intro', [], 'checkmark', 1, 0, 0, 'The Aether', 'Cielo, dungeons y gravitite', [
    'Dimension clasica de islas flotantes. Portal con glowstone + water bucket.',
    '&6Oasis:&r Paralelo a la tech. Lleva parachute y comida; caerte duele igual.',
  ], { shape: 'gear', size: 2.0 });
  q('portal_mats', ['intro'], 'minecraft:glowstone', 14, 2, 0, 'Glowstone', 'Marco del portal', [
    '14 glowstone para el marco (como obsidiana del Nether).',
  ]);
  q('water', ['portal_mats'], 'minecraft:water_bucket', 1, 4, 0, 'Water Bucket', 'Activa el portal', [
    'Click con agua en el marco de glowstone para abrir el Aether portal.',
  ]);
  q('holystone', ['water'], 'aether:holystone', 32, 6, 0, 'Holystone', 'Piedra del cielo', [
    'Bloque base del Aether. Pico holystone early.',
  ]);
  q('holystone_pick', ['holystone'], 'aether:holystone_pickaxe', 1, 8, 0, 'Holystone Pickaxe', 'Pico early', [
    'Tu primer pico aetheriano.',
  ]);
  q('skyroot', ['holystone'], 'aether:skyroot_log', 16, 6, 1.5, 'Skyroot Log', 'Madera del cielo', [
    'Madera skyroot. Tools skyroot tienen rare drops quirks: mira JEI/tooltip.',
  ]);
  q('ambrosium', ['holystone'], 'aether:ambrosium_shard', 16, 6, -1.5, 'Ambrosium Shard', 'Fuel / enchant fuel', [
    'Combustible y material. Torches de ambrosium iluminan el cielo.',
  ]);
  q('ambrosium_torch', ['ambrosium'], 'aether:ambrosium_torch', 8, 8, -1.5, 'Ambrosium Torch', 'Luz aether', [
    'Ilumina islas sin vanilla torches.',
  ], { hide: true });
  q('zanite', ['holystone_pick'], 'aether:zanite_gemstone', 8, 10, 0, 'Zanite Gemstone', 'Gem mid', [
    'Mineral mid del Aether. Tools zanite ganan poder al perder durabilidad.',
  ]);
  q('gravitite', ['zanite'], 'aether:gravitite_ore', 4, 12, 0, 'Gravitite Ore', 'Mineral flotante', [
    'Enchanting con ambrosium convierte ore en enchanted gravitite (flujo clasico).',
  ]);
  q('parachute', ['skyroot'], 'aether:cold_parachute', 2, 8, 1.5, 'Cold Parachute', 'No te estrelles', [
    'Obligatorio. Caer al void/overworld sin parachute duele.',
  ]);
  q('dart', ['skyroot'], 'aether:golden_dart', 16, 8, 3, 'Golden Dart', 'Municion aether', [
    'Darts para shooters aetherianos.',
  ], { hide: true });
  q('sec_dungeons', ['zanite', 'parachute'], 'checkmark', 1, 10, 2, 'Dungeons del Aether', 'Bronze -> Gold', [
    'Tres llaves / dungeons. Ve con comida, parachutes y paciencia.',
  ], { shape: 'hexagon', size: 1.5 });
  q('bronze', ['sec_dungeons'], 'aether:bronze_dungeon_key', 1, 12, 2, 'Bronze Dungeon Key', 'Primer dungeon', [
    'Bronze dungeon: entrada al loop de bosses aether.',
  ]);
  q('silver', ['bronze'], 'aether:silver_dungeon_key', 1, 14, 2, 'Silver Dungeon Key', 'Dungeon media', [
    'Silver: sube la dificultad y el loot.',
  ]);
  q('gold', ['silver'], 'aether:gold_dungeon_key', 1, 16, 2, 'Gold Dungeon Key', 'Dungeon alta', [
    'Gold dungeon: tipico gate a loot valkyrie-tier.',
  ]);
  q('valkyrie', ['gold'], 'aether:valkyrie_lance', 1, 18, 2, 'Valkyrie Lance', 'Arma icónica', [
    'Lance valkyrie: alcance y estilo. Uno de los trophies del Aether.',
  ]);
  q('phoenix', ['gold'], 'aether:phoenix_bow', 1, 18, 3.5, 'Phoenix Bow', 'Arco igneo', [
    'Bow phoenix del loot alto.',
  ], { hide: true });
  q('neptune', ['silver'], 'aether:neptune_helmet', 1, 14, 3.5, 'Neptune Helmet', 'Set acuatico', [
    'Pieza neptune: empieza el set acuatico/aether.',
  ], { hide: true });
  q('finale', ['valkyrie', 'gravitite', 'parachute'], 'checkmark', 1, 16, 0, 'Heroe del cielo', 'Aether listo', [
    'Portal, minerales, parachute y dungeon gold/valkyrie.',
    '&6Oasis:&r Vuelve al overworld con loot; Dragona sigue siendo el hard boss gate aparte.',
  ], { shape: 'hexagon', size: 2.0 });

  globalThis.__aether = writeChapter({
    filename: 'aether', chapterId: '1B38902EF405942D', groupId: '6441F8F3D6741F60',
    tableId: '2585968095554153317L', orderIndex: 0, icon: 'aether:aether_portal_frame',
    titleColor: '&2&l', title: 'The Aether', prefix: 'oasis-aether', defs,
    oldIds: ['7C9E140317EBFF0D','746DE420FBE89254','2D697FA9C8B44085','4B87F86B444871F2','3B851C1C5AF8C3C3','1D649DD59E87EB95'],
  });
  console.log('aether', defs.length);
}

// ========== DRAGONA ==========
{
  const defs = [];
  const q = (k, d, i, c, x, y, t, s, desc, o) => add(defs, k, d, i, c, x, y, t, s, desc, o);
  q('intro', [], 'checkmark', 1, 0, 0, 'Dragona', 'Ojos, End y Cataclysm', [
    'End Remastered cambia los ojos del portal. Reune ojos, abre el End, derrota a la dragona.',
    '&6Oasis:&r Contenido hard. Cataclysm bosses son opcionales post/paralelo a la dragona.',
  ], { shape: 'gear', size: 2.0 });

  const eyes = [
    ['old_eye', 'Old Eye', 'Ojo antiguo'],
    ['nether_eye', 'Nether Eye', 'Ojo del Nether'],
    ['corrupted_eye', 'Corrupted Eye', 'Ojo corrupto'],
    ['magical_eye', 'Magical Eye', 'Ojo magico'],
    ['black_eye', 'Black Eye', 'Ojo negro'],
    ['witch_eye', 'Witch Eye', 'Ojo de bruja'],
    ['undead_eye', 'Undead Eye', 'Ojo undead'],
    ['cold_eye', 'Cold Eye', 'Ojo frio'],
    ['lost_eye', 'Lost Eye', 'Ojo perdido'],
    ['guardian_eye', 'Guardian Eye', 'Ojo guardian'],
    ['exotic_eye', 'Exotic Eye', 'Ojo exotico'],
    ['cryptic_eye', 'Cryptic Eye', 'Ojo criptico'],
    ['cursed_eye', 'Cursed Eye', 'Ojo maldito'],
    ['evil_eye', 'Evil Eye', 'Ojo maligno'],
    ['rogue_eye', 'Rogue Eye', 'Ojo rogue'],
    ['wither_eye', 'Wither Eye', 'Ojo wither'],
  ];
  q('sec_eyes', ['intro'], 'checkmark', 1, 2, 0, 'Ojos del End', 'End Remastered', [
    'Cada ojo tiene su fuente (estructuras, bosses, crafts). JEI + exploracion.',
    'No hace falta TODOS para divertirte, pero el portal pide el set del pack.',
  ], { shape: 'hexagon', size: 1.5 });
  eyes.forEach((e, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    q(e[0], ['sec_eyes'], `endrem:${e[0]}`, 1, 4 + col * 2, -1.5 + row * 1.5, e[1], e[2], [
      `Consigue ${e[1]}. Revisa JEI / structures para su origen.`,
    ], { hide: i >= 4 });
  });

  q('eyes_ready', ['old_eye', 'nether_eye', 'corrupted_eye', 'magical_eye'], 'checkmark', 1, 4, 6, 'Portal listo', 'Suficientes ojos clave', [
    'Con un set de ojos puedes apuntar al stronghold. Sigue cazando el resto si quieres completionist.',
  ], { shape: 'hexagon', size: 1.5 });
  q('ender_eye', ['eyes_ready'], 'minecraft:ender_eye', 12, 6, 6, 'Ender Eye', 'Apunta al stronghold', [
    'Aunque End Remastered cambia ojos del marco, sigue usando ender eyes para localizar el portal room.',
  ]);
  q('dragon_egg', ['ender_eye'], 'minecraft:dragon_egg', 1, 8, 6, 'Dragon Egg', 'Victoria', [
    'Derrota a la Ender Dragon y toma el huevo. Enhorabuena.',
  ], { shape: 'gear', size: 1.5 });
  q('dragon_head', ['dragon_egg'], 'minecraft:dragon_head', 1, 10, 6, 'Dragon Head', 'Trofeo', [
    'Cabeza de dragona / trofeo de end ship. Decora tu hall of fame.',
  ], { hide: true });

  q('sec_cata', ['intro'], 'checkmark', 1, 0, 3, 'Cataclysm', 'Bosses opcionales', [
    'Cataclysm anade bosses y gear pesado. No bloquea la dragona, pero es el hard content del pack.',
  ], { shape: 'hexagon', size: 1.5 });
  q('mech_eye', ['sec_cata'], 'cataclysm:mech_eye', 1, -2, 3, 'Mech Eye', 'Boss mech', [
    'Ojo/acceso a contenido mechanizado Cataclysm.',
  ]);
  q('monstrous', ['sec_cata'], 'cataclysm:monstrous_eye', 1, -2, 4.5, 'Monstrous Eye', 'Boss monstrous', [
    'Invoca/accede al challenge monstrous.',
  ], { hide: true });
  q('void_eye', ['sec_cata'], 'cataclysm:void_eye', 1, -2, 6, 'Void Eye', 'Boss void', [
    'Contenido void Cataclysm.',
  ], { hide: true });
  q('cursed_cata', ['sec_cata'], 'cataclysm:cursed_eye', 1, 0, 4.5, 'Cursed Eye (Cata)', 'Boss cursed', [
    'Ojo cursed de Cataclysm (distinto a End Remastered).',
  ], { hide: true });
  q('burning', ['mech_eye'], 'cataclysm:burning_ashes', 4, -4, 3, 'Burning Ashes', 'Restos igneos', [
    'Material de bosses igneos.',
  ], { hide: true });
  q('ignitium', ['burning'], 'cataclysm:ignitium_ingot', 4, -4, 4.5, 'Ignitium Ingot', 'Metal Cataclysm', [
    'Ingote late de Cataclysm. Armor y armas top.',
  ]);
  q('gauntlet', ['ignitium'], 'cataclysm:gauntlet_of_guard', 1, -4, 6, 'Gauntlet of Guard', 'Guantelete', [
    'Arma/curio de boss. Uno de varios gauntlets.',
  ], { hide: true });
  q('bulwark', ['ignitium'], 'cataclysm:bulwark_of_the_flame', 1, -6, 4.5, 'Bulwark of the Flame', 'Escudo igneo', [
    'Defensa icónica Cataclysm.',
  ], { hide: true });
  q('infernal', ['ignitium'], 'cataclysm:infernal_forge', 1, -6, 6, 'Infernal Forge', 'Martillo', [
    'Forge/arma infernal del loot pool.',
  ], { hide: true });
  q('finale', ['dragon_egg', 'ignitium'], 'checkmark', 1, 8, 4, 'Slayer Oasis', 'Dragona + Cataclysm', [
    'Huevo de dragona y metal ignitium: el hard content no te asusta.',
    '&6Oasis:&r Vuelve a construir cozy. La tech y la magia siguen ahi cuando quieras.',
  ], { shape: 'hexagon', size: 2.0 });

  globalThis.__dragona = writeChapter({
    filename: 'dragona', chapterId: '2B4D0BB6F0033714', groupId: '6441F8F3D6741F60',
    tableId: '5799463050182753642L', orderIndex: 1, icon: 'minecraft:dragon_egg',
    titleColor: '&c&l', title: 'Dragona', prefix: 'oasis-dragona', defs,
    oldIds: ['6DA2EB3C61DEA472','065D844BF693A662','1B07021112067C3F','1E126DF9E632A280','0A5AC12E3D58FB60','758615AB4172C2DC','4D92E5E0E77883C5'],
  });
  console.log('dragona', defs.length);
}

// LANG + SYNC
let langLines = fs.readFileSync(langPath, 'utf8').split(/\r?\n/).filter((line) => {
  if (/^\s*[{}]\s*$/.test(line)) return false;
  if (/quest\.[A-Fa-f0-9]{32}\./.test(line)) return false;
  return true;
});

const chapters = [globalThis.__explore, globalThis.__aether, globalThis.__dragona];
for (const ch of chapters) {
  langLines = langLines.filter((line) => {
    if (line.includes(`chapter.${ch.chapterId}.title:`)) return false;
    return !ch.oldIds.some((oid) => line.includes(`quest.${oid}.`));
  });
}

let langAdd = '';
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
for (const ch of chapters) {
  langAdd += `\tchapter.${ch.chapterId}.title: "${ch.titleColor}${ch.title}"\n`;
  for (const d of ch.defs) {
    const qid = ch.id(d.key);
    langAdd += `\tquest.${qid}.title: "${esc(d.title)}"\n`;
    langAdd += `\tquest.${qid}.quest_subtitle: "${esc(d.subtitle)}"\n`;
    if (d.desc.length === 1) langAdd += `\tquest.${qid}.quest_desc: ["${esc(d.desc[0])}"]\n`;
    else {
      langAdd += `\tquest.${qid}.quest_desc: [\n`;
      for (const line of d.desc) langAdd += `\t\t"${esc(line)}"\n`;
      langAdd += '\t]\n';
    }
  }
}
fs.writeFileSync(langPath, '{\n' + langLines.filter(Boolean).join('\n') + '\n' + langAdd + '}\n', 'utf8');

for (const dest of [
  path.join(root, 'client/config/ftbquests/quests'),
  path.join(root, 'curseforge/overrides/config/ftbquests/quests'),
]) {
  fs.mkdirSync(path.join(dest, 'chapters'), { recursive: true });
  fs.mkdirSync(path.join(dest, 'reward_tables'), { recursive: true });
  for (const ch of chapters) {
    fs.copyFileSync(ch.chapterPath, path.join(dest, `chapters/${ch.filename}.snbt`));
    if (fs.existsSync(ch.rewardTablePath)) fs.copyFileSync(ch.rewardTablePath, path.join(dest, `reward_tables/${ch.filename}.snbt`));
  }
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
}
console.log('Synced explore+aether+dragona');
