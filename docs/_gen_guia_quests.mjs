import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const questsRoot = path.join(root, 'server/config/ftbquests/quests');
const chapterPath = path.join(questsRoot, 'chapters/guia_oasis.snbt');
const langPath = path.join(questsRoot, 'lang/en_us.snbt');
const tableId = '7609742599870717842L';
const chapterId = '49D036EA72296C7E';
const groupId = '0D0421250714AD11';
const id = (key) => crypto.createHash('md5').update(`oasis-guia-${key}`).digest('hex').toUpperCase().slice(0, 16);

const defs = [];
const q = (key, deps, item, count, x, y, title, subtitle, desc, opts = {}) => {
  defs.push({ key, deps, item, count, x, y, title, subtitle, desc, ...opts });
};

q('intro', [], 'checkmark', 1, 0, 0, 'Bienvenido a Oasis', 'Cozy coop ≤5 jugadores', [
  'Oasis es un pack NeoForge 1.21.1 cozy: cocina, builds, magia paralela y tech Create→IE→AE2→Mek.',
  'Este capitulo es el mapa. Marca los checkmarks cuando entiendas cada ruta; no son gates duros.',
  '&6Oasis:&r JEI muestra recetas del pack (KubeJS). Polymorph ayuda con conflictos de comida.',
], { shape: 'gear', size: 2.0 });

q('house', ['intro'], 'checkmark', 1, 2, 0, 'Casa primero', 'Spawn comodo', [
  'Haz una base pequena, cama/hammock y un chest. Luego waystone.',
], { shape: 'hexagon', size: 1.25 });
q('waystone', ['house'], 'waystones:waystone', 1, 4, 0, 'Waystone', 'Hub de teletransporte', [
  'Coloca tu primer waystone en casa. Es QoL del servidor.',
]);
q('food', ['intro'], 'minecraft:bread', 16, 2, 2, 'Comida starter', 'No pases hambre', [
  'Bread vale early. En cuanto puedas, abre &6Cocina y BBQ&r (FD + grill + addons).',
]);
q('backpack', ['house'], 'sophisticatedbackpacks:backpack', 1, 4, -1.5, 'Backpack', 'Inventario portable', [
  'Mochila Sophisticated. Guia completa en &6Almacenamiento&r.',
], { hide: true });

q('sec_cozy', ['food'], 'checkmark', 1, 4, 2, 'Ruta Cozy', 'Cocina, builds, storage', [
  'Capitulos: Cocina y BBQ · Construccion Cozy · Almacenamiento.',
  'No bloquean la tech. Son el alma del pack.',
], { shape: 'hexagon', size: 1.5 });
q('cocina_tip', ['sec_cozy'], 'farmersdelight:cooking_pot', 1, 6, 2, 'Cocina y BBQ', 'Abre el capitulo', [
  'Cutting board, stove, grill, Brewin, MND, Create Food bridge.',
]);
q('build_tip', ['sec_cozy'], 'mcwroofs:oak_roof', 1, 6, 3.5, 'Construccion Cozy', 'Macaw y amigos', [
  'Techos, puertas, copycats, Handcrafted. Haz la base bonita.',
], { hide: true });
q('storage_tip', ['sec_cozy'], 'sophisticatedstorage:chest', 1, 6, 0.5, 'Almacenamiento', 'Chests smart', [
  'Backpacks + Sophisticated Storage antes de AE2.',
], { hide: true });

q('sec_tech', ['house'], 'checkmark', 1, 2, -3, 'Ruta Tech', 'Create → IE → AE2 → Mek', [
  'Cadena obligatoria del pack para late tech. Ver docs/TECH_PROGRESSION.md',
  'Create pide precision mechanism / electron tube para varios crafts IE.',
], { shape: 'hexagon', size: 1.5 });
q('create_tip', ['sec_tech'], 'create:wrench', 1, 4, -3, 'Create (Tech I)', 'Fabrica mecanica', [
  'Andesita → brass → precision. Guia profunda en el capitulo Create.',
]);
q('ie_tip', ['create_tip'], 'immersiveengineering:hammer', 1, 6, -3, 'Immersive (Tech II)', 'Acero y cables', [
  'Tras Create. Multiblocks y RF clasico.',
]);
q('ae2_tip', ['ie_tip'], 'ae2:certus_quartz_crystal', 8, 8, -3, 'AE2 (Tech III)', 'Red ME', [
  'Storage denso y autocraft. JEI para presses/processors del pack.',
]);
q('mek_tip', ['ae2_tip'], 'mekanism:alloy_atomic', 1, 10, -3, 'Mekanism (Tech IV)', 'Late tech', [
  'Quimica, digital miner, generadores. El techo tech de Oasis.',
]);

q('sec_magic', ['intro'], 'checkmark', 1, -2, 0, 'Ruta Magia', 'Paralela, no bloquea', [
  'Iron\'s Spells · Ars Nouveau · Occultism · Malum.',
  'Elige 1-2 lineas. Ninguna es requisito de Mek/AE2.',
], { shape: 'hexagon', size: 1.5 });
q('irons_tip', ['sec_magic'], 'irons_spellbooks:copper_spell_book', 1, -4, -1, "Iron's Spells", 'Combate magico', [
  'Libros, tintas, escuelas. Guia completa en Magia.',
]);
q('ars_tip', ['sec_magic'], 'ars_nouveau:novice_spell_book', 1, -4, 1, 'Ars Nouveau', 'Source y familiars', [
  'Hechizos modular + starbuncles. Automatizacion cozy.',
]);
q('occ_tip', ['sec_magic'], 'occultism:dictionary_of_spirits', 1, -4, 2.5, 'Occultism', 'Espiritu y miners', [
  'Circulos, foliots y dimensional mineshaft.',
], { hide: true });
q('malum_tip', ['sec_magic'], 'malum:crude_scythe', 1, -4, -2.5, 'Malum', 'Espiritus y scythe', [
  'Soulstone, altar y gear. IDs Malum 1.8 ya pulidos.',
], { hide: true });

q('sec_explore', ['waystone'], 'checkmark', 1, 4, -4.5, 'Ruta Exploracion', 'Mundo y bosses', [
  'Exploracion Oasis (brujulas) · Aether · Dragona (ojos + Cataclysm).',
], { shape: 'hexagon', size: 1.5 });
q('compass_tip', ['sec_explore'], 'naturescompass:naturescompass', 1, 6, -4.5, 'Brujulas', 'Biomas y estructuras', [
  'Nature\'s + Explorer\'s Compass. Terralith/BWG/YUNG te esperan.',
]);
q('aether_tip', ['sec_explore'], 'aether:holystone', 16, 6, -6, 'Aether', 'Islas del cielo', [
  'Portal glowstone+agua. Dungeons bronze→gold.',
], { hide: true });
q('dragon_tip', ['sec_explore'], 'endrem:old_eye', 1, 8, -4.5, 'Dragona', 'Hard content', [
  'End Remastered eyes + Ender Dragon + Cataclysm opcional.',
], { hide: true });

q('rules', ['intro'], 'checkmark', 1, 0, -3, 'Reglas cozy', 'Server etiquette', [
  '≤5 jugadores. No grief. Claims FTB Chunks. Pregunta antes de builds enormes junto a bases ajenas.',
  'Lag: evita farms idiotas; Create/Mek a escala razonable.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('jei', ['intro'], 'checkmark', 1, 0, 3, 'JEI y docs', 'Donde mirar', [
  'JEI = recetas reales del pack. Docs: TECH_PROGRESSION.md, QUESTS.md, INSTALL.md.',
], { hide: true });

q('finale', ['waystone', 'cocina_tip', 'create_tip', 'irons_tip', 'compass_tip'], 'checkmark', 1, 8, 0, 'Listo para Oasis', 'Elige tu arco', [
  'Tienes comida, tech, magia y exploracion senaladas.',
  'No hay orden unico: cozy first esta permitido. Cuando quieras poder industrial, sigue Create.',
  '&6Oasis:&r Buena suerte y que la parrilla te acompane.',
], { shape: 'hexagon', size: 2.0 });

console.log('Quest defs:', defs.length);
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const num = (n) => Number(n).toString();

let snbt = '{\n\tdefault_hide_dependency_lines: false\n\tdefault_quest_shape: ""\n\tfilename: "guia_oasis"\n';
snbt += `\tgroup: "${groupId}"\n\ticon: "minecraft:oak_sign"\n\tid: "${chapterId}"\n\timages: [ ]\n\torder_index: 0\n\tquest_links: [ ]\n\tquests: [\n`;
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

const oldIds = [
  '6E6CD259A84BB875','410879D6220D0573','7BC9DB8AF8981ADA','61C1C9D29FA6D11B','0289A799509AF964',
];
// strip any remaining old guia quest keys by scanning previous file ids - also common ones
const moreOld = ['1FEB1860CB1AAA43']; // if present from older guia

let langLines = fs.readFileSync(langPath, 'utf8').split(/\r?\n/).filter((line) => {
  if (/^\s*[{}]\s*$/.test(line)) return false;
  if (line.includes(`chapter.${chapterId}.title:`)) return false;
  if (/quest\.[A-Fa-f0-9]{32}\./.test(line)) return false;
  if ([...oldIds, ...moreOld].some((oid) => line.includes(`quest.${oid}.`))) return false;
  // drop any leftover guia-looking keys that match old short chapter by scanning titles? keep simple
  return true;
});

// Also remove ALL old guia quest lines by reading previous chapter ids if file existed - already replaced

let langAdd = `\tchapter.${chapterId}.title: "&a&lGuia Oasis"\n`;
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

for (const dest of [
  path.join(root, 'client/config/ftbquests/quests'),
  path.join(root, 'curseforge/overrides/config/ftbquests/quests'),
]) {
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/guia_oasis.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
}
console.log('DONE guia', defs.length);
