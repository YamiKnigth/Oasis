import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const questsRoot = path.join(root, 'server/config/ftbquests/quests');
const chapterPath = path.join(questsRoot, 'chapters/irons_spells.snbt');
const langPath = path.join(questsRoot, 'lang/en_us.snbt');
const tableId = '8856416108613626146L';
const chapterId = '5FF2F8E6FDE52902';
const groupId = '7726645EE79AB0A8';
const id = (key) => crypto.createHash('md5').update(`oasis-irons-${key}`).digest('hex').toUpperCase().slice(0, 16);

const defs = [];
const q = (key, deps, item, count, x, y, title, subtitle, desc, opts = {}) => {
  defs.push({ key, deps, item, count, x, y, title, subtitle, desc, ...opts });
};

// HUB
q('intro', [], 'checkmark', 1, 0, 0, "Iron's Spells", 'Magia de combate y grimorios', [
  'Hechizos, tintas, runas y staffs. Esta guia te lleva del primer libro de cobre al late-game magico.',
  '&6Oasis:&r Iron\'s es &eparalelo&r a la tech y a la cocina: no bloquea Create/IE/AE2/Mek. Combina bien con Malum y Curios.',
], { shape: 'gear', size: 2.0 });

// CORE LOOP
q('inscription', ['intro'], 'irons_spellbooks:inscription_table', 1, 2, 0, 'Inscription Table', 'Graba hechizos', [
  'Mesa principal: convierte scrolls + ink en hechizos dentro de tu spell book.',
  'Colocala cerca de un chest con tinta y scrolls; vas a usarla mucho.',
]);
q('copper_book', ['inscription'], 'irons_spellbooks:copper_spell_book', 1, 4, 0, 'Copper Spell Book', 'Tu primer grimorio', [
  'Equipalo (hotbar / Curios segun config) y abre la rueda de hechizos.',
  'Pocos slots: prioriza 1-2 hechizos utiles (mobility / damage / heal).',
]);
q('staff', ['copper_book'], 'irons_spellbooks:graybeard_staff', 1, 6, 0, 'Graybeard Staff', 'Implemento de casteado', [
  'Staff basico para lanzar hechizos con mejor feeling que a mano.',
  'Mas adelante hay staffs de escuela (hielo, sangre, pyrium...).',
]);
q('common_ink', ['inscription'], 'irons_spellbooks:common_ink', 8, 4, 1.5, 'Common Ink', 'Tinta basica', [
  'Combustible de la inscription table. Sin tinta no grabas hechizos.',
  'Haz stock: cada upgrade de scroll consume tinta del tier adecuado.',
]);
q('scroll', ['common_ink'], 'irons_spellbooks:scroll', 4, 6, 1.5, 'Scroll', 'Hechizo en pergamino', [
  'Loot, trades y crafting. Lleva el scroll a la Inscription Table con tinta.',
  'Los scrolls de escuela (fire/ice/...) aparecen en secciones siguientes.',
]);
q('arcane_essence', ['common_ink'], 'irons_spellbooks:arcane_essence', 16, 4, 3, 'Arcane Essence', 'Polvo magico', [
  'Material base de muchas recetas Iron\'s. Farmea o crafta segun JEI.',
], { hide: true });
q('cloth', ['arcane_essence'], 'irons_spellbooks:cloth', 8, 6, 3, 'Cloth', 'Tela magica', [
  'Componente de armaduras y libros. Barato de spamear mid-game.',
], { hide: true });
q('magic_cloth', ['cloth'], 'irons_spellbooks:magic_cloth', 8, 8, 3, 'Magic Cloth', 'Tela superior', [
  'Upgrade de cloth. Usado en armaduras de mago y piezas mid/late.',
], { hide: true });

// INK TIERS
q('sec_ink', ['common_ink'], 'checkmark', 1, 8, 0, 'Tintas', 'Common -> Legendary', [
  'Cada rareza de hechizo pide tinta del mismo tier (o superior segun receta).',
  'Planifica farms de ink antes de spamear scrolls epicos.',
], { shape: 'hexagon', size: 1.5 });
q('uncommon_ink', ['sec_ink'], 'irons_spellbooks:uncommon_ink', 8, 10, -1, 'Uncommon Ink', 'Tier verde', [
  'Siguiente escalon. Empieza a aparecer en loot de magos y estructuras.',
]);
q('rare_ink', ['uncommon_ink'], 'irons_spellbooks:rare_ink', 4, 12, -1, 'Rare Ink', 'Tier azul', [
  'Para hechizos serios. Guarda rare ink; no la gastes en scrolls basura.',
]);
q('epic_ink', ['rare_ink'], 'irons_spellbooks:epic_ink', 2, 14, -1, 'Epic Ink', 'Tier morada', [
  'Cara. Usala en hechizos que definan tu build.',
]);
q('legendary_ink', ['epic_ink'], 'irons_spellbooks:legendary_ink', 1, 16, -1, 'Legendary Ink', 'Tier naranja', [
  'Top tier. Reserva para tu spell book final y hechizos clave.',
]);

// SPELL BOOKS
q('sec_books', ['copper_book'], 'checkmark', 1, 8, 1.5, 'Spell Books', 'Mas slots, mejor mana', [
  'Sube de libro cuando te quedes sin slots o mana. No hace falta el netherite para divertirte.',
], { shape: 'hexagon', size: 1.5 });
q('iron_book', ['sec_books'], 'irons_spellbooks:iron_spell_book', 1, 10, 1.5, 'Iron Spell Book', 'Mas espacio', [
  'Buen upgrade early. Mas hechizos equipados = mas versatilidad en exploracion.',
]);
q('gold_book', ['iron_book'], 'irons_spellbooks:gold_spell_book', 1, 12, 1.5, 'Gold Spell Book', 'Mid grimorio', [
  'Salto comodo antes de diamante. Combina con armadura wizard.',
]);
q('diamond_book', ['gold_book'], 'irons_spellbooks:diamond_spell_book', 1, 14, 1.5, 'Diamond Spell Book', 'Alto rendimiento', [
  'Libro fuerte para bosses mid. Empieza a pensar en escuelas favoritas.',
]);
q('netherite_book', ['diamond_book'], 'irons_spellbooks:netherite_spell_book', 1, 16, 1.5, 'Netherite Spell Book', 'Late vanilla-ish', [
  'Uno de los mejores libros "craftables". Alternativas tematicas abajo.',
]);
q('blaze_book', ['gold_book'], 'irons_spellbooks:blaze_spell_book', 1, 12, 3, 'Blaze Spell Book', 'Fuego', [
  'Libro tematico fire. Ideal si tu build es pyromancer.',
], { hide: true });
q('ice_book', ['gold_book'], 'irons_spellbooks:ice_spell_book', 1, 12, 4.5, 'Ice Spell Book', 'Hielo', [
  'Libro tematico ice. Combina con cryomancer gear.',
], { hide: true });
q('druidic_book', ['gold_book'], 'irons_spellbooks:druidic_spell_book', 1, 14, 3, 'Druidic Spell Book', 'Naturaleza', [
  'Enfoque nature. Buen fit exploracion / support.',
], { hide: true });
q('dragonskin_book', ['netherite_book'], 'irons_spellbooks:dragonskin_spell_book', 1, 18, 1.5, 'Dragonskin Spell Book', 'Endgame book', [
  'Libro top con dragonskin. Objetivo late de Iron\'s.',
]);
q('legendary_book', ['dragonskin_book'], 'irons_spellbooks:legendary_spell_book', 1, 20, 1.5, 'Legendary Spell Book', 'Trofeo', [
  'El grimorio legendario. No es obligatorio para disfrutar el mod.',
], { hide: true });

// STATIONS
q('sec_stations', ['inscription'], 'checkmark', 1, 2, -3, 'Estaciones magicas', 'Cauldron, yunque, forge', [
  'Ademas de la Inscription Table hay crafting/upgrade stations clave.',
], { shape: 'hexagon', size: 1.5 });
q('cauldron', ['sec_stations'], 'irons_spellbooks:alchemist_cauldron', 1, 4, -3, 'Alchemist Cauldron', 'Tintas y brew', [
  'Procesa materiales en tintas y productos alchemicos. Mira JEI por fluidos/items.',
]);
q('arcane_anvil', ['sec_stations'], 'irons_spellbooks:arcane_anvil', 1, 4, -4.5, 'Arcane Anvil', 'Upgrades magicos', [
  'Aplica upgrade orbs, imprints y mejoras a equipo/hechizos.',
  'Pieza central del mid/late Iron\'s.',
]);
q('scroll_forge', ['sec_stations'], 'irons_spellbooks:scroll_forge', 1, 2, -4.5, 'Scroll Forge', 'Fabrica scrolls', [
  'Craft de scrolls cuando ya no dependes solo de loot.',
], { hide: true });
q('pedestal', ['arcane_anvil'], 'irons_spellbooks:pedestal', 2, 6, -4.5, 'Pedestal', 'Display / ritual props', [
  'Soportes para items. Util en bases magicas y algunas mecánicas de display.',
], { hide: true });
q('brazier', ['cauldron'], 'irons_spellbooks:brazier', 1, 6, -3, 'Brazier', 'Fuego ritual', [
  'Decoracion utilitaria del kit magico. Hay variante soul.',
], { hide: true });
q('wisewood', ['inscription'], 'irons_spellbooks:wisewood_bookshelf', 4, 0, -3, 'Wisewood Bookshelf', 'Estanteria magica', [
  'Bookshelf tematico. Bonito y coherente con una biblioteca de hechicero.',
], { hide: true });

// MATERIALS / PROGRESSION
q('sec_mats', ['arcane_essence'], 'checkmark', 1, 8, -3, 'Materiales', 'Mithril, arcano, dragon', [
  'Cadena de materiales hacia armaduras y libros altos.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('mithril_ore', ['sec_mats'], 'irons_spellbooks:mithril_ore', 8, 10, -3, 'Mithril Ore', 'Mineral magico', [
  'Busca mithril underground. Tambien hay deepslate variant.',
], { hide: true });
q('mithril', ['mithril_ore'], 'irons_spellbooks:mithril_ingot', 16, 12, -3, 'Mithril Ingot', 'Metal de magos', [
  'Funde raw/ore. Base de piezas mid Iron\'s.',
], { hide: true });
q('mithril_weave', ['mithril'], 'irons_spellbooks:mithril_weave', 8, 14, -3, 'Mithril Weave', 'Tela metalica', [
  'Componente avanzado de armaduras/accesorios.',
], { hide: true });
q('arcane_ingot', ['mithril'], 'irons_spellbooks:arcane_ingot', 8, 12, -4.5, 'Arcane Ingot', 'Aleacion arcana', [
  'Metal procesado con essence. Aparece en muchas recetas mid.',
], { hide: true });
q('dragonskin', ['netherite_book'], 'irons_spellbooks:dragonskin', 4, 18, 0, 'Dragonskin', 'Cuero de dragon', [
  'Material late para el Dragonskin Spell Book y piezas top.',
]);
q('arcane_debris', ['arcane_ingot'], 'irons_spellbooks:arcane_debris', 4, 14, -4.5, 'Arcane Debris', 'Escombro arcano', [
  'Material raro de progresion. JEI indica fuentes/usos.',
], { hide: true });
q('arcane_salvage', ['arcane_anvil'], 'irons_spellbooks:arcane_salvage', 4, 6, -6, 'Arcane Salvage', 'Reciclaje magico', [
  'Recupera valor de equipo/scrolls rotos o sobrantes.',
], { hide: true });

// RUNES / SCHOOLS
q('sec_schools', ['scroll', 'uncommon_ink'], 'checkmark', 1, 8, 6, 'Escuelas y runas', 'Elige tu afinidad', [
  'Cada escuela tiene runas, scrolls y a veces armadura dedicada.',
  'No necesitas todas: especializate en 1-2 y guarda tinta.',
], { shape: 'hexagon', size: 1.5 });
q('blank_rune', ['sec_schools'], 'irons_spellbooks:blank_rune', 8, 10, 6, 'Blank Rune', 'Base de runas', [
  'Craft base antes de especializar en una escuela.',
]);
q('fire_rune', ['blank_rune'], 'irons_spellbooks:fire_rune', 4, 12, 4.5, 'Fire Rune', 'Escuela fuego', [
  'Afinidad pyromancer. Combina con fire scrolls y blaze book.',
]);
q('ice_rune', ['blank_rune'], 'irons_spellbooks:ice_rune', 4, 12, 6, 'Ice Rune', 'Escuela hielo', [
  'Crowd control y damage frio. Cryomancer vibes.',
]);
q('lightning_rune', ['blank_rune'], 'irons_spellbooks:lightning_rune', 4, 12, 7.5, 'Lightning Rune', 'Escuela rayo', [
  'Burst y movilidad electrica. Electromancer set mas abajo.',
]);
q('holy_rune', ['blank_rune'], 'irons_spellbooks:holy_rune', 4, 14, 4.5, 'Holy Rune', 'Escuela sagrada', [
  'Heal/support y anti-undead. Priest gear combina bien.',
], { hide: true });
q('blood_rune', ['blank_rune'], 'irons_spellbooks:blood_rune', 4, 14, 6, 'Blood Rune', 'Escuela sangre', [
  'Alto riesgo/reward. Blood staff y cultist aesthetics.',
], { hide: true });
q('ender_rune', ['blank_rune'], 'irons_spellbooks:ender_rune', 4, 14, 7.5, 'Ender Rune', 'Escuela ender', [
  'Teleports y utilidad dimensional.',
], { hide: true });
q('evocation_rune', ['blank_rune'], 'irons_spellbooks:evocation_rune', 4, 16, 5.25, 'Evocation Rune', 'Escuela evocacion', [
  'Estilo evoker: fangs, summons y control.',
], { hide: true });
q('nature_rune', ['blank_rune'], 'irons_spellbooks:nature_rune', 4, 16, 6.75, 'Nature Rune', 'Escuela naturaleza', [
  'Support/DoT natural. Casa con druidic book.',
], { hide: true });
q('cooldown_rune', ['blank_rune'], 'irons_spellbooks:cooldown_rune', 4, 10, 7.5, 'Cooldown Rune', 'Menos CD', [
  'Runa utilitaria: baja cooldowns. Casi siempre vale la pena.',
], { hide: true });
q('protection_rune', ['blank_rune'], 'irons_spellbooks:protection_rune', 4, 10, 4.5, 'Protection Rune', 'Más defensa', [
  'Runa defensiva para builds que castean de cerca.',
], { hide: true });

// SCHOOL SCROLLS (sample)
q('scroll_fire', ['fire_rune'], 'irons_spellbooks:scroll_fire', 2, 14, 3, 'Fire Scroll', 'Pergamino de fuego', [
  'Inscribe hechizos fire en tu libro con tinta adecuada.',
], { hide: true });
q('scroll_ice', ['ice_rune'], 'irons_spellbooks:scroll_ice', 2, 14, 8.5, 'Ice Scroll', 'Pergamino de hielo', [
  'Hechizos ice listos para inscription.',
], { hide: true });
q('scroll_lightning', ['lightning_rune'], 'irons_spellbooks:scroll_lightning', 2, 12, 9, 'Lightning Scroll', 'Pergamino de rayo', [
  'Burst electrico para tu loadout.',
], { hide: true });

// UPGRADE ORBS
q('sec_orbs', ['arcane_anvil', 'rare_ink'], 'checkmark', 1, 8, -6, 'Upgrade Orbs', 'Poder en el yunque', [
  'Los orbs mejoran stats magicos en el Arcane Anvil.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('upgrade_orb', ['sec_orbs'], 'irons_spellbooks:upgrade_orb', 2, 10, -6, 'Upgrade Orb', 'Orb generico', [
  'Base de mejoras. Especializalo o aplicalo segun JEI.',
], { hide: true });
q('mana_orb', ['upgrade_orb'], 'irons_spellbooks:mana_upgrade_orb', 1, 12, -6, 'Mana Upgrade Orb', '+ mana', [
  'Mas reserva de mana para spam controlado.',
], { hide: true });
q('cooldown_orb', ['upgrade_orb'], 'irons_spellbooks:cooldown_upgrade_orb', 1, 12, -7.5, 'Cooldown Upgrade Orb', '- CD', [
  'Reduce cooldowns. Excelente en casi cualquier build.',
], { hide: true });
q('fire_orb', ['upgrade_orb', 'fire_rune'], 'irons_spellbooks:fire_upgrade_orb', 1, 14, -6, 'Fire Upgrade Orb', 'Power fire', [
  'Empuja tu escuela fuego.',
], { hide: true });
q('ice_orb', ['upgrade_orb', 'ice_rune'], 'irons_spellbooks:ice_upgrade_orb', 1, 14, -7.5, 'Ice Upgrade Orb', 'Power ice', [
  'Empuja tu escuela hielo.',
], { hide: true });

// ARMOR
q('sec_armor', ['magic_cloth', 'iron_book'], 'checkmark', 1, 2, 3, 'Armaduras de mago', 'Cloth a netherite mage', [
  'Armadura magica da spell power / mana a costa de defensa fisica.',
  'Hay sets por escuela (pyromancer, cryomancer, priest...).',
], { shape: 'hexagon', size: 1.5 });
q('wizard_hat', ['sec_armor'], 'irons_spellbooks:wizard_hat', 1, 4, 4.5, 'Wizard Hat', 'Look de mago', [
  'Pieza iconica. Empieza el set wizard.',
]);
q('wizard_chest', ['wizard_hat'], 'irons_spellbooks:wizard_chestplate', 1, 6, 4.5, 'Wizard Chestplate', 'Core del set', [
  'Pechera del set basico de mago.',
]);
q('wizard_legs', ['wizard_chest'], 'irons_spellbooks:wizard_leggings', 1, 8, 4.5, 'Wizard Leggings', 'Piernas magicas', [
  'Completa el set para bonos coherentes.',
], { hide: true });
q('wizard_boots', ['wizard_legs'], 'irons_spellbooks:wizard_boots', 1, 10, 4.5, 'Wizard Boots', 'Set wizard', [
  'Cierra el set wizard early/mid.',
], { hide: true });
q('pyro_helm', ['wizard_chest', 'fire_rune'], 'irons_spellbooks:pyromancer_helmet', 1, 6, 6, 'Pyromancer Helmet', 'Set fuego', [
  'Casco del set pyromancer. Sube poder fire.',
], { hide: true });
q('cryo_helm', ['wizard_chest', 'ice_rune'], 'irons_spellbooks:cryomancer_helmet', 1, 6, 7.5, 'Cryomancer Helmet', 'Set hielo', [
  'Casco cryomancer para builds ice.',
], { hide: true });
q('electro_helm', ['wizard_chest', 'lightning_rune'], 'irons_spellbooks:electromancer_helmet', 1, 4, 6, 'Electromancer Helmet', 'Set rayo', [
  'Casco electromancer.',
], { hide: true });
q('priest_helm', ['wizard_chest', 'holy_rune'], 'irons_spellbooks:priest_helmet', 1, 4, 7.5, 'Priest Helmet', 'Set sagrado', [
  'Support/holy aesthetics y stats.',
], { hide: true });
q('netherite_mage_helm', ['netherite_book'], 'irons_spellbooks:netherite_mage_helmet', 1, 18, 3, 'Netherite Mage Helmet', 'Mage late', [
  'Casco mage netherite: defensa + magia.',
]);
q('netherite_mage_chest', ['netherite_mage_helm'], 'irons_spellbooks:netherite_mage_chestplate', 1, 20, 3, 'Netherite Mage Chest', 'Tank-caster', [
  'Pechera top craftable del line mage.',
], { hide: true });

// CURIOS / RINGS
q('sec_curios', ['intro'], 'checkmark', 1, 0, 2, 'Curios y anillos', 'Slots magicos', [
  'Anillos, amuletos y charms usan Curios/Accessories.',
  'Mana Ring + Cooldown Ring suelen ser el primer setup decente.',
], { shape: 'hexagon', size: 1.5 });
q('mana_ring', ['sec_curios'], 'irons_spellbooks:mana_ring', 1, -2, 2, 'Mana Ring', '+ mana pool', [
  'Uno de los mejores primeros curios. Equipalo siempre que casteés.',
]);
q('cooldown_ring', ['mana_ring'], 'irons_spellbooks:cooldown_ring', 1, -2, 3.5, 'Cooldown Ring', 'Menos espera', [
  'Reduce cooldowns globales. Stacka con runas/orbs con cuidado (lee tooltips).',
]);
q('cast_time_ring', ['mana_ring'], 'irons_spellbooks:cast_time_ring', 1, -4, 2, 'Cast Time Ring', 'Cast mas rapido', [
  'Acorta cast time. Clave en hechizos cargados.',
], { hide: true });
q('affinity_ring', ['cooldown_ring'], 'irons_spellbooks:affinity_ring', 1, -2, 5, 'Affinity Ring', 'Afinidad generica', [
  'Hay variantes por escuela (fire/ice/...). Elige la de tu main school.',
], { hide: true });
q('fire_affinity', ['affinity_ring', 'fire_rune'], 'irons_spellbooks:affinity_ring_fire', 1, 0, 5, 'Fire Affinity Ring', 'Anillo fuego', [
  'Empuja spell power fire.',
], { hide: true });
q('ice_affinity', ['affinity_ring', 'ice_rune'], 'irons_spellbooks:affinity_ring_ice', 1, 0, 6.5, 'Ice Affinity Ring', 'Anillo hielo', [
  'Empuja spell power ice.',
], { hide: true });
q('concentration', ['cast_time_ring'], 'irons_spellbooks:concentration_amulet', 1, -4, 3.5, 'Concentration Amulet', 'Foco', [
  'Amuleto de concentracion para casters serios.',
], { hide: true });
q('heavy_chain', ['sec_curios'], 'irons_spellbooks:heavy_chain_necklace', 1, -4, 5, 'Heavy Chain Necklace', 'Cuello tanky', [
  'Curio defensivo. Util si te pegan mientras casteás.',
], { hide: true });
q('amethyst_charm', ['concentration'], 'irons_spellbooks:amethyst_resonance_charm', 1, -6, 3.5, 'Amethyst Resonance Charm', 'Resonancia', [
  'Charm mid. Revisa tooltip para el bonus exacto de tu version.',
], { hide: true });

// WEAPONS / IMPLEMENTS
q('sec_weapons', ['staff'], 'checkmark', 1, 6, -1.5, 'Armas y focuses', 'Staffs y blades', [
  'Los implements cambian feeling y a veces bonifican escuelas.',
], { shape: 'hexagon', size: 1.25 });
q('ice_staff', ['sec_weapons', 'ice_rune'], 'irons_spellbooks:ice_staff', 1, 8, -1.5, 'Ice Staff', 'Focus hielo', [
  'Staff de escuela ice. Mejor sinergia con cryomancer.',
]);
q('blood_staff', ['sec_weapons', 'blood_rune'], 'irons_spellbooks:blood_staff', 1, 8, 0, 'Blood Staff', 'Focus sangre', [
  'Implemento blood. Alto flavor, alto riesgo.',
], { hide: true });
q('pyrium_staff', ['sec_weapons', 'fire_rune'], 'irons_spellbooks:pyrium_staff', 1, 10, 0, 'Pyrium Staff', 'Focus fuego late', [
  'Staff de fuego avanzado. Objetivo de pyromancers.',
], { hide: true });
q('artificer_cane', ['sec_weapons'], 'irons_spellbooks:artificer_cane', 1, 8, 1.5, 'Artificer Cane', 'Bastón artificer', [
  'Alternativa elegante al graybeard.',
], { hide: true });
q('magehunter', ['diamond_book'], 'irons_spellbooks:magehunter', 1, 16, 0, 'Magehunter', 'Anti-caster steel', [
  'Arma para cazar magos / contenido magico. Buena en PvE tough.',
], { hide: true });
q('spellbreaker', ['magehunter'], 'irons_spellbooks:spellbreaker', 1, 18, -1.5, 'Spellbreaker', 'Rompe hechizos', [
  'Arma late anti-magic. No sustituye un buen spell book.',
], { hide: true });
q('amethyst_rapier', ['sec_weapons'], 'irons_spellbooks:amethyst_rapier', 1, 6, 1.5, 'Amethyst Rapier', 'Melee magica', [
  'Hibrido melee/magic stylish.',
], { hide: true });

// CONSUMABLES
q('sec_consumables', ['cauldron'], 'checkmark', 1, 0, -6, 'Consumibles', 'Te, elixires, vials', [
  'Buffs temporales para raids, dragona y exploracion dura.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('casters_tea', ['sec_consumables'], 'irons_spellbooks:casters_tea', 8, -2, -6, "Caster's Tea", 'Te de mago', [
  'Consumible comodo para sesiones de casteado.',
], { hide: true });
q('oakskin', ['sec_consumables'], 'irons_spellbooks:oakskin_elixir', 2, 0, -7.5, 'Oakskin Elixir', 'Piel de roble', [
  'Mas aguante mientras casteás.',
], { hide: true });
q('invis_elixir', ['sec_consumables'], 'irons_spellbooks:invisibility_elixir', 2, 2, -7.5, 'Invisibility Elixir', 'Escapatoria', [
  'Util en exploracion y retreats.',
], { hide: true });
q('greater_heal', ['oakskin'], 'irons_spellbooks:greater_healing_potion', 2, 0, -9, 'Greater Healing Potion', 'Heal fuerte', [
  'Curacion seria para bosses.',
], { hide: true });
q('blood_vial', ['sec_consumables', 'blood_rune'], 'irons_spellbooks:blood_vial', 4, 2, -6, 'Blood Vial', 'Reactivo sangre', [
  'Componente/consumible de la linea blood.',
], { hide: true });
q('fire_ale', ['casters_tea'], 'irons_spellbooks:fire_ale', 2, -2, -7.5, 'Fire Ale', 'Trago igneo', [
  'Buff tematico fire. Brindis de pyromancer.',
], { hide: true });

// EXPLORATION / STRUCTURES
q('sec_explore', ['copper_book'], 'checkmark', 1, -2, 0, 'Exploracion magica', 'Mapas y vaults', [
  'Iron\'s añade estructuras, mapas y bosses. Lleva tinta y un libro de backup.',
  '&6Oasis:&r Combina con Nature/Explorer Compass del pack cuando explores biomas.',
], { shape: 'hexagon', size: 1.5 });
q('wayward', ['sec_explore'], 'irons_spellbooks:wayward_compass', 1, -4, 0, 'Wayward Compass', 'Brujula magica', [
  'Ayuda a orientarte hacia contenido Iron\'s. Mantén una en el inventario de exploracion.',
]);
q('furled_map', ['wayward'], 'irons_spellbooks:furled_map', 1, -6, 0, 'Furled Map', 'Mapa de estructura', [
  'Apunta a estructuras del mod. Usa, viaja, lootéa scrolls e ink.',
]);
q('furled_ancient', ['furled_map'], 'irons_spellbooks:furled_map_ancient', 1, -8, 0, 'Ancient Furled Map', 'Mapa antiguo', [
  'Variante de mayor riesgo/recompensa.',
], { hide: true });
q('furled_citadel', ['furled_map'], 'irons_spellbooks:furled_map_citadel', 1, -6, -1.5, 'Citadel Map', 'Ciudadela', [
  'Contenido de citadel. Ve preparado (comida Oasis + hechizos de escape).',
], { hide: true });
q('bone_key', ['furled_map'], 'irons_spellbooks:bone_key', 1, -4, -1.5, 'Bone Key', 'Llave de vault', [
  'Abre bone vaults. Loot de mid magic.',
], { hide: true });
q('decrepit_key', ['bone_key'], 'irons_spellbooks:decrepit_key', 1, -4, -3, 'Decrepit Key', 'Llave ruinosa', [
  'Otra llave de contenido estructurado.',
], { hide: true });
q('cinderous_key', ['decrepit_key'], 'irons_spellbooks:cinderous_soulcaller', 1, -2, -3, 'Cinderous Soulcaller', 'Llama al vault', [
  'Acceso a contenido cinderous. Late-ish danger.',
], { hide: true });
q('eldritch_ms', ['epic_ink'], 'irons_spellbooks:eldritch_manuscript', 1, 16, -3, 'Eldritch Manuscript', 'Saber prohibido', [
  'Documento late. Lee con cuidado (y con buen gear).',
], { hide: true });
q('ancient_frag', ['furled_ancient'], 'irons_spellbooks:ancient_knowledge_fragment', 2, -8, -1.5, 'Ancient Knowledge', 'Fragmento', [
  'Progresion de conocimiento antiguo / crafts especiales.',
], { hide: true });

// UTILITY MISC
q('shriving', ['arcane_anvil'], 'irons_spellbooks:shriving_stone', 1, 4, -6, 'Shriving Stone', 'Limpia hechizos', [
  'Quita hechizos de un libro para reespecificar. Muy util al cambiar de build.',
], { hide: true });
q('lesser_slot', ['diamond_book'], 'irons_spellbooks:lesser_spell_slot_upgrade', 1, 14, 0, 'Spell Slot Upgrade', '+1 slot', [
  'Amplia slots del libro. Prioriza si te ahogas en opciones.',
], { hide: true });
q('tincture_forget', ['cauldron'], 'irons_spellbooks:tincture_of_forgetfulness', 1, 2, -7.5, 'Tincture of Forgetfulness', 'Respec help', [
  'Ayuda a olvidar/resetear progresion magica segun tooltip.',
], { hide: true });
q('hogskin', ['cloth'], 'irons_spellbooks:hogskin', 8, 8, 4.5, 'Hogskin', 'Cuero especial', [
  'Material de crafting mid. Aparece en varias recetas de gear.',
], { hide: true });
q('fire_cloth', ['magic_cloth', 'fire_rune'], 'irons_spellbooks:fire_cloth', 4, 8, 6, 'Fire Cloth', 'Tela ignea', [
  'Componente de sets fire.',
], { hide: true });

// FINALE
q('finale', ['dragonskin_book', 'arcane_anvil', 'cooldown_ring', 'legendary_ink'], 'checkmark', 1, 20, -3, 'Archimago Oasis', "Iron's completo", [
  'Tienes libro alto, yunque, tinta legendaria y curios decentes.',
  'Especializate en 1-2 escuelas, monta un loadout para dragona/cataclysm y sigue explorando.',
  '&6Oasis:&r Magia paralela: vuelve a Malum, Ars o Occultism cuando quieras; la tech no te espera ni te bloquea.',
], { shape: 'hexagon', size: 2.0 });

console.log('Quest defs:', defs.length);

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const num = (n) => Number(n).toString();

let snbt = '{\n';
snbt += '\tdefault_hide_dependency_lines: false\n';
snbt += '\tdefault_quest_shape: ""\n';
snbt += '\tfilename: "irons_spells"\n';
snbt += `\tgroup: "${groupId}"\n`;
snbt += '\ticon: "irons_spellbooks:copper_spell_book"\n';
snbt += `\tid: "${chapterId}"\n`;
snbt += '\timages: [ ]\n';
snbt += '\torder_index: 1\n';
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

const oldIds = [
  '056CAC7A1908A3FB', '01FA04AE6B770D3A', '16285BA4AE30324B', '20C42841343DD706',
  '0482C3161B03B586', '0CF2CA72D3553F24', '1B96B3D57D7455D0',
  // reward/task ids from old chapter (lang shouldn't have them, but strip quest keys only)
];

let langLines = fs.readFileSync(langPath, 'utf8').split(/\r?\n/).filter((line) => {
  if (/^\s*[{}]\s*$/.test(line)) return false;
  if (line.includes(`chapter.${chapterId}.title:`)) return false;
  if (/quest\.[A-Fa-f0-9]{32}\./.test(line)) return false;
  return !oldIds.some((oid) => line.includes(`quest.${oid}.`));
});

let langAdd = `\tchapter.${chapterId}.title: "&d&lIron's Spells"\n`;
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
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/irons_spells.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
}
console.log('Synced. DONE irons quests=', defs.length);
