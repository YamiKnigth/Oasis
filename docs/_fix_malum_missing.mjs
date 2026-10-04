import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const chapterPath = path.join(root, 'server/config/ftbquests/quests/chapters/malum.snbt');
const langPath = path.join(root, 'server/config/ftbquests/quests/lang/en_us.snbt');

const jar = fs.readdirSync(path.join(root, 'server/mods')).find((f) => f.startsWith('malum') && f.endsWith('.jar'));
const listing = execSync(`jar tf "server/mods/${jar}"`, { cwd: root, encoding: 'utf8' });
const items = new Set(
  listing
    .split(/\r?\n/)
    .filter((l) => l.startsWith('assets/malum/models/item/') && l.endsWith('.json') && !l.slice('assets/malum/models/item/'.length).includes('/'))
    .map((l) => l.slice('assets/malum/models/item/'.length, -'.json'.length))
);

const map = {
  'malum:holy_sap': 'malum:runic_sap',
  'malum:holy_sapball': 'malum:runic_sapball',
  'malum:holy_syrup': 'malum:runic_workbench', // syrup removed in 1.8; workbench is the sap progression station
  'malum:unholy_sap': 'malum:cursed_sap',
  'malum:unholy_sapball': 'malum:cursed_sapball',
  'malum:unholy_syrup': 'malum:soulwood_sapling', // syrup removed; soulwood is the unholy tree line
  'malum:processed_soulstone': 'malum:refined_soulstone',
  'malum:spirit_fabric': 'malum:soulwoven_silk',
  'malum:cluster_of_brilliance': 'malum:raw_brilliance',
  'malum:corrupted_resonance': 'malum:resonance_tuner',
  'malum:necklace_of_tidal_affinity': 'malum:necklace_of_blissful_harmony',
  'malum:twisted_tablet': 'malum:soulwood_plinth', // tablet gone in 1.8
};

for (const [from, to] of Object.entries(map)) {
  const id = to.replace('malum:', '');
  if (!items.has(id)) console.error('BAD TARGET', to);
  else console.log('OK', from, '->', to);
}

let snbt = fs.readFileSync(chapterPath, 'utf8');
const before = (snbt.match(/missing_item/g) || []).length;

// Replace missing_item task blocks with real items
snbt = snbt.replace(
  /item: \{ components: \{ "ftbquests:missing_item": "([^"]+)" \}, count: 1, id: "ftbquests:missing_item" \}/g,
  (full, oldId) => {
    const next = map[oldId];
    if (!next) {
      console.error('Unmapped', oldId);
      return full;
    }
    return `item: { count: 1, id: "${next}" }`;
  }
);

const after = (snbt.match(/missing_item/g) || []).length;
fs.writeFileSync(chapterPath, snbt, 'utf8');
console.log('missing before/after', before, after);

// Lang updates: titles + Oasis notes on hub + renamed items
let lang = fs.readFileSync(langPath, 'utf8');

const langPatches = [
  // hub
  {
    find: 'quest.06470C09B6DDD072.quest_desc:',
    // will rewrite whole key if present
  },
];

const setLang = (qid, field, value) => {
  const key = `quest.${qid}.${field}:`;
  const reBlock = new RegExp(`\\t${key.replace('.', '\\.')}.*?(?=\\n\\t(?:quest|chapter)\\.|\\n})`, 's');
  if (Array.isArray(value)) {
    const body = `\t${key} [\n` + value.map((l) => `\t\t"${l.replace(/"/g, '\\"')}"`).join('\n') + `\n\t]`;
    if (reBlock.test(lang)) lang = lang.replace(reBlock, body);
    else lang = lang.replace(/\n}\n?\s*$/, `\n${body}\n}\n`);
  } else {
    const body = `\t${key} "${value.replace(/"/g, '\\"')}"`;
    if (lang.includes(key)) {
      lang = lang.replace(new RegExp(`\\t${key.replace('.', '\\.')}.*`), body);
    } else {
      lang = lang.replace(/\n}\n?\s*$/, `\n${body}\n}\n`);
    }
  }
};

// Find quest ids that had each missing item from original mapping via titles in lang — update titles for renames
const titleUpdates = {
  // We update by scanning lang for old item names in titles
};
const renames = [
  [/Holy Sap\b/gi, 'Runic Sap'],
  [/Holy Sapball/gi, 'Runic Sapball'],
  [/Holy Syrup/gi, 'Runic Workbench'],
  [/Unholy Sap\b/gi, 'Cursed Sap'],
  [/Unholy Sapball/gi, 'Cursed Sapball'],
  [/Unholy Syrup/gi, 'Soulwood Sapling'],
  [/Processed Soulstone/gi, 'Refined Soulstone'],
  [/Spirit Fabric/gi, 'Soulwoven Silk'],
  [/Cluster of Brilliance/gi, 'Raw Brilliance'],
  [/Corrupted Resonance/gi, 'Resonance Tuner'],
  [/Tidal Affinity/gi, 'Blissful Harmony'],
  [/Twisted Tablet/gi, 'Twisted Rock'],
];
for (const [re, to] of renames) lang = lang.replace(re, to);

// Oasis note on Malum hub
if (lang.includes('quest.06470C09B6DDD072.quest_desc:')) {
  lang = lang.replace(
    /\tquest\.06470C09B6DDD072\.quest_desc: \[[\s\S]*?\n\t\]/,
    `\tquest.06470C09B6DDD072.quest_desc: [\n\t\t"Malum es magia de espiritus y scythes. Cosecha almas, procesa soulstone y construye el Spirit Altar."\n\t\t"&6Oasis:&r Paralelo a Iron's, Ars y Occultism. No bloquea Create/IE/AE2/Mek. IDs actualizados a Malum 1.8 (runic/cursed sap, soulwoven silk)."\n\t]`
  );
} else {
  lang = lang.replace(
    /\n}\n?\s*$/,
    `\n\tquest.06470C09B6DDD072.quest_desc: [\n\t\t"Malum es magia de espiritus y scythes. Cosecha almas, procesa soulstone y construye el Spirit Altar."\n\t\t"&6Oasis:&r Paralelo a Iron's, Ars y Occultism. No bloquea Create/IE/AE2/Mek. IDs actualizados a Malum 1.8 (runic/cursed sap, soulwoven silk)."\n\t]\n}\n`
  );
}

fs.writeFileSync(langPath, lang, 'utf8');

// sync
for (const dest of [
  path.join(root, 'client/config/ftbquests/quests'),
  path.join(root, 'curseforge/overrides/config/ftbquests/quests'),
]) {
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/malum.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
}
console.log('Synced malum polish');
