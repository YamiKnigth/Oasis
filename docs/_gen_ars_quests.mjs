import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const questsRoot = path.join(root, 'server/config/ftbquests/quests');
const chapterPath = path.join(questsRoot, 'chapters/ars_nouveau.snbt');
const langPath = path.join(questsRoot, 'lang/en_us.snbt');
const tableId = '8856416108613626146L';
const chapterId = 'B16FD6B089F2B240';
const groupId = '7726645EE79AB0A8';
const id = (key) => crypto.createHash('md5').update(`oasis-ars-${key}`).digest('hex').toUpperCase().slice(0, 16);

const defs = [];
const q = (key, deps, item, count, x, y, title, subtitle, desc, opts = {}) => {
  defs.push({ key, deps, item, count, x, y, title, subtitle, desc, ...opts });
};

// HUB
q('intro', [], 'checkmark', 1, 0, 0, 'Ars Nouveau', 'Source, glyphs y automatizacion magica', [
  'Ars Nouveau es magia de construccion de hechizos + automatizacion cozy (starbuncles, relays, jars).',
  '&6Oasis:&r Paralelo a Iron\'s y Malum. No gatea la tech. Empieza por el Worn Notebook y el Novice Spell Book.',
], { shape: 'gear', size: 2.0 });

q('notebook', ['intro'], 'ars_nouveau:worn_notebook', 1, 2, 0, 'Worn Notebook', 'Tu manual Ars', [
  'El libro guia del mod. Consultalo cuando una maquina no haga lo que esperas.',
]);
q('novice_book', ['notebook'], 'ars_nouveau:novice_spell_book', 1, 4, 0, 'Novice Spell Book', 'Primer grimorio Ars', [
  'Equipalo y abre la GUI de hechizos. Aqui ensamblas glyphs en formas + effects.',
  'Empieza simple: Projectile + Harm, o Touch + Break.',
]);
q('scribes', ['novice_book'], 'ars_nouveau:scribes_table', 1, 6, 0, 'Scribes Table', 'Aprende glyphs', [
  'Gasta experience + items para desbloquear glyphs en tu libro.',
  'Sin esta mesa, tu libro se queda corto.',
]);
q('blank_parchment', ['scribes'], 'ars_nouveau:blank_parchment', 8, 8, 0, 'Blank Parchment', 'Papel de hechizos', [
  'Base para spell parchments y algunos crafts de glyphs.',
]);
q('spell_parchment', ['blank_parchment'], 'ars_nouveau:spell_parchment', 4, 10, 0, 'Spell Parchment', 'Hechizo guardado', [
  'Guarda un hechizo del libro en un parchment para turrets / sharing.',
], { hide: true });
q('dominion', ['novice_book'], 'ars_nouveau:dominion_wand', 1, 4, 1.5, 'Dominion Wand', 'Configura TODO', [
  'La llave inglesa de Ars: enlaza jars, relays, turrets, containers y familiars.',
  'Click derecho / sneak-click para conectar origen -> destino.',
]);
q('dowsing', ['notebook'], 'ars_nouveau:dowsing_rod', 1, 2, 1.5, 'Dowsing Rod', 'Busca source', [
  'Detecta source nearby. Util al montar tu primera red.',
], { hide: true });

// SOURCE NETWORK
q('sec_source', ['dominion'], 'checkmark', 1, 4, -3, 'Source', 'La mana de Ars', [
  'Source alimenta apparatus, turrets, rituals y automatizacion.',
  'Genera con sourcelinks, almacena en jars, mueve con relays.',
], { shape: 'hexagon', size: 1.5 });
q('source_gem', ['sec_source'], 'ars_nouveau:source_gem', 16, 6, -3, 'Source Gem', 'Gema de source', [
  'Material base. Imbuement Chamber convierte lapis/amethyst en source gems.',
]);
q('imbuement', ['source_gem'], 'ars_nouveau:imbuement_chamber', 1, 8, -3, 'Imbuement Chamber', 'Crea source gems', [
  'Coloca items + pedestals adyacentes segun receta. Primer multiblock mental de Ars.',
]);
q('source_jar', ['sec_source'], 'ars_nouveau:source_jar', 4, 6, -4.5, 'Source Jar', 'Almacen de source', [
  'Tanque de source. Enlazalo con Dominion Wand a maquinas y relays.',
]);
q('bucket_source', ['source_jar'], 'ars_nouveau:bucket_of_source', 1, 8, -4.5, 'Bucket of Source', 'Source portatil', [
  'Mueve source a mano cuando aun no tienes relays.',
], { hide: true });
q('agronomic', ['source_jar'], 'ars_nouveau:agronomic_sourcelink', 1, 4, -4.5, 'Agronomic Sourcelink', 'Source de crops', [
  'Genera source cerca de cultivos. Perfecto para bases cozy Oasis.',
]);
q('volcanic', ['agronomic'], 'ars_nouveau:volcanic_sourcelink', 1, 4, -6, 'Volcanic Sourcelink', 'Source de calor', [
  'Quema fuel/lava adjacency para source. Buen ratio mid-game.',
], { hide: true });
q('mycelial', ['agronomic'], 'ars_nouveau:mycelial_sourcelink', 1, 2, -4.5, 'Mycelial Sourcelink', 'Source de hongos', [
  'Source desde mycelium/fungus setups.',
], { hide: true });
q('vitalic', ['agronomic'], 'ars_nouveau:vitalic_sourcelink', 1, 2, -6, 'Vitalic Sourcelink', 'Source de mobs', [
  'Source a partir de actividad de criaturas. Cuidado con farms eticas/lag.',
], { hide: true });
q('alchemical', ['volcanic'], 'ars_nouveau:alchemical_sourcelink', 1, 4, -7.5, 'Alchemical Sourcelink', 'Source de potiones', [
  'Convierte brewing en source. Sinergia con Wixie luego.',
], { hide: true });

// RELAYS
q('sec_relay', ['source_jar'], 'checkmark', 1, 10, -3, 'Relays', 'Red de source', [
  'Los relays mueven source entre jars y maquinas. Enlaza con Dominion Wand.',
], { shape: 'hexagon', size: 1.5 });
q('relay', ['sec_relay'], 'ars_nouveau:relay', 2, 12, -3, 'Relay', 'Transporte basico', [
  'Nodo de source. Conecta jar <-> jar o jar <-> apparatus.',
]);
q('relay_splitter', ['relay'], 'ars_nouveau:relay_splitter', 1, 14, -3, 'Relay Splitter', 'Reparte source', [
  'Divide source a multiples destinos.',
], { hide: true });
q('relay_deposit', ['relay'], 'ars_nouveau:relay_deposit', 1, 12, -4.5, 'Relay Deposit', 'Empuja a maquinas', [
  'Deposita source en inventarios/maquinas enlazadas.',
], { hide: true });
q('relay_collector', ['relay'], 'ars_nouveau:relay_collector', 1, 14, -4.5, 'Relay Collector', 'Recolecta source', [
  'Recoge source de jars cercanos hacia la red.',
], { hide: true });
q('relay_warp', ['relay'], 'ars_nouveau:relay_warp', 2, 12, -6, 'Warp Relay', 'Source a distancia', [
  'Pareja de relays para mover source lejos. Ideal bases grandes.',
], { hide: true });

// APPARATUS / CRAFTING
q('sec_craft', ['imbuement', 'source_jar'], 'checkmark', 1, 10, 0, 'Crafting magico', 'Apparatus y pedestals', [
  'El Enchanting Apparatus es la mesa de crafts avanzados de Ars.',
], { shape: 'hexagon', size: 1.5 });
q('apparatus', ['sec_craft'], 'ars_nouveau:enchanting_apparatus', 1, 12, 0, 'Enchanting Apparatus', 'Craft central', [
  'Bloque central. Rodealo con Arcane Pedestals + items de receta + source.',
]);
q('pedestal', ['apparatus'], 'ars_nouveau:arcane_pedestal', 8, 14, 0, 'Arcane Pedestal', 'Soportes de craft', [
  'Coloca los ingredientes alrededor del apparatus. Mas pedestals = crafts mas grandes.',
]);
q('arcane_core', ['pedestal'], 'ars_nouveau:arcane_core', 1, 16, 0, 'Arcane Core', 'Nucleo arcano', [
  'Componente/estructura para setups avanzados. Revisa el notebook.',
], { hide: true });
q('alteration', ['apparatus'], 'ars_nouveau:alteration_table', 1, 12, 1.5, 'Alteration Table', 'Threads de armadura', [
  'Aplica threads a armaduras Ars (sorcerer/battlemage/arcanist).',
]);
q('blank_thread', ['alteration'], 'ars_nouveau:blank_thread', 4, 14, 1.5, 'Blank Thread', 'Hilo vacio', [
  'Base para craft de threads (spellpower, warding, mana...).',
]);
q('magebloom', ['sec_craft'], 'ars_nouveau:magebloom', 16, 10, 1.5, 'Magebloom', 'Flor magica', [
  'Cultivo clave. Fiber -> muchos crafts de tela/armadura.',
]);
q('magebloom_fiber', ['magebloom'], 'ars_nouveau:magebloom_fiber', 16, 10, 3, 'Magebloom Fiber', 'Fibra', [
  'Procesa magebloom. Stockea para robes y threads.',
], { hide: true });
q('sourceberry', ['magebloom'], 'ars_nouveau:sourceberry_bush', 8, 8, 1.5, 'Sourceberry', 'Baya de source', [
  'Planta y come / craft food. Ambient cozy + utilidad.',
], { hide: true });

// SPELL BOOKS
q('sec_books', ['scribes', 'apparatus'], 'checkmark', 1, 16, -1.5, 'Spell Books', 'Novice -> Archmage', [
  'Sube de libro para mas glyphs slots y mejores hechizos.',
], { shape: 'hexagon', size: 1.5 });
q('apprentice_book', ['sec_books'], 'ars_nouveau:apprentice_spell_book', 1, 18, -1.5, 'Apprentice Spell Book', 'Libro medio', [
  'Mas espacio de glyphs. Objetivo natural tras los primeros crafts.',
]);
q('archmage_book', ['apprentice_book'], 'ars_nouveau:archmage_spell_book', 1, 20, -1.5, 'Archmage Spell Book', 'Libro alto', [
  'El grimorio top craftable. Monta combos AOE / utility serios.',
]);
q('caster_tome', ['apprentice_book'], 'ars_nouveau:caster_tome', 1, 18, 0, 'Caster Tome', 'Hechizo en tomo', [
  'Tomo con hechizo embebido. Bueno para hotbars o regalos al equipo.',
], { hide: true });

// GLYPHS - CORE FORMS / EFFECTS
q('sec_glyphs', ['scribes'], 'checkmark', 1, 6, 3, 'Glyphs esenciales', 'Formas y efectos', [
  'Los glyphs son piezas de Lego magicas. Forma (Projectile/Touch/...) + Effect + Augments.',
], { shape: 'hexagon', size: 1.5 });
q('blank_glyph', ['sec_glyphs'], 'ars_nouveau:blank_glyph', 8, 8, 3, 'Blank Glyph', 'Glyph vacio', [
  'Crafting component para muchos glyphs.',
]);
q('glyph_projectile', ['blank_glyph'], 'ars_nouveau:glyph_projectile', 1, 10, 2, 'Glyph: Projectile', 'Forma a distancia', [
  'Lanza el hechizo como proyectil. Tu primer forma de combate.',
]);
q('glyph_touch', ['blank_glyph'], 'ars_nouveau:glyph_touch', 1, 10, 3, 'Glyph: Touch', 'Forma melee', [
  'Aplica el efecto al bloquear/entidad que tocas. Ideal Break/Interact.',
]);
q('glyph_self', ['blank_glyph'], 'ars_nouveau:glyph_self', 1, 10, 4, 'Glyph: Self', 'Forma personal', [
  'Castea sobre ti. Heal, Leap, Glide, Shield-ish utilities.',
], { hide: true });
q('glyph_harm', ['glyph_projectile'], 'ars_nouveau:glyph_harm', 1, 12, 2, 'Glyph: Harm', 'Damage basico', [
  'Tu primer damage spell. Combina con Amplify / AOE luego.',
]);
q('glyph_break', ['glyph_touch'], 'ars_nouveau:glyph_break', 1, 12, 3, 'Glyph: Break', 'Pica bloques', [
  'Mineria magica. Fortune/AOE cambian el juego en caves.',
]);
q('glyph_heal', ['glyph_self'], 'ars_nouveau:glyph_heal', 1, 12, 4, 'Glyph: Heal', 'Curacion', [
  'Soporte esencial para exploracion Oasis.',
], { hide: true });
q('glyph_leap', ['glyph_self'], 'ars_nouveau:glyph_leap', 1, 12, 5.5, 'Glyph: Leap', 'Movilidad', [
  'Salto magico. Combina con Slowfall/Glide.',
], { hide: true });
q('glyph_amplify', ['glyph_harm'], 'ars_nouveau:glyph_amplify', 1, 14, 2, 'Glyph: Amplify', 'Mas poder', [
  'Augment de potencia. Sube coste de source: no spamees a ciegas.',
]);
q('glyph_aoe', ['glyph_break'], 'ars_nouveau:glyph_aoe', 1, 14, 3, 'Glyph: AOE', 'Area', [
  'Amplia el area del efecto. Mineria y combate agradecen.',
]);
q('glyph_accelerate', ['glyph_projectile'], 'ars_nouveau:glyph_accelerate', 1, 14, 1, 'Glyph: Accelerate', 'Mas velocidad', [
  'Proyectiles mas rapidos / casts mas agiles.',
], { hide: true });
q('glyph_blink', ['apprentice_book'], 'ars_nouveau:glyph_blink', 1, 18, 2, 'Glyph: Blink', 'Teleport corto', [
  'Movilidad mid. Cuidado con techos y lava.',
], { hide: true });
q('glyph_dispel', ['glyph_touch'], 'ars_nouveau:glyph_dispel', 1, 14, 4.5, 'Glyph: Dispel', 'Limpia efectos', [
  'Quita buffs/debuffs. Util vs brujos y status feos.',
], { hide: true });
q('glyph_pickup', ['glyph_aoe'], 'ars_nouveau:glyph_pickup', 1, 16, 3, 'Glyph: Pickup', 'Loot magnet', [
  'Recoge items. Combo minero clasico con Break+AOE.',
], { hide: true });
q('glyph_fortune', ['glyph_break'], 'ars_nouveau:glyph_fortune', 1, 14, 5.5, 'Glyph: Fortune', 'Mas drops', [
  'Fortune magico en Break. Excelente para ores.',
], { hide: true });
q('glyph_craft', ['apparatus'], 'ars_nouveau:glyph_craft', 1, 16, 1.5, 'Glyph: Craft', 'Crafteo magico', [
  'Efecto de craft. Abre puertas a automatizacion creativa.',
], { hide: true });

// ESSENCES
q('sec_essence', ['imbuement'], 'checkmark', 1, 8, -6, 'Essences', 'Elementos Ars', [
  'Essences potencian glyphs y crafts. Se hacen en Imbuement Chamber.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('fire_essence', ['sec_essence'], 'ars_nouveau:fire_essence', 4, 10, -6, 'Fire Essence', 'Fuego', [
  'Essence ignea para glyphs/crafts fire.',
], { hide: true });
q('water_essence', ['sec_essence'], 'ars_nouveau:water_essence', 4, 10, -7.5, 'Water Essence', 'Agua', [
  'Essence acuatica.',
], { hide: true });
q('earth_essence', ['sec_essence'], 'ars_nouveau:earth_essence', 4, 12, -6, 'Earth Essence', 'Tierra', [
  'Essence terrea.',
], { hide: true });
q('air_essence', ['sec_essence'], 'ars_nouveau:air_essence', 4, 12, -7.5, 'Air Essence', 'Aire', [
  'Essence aerea. Movilidad y wind spells.',
], { hide: true });
q('abjuration', ['sec_essence'], 'ars_nouveau:abjuration_essence', 4, 8, -7.5, 'Abjuration Essence', 'Proteccion', [
  'Essence de abjuracion / defensa.',
], { hide: true });
q('conjuration', ['sec_essence'], 'ars_nouveau:conjuration_essence', 4, 8, -9, 'Conjuration Essence', 'Invocacion', [
  'Essence de conjuration.',
], { hide: true });
q('manipulation', ['sec_essence'], 'ars_nouveau:manipulation_essence', 4, 10, -9, 'Manipulation Essence', 'Control', [
  'Essence de manipulacion de bloques/entidades.',
], { hide: true });

// ARMOR + THREADS
q('sec_armor', ['magebloom_fiber', 'alteration'], 'checkmark', 1, 16, 3, 'Armaduras Ars', 'Sorcerer / Battlemage / Arcanist', [
  'Tres lineas de tunica. Los threads en Alteration Table definen tu build.',
], { shape: 'hexagon', size: 1.5 });
q('sorcerer_hood', ['sec_armor'], 'ars_nouveau:sorcerer_hood', 1, 18, 3, 'Sorcerer Hood', 'Caster cloth', [
  'Set sorcerer: magia primero. Empieza por la hood.',
]);
q('sorcerer_robes', ['sorcerer_hood'], 'ars_nouveau:sorcerer_robes', 1, 20, 3, 'Sorcerer Robes', 'Pechera sorcerer', [
  'Nucleo del set sorcerer.',
]);
q('battlemage_hood', ['sec_armor'], 'ars_nouveau:battlemage_hood', 1, 18, 4.5, 'Battlemage Hood', 'Hibrido', [
  'Mas defensa que sorcerer, sigue casteando.',
], { hide: true });
q('arcanist_hood', ['sorcerer_robes'], 'ars_nouveau:arcanist_hood', 1, 22, 3, 'Arcanist Hood', 'Tier alto', [
  'Linea arcanist late. Mejor base para threads top.',
]);
q('thread_spellpower', ['blank_thread'], 'ars_nouveau:thread_spellpower', 1, 16, 4.5, 'Thread: Spellpower', 'Mas dano magico', [
  'Thread ofensivo clasico. Metelo en pechera/hood.',
]);
q('thread_mana', ['blank_thread'], 'ars_nouveau:thread_magic_capacity', 1, 16, 6, 'Thread: Magic Capacity', 'Mas mana', [
  'Mas reserva. Combina con amuletos de mana.',
], { hide: true });
q('thread_warding', ['blank_thread'], 'ars_nouveau:thread_warding', 1, 14, 4.5, 'Thread: Warding', 'Defensa', [
  'Supervivencia para casters de primera linea.',
], { hide: true });
q('thread_repair', ['blank_thread'], 'ars_nouveau:thread_repairing', 1, 14, 6, 'Thread: Repairing', 'Auto-repair', [
  'Repara equipo con el tiempo / condiciones del thread.',
], { hide: true });

// FAMILIARS / CHARMS
q('sec_familiars', ['apparatus', 'source_jar'], 'checkmark', 1, 6, 6, 'Familiars', 'Starbuncle y amigos', [
  'Charms invocan helpers. Enlaza con Dominion Wand a chests y beds.',
], { shape: 'hexagon', size: 1.5 });
q('starbuncle', ['sec_familiars'], 'ars_nouveau:starbuncle_charm', 1, 8, 6, 'Starbuncle Charm', 'Item logistics', [
  'El hopper adorable. Lleva items entre inventarios segun preferencias.',
  'Base de la automatizacion cozy de Ars.',
]);
q('whirlisprig', ['starbuncle'], 'ars_nouveau:whirlisprig_charm', 1, 10, 6, 'Whirlisprig Charm', 'Farm helper', [
  'Ayuda con crops/nature. Perfecto junto a Agronomic Sourcelink.',
], { hide: true });
q('drygmy', ['starbuncle'], 'ars_nouveau:drygmy_charm', 1, 8, 7.5, 'Drygmy Charm', 'Mob drops', [
  'Genera drops cerca de mobs en containment. Gran farm pasiva.',
], { hide: true });
q('wixie', ['starbuncle'], 'ars_nouveau:wixie_charm', 1, 10, 7.5, 'Wixie Charm', 'Crafting / potions', [
  'Automatiza crafts y brewing con Wixie Cauldron.',
], { hide: true });
q('wixie_cauldron', ['wixie'], 'ars_nouveau:wixie_cauldron', 1, 12, 7.5, 'Wixie Cauldron', 'Estacion Wixie', [
  'Pon recetas / potions para que la Wixie trabaje.',
], { hide: true });
q('bookwyrm', ['starbuncle'], 'ars_nouveau:bookwyrm_charm', 1, 6, 7.5, 'Bookwyrm Charm', 'Storage lectern', [
  'Ayuda con el Storage Lectern / archivado de items.',
], { hide: true });
q('amethyst_golem', ['starbuncle'], 'ars_nouveau:amethyst_golem_charm', 1, 6, 9, 'Amethyst Golem', 'Budding helper', [
  'Cuida amethyst buds. Source gems forever.',
], { hide: true });
q('drygmy_stone', ['drygmy'], 'ars_nouveau:drygmy_stone', 1, 8, 9, 'Drygmy Stone', 'Altar drygmy', [
  'Estructura/spot para drygmys. Lee el notebook.',
], { hide: true });

// TURRETS / AUTOMATION COMBAT
q('sec_turret', ['spell_parchment', 'source_jar'], 'checkmark', 1, 20, 0, 'Torretas', 'Hechizos automaticos', [
  'Carga un Spell Parchment en la turret y alimenta source.',
], { shape: 'hexagon', size: 1.25 });
q('basic_turret', ['sec_turret'], 'ars_nouveau:basic_spell_turret', 1, 22, 0, 'Basic Spell Turret', 'Torreta simple', [
  'Dispara el hechizo del parchment. Defensa de base / farms.',
]);
q('timer_turret', ['basic_turret'], 'ars_nouveau:timer_spell_turret', 1, 24, 0, 'Timer Spell Turret', 'Con temporizador', [
  'Dispara en intervalos. Ideal riego magico / clock spells.',
], { hide: true });
q('rotating_turret', ['basic_turret'], 'ars_nouveau:rotating_spell_turret', 1, 22, 1.5, 'Rotating Turret', 'Gira y dispara', [
  'Cubre angulos. Buena para patios de base.',
], { hide: true });
q('spell_prism', ['basic_turret'], 'ars_nouveau:spell_prism', 2, 24, 1.5, 'Spell Prism', 'Redirige hechizos', [
  'Desvia proyectiles magicos. Trucos de redireccion fun.',
], { hide: true });

// RITUALS
q('sec_rituals', ['apparatus', 'source_jar'], 'checkmark', 1, 0, -3, 'Rituales', 'Brazier + tablets', [
  'El Ritual Brazier ejecuta ritual tablets con source.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('brazier', ['sec_rituals'], 'ars_nouveau:ritual_brazier', 1, -2, -3, 'Ritual Brazier', 'Mesa de rituales', [
  'Coloca la tablet, alimenta source, enciende el ritual.',
], { hide: true });
q('ritual_flight', ['brazier'], 'ars_nouveau:ritual_flight', 1, -4, -3, 'Ritual: Flight', 'Vuelo de zona', [
  'Vuelo en area. Muy cozy para builds grandes.',
], { hide: true });
q('ritual_scrying', ['brazier'], 'ars_nouveau:ritual_scrying', 1, -2, -4.5, 'Ritual: Scrying', 'Busca recursos', [
  'Revela bloques/recursos segun setup. Exploracion smart.',
], { hide: true });
q('ritual_overgrowth', ['brazier'], 'ars_nouveau:ritual_overgrowth', 1, -4, -4.5, 'Ritual: Overgrowth', 'Crece todo', [
  'Acelera crecimiento. Synergy con farms FD/Oasis.',
], { hide: true });
q('ritual_warping', ['brazier'], 'ars_nouveau:ritual_warping', 1, -2, -6, 'Ritual: Warping', 'Warp ritual', [
  'Utilidad de teletransporte/ritual warp. Lee condiciones en notebook.',
], { hide: true });
q('ritual_sunrise', ['brazier'], 'ars_nouveau:ritual_sunrise', 1, 0, -4.5, 'Ritual: Sunrise', 'Omite la noche', [
  'Fuerza amanecer. Comodo en bases sin sleep spam.',
], { hide: true });
q('warp_scroll', ['apprentice_book'], 'ars_nouveau:warp_scroll', 2, 18, -3, 'Warp Scroll', 'TP a punto', [
  'Graba una ubicacion y teletransportate. Stable Warp Scroll es la version segura.',
], { hide: true });
q('stable_warp', ['warp_scroll'], 'ars_nouveau:stable_warp_scroll', 1, 20, -3, 'Stable Warp Scroll', 'TP fiable', [
  'Warp scroll estable para rutas frecuentes (base <-> farm).',
], { hide: true });

// GEAR / CURIOS
q('sec_gear', ['apparatus'], 'checkmark', 1, 0, 3, 'Gear y curios', 'Espadas, amuletos, cinturones', [
  'Equipo Ars para combate hibrido y QoL.',
], { shape: 'hexagon', size: 1.25 });
q('enchanters_sword', ['sec_gear'], 'ars_nouveau:enchanters_sword', 1, -2, 3, "Enchanter's Sword", 'Melee magica', [
  'Espada que casteá hechizos. Hibrido melee/caster.',
]);
q('enchanters_shield', ['enchanters_sword'], 'ars_nouveau:enchanters_shield', 1, -2, 4.5, "Enchanter's Shield", 'Bloqueo magico', [
  'Escudo del kit enchanter.',
], { hide: true });
q('enchanters_gauntlet', ['sec_gear'], 'ars_nouveau:enchanters_gauntlet', 1, 0, 4.5, "Enchanter's Gauntlet", 'Cast en mano', [
  'Focus de casteado estilo gauntlet.',
], { hide: true });
q('spell_bow', ['sec_gear'], 'ars_nouveau:spell_bow', 1, 2, 3, 'Spell Bow', 'Arco magico', [
  'Dispara hechizos como flechas. Muy divertido en open biomes.',
], { hide: true });
q('amulet_mana', ['sec_gear'], 'ars_nouveau:amulet_of_mana_regen', 1, -4, 3, 'Amulet of Mana Regen', 'Regen', [
  'Curio de regeneracion de mana/source feel.',
]);
q('amulet_boost', ['amulet_mana'], 'ars_nouveau:amulet_of_mana_boost', 1, -4, 4.5, 'Amulet of Mana Boost', 'Mas mana', [
  'Sube capacidad. Stacka con threads de capacity.',
], { hide: true });
q('belt_levitation', ['amulet_mana'], 'ars_nouveau:belt_of_levitation', 1, -4, 6, 'Belt of Levitation', 'Flota', [
  'Cinturon de levitacion. Exploracion vertical easy.',
], { hide: true });
q('jar_light', ['sec_gear'], 'ars_nouveau:jar_of_light', 1, 0, 6, 'Jar of Light', 'Luz portable', [
  'Luz sin antorchas. Caves cozy.',
], { hide: true });
q('void_jar', ['jar_light'], 'ars_nouveau:void_jar', 1, 2, 6, 'Void Jar', 'Trash magico', [
  'Void items. Limpia junk de farms.',
], { hide: true });
q('wand', ['novice_book'], 'ars_nouveau:wand', 1, 2, 4.5, 'Wand', 'Cast implement', [
  'Alternativa ligera al libro para hechizos guardados.',
], { hide: true });

// STORAGE
q('sec_storage', ['bookwyrm'], 'checkmark', 1, 4, 9, 'Storage Ars', 'Lecterns y repository', [
  'Sistema de almacenamiento magico. Complementa Sophisticated/AE2, no los reemplaza.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('storage_lectern', ['sec_storage'], 'ars_nouveau:storage_lectern', 1, 6, 10.5, 'Storage Lectern', 'Indice magico', [
  'Lectern que indexa chests enlazados. Bookwyrms ayudan.',
], { hide: true });
q('repository', ['storage_lectern'], 'ars_nouveau:repository', 4, 8, 10.5, 'Repository', 'Contenedor Ars', [
  'Almacen del ecosistema Ars.',
], { hide: true });
q('mob_jar', ['sec_familiars'], 'ars_nouveau:mob_jar', 2, 4, 7.5, 'Mob Jar', 'Captura mobs', [
  'Encierra mobs para drygmy farms o decor.',
], { hide: true });

// WILDEN / ADVENTURE
q('sec_wilden', ['archmage_book'], 'checkmark', 1, 22, -3, 'Wilden', 'Contenido hostil', [
  'Facetas mas agresivas de Ars: tribute, summons y loot.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('wilden_horn', ['sec_wilden'], 'ars_nouveau:wilden_horn', 2, 24, -3, 'Wilden Horn', 'Trofeo wilden', [
  'Drop/craft component de wilden content.',
], { hide: true });
q('wilden_tribute', ['wilden_horn'], 'ars_nouveau:wilden_tribute', 1, 26, -3, 'Wilden Tribute', 'Ofrenda', [
  'Item de progresion/ritual wilden. Preparate antes de invocar.',
], { hide: true });
q('ritual_wilden', ['wilden_tribute', 'brazier'], 'ars_nouveau:ritual_wilden_summon', 1, 26, -4.5, 'Ritual: Wilden Summon', 'Invocacion', [
  'Contenido de invocar wilden. No es cozy: ve con comida y hechizos de escape.',
], { hide: true });

// FINALE
q('finale', ['archmage_book', 'starbuncle', 'relay', 'arcanist_hood'], 'checkmark', 1, 24, -1.5, 'Archmage Oasis', 'Ars Nouveau completo', [
  'Tienes libro alto, red de source, familiars y armadura con threads.',
  'Automatiza farms cozy con starbuncles/whirlisprigs y usa turrets para defensa.',
  '&6Oasis:&r Sigue con Occultism o Iron\'s cuando quieras; Ars no bloquea Create/IE/AE2/Mek.',
], { shape: 'hexagon', size: 2.0 });

console.log('Quest defs:', defs.length);

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const num = (n) => Number(n).toString();

let snbt = '{\n';
snbt += '\tdefault_hide_dependency_lines: false\n';
snbt += '\tdefault_quest_shape: ""\n';
snbt += '\tfilename: "ars_nouveau"\n';
snbt += `\tgroup: "${groupId}"\n`;
snbt += '\ticon: "ars_nouveau:novice_spell_book"\n';
snbt += `\tid: "${chapterId}"\n`;
snbt += '\timages: [ ]\n';
snbt += '\torder_index: 2\n';
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

// Also create a stub reward table matching chapter filename (loot can stay placeholder apple like irons)
const rewardTablePath = path.join(questsRoot, 'reward_tables/ars_nouveau.snbt');
const rewardTableId = crypto.createHash('md5').update('oasis-reward-ars').digest('hex').toUpperCase().slice(0, 16);
if (!fs.existsSync(rewardTablePath)) {
  fs.writeFileSync(rewardTablePath, `{\n\tid: "${rewardTableId}"\n\tloot_size: 1\n\torder_index: 12\n\trewards: [{ id: "${id('rt-apple')}", item: { count: 1, id: "minecraft:apple" } }]\n}\n`, 'utf8');
  console.log('Created reward table stub');
}

let langLines = fs.readFileSync(langPath, 'utf8').split(/\r?\n/).filter((line) => {
  if (/^\s*[{}]\s*$/.test(line)) return false;
  if (line.includes(`chapter.${chapterId}.title:`)) return false;
  if (/quest\.[A-Fa-f0-9]{32}\./.test(line)) return false;
  return true;
});

let langAdd = `\tchapter.${chapterId}.title: "&5&lArs Nouveau"\n`;
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
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/ars_nouveau.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
  if (fs.existsSync(rewardTablePath)) {
    fs.copyFileSync(rewardTablePath, path.join(dest, 'reward_tables/ars_nouveau.snbt'));
  }
}
console.log('Synced. DONE ars quests=', defs.length);
