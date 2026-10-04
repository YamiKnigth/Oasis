import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const questsRoot = path.join(root, 'server/config/ftbquests/quests');
const chapterPath = path.join(questsRoot, 'chapters/cocina_bbq.snbt');
const langPath = path.join(questsRoot, 'lang/en_us.snbt');
const tableId = '2396298412171143468L';
const chapterId = '1BA0E6793148BB97';
const groupId = '22F7FAA010DA678A';
const id = (key) => crypto.createHash('md5').update(`oasis-cocina-${key}`).digest('hex').toUpperCase().slice(0, 16);

const defs = [];
const q = (key, deps, item, count, x, y, title, subtitle, desc, opts = {}) => {
  defs.push({ key, deps, item, count, x, y, title, subtitle, desc, ...opts });
};

// HUB
q('intro', [], 'checkmark', 1, 0, 0, 'Cocina y BBQ', 'El corazon cozy de Oasis', [
  'Comer bien es tan valido como fabricar. Esta guia cubre Farmer Delight, la parrilla, fermentos, addons y el puente a Create.',
  '&6Oasis:&r Polymorph ayuda si ves recetas de comida conflictivas en JEI. Slice and Dice / Create Food conectan con el capitulo Create.',
], { shape: 'gear', size: 2.0 });

// FD TOOLS
q('board', ['intro'], 'farmersdelight:cutting_board', 1, 2, 0, 'Cutting Board', 'Picar con cuchillo', [
  'Coloca la tabla y usa un cuchillo (click derecho). Corta carnes, vegetales y pan.',
  'Es la estacion #1 del early cozy.',
]);
q('flint_knife', ['board'], 'farmersdelight:flint_knife', 1, 4, -1, 'Cuchillo de pedernal', 'Primer filo', [
  'Barato y suficiente para empezar. Mejora luego a hierro/diamante.',
], { hide: true });
q('iron_knife', ['board'], 'farmersdelight:iron_knife', 1, 4, 0, 'Cuchillo de hierro', 'Picar en serio', [
  'Durabilidad decente para farms diarias. Necesario junto a la cutting board.',
]);
q('diamond_knife', ['iron_knife'], 'farmersdelight:diamond_knife', 1, 6, 0, 'Cuchillo de diamante', 'Filo durable', [
  'Para cuando ya cocinas a diario. Opcional early, comodo midgame.',
], { hide: true });
q('stove', ['board'], 'farmersdelight:stove', 1, 2, 2, 'Stove', 'Fuego de cocina', [
  'Sustituto cozy del campfire/furnace para sartenes y ollas. Calienta el Cooking Pot y Skillet.',
]);
q('pot', ['stove'], 'farmersdelight:cooking_pot', 1, 4, 2, 'Cooking Pot', 'Guisos y salsas', [
  'Colocala sobre el stove (o heat source). Combina bowls + ingredientes para stews y sauces.',
  'Guarda el heat: sin fuego debajo no cocina.',
]);
q('skillet', ['stove'], 'farmersdelight:skillet', 1, 4, 3.5, 'Skillet', 'Sarten a mano o en stove', [
  'Puedes usarla como arma improvisada o cocinar sobre el stove. Ideal para bacon y salteados.',
], { hide: true });
q('cabinet', ['board'], 'farmersdelight:oak_cabinet', 2, 2, -1.5, 'Cabinet', 'Despensa decorativa', [
  'Almacenamiento tematico de cocina. Hay variantes por madera.',
], { hide: true });
q('basket', ['cabinet'], 'farmersdelight:wooden_basket', 2, 0, -1.5, 'Basket', 'Cosecha comoda', [
  'Recoge cultivos con estilo. Hay version bamboo tambien.',
], { hide: true });

// CROPS
q('sec_crops', ['board'], 'checkmark', 1, 8, 0, 'Huerta FD', 'Tomate, cebolla, col, arroz', [
  'Siembra los cultivos de Farmer Delight. Organic Compost -> Rich Soil acelera farms.',
], { shape: 'hexagon', size: 1.5 });
q('tomato', ['sec_crops'], 'farmersdelight:tomato', 16, 10, -1, 'Tomate', 'Base de salsas', [
  'Crece en vines. Corta en la board para slices / sauce.',
]);
q('onion', ['sec_crops'], 'farmersdelight:onion', 16, 10, 0, 'Cebolla', 'Aromatico esencial', [
  'Ingrediente de stews, wraps y BBQ marinades.',
]);
q('cabbage', ['sec_crops'], 'farmersdelight:cabbage', 16, 10, 1, 'Col', 'Rolls y ensaladas', [
  'Corta hojas en la board. Clave para cabbage rolls y dumplings.',
]);
q('rice', ['sec_crops'], 'farmersdelight:rice', 16, 12, 0, 'Arroz', 'Farms de agua', [
  'Se planta en farmland inundado. Base de fried rice y sushi-style meals.',
]);
q('compost', ['sec_crops'], 'farmersdelight:organic_compost', 8, 8, 1.5, 'Organic Compost', 'Abono FD', [
  'Hecho con leftovers. Con tiempo/condiciones se vuelve Rich Soil.',
], { hide: true });
q('rich_soil', ['compost'], 'farmersdelight:rich_soil', 8, 8, 3, 'Rich Soil', 'Mejor farmland', [
  'Suelo rico para cultivos FD. Vale la pena para granjas permanentes.',
], { hide: true });

// MEATS / CUTS
q('sec_meat', ['iron_knife'], 'checkmark', 1, 6, 2, 'Carnes y cortes', 'Board + cuchillo', [
  'Pica carnes en la cutting board para bacon, minced beef, cuts de pollo y pescado.',
], { shape: 'hexagon', size: 1.25 });
q('bacon', ['sec_meat'], 'farmersdelight:bacon', 8, 8, 2, 'Bacon', 'Cerdo en tiras', [
  'Corta porkchop. Ideal en skillet y sandwiches.',
]);
q('minced', ['sec_meat'], 'farmersdelight:minced_beef', 8, 8, 3.5, 'Minced Beef', 'Carne molida', [
  'Base de beef patty / hamburguesas. Cocina en pot o skillet segun receta.',
]);
q('patty', ['minced'], 'farmersdelight:beef_patty', 4, 10, 3.5, 'Beef Patty', 'Hamburguesa lista', [
  'Cocina el minced beef. Combinalo en hamburger.',
]);
q('chicken_cuts', ['sec_meat'], 'farmersdelight:chicken_cuts', 8, 6, 3.5, 'Chicken Cuts', 'Pollo porcionado', [
  'Mejor uso del pollo para soups y sandwiches.',
], { hide: true });
q('ham', ['bacon'], 'farmersdelight:ham', 2, 10, 2, 'Ham', 'Pieza grande', [
  'Para Honey Glazed Ham feast. Reserva uno para la mesa de reunion.',
], { hide: true });

// POT MEALS
q('sec_pot', ['pot', 'tomato', 'onion'], 'checkmark', 1, 12, 2, 'Olla y guisos', 'Comfort food', [
  'El Cooking Pot brilla con stews y broths. Lleva bowls.',
], { shape: 'hexagon', size: 1.5 });
q('sauce', ['sec_pot'], 'farmersdelight:tomato_sauce', 4, 14, 1, 'Tomato Sauce', 'Salsa base', [
  'Tomates procesados. Sirve para pastas y platos compuestos.',
]);
q('beef_stew', ['sec_pot'], 'farmersdelight:beef_stew', 2, 14, 2.5, 'Beef Stew', 'Guiso clasico', [
  'Alto saturacion. Perfecto post-exploracion.',
]);
q('chicken_soup', ['sec_pot'], 'farmersdelight:chicken_soup', 2, 14, 4, 'Chicken Soup', 'Sopa reconfortante', [
  'Buena comida early/mid. Facil de spamear con chicken cuts.',
], { hide: true });
q('veg_soup', ['sec_pot'], 'farmersdelight:vegetable_soup', 2, 16, 2.5, 'Vegetable Soup', 'Sin carne', [
  'Usa la huerta. Ideal si priorizas farms vegetales.',
], { hide: true });
q('noodle', ['sec_pot', 'rice'], 'farmersdelight:noodle_soup', 2, 16, 4, 'Noodle Soup', 'Caldo con fideos', [
  'Plato mid de olla. Buen target de automatizacion luego.',
], { hide: true });
q('fried_rice', ['sec_pot', 'rice'], 'farmersdelight:fried_rice', 2, 16, 1, 'Fried Rice', 'Arroz salteado', [
  'Aprovecha rice farms. Muy eficiente en hambre/saturacion.',
]);
q('dumplings', ['sec_pot', 'cabbage'], 'farmersdelight:dumplings', 4, 18, 2.5, 'Dumplings', 'Bocados de olla', [
  'Stackables comodos para explorar.',
]);

// SANDWICHES / WRAPS
q('sec_sandwich', ['patty', 'cabbage'], 'checkmark', 1, 12, 5.5, 'Sandwiches y wraps', 'Comida de viaje', [
  'Monta panes y wraps para salir del base sin ollas.',
], { shape: 'hexagon', size: 1.25 });
q('burger', ['sec_sandwich'], 'farmersdelight:hamburger', 2, 14, 5.5, 'Hamburger', 'Icono FD', [
  'Patty + pan + vegetales. El snack Oasis por excelencia.',
]);
q('bacon_sand', ['sec_sandwich', 'bacon'], 'farmersdelight:bacon_sandwich', 2, 14, 7, 'Bacon Sandwich', 'Desayuno/explorar', [
  'Rapido y saturante.',
], { hide: true });
q('mutton_wrap', ['sec_sandwich'], 'farmersdelight:mutton_wrap', 2, 16, 5.5, 'Mutton Wrap', 'Wrap de cordero', [
  'Usa cabbage leaves como wrap.',
], { hide: true });
q('cabbage_rolls', ['sec_sandwich', 'cabbage'], 'farmersdelight:cabbage_rolls', 4, 16, 7, 'Cabbage Rolls', 'Rollitos', [
  'Buen uso de col + carne picada.',
], { hide: true });

// FEASTS
q('sec_feast', ['ham', 'pot'], 'checkmark', 1, 18, 0, 'Festines FD', 'Comida de reunion', [
  'Bloques de festin para el grupo: coloca, corta porciones, comparte.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('roast_chicken', ['sec_feast'], 'farmersdelight:roast_chicken_block', 1, 20, 0, 'Roast Chicken', 'Pollo de mesa', [
  'Festin clasico. Sirve porciones a todos.',
], { hide: true });
q('honey_ham', ['sec_feast'], 'farmersdelight:honey_glazed_ham_block', 1, 20, 1.5, 'Honey Glazed Ham', 'Festín dulce-salado', [
  'El plato de celebracion. Ideal post-aventura en multi.',
], { hide: true });
q('shepherds', ['sec_feast'], 'farmersdelight:shepherds_pie_block', 1, 20, -1.5, 'Shepherd Pie', 'Pastel salado', [
  'Otro festin para variar el menu de base.',
], { hide: true });
q('stuffed_pumpkin', ['sec_feast'], 'farmersdelight:stuffed_pumpkin_block', 1, 22, 0, 'Stuffed Pumpkin', 'Otono cozy', [
  'Festin vegetal/otonal.',
], { hide: true });

// DESSERTS
q('pie_crust', ['board'], 'farmersdelight:pie_crust', 2, 6, -3, 'Pie Crust', 'Base de postres', [
  'Masa para tartas FD. Combina con frutas/chocolate.',
], { hide: true });
q('apple_pie', ['pie_crust'], 'farmersdelight:apple_pie', 1, 8, -3, 'Apple Pie', 'Postre vanilla-plus', [
  'Buena saturacion y vibes cozy.',
], { hide: true });
q('cheesecake', ['pie_crust'], 'farmersdelight:sweet_berry_cheesecake', 1, 8, -4.5, 'Sweet Berry Cheesecake', 'Tarta de bayas', [
  'Postre con sweet berries.',
], { hide: true });
q('choco_pie', ['pie_crust'], 'farmersdelight:chocolate_pie', 1, 6, -4.5, 'Chocolate Pie', 'Chocolate FD', [
  'Para cerrar una cena de reunion.',
], { hide: true });

// BBQ
q('sec_bbq', ['stove', 'iron_knife'], 'checkmark', 1, 2, 5.5, 'Barbeque Delight', 'Carnita asada', [
  'El pilar BBQ de Oasis: parrilla, skewers y salsas.',
], { shape: 'hexagon', size: 1.75 });
q('grill', ['sec_bbq'], 'barbequesdelight:grill', 1, 4, 5.5, 'Grill', 'La parrilla', [
  'Estacion central del addon. Cocina skewers y da el vibe de asado.',
]);
q('bbq_basin', ['grill'], 'barbequesdelight:basin', 1, 4, 7, 'BBQ Basin', 'Apoyo de parrilla', [
  'Complemento del grill para preparar/servir.',
], { hide: true });
q('tray', ['grill'], 'barbequesdelight:tray', 1, 2, 7, 'Tray', 'Bandeja', [
  'Util para manejar comida de la parrilla.',
], { hide: true });
q('raw_beef_skewer', ['grill', 'onion'], 'barbequesdelight:raw_beef_skewer', 4, 6, 5.5, 'Raw Beef Skewer', 'Brocheta cruda', [
  'Arma skewers con carne + extras. Luego a la parrilla.',
]);
q('grilled_beef', ['raw_beef_skewer'], 'barbequesdelight:grilled_beef_skewer', 4, 8, 5.5, 'Grilled Beef Skewer', 'Brocheta lista', [
  'El snack de asado. Haz varias para el grupo.',
]);
q('raw_chicken_skewer', ['grill'], 'barbequesdelight:raw_chicken_skewer', 4, 6, 7, 'Raw Chicken Skewer', 'Pollo al palo', [
  'Variedad de brocheta. Misma idea: raw -> grill.',
], { hide: true });
q('grilled_chicken', ['raw_chicken_skewer'], 'barbequesdelight:grilled_chicken_skewer', 4, 8, 7, 'Grilled Chicken Skewer', 'Pollo asado', [
  'Alterna carnes para no aburrir el menu.',
], { hide: true });
q('raw_veg_skewer', ['grill', 'tomato'], 'barbequesdelight:raw_vegetable_skewer', 4, 6, 8.5, 'Raw Veggie Skewer', 'Opcion vegetal', [
  'Brochetas de vegetales para variedad cozy.',
], { hide: true });
q('grilled_veg', ['raw_veg_skewer'], 'barbequesdelight:grilled_vegetable_skewer', 4, 8, 8.5, 'Grilled Veggie Skewer', 'Verduras a la parrilla', [
  'Ligera y tematica de reunion.',
], { hide: true });
q('chili', ['grill'], 'barbequesdelight:chili_powder', 4, 4, 8.5, 'Chili Powder', 'Picante', [
  'Condimento BBQ. Usa en salsas y marinados (JEI).',
], { hide: true });
q('cumin', ['grill'], 'barbequesdelight:cumin_powder', 4, 2, 8.5, 'Cumin Powder', 'Comino', [
  'Otro seasoning clave del addon.',
], { hide: true });
q('pepper', ['grill'], 'barbequesdelight:pepper_powder', 4, 0, 8.5, 'Pepper Powder', 'Pimienta', [
  'Tercer polvo basico de condimento.',
], { hide: true });
q('bbq_sauce', ['chili', 'cumin'], 'barbequesdelight:barbeque_sauce', 2, 4, 10, 'Barbeque Sauce', 'Salsa BBQ', [
  'Salsa firma del mod. Mejora platos y wraps.',
], { hide: true });
q('kebab_wrap', ['grilled_beef'], 'barbequesdelight:kebab_wrap', 2, 10, 5.5, 'Kebab Wrap', 'Asado para llevar', [
  'Envuelve la brocheta. Comida de excursion post-asado.',
]);
q('kebab_sandwich', ['kebab_wrap'], 'barbequesdelight:kebab_sandwich', 2, 12, 5.5, 'Kebab Sandwich', 'Version sandwich', [
  'Otra forma de servir el asado. Mira JEI por variantes.',
], { hide: true });
q('bibimbap', ['grill', 'rice'], 'barbequesdelight:bibimbap', 2, 10, 7, 'Bibimbap', 'Bowl del addon', [
  'Plato compuesto BBQ/FD-style. Buen hito mid del capitulo.',
], { hide: true });

// BREWIN
q('sec_brew', ['pot'], 'checkmark', 1, 0, 4, 'Brewin and Chewin', 'Keg, quesos y tragos', [
  'Fermentacion cozy: bebidas, encurtidos y ruedas de queso.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('keg', ['sec_brew'], 'brewinandchewin:keg', 1, -2, 4, 'Keg', 'Corazon del fermento', [
  'Controla temperatura (fuego/hielo/biome). Fermenta drinks y foods.',
], { hide: true });
q('tankard', ['keg'], 'brewinandchewin:tankard', 2, -2, 5.5, 'Tankard', 'Vaso de taberna', [
  'Para servir bebidas del keg.',
], { hide: true });
q('ice_crate', ['keg'], 'brewinandchewin:ice_crate', 1, -4, 4, 'Ice Crate', 'Enfria el keg', [
  'Ayuda a recetas que piden frio.',
], { hide: true });
q('beer', ['keg'], 'brewinandchewin:beer', 2, -4, 5.5, 'Beer', 'Trago basico', [
  'Primera bebida tipica del keg.',
], { hide: true });
q('mead', ['keg'], 'brewinandchewin:mead', 2, -4, 7, 'Mead', 'Hidromiel', [
  'Bebida con miel. Muy cozy.',
], { hide: true });
q('vodka', ['keg'], 'brewinandchewin:vodka', 2, -6, 5.5, 'Vodka', 'Destilado', [
  'Otra rama de fermentacion. Lee temperatura en JEI.',
], { hide: true });
q('kombucha', ['keg'], 'brewinandchewin:kombucha', 2, -6, 7, 'Kombucha', 'Fermento trendy', [
  'Bebida mid del addon.',
], { hide: true });
q('jerky', ['keg'], 'brewinandchewin:jerky', 8, -2, 7, 'Jerky', 'Carne curada', [
  'Snack de exploracion fermentado/secado via keg recipes.',
], { hide: true });
q('kimchi', ['keg', 'cabbage'], 'brewinandchewin:kimchi', 4, -2, 8.5, 'Kimchi', 'Fermento picante', [
  'Vegetales fermentados. Buen acompanante.',
], { hide: true });
q('flaxen_unripe', ['keg'], 'brewinandchewin:unripe_flaxen_cheese_wheel', 1, 0, 5.5, 'Unripe Flaxen Cheese', 'Queso joven', [
  'Deja madurar segun mecanicas del mod.',
], { hide: true });
q('flaxen', ['flaxen_unripe'], 'brewinandchewin:flaxen_cheese_wheel', 1, 0, 7, 'Flaxen Cheese Wheel', 'Queso maduro', [
  'Corta porciones para sandwiches y pizza.',
], { hide: true });
q('pizza', ['flaxen', 'sauce'], 'brewinandchewin:pizza', 1, 0, 8.5, 'Pizza', 'Cena de multi', [
  'Hito social del addon. Comparte con el equipo.',
], { hide: true });
q('ham_cheese', ['flaxen'], 'brewinandchewin:ham_and_cheese_sandwich', 2, 2, 8.5, 'Ham and Cheese', 'Sandwich de taberna', [
  'Snack excelente post-fermentacion.',
], { hide: true });

// MY NETHERS
q('sec_nether', ['skillet'], 'checkmark', 1, 8, 10, 'My Nether Delight', 'Cocina del Nether', [
  'Hotdogs, hoglin y stove del Nether. Lleva fuego amigo.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('nether_stove', ['sec_nether'], 'mynethersdelight:nether_bricks_stove', 1, 10, 10, 'Nether Bricks Stove', 'Cocina infernal', [
  'Stove tematico del Nether para recetas MND.',
], { hide: true });
q('hotdog', ['nether_stove'], 'mynethersdelight:hotdog', 4, 12, 10, 'Hotdog', 'Clasico MND', [
  'Comida rapida del addon. Perfecta post-expedicion al Nether.',
], { hide: true });
q('hot_wings', ['nether_stove'], 'mynethersdelight:hot_wings', 4, 12, 11.5, 'Hot Wings', 'Alitas picantes', [
  'Snack picante del Nether.',
], { hide: true });
q('sausage', ['nether_stove'], 'mynethersdelight:roasted_sausage', 4, 10, 11.5, 'Roasted Sausage', 'Salchicha asada', [
  'Otro staple MND para variar proteinas.',
], { hide: true });
q('strider_slice', ['sec_nether'], 'mynethersdelight:strider_slice', 4, 8, 11.5, 'Strider Slice', 'Carne de strider', [
  'Procesa striders con cuchillo/board segun JEI.',
], { hide: true });
q('stuffed_hoglin', ['nether_stove'], 'mynethersdelight:roast_stuffed_hoglin', 1, 14, 10, 'Roast Stuffed Hoglin', 'Festin del Nether', [
  'Gran festin MND. Ideal como recompensa de exploracion Nether.',
], { hide: true });
q('breakfast', ['hotdog'], 'mynethersdelight:breakfast_sampler', 1, 14, 11.5, 'Breakfast Sampler', 'Desayuno infernal', [
  'Plato compuesto MND.',
], { hide: true });

// CULTURAL
q('sec_cultural', ['board', 'corn'], 'checkmark', 1, 18, 5.5, 'Cultural Delights', 'Sabores del mundo', [
  'Aguacate, maiz, berenjena, pepino, tacos y mas.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('corn', ['sec_crops'], 'culturaldelights:corn_cob', 16, 12, -1.5, 'Corn Cob', 'Maiz CD', [
  'Cultivo Cultural Delights. Base de tortilla, elote y popcorn.',
]);
q('avocado', ['sec_cultural'], 'culturaldelights:avocado', 8, 20, 5.5, 'Avocado', 'Aguacate', [
  'Cosecha de arboles CD. Corta en la board.',
], { hide: true });
q('tortilla', ['sec_cultural', 'corn'], 'culturaldelights:tortilla', 8, 20, 7, 'Tortilla', 'Base mexicana CD', [
  'Hecha con corn dough. Puerta a tacos/burritos.',
], { hide: true });
q('taco', ['tortilla'], 'culturaldelights:chicken_taco', 2, 22, 7, 'Chicken Taco', 'Taco', [
  'Hito sabroso del addon.',
], { hide: true });
q('burrito', ['tortilla'], 'culturaldelights:beef_burrito', 2, 22, 5.5, 'Beef Burrito', 'Burrito', [
  'Comida de viaje con mucha saturacion.',
], { hide: true });
q('eggplant', ['sec_cultural'], 'culturaldelights:eggplant', 8, 18, 7, 'Eggplant', 'Berenjena', [
  'Se puede ahumar (smoked eggplant) y usar en pastas/burgers CD.',
], { hide: true });
q('pickle', ['sec_cultural'], 'culturaldelights:pickle', 8, 18, 8.5, 'Pickle', 'Pepinillo', [
  'Procesa cucumber. Snack y crafting CD.',
], { hide: true });
q('elote', ['corn'], 'culturaldelights:elote', 2, 14, -1.5, 'Elote', 'Maiz callejero', [
  'Snack iconic del mod.',
], { hide: true });
q('empanada', ['sec_cultural'], 'culturaldelights:empanada', 4, 20, 8.5, 'Empanada', 'Horno callejero', [
  'Otra comida portatil CD.',
], { hide: true });

// OCEAN
q('sec_ocean', ['pot'], 'checkmark', 1, 18, 10, 'Ocean Delight', 'Cocina marina', [
  'Guardian, calamar y rolls del oceano.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('tentacles', ['sec_ocean'], 'oceansdelight:tentacles', 4, 20, 10, 'Tentacles', 'Calamar', [
  'Corta en cut_tentacles / sticks segun JEI.',
], { hide: true });
q('guardian_soup', ['sec_ocean'], 'oceansdelight:guardian_soup', 1, 22, 10, 'Guardian Soup', 'Sopa de guardian', [
  'Plato fuerte post-templo oceano.',
], { hide: true });
q('fugu_roll', ['sec_ocean'], 'oceansdelight:fugu_roll', 2, 20, 11.5, 'Fugu Roll', 'Roll oceano', [
  'Comida elaborada del addon.',
], { hide: true });
q('elder_roll', ['sec_ocean'], 'oceansdelight:elder_guardian_roll', 1, 22, 11.5, 'Elder Guardian Roll', 'Trophy food', [
  'Hito tras derrotar elder guardian.',
], { hide: true });

// COOKS COLLECTION
q('sec_cooks', ['stove'], 'checkmark', 1, -2, 0, 'Cooks Collection', 'Horno y limones', [
  'Addon pequeno: oven, limones, fish and chips, muffins.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('oven', ['sec_cooks'], 'cookscollection:oven', 1, -4, 0, 'Oven', 'Horno Cooks', [
  'Estacion de horneado del addon.',
], { hide: true });
q('lemon', ['sec_cooks'], 'cookscollection:lemon', 8, -4, -1.5, 'Lemon', 'Citricos', [
  'Cultivo/arbol de limones. Base de lemonade y muffins.',
], { hide: true });
q('lemonade', ['lemon'], 'cookscollection:lemonade', 2, -6, -1.5, 'Lemonade', 'Bebida fresca', [
  'Cozy drink para el patio.',
], { hide: true });
q('fish_chips', ['oven'], 'cookscollection:fish_and_chips', 2, -4, 1.5, 'Fish and Chips', 'Frito britanico', [
  'Plato firma del addon.',
], { hide: true });
q('lemon_muffin', ['oven', 'lemon'], 'cookscollection:lemon_muffin', 4, -6, 1.5, 'Lemon Muffin', 'Postre citrico', [
  'Snack horneado.',
], { hide: true });
q('rustic_loaf', ['oven'], 'cookscollection:rustic_loaf', 2, -2, 1.5, 'Rustic Loaf', 'Pan rustico', [
  'Pan extra para sandwiches y taberna.',
], { hide: true });

// LETS DO BAKERY
q('sec_bakery', ['board'], 'checkmark', 1, 4, -3, 'Lets Do Bakery', 'Panaderia', [
  'Baker station, panes, jams y pasteles del addon Bakery.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('baker_station', ['sec_bakery'], 'bakery:baker_station', 1, 6, -4.5, 'Baker Station', 'Mesa de panadero', [
  'Estacion principal Lets Do Bakery.',
], { hide: true });
q('bakery_dough', ['baker_station'], 'bakery:dough', 8, 8, -4.5, 'Bakery Dough', 'Masa Bakery', [
  'Distinta a FD dough a veces; mira JEI/Polymorph si hay conflicto.',
], { hide: true });
q('bakery_bread', ['bakery_dough'], 'bakery:bread', 4, 10, -4.5, 'Bakery Bread', 'Pan del addon', [
  'Pan tematico Bakery.',
], { hide: true });
q('croissant', ['bakery_dough'], 'bakery:croissant', 4, 8, -6, 'Croissant', 'Bolleria', [
  'Hito cozy de panaderia.',
], { hide: true });
q('strawberry_jam', ['baker_station'], 'bakery:strawberry_jam', 2, 6, -6, 'Strawberry Jam', 'Mermelada', [
  'Para bread with jam y pasteles.',
], { hide: true });
q('bread_jam', ['strawberry_jam', 'bakery_bread'], 'bakery:bread_with_jam', 2, 8, -7.5, 'Bread with Jam', 'Desayuno', [
  'Simple y muy cozy.',
], { hide: true });
q('strawberry_cake', ['baker_station'], 'bakery:strawberry_cake', 1, 10, -6, 'Strawberry Cake', 'Pastel', [
  'Postre de reunion Lets Do.',
], { hide: true });

// VINERY
q('sec_wine', ['sec_brew'], 'checkmark', 1, -6, 2, 'Vinery', 'Vinedos', [
  'Uvas, mostos y barricas. Complementa Brewin con vinos Lets Do.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('grapevine_pot', ['sec_wine'], 'vinery:grapevine_pot', 1, -8, 2, 'Grapevine Pot', 'Procesa uvas', [
  'Estacion early de Vinery.',
], { hide: true });
q('red_grape', ['sec_wine'], 'vinery:red_grape', 16, -8, 0.5, 'Red Grape', 'Uva tinta', [
  'Cultiva en grape vines / seeds segun bioma.',
], { hide: true });
q('white_grape', ['sec_wine'], 'vinery:white_grape', 16, -8, 3.5, 'White Grape', 'Uva blanca', [
  'Segunda cepa basica.',
], { hide: true });
q('apple_press', ['grapevine_pot'], 'vinery:apple_press', 1, -10, 2, 'Apple Press', 'Prensa', [
  'Prensa frutas/jugos del addon.',
], { hide: true });
q('ferm_barrel', ['apple_press'], 'vinery:fermentation_barrel', 1, -10, 3.5, 'Fermentation Barrel', 'Barrica de vino', [
  'Fermenta vinos. Dale tiempo.',
], { hide: true });
q('red_wine', ['ferm_barrel', 'red_grape'], 'vinery:red_wine', 1, -12, 2, 'Red Wine', 'Vino tinto', [
  'Hito basico de Vinery.',
], { hide: true });
q('chenet', ['ferm_barrel'], 'vinery:chenet_wine', 1, -12, 3.5, 'Chenet Wine', 'Varietal', [
  'Uno de muchos vinos; explora JEI para la coleccion.',
], { hide: true });

// MEADOW / FARM AND CHARM
q('sec_meadow', ['pot'], 'checkmark', 1, -2, -3, 'Meadow y Farm Charm', 'Granja europea', [
  'Quesos Meadow + procesado Farm and Charm (mincer, roaster, granos).',
], { shape: 'hexagon', size: 1.5, hide: true });
q('cheese_form', ['sec_meadow'], 'meadow:cheese_form', 1, 0, -4.5, 'Cheese Form', 'Molde de queso', [
  'Fabrica ruedas de queso Meadow.',
], { hide: true });
q('cheese_wheel', ['cheese_form'], 'meadow:cheese_wheel', 1, 2, -4.5, 'Cheese Wheel', 'Queso Meadow', [
  'Corta slices para sandwiches y tartas.',
], { hide: true });
q('fac_stove', ['sec_meadow'], 'farm_and_charm:stove', 1, -2, -4.5, 'Farm Charm Stove', 'Estufa FAC', [
  'Stove del addon Farm and Charm (distinto al de FD).',
], { hide: true });
q('mincer', ['fac_stove'], 'farm_and_charm:mincer', 1, -4, -4.5, 'Mincer', 'Pica FAC', [
  'Procesado mecanico de cocina del addon.',
], { hide: true });
q('roaster', ['fac_stove'], 'farm_and_charm:roaster', 1, -4, -3, 'Roaster', 'Asado FAC', [
  'Otra estacion de calor Farm and Charm.',
], { hide: true });
q('barley', ['sec_meadow'], 'farm_and_charm:barley', 16, 0, -6, 'Barley', 'Cebada', [
  'Grano FAC para soups y fermentos.',
], { hide: true });
q('oat', ['sec_meadow'], 'farm_and_charm:oat', 16, 2, -6, 'Oat', 'Avena', [
  'Base de oatmeal y pancakes FAC.',
], { hide: true });
q('strawberry', ['sec_meadow'], 'farm_and_charm:strawberry', 16, -2, -6, 'Strawberry', 'Fresas FAC', [
  'Fruta para postres y oatmeal.',
], { hide: true });
q('oatmeal', ['oat', 'strawberry'], 'farm_and_charm:oatmeal_with_strawberries', 2, 2, -7.5, 'Oatmeal with Strawberries', 'Desayuno FAC', [
  'Hito cozy de granja.',
], { hide: true });
q('raw_pasta', ['mincer'], 'farm_and_charm:raw_pasta', 8, -4, -6, 'Raw Pasta', 'Pasta cruda', [
  'Procesa a platos de pasta FAC (JEI).',
], { hide: true });

// CREATE BRIDGE
q('sec_create', ['pot', 'grill'], 'checkmark', 1, 12, 8.5, 'Cocina + Create', 'Automatiza el buffet', [
  'Cuando tengas Create, vuelve aqui: Slicer, Sprinkler y Create Food industrializan la cocina.',
  '&6Oasis:&r Las maquinas estan tambien en el capitulo Create (seccion Cocina mecanizada).',
], { shape: 'hexagon', size: 1.5 });
q('slicer', ['sec_create'], 'sliceanddice:slicer', 1, 14, 8.5, 'Slicer', 'Picado automatico', [
  'Slice and Dice corta comida FD con rotacion Create. Adios grinding manual.',
]);
q('sprinkler', ['slicer'], 'sliceanddice:sprinkler', 1, 16, 8.5, 'Sprinkler', 'Riego Create', [
  'Automatiza el watering de cultivos cozy.',
], { hide: true });
q('cf_butter', ['sec_create'], 'createfood:butter', 8, 14, 10, 'Create Food Butter', 'Mantequilla industrial', [
  'Ingrediente llave de Create Food. Se hace en linea Create.',
]);
q('cf_cheese', ['cf_butter'], 'createfood:cheese_slice', 8, 16, 10, 'Create Food Cheese', 'Queso industrial', [
  'Staple del addon. No intentes craftar las 2000 variantes: usa JEI con filtro.',
], { hide: true });
q('cf_toast', ['cf_cheese'], 'createfood:toast_slice', 8, 18, 10, 'Create Food Toast', 'Tostada mecanizada', [
  'Cierre cozy del puente Create Food.',
]);

// FINALE
q('finale', ['grill', 'burger', 'keg', 'slicer'], 'checkmark', 1, 10, 10, 'Maestro del asado', 'Cocina Oasis completa', [
  'Tienes parrilla, olla, fermentos y puente Create.',
  'Invita al equipo: festines FD, kebab wraps y una ronda del keg.',
  '&6Oasis:&r Sigue explorando addons (Bakery/Vinery/MND) a tu ritmo; no gatean la tech.',
], { shape: 'hexagon', size: 2.0 });

console.log('Quest defs:', defs.length);

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const num = (n) => Number(n).toString();

let snbt = '{\n';
snbt += '\tdefault_hide_dependency_lines: false\n';
snbt += '\tdefault_quest_shape: ""\n';
snbt += '\tfilename: "cocina_bbq"\n';
snbt += `\tgroup: "${groupId}"\n`;
snbt += '\ticon: "barbequesdelight:grill"\n';
snbt += `\tid: "${chapterId}"\n`;
snbt += '\timages: [ ]\n';
snbt += '\torder_index: 0\n';
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
  '34E3EA17DFDD1357','576128B100C864ED','0C0CE58B4CD32FE3','1529D727F773D347','6848E24AE957A10A',
  '6715DE1FD576BFA6','597575A3BE790404','6CBD6C4B2C239A6E','508311F700BECEDF','5FD4E99E244B9D57','650FD0D68E0C8767',
];

let langLines = fs.readFileSync(langPath, 'utf8').split(/\r?\n/).filter((line) => {
  if (/^\s*[{}]\s*$/.test(line)) return false;
  if (line.includes(`chapter.${chapterId}.title:`)) return false;
  if (/quest\.[A-Fa-f0-9]{32}\./.test(line)) return false;
  return !oldIds.some((oid) => line.includes(`quest.${oid}.`));
});

let langAdd = `\tchapter.${chapterId}.title: "&6&lCocina y BBQ"\n`;
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
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/cocina_bbq.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
}
console.log('Synced. DONE cocina quests=', defs.length);
