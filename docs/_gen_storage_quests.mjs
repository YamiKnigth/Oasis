import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const questsRoot = path.join(root, 'server/config/ftbquests/quests');
const chapterPath = path.join(questsRoot, 'chapters/storage_oasis.snbt');
const langPath = path.join(questsRoot, 'lang/en_us.snbt');
const tableId = '8742791370470615894L';
const chapterId = '7BE74CAA17E3329E';
const groupId = '22F7FAA010DA678A';
const id = (key) => crypto.createHash('md5').update(`oasis-storage-${key}`).digest('hex').toUpperCase().slice(0, 16);

const defs = [];
const q = (key, deps, item, count, x, y, title, subtitle, desc, opts = {}) => {
  defs.push({ key, deps, item, count, x, y, title, subtitle, desc, ...opts });
};

q('intro', [], 'checkmark', 1, 0, 0, 'Almacenamiento', 'Mochilas y cofres smart', [
  'Sophisticated Backpacks + Storage: inventarios que crecen contigo.',
  '&6Oasis:&r Esto es mid-storage cozy. AE2/Occultism storage llegan luego si quieres redes enormes.',
], { shape: 'gear', size: 2.0 });

q('backpack', ['intro'], 'sophisticatedbackpacks:backpack', 1, 2, 0, 'Backpack', 'Mochila base', [
  'Tu primer inventario portable. Abre GUI y mete upgrades.',
]);
q('upgrade_base', ['backpack'], 'sophisticatedbackpacks:upgrade_base', 4, 4, 0, 'Upgrade Base', 'Base de upgrades', [
  'Craft component de casi todos los upgrades de mochila.',
]);
q('pickup', ['upgrade_base'], 'sophisticatedbackpacks:pickup_upgrade', 1, 6, 0, 'Pickup Upgrade', 'Auto-pickup', [
  'Recoge items al suelo. QoL esencial de exploracion.',
]);
q('filter', ['upgrade_base'], 'sophisticatedbackpacks:filter_upgrade', 1, 6, 1.5, 'Filter Upgrade', 'Filtros', [
  'Whitelist/blacklist que entra a la mochila.',
], { hide: true });
q('magnet', ['pickup'], 'sophisticatedbackpacks:magnet_upgrade', 1, 8, 0, 'Magnet Upgrade', 'Iman', [
  'Atrae items. Combina con pickup.',
]);
q('crafting', ['upgrade_base'], 'sophisticatedbackpacks:crafting_upgrade', 1, 6, -1.5, 'Crafting Upgrade', 'Mesa en mochila', [
  'Craftea sin bajar inventario. Perfecto en cuevas.',
]);
q('feeding', ['crafting'], 'sophisticatedbackpacks:feeding_upgrade', 1, 8, -1.5, 'Feeding Upgrade', 'Come solo', [
  'Auto-feed comida. Synergy total con Cocina BBQ.',
], { hide: true });
q('compacting', ['filter'], 'sophisticatedbackpacks:compacting_upgrade', 1, 8, 1.5, 'Compacting Upgrade', 'Compacta stacks', [
  'Compacta items (nuggets/ingots/blocks segun recetas).',
], { hide: true });
q('void_up', ['filter'], 'sophisticatedbackpacks:void_upgrade', 1, 8, 3, 'Void Upgrade', 'Basura out', [
  'Destruye items filtrados. Cuidado con la config.',
], { hide: true });
q('deposit', ['upgrade_base'], 'sophisticatedbackpacks:deposit_upgrade', 1, 6, 3, 'Deposit Upgrade', 'Vacia a chests', [
  'Deposita contenido en inventarios cercanos.',
], { hide: true });
q('restock', ['deposit'], 'sophisticatedbackpacks:restock_upgrade', 1, 8, 4.5, 'Restock Upgrade', 'Rellena desde chests', [
  'Reabastece desde storage. Gran duo con deposit.',
], { hide: true });
q('stack1', ['compacting'], 'sophisticatedbackpacks:stack_upgrade_tier_1', 1, 10, 1.5, 'Stack Upgrade T1', 'Mas stacks', [
  'Aumenta el tamaño de stack en la mochila.',
], { hide: true });
q('tool_swap', ['crafting'], 'sophisticatedbackpacks:tool_swapper_upgrade', 1, 8, -3, 'Tool Swapper', 'Cambia tools', [
  'Swap de herramientas segun bloque. Minero feliz.',
], { hide: true });

q('sec_tiers', ['backpack'], 'checkmark', 1, 2, -3, 'Tiers de mochila', 'Copper -> Netherite', [
  'Sube el tier de la mochila para mas slots y upgrades.',
], { shape: 'hexagon', size: 1.5 });
q('copper_bp', ['sec_tiers'], 'sophisticatedbackpacks:copper_backpack', 1, 4, -3, 'Copper Backpack', 'Tier cobre', [
  'Primer upgrade de capacidad.',
]);
q('iron_bp', ['copper_bp'], 'sophisticatedbackpacks:iron_backpack', 1, 6, -3, 'Iron Backpack', 'Tier hierro', [
  'Buen mid early. Suficiente para exploracion seria.',
]);
q('gold_bp', ['iron_bp'], 'sophisticatedbackpacks:gold_backpack', 1, 8, -3, 'Gold Backpack', 'Tier oro', [
  'Mas slots / upgrades. Objetivo comodo pre-diamante.',
]);
q('diamond_bp', ['gold_bp'], 'sophisticatedbackpacks:diamond_backpack', 1, 10, -3, 'Diamond Backpack', 'Tier diamante', [
  'Mochila alta. Ya puedes vivir en la cueva.',
]);
q('netherite_bp', ['diamond_bp'], 'sophisticatedbackpacks:netherite_backpack', 1, 12, -3, 'Netherite Backpack', 'Tier top', [
  'Mochila final. Fireproof vibes.',
]);

q('sec_storage', ['intro'], 'checkmark', 1, 2, 3, 'Sophisticated Storage', 'Chests que escalan', [
  'Chests/barrels upgradables en sitio. Controller + links = red casera.',
], { shape: 'hexagon', size: 1.5 });
q('chest', ['sec_storage'], 'sophisticatedstorage:chest', 2, 4, 3, 'Storage Chest', 'Cofre smart', [
  'Cofre Sophisticated. Upgradalo con tier upgrades.',
]);
q('barrel', ['chest'], 'sophisticatedstorage:barrel', 2, 4, 4.5, 'Storage Barrel', 'Barril smart', [
  'Barrel version. Ideal granjas y bulk.',
]);
q('tier_up', ['chest'], 'sophisticatedstorage:basic_tier_upgrade', 4, 6, 3, 'Basic Tier Upgrade', 'Sube el cofre', [
  'Aplica al chest/barrel para subir de madera a cobre/hierro...',
]);
q('iron_chest', ['tier_up'], 'sophisticatedstorage:iron_chest', 1, 8, 3, 'Iron Chest', 'Cofre de hierro', [
  'Puedes craft/upgrade hasta hierro. Mas slots.',
]);
q('gold_chest', ['iron_chest'], 'sophisticatedstorage:gold_chest', 1, 10, 3, 'Gold Chest', 'Cofre de oro', [
  'Siguiente tier de capacidad.',
]);
q('diamond_chest', ['gold_chest'], 'sophisticatedstorage:diamond_chest', 1, 12, 3, 'Diamond Chest', 'Cofre diamante', [
  'Alto storage block-based.',
]);
q('netherite_chest', ['diamond_chest'], 'sophisticatedstorage:netherite_chest', 1, 14, 3, 'Netherite Chest', 'Cofre top', [
  'Tier maximo de chest Sophisticated.',
], { hide: true });
q('shulker', ['iron_chest'], 'sophisticatedstorage:shulker_box', 1, 8, 4.5, 'Storage Shulker', 'Shulker smart', [
  'Shulker con upgrades Sophisticated. Portable + poderoso.',
], { hide: true });
q('stor_craft', ['chest'], 'sophisticatedstorage:crafting_upgrade', 1, 6, 4.5, 'Storage Crafting Upgrade', 'Craft en chest', [
  'Mesa de craft dentro del storage.',
], { hide: true });
q('stor_magnet', ['barrel'], 'sophisticatedstorage:magnet_upgrade', 1, 6, 6, 'Storage Magnet', 'Iman de barril', [
  'Magnet en storage blocks.',
], { hide: true });
q('stack_stor', ['iron_chest'], 'sophisticatedstorage:stack_upgrade_tier_1', 1, 10, 4.5, 'Storage Stack T1', 'Stacks mayores', [
  'Mas items por slot en chests/barrels.',
], { hide: true });

q('sec_network', ['iron_chest'], 'checkmark', 1, 8, 6, 'Red casera', 'Controller y links', [
  'Conecta chests Sophisticated en una red simple antes de AE2.',
], { shape: 'hexagon', size: 1.25 });
q('controller', ['sec_network'], 'sophisticatedstorage:controller', 1, 10, 6, 'Storage Controller', 'Hub de chests', [
  'Controla chests enlazados. Tu "AE2 baby".',
]);
q('link', ['controller'], 'sophisticatedstorage:storage_link', 4, 12, 6, 'Storage Link', 'Enlace', [
  'Conecta containers remotos al controller.',
]);
q('tool', ['controller'], 'sophisticatedstorage:storage_tool', 1, 12, 7.5, 'Storage Tool', 'Configura la red', [
  'Herramienta para linkear / configurar storage.',
]);

q('sec_bridge', ['backpack', 'chest'], 'checkmark', 1, 0, 3, 'Puentes de storage', 'Create / AE2 / Occult', [
  'Cuando crezcas: Item Vault (Create), ME system (AE2) u Occultism storage.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('vault', ['sec_bridge'], 'create:item_vault', 4, 0, 4.5, 'Item Vault', 'Buffer Create', [
  'Vaults Create como buffer de fabricas. Ver capitulo Create.',
], { hide: true });
q('upgrade_base_stor', ['chest'], 'sophisticatedstorage:upgrade_base', 4, 4, 6, 'Storage Upgrade Base', 'Base storage', [
  'Base de upgrades de Sophisticated Storage.',
], { hide: true });

q('finale', ['netherite_bp', 'diamond_chest', 'controller', 'magnet'], 'checkmark', 1, 14, 0, 'Inventario infinito-ish', 'Storage Oasis listo', [
  'Mochila top, chests altos y controller casero.',
  '&6Oasis:&r Cuando te quedes corto, AE2 te espera en Tecnologia. Occultism tiene storage dimensional si vas por magia.',
], { shape: 'hexagon', size: 2.0 });

console.log('Quest defs:', defs.length);
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const num = (n) => Number(n).toString();

let snbt = '{\n\tdefault_hide_dependency_lines: false\n\tdefault_quest_shape: ""\n\tfilename: "storage_oasis"\n';
snbt += `\tgroup: "${groupId}"\n\ticon: "sophisticatedbackpacks:backpack"\n\tid: "${chapterId}"\n\timages: [ ]\n\torder_index: 1\n\tquest_links: [ ]\n\tquests: [\n`;
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
  '518F9052C66706F0', '4D4CFB7FCC133322', '33250F85C3028681', '7D71BF52853B98B0',
  '7C81D159DC812840', '1AE756D0C3916D9B', '0FA2C19085759330',
];

let langLines = fs.readFileSync(langPath, 'utf8').split(/\r?\n/).filter((line) => {
  if (/^\s*[{}]\s*$/.test(line)) return false;
  if (line.includes(`chapter.${chapterId}.title:`)) return false;
  if (/quest\.[A-Fa-f0-9]{32}\./.test(line)) return false;
  return !oldIds.some((oid) => line.includes(`quest.${oid}.`));
});
let langAdd = `\tchapter.${chapterId}.title: "&e&lAlmacenamiento"\n`;
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
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/storage_oasis.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
}
console.log('DONE storage', defs.length);
