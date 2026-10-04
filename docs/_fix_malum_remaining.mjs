import fs from 'fs';
import path from 'path';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const chapterPath = path.join(root, 'server/config/ftbquests/quests/chapters/malum.snbt');
const langPath = path.join(root, 'server/config/ftbquests/quests/lang/en_us.snbt');

let t = fs.readFileSync(chapterPath, 'utf8');
console.log('before', (t.match(/missing_item/g) || []).length);
t = t.replace(
  /item: \{ components: \{ "ftbquests:missing_item": "([^"]+)" \}, count: 1, id: "ftbquests:missing_item" \}/g,
  (_, id) => `item: { count: 1, id: "${id}" }`
);
console.log('after', (t.match(/missing_item/g) || []).length);
fs.writeFileSync(chapterPath, t, 'utf8');

for (const dest of [
  path.join(root, 'client/config/ftbquests/quests'),
  path.join(root, 'curseforge/overrides/config/ftbquests/quests'),
]) {
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/malum.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
}
console.log('synced');
