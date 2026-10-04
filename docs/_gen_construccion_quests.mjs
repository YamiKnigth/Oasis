import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const questsRoot = path.join(root, 'server/config/ftbquests/quests');
const chapterPath = path.join(questsRoot, 'chapters/construccion_cozy.snbt');
const langPath = path.join(questsRoot, 'lang/en_us.snbt');
const tableId = '8742791370470615894L';
const chapterId = '88851410E2E37DFF';
const groupId = '22F7FAA010DA678A';
const id = (key) => crypto.createHash('md5').update(`oasis-build-${key}`).digest('hex').toUpperCase().slice(0, 16);

const defs = [];
const q = (key, deps, item, count, x, y, title, subtitle, desc, opts = {}) => {
  defs.push({ key, deps, item, count, x, y, title, subtitle, desc, ...opts });
};

q('intro', [], 'checkmark', 1, 0, 0, 'Construccion Cozy', 'Casas bonitas, sin prisa', [
  'Macaw, Chipped, Copycats, Handcrafted y amigos: construye bases con estilo Oasis.',
  '&6Oasis:&r No gatea la tech. Usa Corail Woodcutter para no gastar troncos como loco.',
], { shape: 'gear', size: 2.0 });

q('woodcutter', ['intro'], 'corail_woodcutter:oak_woodcutter', 1, 2, 0, 'Oak Woodcutter', 'Sierra de madera', [
  'Corta troncos a planks/stairs/slabs con mejor yield. Haz uno por madera favorita.',
]);
q('rechiseled', ['woodcutter'], 'rechiseled:oak_planks_beams', 8, 4, 0, 'Rechiseled Beams', 'Detalle de planks', [
  'Cincela bloques con Rechiseled. Conecta patrones para fachadas limpias.',
]);
q('chipped_crate', ['woodcutter'], 'chipped:oak_crate', 4, 4, 1.5, 'Chipped Crate', 'Variantes Chipped', [
  'Chipped multiplica variantes de bloques vanilla. El crate es un buen primer taste.',
]);
q('copycat', ['rechiseled'], 'copycats:copycat_block', 8, 6, 0, 'Copycat Block', 'Camuflaje Create', [
  'Copia la textura de otro bloque. Esconde tuberias y cables con elegancia.',
]);
q('copycat_stairs', ['copycat'], 'copycats:copycat_stairs', 8, 8, 0, 'Copycat Stairs', 'Escaleras camufladas', [
  'Stairs copycat para techos y detalles sin romper el tema.',
], { hide: true });
q('copycat_slab', ['copycat'], 'copycats:copycat_slab', 8, 8, 1.5, 'Copycat Slab', 'Losas camufladas', [
  'Slabs copycat para capas finas.',
], { hide: true });

q('sec_macaw', ['woodcutter'], 'checkmark', 1, 2, -3, 'Macaw\'s', 'Puentes, techos, puertas...', [
  'La suite Macaw cubre casi todo el exterior. Empieza con oak; otras maderas van por variante nativa del mod.',
], { shape: 'hexagon', size: 1.5 });
q('bridge', ['sec_macaw'], 'mcwbridges:oak_log_bridge_middle', 8, 4, -3, 'Oak Bridge', 'Cruza el rio', [
  'Puentes Macaw. Combina middle + pier + stairs.',
]);
q('roof', ['sec_macaw'], 'mcwroofs:oak_roof', 16, 4, -4.5, 'Oak Roof', 'Tejado de verdad', [
  'Techos inclinados Macaw. Hay steep/attic/lower para perfiles complejos.',
]);
q('door', ['sec_macaw'], 'mcwdoors:oak_barn_door', 2, 6, -3, 'Oak Barn Door', 'Puerta con estilo', [
  'Puertas tematicas. Barn doors quedan genial en granjas cozy.',
]);
q('window', ['sec_macaw'], 'mcwwindows:oak_window', 4, 6, -4.5, 'Oak Window', 'Ventanas', [
  'Ventanas y persianas Macaw. Luz transparente sin vanilla panes aburridos.',
]);
q('fence', ['sec_macaw'], 'mcwfences:oak_picket_fence', 16, 2, -4.5, 'Oak Picket Fence', 'Cercado', [
  'Vallas decorativas. Delimita huertos y caminos.',
]);
q('path', ['sec_macaw'], 'mcwpaths:oak_planks_path', 16, 0, -3, 'Oak Planks Path', 'Senderos', [
  'Paths para no pisar farmland. Combina con stone pavings.',
], { hide: true });
q('light', ['sec_macaw'], 'mcwlights:bell_lantern', 4, 0, -4.5, 'Bell Lantern', 'Luz cozy', [
  'Faroles Macaw. Ilumina sin antorchas feas en la fachada.',
]);
q('mcw_chair', ['sec_macaw'], 'mcwfurnitures:oak_chair', 4, 6, -1.5, 'Macaw Chair', 'Mueble exterior/interior', [
  'Sillas y counters Macaw Furniture.',
]);
q('mcw_table', ['mcw_chair'], 'mcwfurnitures:oak_coffee_table', 2, 8, -1.5, 'Coffee Table', 'Mesita', [
  'Mesa baja para salas cozy.',
], { hide: true });
q('mcw_counter', ['mcw_chair'], 'mcwfurnitures:oak_counter', 4, 8, -3, 'Oak Counter', 'Encimera', [
  'Counters para cocina (junto al capitulo Cocina).',
], { hide: true });

q('sec_furniture', ['intro'], 'checkmark', 1, 2, 3, 'Mobiliario', 'Handcrafted / Another / Beautify', [
  'Interiores: sillas, sofás, estantes y persianas.',
], { shape: 'hexagon', size: 1.5 });
q('hc_chair', ['sec_furniture'], 'handcrafted:oak_chair', 4, 4, 3, 'Handcrafted Chair', 'Silla HC', [
  'Handcrafted aporta muebles warm. Buen set starter.',
]);
q('hc_couch', ['hc_chair'], 'handcrafted:oak_couch', 2, 6, 3, 'Handcrafted Couch', 'Sofa', [
  'Sofa para la sala de estar Oasis.',
]);
q('hc_desk', ['hc_chair'], 'handcrafted:oak_desk', 1, 6, 4.5, 'Handcrafted Desk', 'Escritorio', [
  'Desk para tu cuarto de mapas / quest book.',
], { hide: true });
q('hc_cupboard', ['hc_couch'], 'handcrafted:oak_cupboard', 2, 8, 3, 'Handcrafted Cupboard', 'Alacena', [
  'Almacenaje decorativo. No sustituye Sophisticated Storage.',
], { hide: true });
q('af_chair', ['sec_furniture'], 'another_furniture:oak_chair', 4, 4, 4.5, 'Another Furniture Chair', 'Silla AF', [
  'Another Furniture: linea limpia alternativa a Handcrafted.',
], { hide: true });
q('af_shelf', ['af_chair'], 'another_furniture:oak_shelf', 4, 4, 6, 'Oak Shelf', 'Estanteria', [
  'Estantes para decorar con items.',
], { hide: true });
q('af_drawer', ['af_shelf'], 'another_furniture:oak_drawer', 2, 6, 6, 'Oak Drawer', 'Cajonera', [
  'Drawer AF. Bonito y funcional early.',
], { hide: true });
q('blinds', ['sec_furniture'], 'beautify:oak_blinds', 4, 2, 4.5, 'Beautify Blinds', 'Persianas', [
  'Persianas Beautify. Control de luz con estilo.',
]);
q('trellis', ['blinds'], 'beautify:oak_trellis', 4, 2, 6, 'Oak Trellis', 'Enredaderas', [
  'Trellis para jardin vertical.',
], { hide: true });
q('picture', ['blinds'], 'beautify:oak_picture_frame', 2, 0, 4.5, 'Picture Frame', 'Cuadros', [
  'Marcos Beautify para personalizar paredes.',
], { hide: true });
q('bookstack', ['picture'], 'beautify:bookstack', 4, 0, 6, 'Bookstack', 'Libros decorativos', [
  'Stacks de libros. Biblioteca cozy garantizada.',
], { hide: true });

q('sec_comfort', ['intro'], 'checkmark', 1, -2, 0, 'Descanso', 'Hammocks y sleeping bags', [
  'Comforts: duerme sin cama vanilla si quieres. Hammocks = vibe campamento.',
], { shape: 'hexagon', size: 1.25 });
q('sleeping_bag', ['sec_comfort'], 'comforts:sleeping_bag_white', 1, -4, 0, 'Sleeping Bag', 'Siesta portable', [
  'Bolsa de dormir. Ideal exploracion (no pone spawn si el pack lo configura asi: mira tooltip).',
]);
q('hammock', ['sleeping_bag'], 'comforts:hammock_white', 1, -4, 1.5, 'Hammock', 'Hamaca', [
  'Hamaca entre dos puntos. Pure cozy.',
]);

q('sec_supp', ['woodcutter'], 'checkmark', 1, 8, 1.5, 'Supplementaries', 'Detalles utiles', [
  'Supplementaries mezcla decor y utilidad: jars, faucets, signs...',
], { shape: 'hexagon', size: 1.25 });
q('jar', ['sec_supp'], 'supplementaries:jar', 4, 10, 1.5, 'Jar', 'Tarro', [
  'Guarda items/mobs pequenos / cookies. Decor + utilidad.',
]);
q('faucet', ['jar'], 'supplementaries:faucet', 2, 12, 1.5, 'Faucet', 'Grifo', [
  'Extrae fluids de cauldrons/jars. Synergy cocina/tech early.',
], { hide: true });
q('urn', ['sec_supp'], 'supplementaries:urn', 4, 10, 3, 'Urn', 'Urna', [
  'Decoracion archeology-ish. Rellena con loot si quieres Easter eggs.',
], { hide: true });

q('finale', ['roof', 'door', 'hc_couch', 'copycat', 'hammock'], 'checkmark', 1, 10, 0, 'Arquitecto Oasis', 'Base con alma', [
  'Tienes techos, puertas, muebles, copycats y un sitio donde dormir con estilo.',
  'Siguiente: llena la casa en Almacenamiento y ponle comida del capitulo Cocina.',
], { shape: 'hexagon', size: 2.0 });

console.log('Quest defs:', defs.length);
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const num = (n) => Number(n).toString();

let snbt = '{\n\tdefault_hide_dependency_lines: false\n\tdefault_quest_shape: ""\n\tfilename: "construccion_cozy"\n';
snbt += `\tgroup: "${groupId}"\n\ticon: "mcwroofs:oak_roof"\n\tid: "${chapterId}"\n\timages: [ ]\n\torder_index: 2\n\tquest_links: [ ]\n\tquests: [\n`;
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

const rewardTablePath = path.join(questsRoot, 'reward_tables/construccion_cozy.snbt');
if (!fs.existsSync(rewardTablePath)) {
  fs.writeFileSync(rewardTablePath, `{\n\tid: "${id('reward-table')}"\n\tloot_size: 1\n\torder_index: 14\n\trewards: [{ id: "${id('rt-apple')}", item: { count: 1, id: "minecraft:apple" } }]\n}\n`, 'utf8');
}

const stripIds = new Set([
  ...defs.map((d) => id(d.key)),
  id('sec_every'), // removed quest (Every Compat)
  id('rew1-sec_every'),
  id('rew2-sec_every'),
  id('task-sec_every'),
]);
const rawLang = fs.readFileSync(langPath, 'utf8').split(/\r?\n/);
const langLines = [];
let skipDesc = false;
for (const line of rawLang) {
  if (/^\s*[{}]\s*$/.test(line)) continue;
  if (line.includes(`chapter.${chapterId}.title:`)) continue;
  if (/quest\.[A-Fa-f0-9]{32}\./.test(line)) continue;
  const qm = line.match(/^\tquest\.([A-Fa-f0-9]{16})\.(title|quest_subtitle|quest_desc):/);
  if (qm && stripIds.has(qm[1])) {
    if (line.includes('quest_desc: [') && !line.includes(']')) skipDesc = true;
    continue;
  }
  if (skipDesc) {
    if (/^\t\]/.test(line)) skipDesc = false;
    continue;
  }
  langLines.push(line);
}
let langAdd = `\tchapter.${chapterId}.title: "&e&lConstruccion Cozy"\n`;
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

for (const dest of [path.join(root, 'client/config/ftbquests/quests'), path.join(root, 'curseforge/overrides/config/ftbquests/quests')]) {
  fs.mkdirSync(path.join(dest, 'chapters'), { recursive: true });
  fs.mkdirSync(path.join(dest, 'reward_tables'), { recursive: true });
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/construccion_cozy.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
  if (fs.existsSync(rewardTablePath)) fs.copyFileSync(rewardTablePath, path.join(dest, 'reward_tables/construccion_cozy.snbt'));
}
console.log('DONE construccion', defs.length);
