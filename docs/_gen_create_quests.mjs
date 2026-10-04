import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = 'D:/DATOS USUARIO/Documentos/Servidores Minecraft/Oasis';
const questsRoot = path.join(root, 'server/config/ftbquests/quests');
const chapterPath = path.join(questsRoot, 'chapters/create.snbt');
const langPath = path.join(questsRoot, 'lang/en_us.snbt');
const tableId = '8868008158833387681L';
const chapterId = '3BBA0CC96A0392C9';
const groupId = '085A4E0C215237D7';

const id = (key) => crypto.createHash('md5').update(`oasis-create-${key}`).digest('hex').toUpperCase().slice(0, 16);

const defs = [];
const q = (key, deps, item, count, x, y, title, subtitle, desc, opts = {}) => {
  defs.push({ key, deps, item, count, x, y, title, subtitle, desc, ...opts });
};

q('intro', [], 'checkmark', 1, 0, 0, 'Create', 'Tech I - la fabrica cozy', [
  'Bienvenido a Create: rotacion, estres y contraptions.',
  'Guia completa en Oasis: desde andesita hasta trenes, addons y el puente a Immersive Engineering.',
  '&6Oasis:&r Create es obligatorio antes de IE -> AE2 -> Mekanism. JEI muestra las recetas modificadas del pack.',
], { shape: 'gear', size: 2.0 });

q('wrench', ['intro'], 'create:wrench', 1, 2, 0, 'Llave inglesa', 'Configura casi todo', [
  'Click derecho (y sneak) para orientar maquinas, cambiar modos y configurar filtros.',
  'Llevala siempre: sin ella Create se siente roto.',
]);
q('goggles', ['intro'], 'create:goggles', 1, 2, -1.5, 'Gafas de ingeniero', 'Ve el estres y RPM', [
  'Equipalas en la cabeza para ver Stress Impact / Capacity sobre ejes y maquinas.',
  'Si una linea se atasca, mira el estres antes de spamear water wheels.',
]);
q('alloy', ['wrench'], 'create:andesite_alloy', 32, 4, 0, 'Aleacion de andesita', 'La pepita de Create', [
  'Mezcla andesita con pepitas de hierro o zinc. Material base del early-game.',
  'Haz stock grande: vas a gastar cientos.',
]);
q('shaft', ['alloy'], 'create:shaft', 16, 6, 0, 'Ejes', 'Transmiten rotacion', [
  'Conectan fuentes de energia con maquinas. Alinea con la llave.',
  'Cada maquina consume Stress Units (SU); planifica la red.',
]);
q('cog', ['shaft'], 'create:cogwheel', 16, 8, 0, 'Engranajes', 'Relacion 1:1 lateral', [
  'Mueven la rotacion en L y cambian eje. Combinalos con large cogwheels para ratios.',
]);
q('large_cog', ['cog'], 'create:large_cogwheel', 8, 10, 0, 'Engranaje grande', 'Cambia velocidad', [
  'Par large+small cambia RPM. Mas velocidad suele ser mas SU.',
]);
q('casing', ['alloy'], 'create:andesite_casing', 16, 4, 1.5, 'Andesite Casing', 'Chasis madera + aleacion', [
  'Base de funnels, gearboxes y muchas maquinas andesite.',
]);
q('gearbox', ['casing', 'shaft'], 'create:gearbox', 4, 6, 1.5, 'Gearbox', 'Gira la rotacion 90 grados', [
  'Encaja ejes en distintas caras. Esencial para layouts compactos.',
]);
q('clutch', ['gearbox'], 'create:clutch', 2, 8, 1.5, 'Clutch', 'Corte con redstone', [
  'Con senal redstone desconecta la transmision. Pausa lineas sin romper ejes.',
]);
q('gearshift', ['clutch'], 'create:gearshift', 2, 10, 1.5, 'Gearshift', 'Invierte sentido', [
  'Invierte la rotacion con redstone. Util en crushers dobles y sync.',
]);

q('sec_power', ['shaft'], 'checkmark', 1, 6, -3, 'Energia cinetica', 'Seccion: fuentes de RPM', [
  'Create usa rotacion, no FE en el core. Empieza simple y escala a windmill/steam.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('hand_crank', ['sec_power'], 'create:hand_crank', 1, 4, -3, 'Hand Crank', 'Pruebas a mano', [
  'Gira a mano para testear. No es base industrial, pero ensena el flujo.',
], { hide: true });
q('water_wheel', ['sec_power'], 'create:water_wheel', 2, 8, -3, 'Water Wheel', 'Poder early estable', [
  'Colocala con flujo de agua real. Buen primer motor para millstone/press.',
], { hide: true });
q('large_water', ['water_wheel'], 'create:large_water_wheel', 1, 10, -3, 'Large Water Wheel', 'Mas SU', [
  'Mayor capacidad de estres cuando ya tienes varias maquinas andesite.',
], { hide: true });
q('windmill', ['sec_power'], 'create:windmill_bearing', 1, 8, -4.5, 'Windmill Bearing', 'Velas = poder pasivo', [
  'Construye un rotor de wool/velas. Mas velas = mas capacidad.',
  'Excelente poder pasivo mid-game antes del vapor.',
], { hide: true });
q('empty_blaze', ['casing'], 'create:empty_blaze_burner', 1, 4, -4.5, 'Empty Blaze Burner', 'Base del vapor', [
  'Se convierte en Blaze Burner capturando un blaze.',
], { hide: true });
q('blaze_burner', ['empty_blaze'], 'create:blaze_burner', 1, 4, -6, 'Blaze Burner', 'Calor para vapor y cocina', [
  'Alimentalo con fuel. Superheated (blaze cake) desbloquea recetas avanzadas del mixer.',
], { hide: true });
q('steam', ['blaze_burner', 'large_water'], 'create:steam_engine', 1, 6, -6, 'Steam Engine', 'Poder mid/late Create', [
  'Motor de vapor con Blaze Burner + agua. Gran salto de SU para brass y trenes.',
], { hide: true });
q('flywheel', ['steam'], 'create:flywheel', 1, 8, -6, 'Flywheel', 'Inercia / buffer', [
  'Acompana al steam engine y estabiliza la linea.',
], { hide: true });

q('sec_proc', ['water_wheel'], 'checkmark', 1, 12, 0, 'Procesado andesite', 'Moler, prensar, mezclar, triturar', [
  'Estas maquinas definen el early Create: harina, placas, aleaciones y crushed ores.',
], { shape: 'hexagon', size: 1.5 });
q('millstone', ['sec_proc'], 'create:millstone', 1, 12, 1.5, 'Millstone', 'Muele items', [
  'Muele wheat, ores early y varios materiales. Entrada superior / depot.',
]);
q('press', ['sec_proc'], 'create:mechanical_press', 1, 14, 0, 'Mechanical Press', 'Placas y compactado', [
  'Prensa lingotes a sheets y compacta packs. Sobre depot/basin segun receta.',
]);
q('basin', ['press'], 'create:basin', 1, 16, 0, 'Basin', 'Contenedor de mezclas', [
  'Debajo del mixer/press. Automatiza con funnels/spouts.',
]);
q('mixer', ['basin'], 'create:mechanical_mixer', 1, 18, 0, 'Mechanical Mixer', 'Aleaciones y alimentos', [
  'Gira sobre un basin. Brass, dough y Create Food pasan por aqui.',
  'Algunas recetas piden Blaze Burner heated/superheated debajo.',
]);
q('fan', ['sec_proc'], 'create:encased_fan', 1, 12, -1.5, 'Encased Fan', 'Lavado, ahumado, haunting...', [
  'Sopla a traves de lava/agua/soul fire para procesar items en el aire o cintas.',
], { hide: true });
q('nozzle', ['fan'], 'create:nozzle', 1, 10, -1.5, 'Nozzle', 'Difunde el aire del fan', [
  'Ensancha el area de efecto del fan para lineas en masa.',
], { hide: true });
q('crushing', ['fan'], 'create:crushing_wheel', 2, 14, -1.5, 'Crushing Wheels', 'Triturado avanzado', [
  'Dos ruedas enfrentadas. Mejor yield de ores que el millstone. Cuidado con el SU.',
], { hide: true });
q('saw', ['sec_proc'], 'create:mechanical_saw', 1, 14, 1.5, 'Mechanical Saw', 'Tala y cortado', [
  'Corta troncos/paneles y arma tree farms en contraptions.',
]);
q('drill', ['saw'], 'create:mechanical_drill', 1, 16, 1.5, 'Mechanical Drill', 'Mineria movil', [
  'Taladra bloques frente a ella. Base de quarry-contraptions.',
]);
q('plough', ['drill'], 'create:mechanical_plough', 1, 18, 1.5, 'Mechanical Plough', 'Labra / clear path', [
  'En contraptions allana tierra/nieve y prepara campos.',
], { hide: true });
q('harvester', ['plough'], 'create:mechanical_harvester', 1, 20, 1.5, 'Mechanical Harvester', 'Cosecha automatica', [
  'Cosecha cultivos frente a la contraption.',
], { hide: true });

q('sec_logi', ['casing'], 'checkmark', 1, 4, 3.5, 'Logistica de items', 'Cintas, funnels, vaults', [
  'Mover items sin hoppers vanilla es el alma de Create.',
], { shape: 'hexagon', size: 1.5 });
q('belt', ['sec_logi'], 'create:belt_connector', 8, 6, 3.5, 'Cintas (Belt)', 'Click shaft a shaft', [
  'Usa el Belt Connector entre dos ejes paralelos. Velocidad = RPM.',
]);
q('funnel_a', ['belt'], 'create:andesite_funnel', 4, 8, 3.5, 'Andesite Funnel', 'In/out simple', [
  'Mete/saca items de inventarios y cintas. Barato y fiable.',
]);
q('tunnel_a', ['funnel_a'], 'create:andesite_tunnel', 2, 10, 3.5, 'Andesite Tunnel', 'Bifurca cintas', [
  'Separa / combina flujos en belts. Modos con la llave.',
]);
q('chute', ['sec_logi'], 'create:chute', 8, 6, 5, 'Chute', 'Caida vertical', [
  'Mueve items verticalmente. Smart Chute anade filtros luego.',
], { hide: true });
q('depot', ['belt'], 'create:depot', 4, 8, 5, 'Depot', 'Estacion de 1 item', [
  'Sostiene un stack para press/spout/deployer/fan.',
]);
q('ejector', ['depot'], 'create:weighted_ejector', 2, 10, 5, 'Weighted Ejector', 'Lanza items', [
  'Catapulta items a depot/cintas lejanas.',
], { hide: true });
q('vault', ['chute'], 'create:item_vault', 4, 6, 6.5, 'Item Vault', 'Almacen Create', [
  'Inventario grande multibloque. Buffer mid-game antes de Sophisticated/AE2.',
]);
q('psi', ['vault'], 'create:portable_storage_interface', 2, 8, 6.5, 'Portable Storage Interface', 'Contraption <-> inventario', [
  'Intercambia items con inventarios de contraptions al alinearse.',
], { hide: true });

q('sec_fluid', ['casing'], 'checkmark', 1, 2, 3.5, 'Fluidos', 'Tuberias Create', [
  'Agua, lava, chocolate, honey, XP (CEI)... Create mueve fluids con pipes y bombas.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('pipe', ['sec_fluid'], 'create:fluid_pipe', 16, 0, 3.5, 'Fluid Pipe', 'Red de liquidos', [
  'Conecta tanques, bombas y maquinas. Llave para window pipes.',
], { hide: true });
q('pump', ['pipe'], 'create:mechanical_pump', 2, 0, 5, 'Mechanical Pump', 'Empuja fluids con RPM', [
  'Sin bomba, los fluids apenas se mueven.',
], { hide: true });
q('tank', ['pump'], 'create:fluid_tank', 4, 0, 6.5, 'Fluid Tank', 'Almacen de liquidos', [
  'Tanques apilables. Mira el nivel con goggles.',
], { hide: true });
q('spout', ['tank'], 'create:spout', 1, -2, 5, 'Spout', 'Vierte sobre depot', [
  'Rellena items/basin desde pipes. Base de filling y Create Food.',
], { hide: true });
q('drain', ['spout'], 'create:item_drain', 1, -2, 6.5, 'Item Drain', 'Vacia items a pipes', [
  'Extrae fluid de buckets/botellas al sistema.',
], { hide: true });
q('hose', ['tank'], 'create:hose_pulley', 1, 0, 8, 'Hose Pulley', 'Lagos infinitos', [
  'Manguera a un cuerpo de fluido grande para I/O masivo.',
], { hide: true });

q('sec_brass', ['mixer', 'crushing'], 'checkmark', 1, 18, -3, 'Era Brass', 'Zinc + copper = midgame', [
  'Brass desbloquea electron tube, precision mechanism, deployer y mechanical crafter.',
], { shape: 'hexagon', size: 1.5 });
q('zinc', ['sec_brass'], 'create:zinc_ingot', 16, 20, -3, 'Zinc', 'El metal Create', [
  'Funde raw/crushed zinc. Crushing wheels ayudan al yield.',
]);
q('brass', ['zinc', 'mixer'], 'create:brass_ingot', 16, 22, -3, 'Brass', 'Cobre + zinc en mixer', [
  'Aleacion heated en basin+mixer. Material del midgame Create.',
]);
q('copper_casing', ['brass'], 'create:copper_casing', 8, 22, -1.5, 'Copper Casing', 'Chasis de fluidos', [
  'Usado en componentes de fluidos y steam.',
]);
q('brass_casing', ['brass'], 'create:brass_casing', 8, 24, -3, 'Brass Casing', 'Chasis inteligente', [
  'Base de funnels brass, arm, crafter, speed controller...',
]);
q('rose', ['press'], 'create:rose_quartz', 8, 20, -4.5, 'Rose Quartz', 'Cuazo + redstone', [
  'Combina quartz y redstone. Luego se pule para electron tubes.',
], { hide: true });
q('polished_rose', ['rose'], 'create:polished_rose_quartz', 8, 22, -4.5, 'Polished Rose Quartz', 'Sandbox + water', [
  'Pule rose quartz (sand paper / mechanizado).',
], { hide: true });
q('electron', ['polished_rose', 'brass'], 'create:electron_tube', 8, 24, -4.5, 'Electron Tube', 'Circuito Create', [
  'Componente electronico de Create.',
  '&6Oasis:&r Guarda stock: Dynamo, Light Engineering e Inscriber lo piden en gates.',
]);
q('deployer', ['brass_casing'], 'create:deployer', 2, 24, -1.5, 'Deployer', 'Brazo que usa items', [
  'Simula clicks con el item que lleva. Base de sequenced assembly.',
]);
q('precision', ['electron', 'deployer'], 'create:precision_mechanism', 4, 26, -3, 'Precision Mechanism', 'Sequenced Assembly', [
  'Se fabrica en cadena de Deployers (sequenced assembly), no en mesa normal.',
  'JEI: gold sheet + cogwheels + iron nuggets (varios loops).',
  '&6Oasis:&r Puente a IE (mesa ingeniero, heavy eng, coil MV, steel casing...).',
]);

q('filter', ['deployer'], 'create:filter', 2, 26, -1.5, 'Filter', 'Lista blanca/negra', [
  'Configura con click derecho. Ponlo en funnels/deployers/chutes.',
], { hide: true });
q('attr_filter', ['filter'], 'create:attribute_filter', 1, 28, -1.5, 'Attribute Filter', 'Filtra por atributos', [
  'Mas expresivo que el filter basico.',
], { hide: true });
q('brass_funnel', ['brass_casing', 'belt'], 'create:brass_funnel', 4, 24, 0.5, 'Brass Funnel', 'Funnels con filtro', [
  'Como andesite funnel pero con filtro y modos smart.',
]);
q('brass_tunnel', ['brass_funnel'], 'create:brass_tunnel', 2, 26, 0.5, 'Brass Tunnel', 'Tuneles inteligentes', [
  'Reparto condicional en belts.',
]);
q('smart_chute', ['brass_funnel'], 'create:smart_chute', 2, 24, 2, 'Smart Chute', 'Chute filtrado', [
  'Caida vertical con filtro. Ideal sobre vaults.',
], { hide: true });
q('speed_ctrl', ['brass_casing', 'precision'], 'create:rotation_speed_controller', 1, 28, -3, 'Rotation Speed Controller', 'Fija RPM exactas', [
  'Necesita precision mechanism. Control fino para crushing y brass.',
]);
q('seq_gear', ['speed_ctrl'], 'create:sequenced_gearshift', 1, 30, -3, 'Sequenced Gearshift', 'Pasos con redstone', [
  'Cambia ratios por pulsos. Ideal en timed contraptions.',
], { hide: true });
q('crafter', ['precision', 'electron'], 'create:mechanical_crafter', 9, 28, -4.5, 'Mechanical Crafter', 'Auto-crafting 3x3', [
  'Matriz de crafters. En Oasis la receta pide la mesa del ingeniero de IE.',
  '&6Oasis:&r Gate: Engineer Crafting Table de IE en lugar de crafting table.',
]);
q('arm', ['precision'], 'create:mechanical_arm', 1, 30, -4.5, 'Mechanical Arm', 'Logistica precisa', [
  'Mueve stacks entre depos/inventarios con puntos programados.',
  '&6Oasis:&r Gate: IE Iron Component sustituye un andesite alloy de la receta.',
]);

q('sec_redstone', ['electron'], 'checkmark', 1, 22, 2, 'Redstone y displays', 'Control y Nixie', [
  'Create anade redstone utility y paneles de informacion.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('nixie', ['sec_redstone'], 'create:nixie_tube', 4, 20, 2, 'Nixie Tube', 'Display numerico', [
  'Muestra senales/datos en paneles de fabrica.',
], { hide: true });
q('display_board', ['nixie'], 'create:display_board', 2, 18, 2, 'Display Board', 'Texto en mundo', [
  'Carteles electronicos. Conecta con Display Link.',
], { hide: true });
q('display_link', ['display_board'], 'create:display_link', 1, 16, 2, 'Display Link', 'Fuente -> display', [
  'Lee inventarios, stressometers, estaciones de tren, etc.',
], { hide: true });
q('redstone_link', ['sec_redstone'], 'create:redstone_link', 4, 20, 3.5, 'Redstone Link', 'Redstone inalambrica', [
  'Frecuencia por item. Emisor/receptor a distancia.',
], { hide: true });
q('pulse_rep', ['redstone_link'], 'create:pulse_repeater', 2, 18, 3.5, 'Pulse Repeater', 'Temporizado', [
  'Extiende logica de pulsos para secuencias.',
], { hide: true });

q('sec_move', ['brass_casing'], 'checkmark', 1, 30, 0, 'Contraptions y trenes', 'Mundo que se mueve', [
  'Bearings, gantries y trenes: Create deja de ser solo fabrica estatica.',
], { shape: 'hexagon', size: 1.5 });
q('glue', ['sec_move'], 'create:super_glue', 4, 32, 0, 'Super Glue', 'Pega bloques a contraptions', [
  'Une bloques al bearing/cart assembler.',
]);
q('bearing', ['glue'], 'create:mechanical_bearing', 1, 34, 0, 'Mechanical Bearing', 'Rota estructuras', [
  'Gira todo lo pegado. Farms, saws, drills rotatorios...',
]);
q('gantry', ['bearing'], 'create:gantry_carriage', 1, 36, 0, 'Gantry Carriage', 'Movimiento lineal', [
  'Desliza contraptions a lo largo de gantry shafts.',
]);
q('cart', ['glue'], 'create:cart_assembler', 1, 32, 1.5, 'Cart Assembler', 'Contraption en minecart', [
  'Monta una estructura sobre un cart. Clasico early mobile farm.',
], { hide: true });
q('rail_casing', ['brass_casing', 'precision'], 'create:railway_casing', 8, 34, 1.5, 'Railway Casing', 'Chasis de trenes', [
  'Material de estaciones y bloques de tren Create.',
]);
q('track', ['rail_casing'], 'create:track', 32, 36, 1.5, 'Train Track', 'Vias Create', [
  'Coloca vias con el placer. Curvas y pendientes con herramientas de track.',
]);
q('station', ['track'], 'create:track_station', 1, 38, 1.5, 'Train Station', 'Paradas y ensamblaje', [
  'Ensambla/disassemble trenes y define horarios con Schedule.',
]);
q('signal', ['station'], 'create:track_signal', 2, 38, 3, 'Track Signal', 'Semaforos', [
  'Controla bloques de via para evitar choques.',
], { hide: true });
q('schedule', ['station'], 'create:schedule', 1, 36, 3, 'Schedule', 'Programa rutas', [
  'Horarios: estaciones, wait/redstone/cargo conditions.',
]);

q('sec_tools', ['wrench'], 'checkmark', 1, 2, 1.5, 'Herramientas de ingeniero', 'Schematics y arena', [
  'Calidad de vida para construir fabricas enormes.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('sandpaper', ['sec_tools'], 'create:sand_paper', 4, 0, 1.5, 'Sand Paper', 'Pule y limpia', [
  'Pule rose quartz y otros. Diamond grit en Create Addition.',
], { hide: true });
q('clipboard', ['sec_tools'], 'create:clipboard', 1, 0, 0, 'Clipboard', 'Notas / listas', [
  'Listas de materiales y apuntes in-game. Muy util en multi.',
], { hide: true });
q('schematic_table', ['clipboard'], 'create:schematic_table', 1, -2, 0, 'Schematic Table', 'Carga esquemas', [
  'Prepara schematics para la Schematicannon.',
], { hide: true });
q('cannon', ['schematic_table'], 'create:schematicannon', 1, -2, 1.5, 'Schematicannon', 'Construye desde schematic', [
  'Dispara bloques segun plano. Consume gunpowder/materiales.',
], { hide: true });
q('potato', ['sec_tools'], 'create:potato_cannon', 1, 0, 3, 'Potato Cannon', 'Combate silly', [
  'Arma con municion de comida. Create divertido, no meta PvP.',
], { hide: true });
q('extendo', ['brass'], 'create:extendo_grip', 1, 22, 0, 'Extendo Grip', 'Alcance extra', [
  'Mas reach para construir. Craft brass-tier.',
], { hide: true });

q('sec_deco', ['casing'], 'checkmark', 1, 4, 8, 'Create Deco', 'Fabrica bonita', [
  'Sheet metal, catwalks, lamps y ladrillos industriales.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('deco_sheet', ['sec_deco'], 'createdeco:andesite_sheet_metal', 32, 6, 8, 'Andesite Sheet Metal', 'Paredes de fabrica', [
  'Bloque deco barato para cerrar naves industriales.',
], { hide: true });
q('deco_lamp', ['deco_sheet'], 'createdeco:yellow_andesite_lamp', 4, 8, 8, 'Lamparas Deco', 'Iluminacion tematica', [
  'Lamps andesite/brass/zinc. Aqui el amarillo andesite.',
], { hide: true });
q('deco_catwalk', ['deco_sheet'], 'createdeco:andesite_catwalk', 16, 6, 9.5, 'Catwalks', 'Pasarelas', [
  'Pasarelas y railings para segundo piso de fabrica.',
], { hide: true });
q('deco_brick', ['sec_deco'], 'createdeco:dean_bricks', 32, 8, 9.5, 'Dean Bricks', 'Ladrillo industrial', [
  'Paleta Deco (dean/dusk/scarlet...). Combina con Macaw luego.',
], { hide: true });

q('sec_add', ['steam', 'electron'], 'checkmark', 1, 12, 8, 'Create Crafts and Additions', 'Electricidad Create', [
  'CCA: rolling mill, wires, alternator/motor y tesla coil.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('rolling', ['sec_add'], 'createaddition:rolling_mill', 1, 14, 8, 'Rolling Mill', 'Varillas y wires', [
  'Procesa lingotes a rods/wires. Pieza central de CCA.',
], { hide: true });
q('alternator', ['rolling'], 'createaddition:alternator', 1, 16, 8, 'Alternator', 'RPM -> FE', [
  'Convierte rotacion Create en Forge Energy.',
], { hide: true });
q('motor', ['alternator'], 'createaddition:electric_motor', 1, 18, 8, 'Electric Motor', 'FE -> RPM', [
  'Alimenta lineas Create con FE si ya tienes generacion.',
], { hide: true });
q('connector', ['alternator'], 'createaddition:connector', 4, 16, 9.5, 'Connector', 'Cableado CCA', [
  'Conecta spools/wires entre maquinas electricas CCA.',
], { hide: true });
q('capacitor', ['connector'], 'createaddition:capacitor', 2, 18, 9.5, 'Capacitor', 'Buffer FE', [
  'Almacena FE para picos del alternator/motor.',
], { hide: true });
q('tesla', ['motor'], 'createaddition:tesla_coil', 1, 20, 8, 'Tesla Coil', 'Carga / efecto electrico', [
  'Utilidad CCA avanzada. Lee JEI/tooltip.',
], { hide: true });

q('sec_conn', ['gearbox', 'brass_casing'], 'checkmark', 1, 10, 8, 'Create Connected', 'Kinetic extras', [
  'Engranajes paralelos, brakes, inventory ports y mas.',
], { shape: 'hexagon', size: 1.25, hide: true });
q('brake', ['sec_conn'], 'create_connected:brake', 1, 10, 9.5, 'Brake', 'Freno cinetico', [
  'Detiene rotacion bajo condicion.',
], { hide: true });
q('parallel_gb', ['sec_conn'], 'create_connected:parallel_gearbox', 1, 12, 9.5, 'Parallel Gearbox', 'Layouts densos', [
  'Gearbox compacto para parallel shafts.',
], { hide: true });
q('inv_port', ['sec_conn'], 'create_connected:inventory_access_port', 2, 8, 9.5, 'Inventory Access Port', 'I/O de inventarios', [
  'Acceso lateral a inventarios/vaults en redes Connected.',
], { hide: true });
q('vessel', ['sec_conn', 'tank'], 'create_connected:fluid_vessel', 2, 8, 11, 'Fluid Vessel', 'Tanque Connected', [
  'Almacen de fluidos del addon. Integra con pipes Create.',
], { hide: true });

q('sec_copy', ['casing'], 'checkmark', 1, 2, 8, 'Copycats+', 'Deco tecnica', [
  'Copycats imitan texturas ajenas en formas de slab/stair/wall/beam...',
], { shape: 'hexagon', size: 1.25, hide: true });
q('copy_block', ['sec_copy'], 'copycats:copycat_block', 16, 0, 8, 'Copycat Block', 'Camuflaje total', [
  'Aplica textura de otro bloque. Esconde fabricas feas.',
], { hide: true });
q('copy_slab', ['copy_block'], 'copycats:copycat_slab', 16, 0, 9.5, 'Copycat Slab', 'Detalle fino', [
  'Losas copycat para interiores industriales.',
], { hide: true });
q('copy_stairs', ['copy_slab'], 'copycats:copycat_stairs', 8, -2, 9.5, 'Copycat Stairs', 'Escaleras camufladas', [
  'Escaleras con apariencia copiada.',
], { hide: true });

q('sec_cei', ['spout', 'precision'], 'checkmark', 1, 28, 2, 'Enchantment Industry', 'XP como fluido', [
  'CEI trata la experiencia como liquido Create: grindstone, printer, enchanter.',
  'Requiere Create Dragons Plus (ya en el pack).',
], { shape: 'hexagon', size: 1.5, hide: true });
q('xp_hatch', ['sec_cei'], 'create_enchantment_industry:experience_hatch', 1, 30, 2, 'Experience Hatch', 'XP in/out', [
  'Interfaz de experiencia hacia el sistema de fluids CEI.',
], { hide: true });
q('grindstone', ['xp_hatch'], 'create_enchantment_industry:mechanical_grindstone', 1, 32, 2, 'Mechanical Grindstone', 'Desencanta / XP', [
  'Procesa enchants y genera XP fluido.',
], { hide: true });
q('printer', ['grindstone'], 'create_enchantment_industry:printer', 1, 34, 2, 'Printer', 'Copia patrones', [
  'Imprime/copia documentos de encantamiento del addon. JEI tiene el detalle.',
], { hide: true });
q('blaze_ench', ['printer', 'blaze_burner'], 'create_enchantment_industry:blaze_enchanter', 1, 34, 3.5, 'Blaze Enchanter', 'Encanta con XP fluido', [
  'Mesa de encantamiento Create alimentada por experiencia liquida.',
], { hide: true });
q('infuser', ['blaze_ench'], 'create_enchantment_industry:infuser', 1, 32, 3.5, 'Infuser', 'Infusion CEI', [
  'Maquina late del addon. Sigue templates/essences en JEI.',
], { hide: true });

q('sec_food', ['mixer', 'spout'], 'checkmark', 1, 18, 5, 'Cocina mecanizada', 'Slice and Dice + Create Food', [
  'Puente Create <-> comida. El arco BBQ completo sigue en el capitulo Cocina.',
], { shape: 'hexagon', size: 1.5, hide: true });
q('slicer', ['sec_food'], 'sliceanddice:slicer', 1, 20, 5, 'Slicer', 'Corta comida FD', [
  'Procesa alimentos Farmer Delight con rotacion Create.',
], { hide: true });
q('sprinkler', ['slicer'], 'sliceanddice:sprinkler', 1, 22, 5, 'Sprinkler', 'Riego', [
  'Riegua cultivos con fluidos. Automatiza granjas cozy.',
], { hide: true });
q('butter', ['sec_food'], 'createfood:butter', 8, 20, 6.5, 'Butter', 'Base Create Food', [
  'Ingrediente clave de Create Food en linea mechanizada.',
], { hide: true });
q('cheese', ['butter'], 'createfood:cheese_slice', 8, 22, 6.5, 'Cheese Slice', 'Lacteos Create Food', [
  'Staple del addon. JEI tiene cientos de recetas; no hace falta craftarlas todas.',
], { hide: true });
q('toast', ['cheese'], 'createfood:toast_slice', 8, 24, 6.5, 'Toast', 'Desayuno industrial', [
  'Hito cozy de Create Food. Vuelve a Cocina BBQ para el arco completo.',
], { hide: true });

q('finale', ['precision', 'electron', 'crafter'], 'checkmark', 1, 30, -6, 'Listo para Immersive', 'Tech I completa', [
  'Tienes Precision Mechanism, Electron Tubes y Mechanical Crafters.',
  '&6Oasis:&r Siguiente: Immersive Engineering. Varias piezas IE pediran Create.',
  'No hace falta 100% Create para avanzar, pero este arco te deja preparado para IE -> AE2 -> Mek.',
], { shape: 'hexagon', size: 2.0 });

console.log('Quest defs:', defs.length);

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const num = (n) => Number(n).toString();

let snbt = '';
snbt += '{\n';
snbt += '\tdefault_hide_dependency_lines: false\n';
snbt += '\tdefault_quest_shape: ""\n';
snbt += '\tfilename: "create"\n';
snbt += `\tgroup: "${groupId}"\n`;
snbt += '\ticon: "create:brass_hand"\n';
snbt += `\tid: "${chapterId}"\n`;
snbt += '\timages: [ ]\n';
snbt += '\torder_index: 0\n';
snbt += '\tquest_links: [ ]\n';
snbt += '\tquests: [\n';

for (const d of defs) {
  const qid = id(d.key);
  snbt += '\t\t{\n';
  if (d.deps.length === 1) {
    snbt += `\t\t\tdependencies: ["${id(d.deps[0])}"]\n`;
  } else if (d.deps.length > 1) {
    snbt += '\t\t\tdependencies: [\n';
    for (const dep of d.deps) snbt += `\t\t\t\t"${id(dep)}"\n`;
    snbt += '\t\t\t]\n';
  }
  if (d.hide) snbt += '\t\t\thide_dependency_lines: true\n';
  snbt += `\t\t\tid: "${qid}"\n`;
  if (d.item !== 'checkmark') {
    snbt += '\t\t\trewards: [\n';
    snbt += '\t\t\t\t{\n';
    snbt += '\t\t\t\t\texclude_from_claim_all: true\n';
    snbt += `\t\t\t\t\tid: "${id('rew1-' + d.key)}"\n`;
    snbt += `\t\t\t\t\ttable_id: ${tableId}\n`;
    snbt += '\t\t\t\t\ttype: "random"\n';
    snbt += '\t\t\t\t}\n';
    snbt += '\t\t\t\t{\n';
    snbt += '\t\t\t\t\texclude_from_claim_all: true\n';
    snbt += `\t\t\t\t\tid: "${id('rew2-' + d.key)}"\n`;
    snbt += `\t\t\t\t\ttable_id: ${tableId}\n`;
    snbt += '\t\t\t\t\ttype: "random"\n';
    snbt += '\t\t\t\t}\n';
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
  '7EEB30A5394FE9E9','5CE43998E85C62CD','39609D4E31D3A7A1','3E3D2E6FD1407701','2BFE09726CD02016',
  '0A14F9D178806AF6','30D07100E8D40406','3D503A0D4408311D','5FCFB801E9A217B7','5E9E8F927EE79AFE',
  '500A3FEB4A398A07','78F344BFDB8B3A69','164900497993E2C5','30CD48E99C9FE01D','45070C9C0089163F',
  '13EAA5D4B9CD59D8','009EE5213EC547D7','0D13FB98745BE405','078C116F96A75648','601F2834402AC59D',
  '04B6358714B03948','7EC613D792CA188C','6C9C9AC60F41D4ED',
];

let langLines = fs.readFileSync(langPath, 'utf8').split(/\r?\n/);
langLines = langLines.filter((line) => {
  if (/^\s*[{}]\s*$/.test(line)) return false;
  if (line.includes(`chapter.${chapterId}.title:`)) return false;
  if (/quest\.[A-Fa-f0-9]{32}\./.test(line)) return false; // orphan full-md5 keys
  return !oldIds.some((oid) => line.includes(`quest.${oid}.`));
});

let langAdd = `\tchapter.${chapterId}.title: "&b&lCreate"\n`;
for (const d of defs) {
  const qid = id(d.key);
  langAdd += `\tquest.${qid}.title: "${esc(d.title)}"\n`;
  langAdd += `\tquest.${qid}.quest_subtitle: "${esc(d.subtitle)}"\n`;
  if (d.desc.length === 1) {
    langAdd += `\tquest.${qid}.quest_desc: ["${esc(d.desc[0])}"]\n`;
  } else {
    langAdd += `\tquest.${qid}.quest_desc: [\n`;
    for (const line of d.desc) langAdd += `\t\t"${esc(line)}"\n`;
    langAdd += '\t]\n';
  }
}

const outLang = '{\n' + langLines.filter(Boolean).join('\n') + '\n' + langAdd + '}\n';
fs.writeFileSync(langPath, outLang, 'utf8');
console.log('Updated lang');

for (const dest of [
  path.join(root, 'client/config/ftbquests/quests'),
  path.join(root, 'curseforge/overrides/config/ftbquests/quests'),
]) {
  fs.copyFileSync(chapterPath, path.join(dest, 'chapters/create.snbt'));
  fs.copyFileSync(langPath, path.join(dest, 'lang/en_us.snbt'));
}
console.log('Synced. DONE create quests=', defs.length);
