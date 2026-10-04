import fs from 'fs';
import path from 'path';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const questsRoot = path.join(root, 'server/config/ftbquests/quests');
const langPath = path.join(questsRoot, 'lang/en_us.snbt');

const hubOf = (chapterFile) => {
  const t = fs.readFileSync(path.join(questsRoot, 'chapters', chapterFile), 'utf8');
  // first gear-shaped quest is usually the hub
  const parts = t.split(/\n\t\t\{/);
  for (const p of parts) {
    if (p.includes('shape: "gear"')) {
      const m = p.match(/\tid: "([A-F0-9]{16})"/);
      if (m) return m[1];
    }
  }
  return null;
};

const ieHub = hubOf('immersive_engineering.snbt');
const ae2Hubs = (() => {
  const t = fs.readFileSync(path.join(questsRoot, 'chapters/applied_energistics_2.snbt'), 'utf8');
  const ids = [];
  for (const p of t.split(/\n\t\t\{/)) {
    if (p.includes('shape: "gear"')) {
      const m = p.match(/\tid: "([A-F0-9]{16})"/);
      if (m) ids.push(m[1]);
    }
  }
  return ids.slice(0, 3); // main section hubs
})();
const mekHub = hubOf('mekanism.snbt');

console.log({ ieHub, ae2Hubs, mekHub });

const notes = {
  [ieHub]: [
    'Immersive Engineering: acero, cables y multiblocks. El puente desde Create.',
    '&6Oasis:&r Varios crafts IE piden Create (precision mechanism / electron tube). Completa el arco Create antes de spamear IE. Ver docs/TECH_PROGRESSION.md',
    'Siguiente en la ruta tech: AE2 -> Mekanism.',
  ],
  [mekHub]: [
    'Mekanism: el late tech de Oasis. Quimica, digital miner y fusion.',
    '&6Oasis:&r Llegas aqui tras Create -> IE -> AE2. Certus/fluix early estan gateados; mira JEI y docs/TECH_PROGRESSION.md',
    'Magia (Iron\'s/Ars/Occultism/Malum) sigue siendo paralela: no la necesitas para Mek.',
  ],
};

// AE2 first gear hub
if (ae2Hubs[0]) {
  notes[ae2Hubs[0]] = [
    'Applied Energistics 2: red ME, crafting automatico y storage denso.',
    '&6Oasis:&r AE2 llega despues de Create+IE. Usa JEI para recetas del pack (processors/presses).',
    'Cuando la red ME este comoda, sigue a Mekanism.',
  ];
}

let lang = fs.readFileSync(langPath, 'utf8');

const setDesc = (qid, lines) => {
  if (!qid) return;
  const re = new RegExp(`\\tquest\\.${qid}\\.quest_desc: \\[[\\s\\S]*?\\n\\t\\]`);
  const body =
    `\tquest.${qid}.quest_desc: [\n` +
    lines.map((l) => `\t\t"${l.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`).join('\n') +
    `\n\t]`;
  if (re.test(lang)) lang = lang.replace(re, body);
  else lang = lang.replace(/\n\}\n?\s*$/, `\n${body}\n}\n`);
};

for (const [qid, lines] of Object.entries(notes)) setDesc(qid, lines);

// Light subtitle tags
const setSub = (qid, sub) => {
  if (!qid) return;
  const key = `\tquest.${qid}.quest_subtitle:`;
  const line = `${key} "${sub}"`;
  if (lang.includes(key)) lang = lang.replace(new RegExp(`\\tquest\\.${qid}\\.quest_subtitle: .*`), line);
  else lang = lang.replace(/\n\}\n?\s*$/, `\n${line}\n}\n`);
};
setSub(ieHub, 'Tech II - tras Create');
setSub(ae2Hubs[0], 'Tech III - red ME');
setSub(mekHub, 'Tech IV - late game');

fs.writeFileSync(langPath, lang, 'utf8');

for (const dest of [
  path.join(root, 'client/config/ftbquests/quests'),
  path.join(root, 'curseforge/overrides/config/ftbquests/quests'),
]) {
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
}
console.log('Tech Oasis notes polished');
