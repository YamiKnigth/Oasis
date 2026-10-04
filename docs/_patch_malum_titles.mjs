import fs from 'fs';
import path from 'path';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const chapterPath = path.join(root, 'server/config/ftbquests/quests/chapters/malum.snbt');
const langPath = path.join(root, 'server/config/ftbquests/quests/lang/en_us.snbt');

const titles = {
  'malum:runic_sap': ['Runic Sap', 'Savia runica (antes holy sap)'],
  'malum:runic_sapball': ['Runic Sapball', 'Bola de savia runica'],
  'malum:runic_workbench': ['Runic Workbench', 'Banco runico (reemplaza holy syrup)'],
  'malum:cursed_sap': ['Cursed Sap', 'Savia maldita (antes unholy sap)'],
  'malum:cursed_sapball': ['Cursed Sapball', 'Bola de savia maldita'],
  'malum:soulwood_sapling': ['Soulwood Sapling', 'Arbol soulwood (linea unholy)'],
  'malum:refined_soulstone': ['Refined Soulstone', 'Soulstone procesada'],
  'malum:soulwoven_silk': ['Soulwoven Silk', 'Seda soulwoven (antes spirit fabric)'],
  'malum:raw_brilliance': ['Raw Brilliance', 'Brillo crudo'],
  'malum:resonance_tuner': ['Resonance Tuner', 'Sintonizador de resonancia'],
  'malum:necklace_of_blissful_harmony': ['Necklace of Blissful Harmony', 'Collar de armonia'],
  'malum:soulwood_plinth': ['Soulwood Plinth', 'Plinto soulwood'],
};

const snbt = fs.readFileSync(chapterPath, 'utf8');
const parts = snbt.split(/\n\t\t\{/);
const found = {};
for (const p of parts) {
  for (const item of Object.keys(titles)) {
    if (p.includes(`id: "${item}"`)) {
      const m = p.match(/\tid: "([A-F0-9]{16})"/);
      if (m) found[item] = m[1];
    }
  }
}
console.log(found);

let lang = fs.readFileSync(langPath, 'utf8');
for (const [item, qid] of Object.entries(found)) {
  const [title, subtitle] = titles[item];
  const tKey = `\tquest.${qid}.title:`;
  const sKey = `\tquest.${qid}.quest_subtitle:`;
  if (lang.includes(tKey)) lang = lang.replace(new RegExp(`\\tquest\\.${qid}\\.title: .*`), `${tKey} "${title}"`);
  else lang = lang.replace(/\n\}\n?\s*$/, `\n${tKey} "${title}"\n}\n`);
  if (lang.includes(sKey)) lang = lang.replace(new RegExp(`\\tquest\\.${qid}\\.quest_subtitle: .*`), `${sKey} "${subtitle}"`);
  else lang = lang.replace(/\n\}\n?\s*$/, `\n${sKey} "${subtitle}"\n}\n`);
}
fs.writeFileSync(langPath, lang, 'utf8');

for (const dest of [
  path.join(root, 'client/config/ftbquests/quests'),
  path.join(root, 'curseforge/overrides/config/ftbquests/quests'),
]) {
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/malum.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
}
console.log('titles patched');
