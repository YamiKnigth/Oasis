# Generates ATM-depth Create chapter for Oasis FTB Quests
$ErrorActionPreference = 'Stop'
$root = 'D:\DATOS USUARIO\Documentos\Servidores Minecraft\Oasis'
$questsRoot = Join-Path $root 'server\config\ftbquests\quests'
$chapterPath = Join-Path $questsRoot 'chapters\create.snbt'
$langPath = Join-Path $questsRoot 'lang\en_us.snbt'
$tableId = '8868008158833387681L'
$chapterId = '3BBA0CC96A0392C9'
$groupId = '085A4E0C215237D7'

function New-Id([string]$key) {
  $md5 = [System.Security.Cryptography.MD5]::Create()
  $bytes = $md5.ComputeHash([Text.Encoding]::UTF8.GetBytes("oasis-create-$key"))
  -join ($bytes | ForEach-Object { $_.ToString('X2') })
}

function Esc([string]$s) { $s -replace '\\', '\\' -replace '"', '\"' }

# key, deps[], item|checkmark, count, x, y, shape, size, hideDeps, title, subtitle, desc[]
$defs = @()
function Q($key, $deps, $item, $count, $x, $y, $title, $subtitle, $desc, $shape = '', $size = 0, $hide = $false) {
  $script:defs += [pscustomobject]@{
    key = $key; deps = @($deps); item = $item; count = [int]$count
    x = [double]$x; y = [double]$y; title = $title; subtitle = $subtitle; desc = @($desc)
    shape = $shape; size = [double]$size; hide = [bool]$hide
  }
}

# ===== HUB =====
Q 'intro' @() 'checkmark' 1 0 0 'Create' 'Tech I — la fabrica cozy' @(
  'Bienvenido a Create: rotacion, estres y contraptions.'
  'Este capitulo es tu guia completa en Oasis: desde andesita hasta trenes, addons y el puente a Immersive Engineering.'
  '&6Oasis:&r Create es obligatorio antes de IE → AE2 → Mekanism. Lee cada nodo; JEI muestra las recetas modificadas del pack.'
) 'gear' 2.0

# ===== BASICS =====
Q 'wrench' @('intro') 'create:wrench' 1 2 0 'Llave inglesa' 'Configura casi todo' @(
  'Click derecho (y sneak) para orientar maquinas, cambiar modos y configurar filtros.'
  'Llevala siempre: sin ella Create se siente roto.'
)
Q 'goggles' @('intro') 'create:goggles' 1 2 -1.5 'Gafas de ingeniero' 'Ve el estres y RPM' @(
  'Equipalas en la cabeza (o curios si aplica) para ver Stress Impact / Capacity sobre ejes y maquinas.'
  'Si una linea "se atasca", mira el estres antes de spamear water wheels.'
)
Q 'alloy' @('wrench') 'create:andesite_alloy' 32 4 0 'Aleacion de andesita' 'La pepita de Create' @(
  'Mezcla andesita con pepitas de hierro o zinc. Es el material base de casi todo el early-game.'
  'Haz un stock grande: vas a gastar cientos.'
)
Q 'shaft' @('alloy') 'create:shaft' 16 6 0 'Ejes' 'Transmiten rotacion' @(
  'Los Shaft conectan fuentes de energia con maquinas. Alinea con la llave.'
  'Cada maquina consume Stress Units (SU); planifica la red.'
)
Q 'cog' @('shaft') 'create:cogwheel' 16 8 0 'Engranajes' 'Relacion 1:1 lateral' @(
  'Los cogwheels mueven la rotacion en L y cambian eje. Combinalos con large cogwheels para ratios.'
)
Q 'large_cog' @('cog') 'create:large_cogwheel' 8 10 0 'Engranaje grande' 'Cambia velocidad' @(
  'Par large+small cambia RPM. Mas velocidad = mas SU en muchas maquinas.'
)
Q 'casing' @('alloy') 'create:andesite_casing' 16 4 1.5 'Andesite Casing' 'Chasis de madera+aleacion' @(
  'Desliza andesite alloy sobre wood (deployer o a mano segun receta) para casings.'
  'Base de funnels, gearboxes y muchas maquinas andesite.'
)
Q 'gearbox' @('casing'; 'shaft') 'create:gearbox' 4 6 1.5 'Gearbox' 'Gira la rotacion 90°' @(
  'Encaja ejes en distintas caras. Esencial para layouts compactos.'
)
Q 'clutch' @('gearbox') 'create:clutch' 2 8 1.5 'Clutch' 'Corte con redstone' @(
  'Con señal redstone desconecta la transmision. Usa para pausar lineas sin romper ejes.'
)
Q 'gearshift' @('clutch') 'create:gearshift' 2 10 1.5 'Gearshift' 'Invierte sentido' @(
  'Invierte la rotacion con redstone. Util en crushers dobles y lineas que deben sincronizarse.'
)

# ===== POWER =====
Q 'sec_power' @('shaft') 'checkmark' 1 6 -3 'Energia cinetica' 'Seccion: fuentes de RPM' @(
  'Create no usa FE aqui: usa rotacion. Empieza simple (hand crank / water) y escala a windmill/steam.'
) 'hexagon' 1.5 $true
Q 'hand_crank' @('sec_power') 'create:hand_crank' 1 4 -3 'Hand Crank' 'Pruebas a mano' @(
  'Gira a mano para testear una maquina. No sirve de base industrial, pero enseña el flujo.'
) '' 0 $true
Q 'water_wheel' @('sec_power') 'create:water_wheel' 2 8 -3 'Water Wheel' 'Poder early estable' @(
  'Colocala con flujo de agua real. Buen primer motor para millstone/press.'
) '' 0 $true
Q 'large_water' @('water_wheel') 'create:large_water_wheel' 1 10 -3 'Large Water Wheel' 'Mas SU' @(
  'Mayor capacidad de estres. Ideal cuando ya tienes varias maquinas andesite.'
) '' 0 $true
Q 'windmill' @('sec_power') 'create:windmill_bearing' 1 8 -4.5 'Windmill Bearing' 'Velas = poder pasivo' @(
  'Construye un rotor de wool/velas en el bearing. Mas bloques de vela = mas capacidad.'
  'Excelente poder pasivo mid-game antes del vapor.'
) '' 0 $true
Q 'empty_blaze' @('casing') 'create:empty_blaze_burner' 1 4 -4.5 'Empty Blaze Burner' 'Base del vapor' @(
  'Se convierte en Blaze Burner con un blaze. Combustible para Steam Engine / cooking.'
) '' 0 $true
Q 'blaze_burner' @('empty_blaze') 'create:blaze_burner' 1 4 -6 'Blaze Burner' 'Calor para vapor y cocina' @(
  'Alimentalo con fuel. Superheated (con blaze cake) desbloquea recetas avanzadas del mixer.'
) '' 0 $true
Q 'steam' @('blaze_burner'; 'large_water') 'create:steam_engine' 1 6 -6 'Steam Engine' 'Poder mid/late Create' @(
  'Motor de vapor potenciado por Blaze Burner + agua. Gran salto de SU para brass y trenes.'
) '' 0 $true
Q 'flywheel' @('steam') 'create:flywheel' 1 8 -6 'Flywheel' 'Inercia visual / buffer' @(
  'Acompaña al steam engine. Ayuda a estabilizar la linea estetica y mecanica.'
) '' 0 $true

# ===== PROCESSING =====
Q 'sec_proc' @('water_wheel') 'checkmark' 1 12 0 'Procesado andesite' 'Moler, prensar, mezclar, triturar' @(
  'Estas maquinas definen el early Create: harina, placas, aleaciones y crushed ores.'
) 'hexagon' 1.5
Q 'millstone' @('sec_proc') 'create:millstone' 1 12 1.5 'Millstone' 'Muele items' @(
  'Muele wheat, ores early y varios materiales. Entrada por arriba / depot + output lateral.'
)
Q 'press' @('sec_proc') 'create:mechanical_press' 1 14 0 'Mechanical Press' 'Placas y compactado' @(
  'Prensa lingotes a sheets y compacta packs. Coloca sobre depot/basin segun receta.'
)
Q 'basin' @('press') 'create:basin' 1 16 0 'Basin' 'Contenedor de mezclas' @(
  'Debajo del mixer/press para recetas de basin. Automátiza con funnels/spouts.'
)
Q 'mixer' @('basin') 'create:mechanical_mixer' 1 18 0 'Mechanical Mixer' 'Aleaciones y alimentos' @(
  'Gira sobre un basin. Brass, dough y muchas recetas de comida/Create Food pasan por aqui.'
  'Algunas recetas piden Blaze Burner heated/superheated debajo.'
)
Q 'fan' @('sec_proc') 'create:encased_fan' 1 12 -1.5 'Encased Fan' 'Lavado, ahumado, haunting...' @(
  'Sopla a traves de lava/agua/soul fire/etc. para procesar items en el aire o en cintas.'
) '' 0 $true
Q 'nozzle' @('fan') 'create:nozzle' 1 10 -1.5 'Nozzle' 'Difunde el aire del fan' @(
  'Ensancha el area de efecto del fan. Clave para lineas de washing/smoking en masa.'
) '' 0 $true
Q 'crushing' @('fan') 'create:crushing_wheel' 2 14 -1.5 'Crushing Wheels' 'Triturado avanzado' @(
  'Dos ruedas enfrentadas. Mejor yield de ores que el millstone. Cuidado con el SU.'
) '' 0 $true
Q 'saw' @('sec_proc') 'create:mechanical_saw' 1 14 1.5 'Mechanical Saw' 'Tala y cortado' @(
  'Corta troncos/paneles y puede armarse en contraptions para tree farms.'
)
Q 'drill' @('saw') 'create:mechanical_drill' 1 16 1.5 'Mechanical Drill' 'Mineria movil' @(
  'Taladra bloques frente a ella. Base de quarry-contraptions con bearings/gantries.'
)
Q 'plough' @('drill') 'create:mechanical_plough' 1 18 1.5 'Mechanical Plough' 'Labra / clear path' @(
  'En contraptions allana tierra/nieve y prepara campos.'
) '' 0 $true
Q 'harvester' @('plough') 'create:mechanical_harvester' 1 20 1.5 'Mechanical Harvester' 'Cosecha automatica' @(
  'Cosecha cultivos frente a la contraption. Combina con plough + planter-style setups.'
) '' 0 $true

# ===== LOGISTICS =====
Q 'sec_logi' @('casing') 'checkmark' 1 4 3.5 'Logistica de items' 'Cintas, funnels, vaults' @(
  'Mover items sin hoppers vanilla es el alma de Create.'
) 'hexagon' 1.5
Q 'belt' @('sec_logi') 'create:belt_connector' 8 6 3.5 'Cintas (Belt)' 'Click shaft a shaft' @(
  'Usa el Belt Connector entre dos ejes paralelos. Velocidad = RPM de la linea.'
)
Q 'funnel_a' @('belt') 'create:andesite_funnel' 4 8 3.5 'Andesite Funnel' 'Insercion/extraccion simple' @(
  'Mete/saca items de inventarios y cintas. Filtra poco; barato y fiable.'
)
Q 'tunnel_a' @('funnel_a') 'create:andesite_tunnel' 2 10 3.5 'Andesite Tunnel' 'Bifurca cintas' @(
  'Separa / combina flujos en belts. Aprende sus modos con la llave.'
)
Q 'chute' @('sec_logi') 'create:chute' 8 6 5 'Chute' 'Caida vertical' @(
  'Mueve items verticalmente. Smart Chute añade filtros mas adelante.'
) '' 0 $true
Q 'depot' @('belt') 'create:depot' 4 8 5 'Depot' 'Estacion de 1 item' @(
  'Sostiene un stack para press/spout/deployer/fan. Pieza clave de lineas ordenadas.'
)
Q 'ejector' @('depot') 'create:weighted_ejector' 2 10 5 'Weighted Ejector' 'Lanza items' @(
  'Catapulta items a un depot/cintas lejanas. Ajusta con la llave.'
) '' 0 $true
Q 'vault' @('chute') 'create:item_vault' 4 6 6.5 'Item Vault' 'Almacen Create' @(
  'Inventario grande multibloque. Mejor buffer mid-game antes de Sophisticated/AE2.'
)
Q 'psi' @('vault') 'create:portable_storage_interface' 2 8 6.5 'Portable Storage Interface' 'Contraption ↔ inventario' @(
  'Intercambia items con inventarios de contraptions cuando se alinean.'
) '' 0 $true

# ===== FLUIDS =====
Q 'sec_fluid' @('casing') 'checkmark' 1 2 3.5 'Fluidos' 'Tuberias Create' @(
  'Agua, lava, chocolate, honey, XP (CEI)... Create mueve fluids con pipes y bombas.'
) 'hexagon' 1.5 $true
Q 'pipe' @('sec_fluid') 'create:fluid_pipe' 16 0 3.5 'Fluid Pipe' 'Red de liquidos' @(
  'Conecta tanques, bombas y maquinas. Usa llave para ventanas/window pipes.'
) '' 0 $true
Q 'pump' @('pipe') 'create:mechanical_pump' 2 0 5 'Mechanical Pump' 'Empuja fluids con RPM' @(
  'Sin bomba, los fluids apenas se mueven. Direccion configurable.'
) '' 0 $true
Q 'tank' @('pump') 'create:fluid_tank' 4 0 6.5 'Fluid Tank' 'Almacen de liquidos' @(
  'Tanques apilables. Mira el nivel con goggles.'
) '' 0 $true
Q 'spout' @('tank') 'create:spout' 1 -2 5 'Spout' 'Vierte sobre depot' @(
  'Rellena items/basin desde pipes. Base de filling y Create Food.'
) '' 0 $true
Q 'drain' @('spout') 'create:item_drain' 1 -2 6.5 'Item Drain' 'Vacía items a pipes' @(
  'Extrae fluid de buckets/botellas al sistema de tuberias.'
) '' 0 $true
Q 'hose' @('tank') 'create:hose_pulley' 1 0 8 'Hose Pulley' 'Lagos infinitos' @(
  'Baja una manguera a un cuerpo de fluido grande para I/O masivo.'
) '' 0 $true

# ===== BRASS AGE =====
Q 'sec_brass' @('mixer'; 'crushing') 'checkmark' 1 18 -3 'Era Brass' 'Zinc + copper = midgame' @(
  'Brass desbloquea electron tube, precision mechanism, deployer automation y mechanical crafter.'
) 'hexagon' 1.5
Q 'zinc' @('sec_brass') 'create:zinc_ingot' 16 20 -3 'Zinc' 'El metal Create' @(
  'Funde raw/crushed zinc. Busca zinc en el overworld; crushing wheels ayudan.'
)
Q 'brass' @('zinc'; 'mixer') 'create:brass_ingot' 16 22 -3 'Brass' 'Cobre + zinc en mixer' @(
  'Aleacion heated en basin+mixer. Material del midgame Create.'
)
Q 'copper_casing' @('brass') 'create:copper_casing' 8 22 -1.5 'Copper Casing' 'Chasis de fluidos' @(
  'Usado en pipes avanzados / componentes de fluidos y steam.'
)
Q 'brass_casing' @('brass') 'create:brass_casing' 8 24 -3 'Brass Casing' 'Chasis inteligente' @(
  'Base de funnels brass, arm, crafter, speed controller...'
)
Q 'rose' @('press') 'create:rose_quartz' 8 20 -4.5 'Rose Quartz' 'Cuazo + redstone' @(
  'Combina quartz y redstone. Luego se pule para electron tubes.'
) '' 0 $true
Q 'polished_rose' @('rose') 'create:polished_rose_quartz' 8 22 -4.5 'Polished Rose Quartz' 'Sandbox + water' @(
  'Pule rose quartz (sand paper / mechanizado). Pieza del electron tube.'
) '' 0 $true
Q 'electron' @('polished_rose'; 'brass') 'create:electron_tube' 8 24 -4.5 'Electron Tube' 'Circuito Create' @(
  'Componente electronico vanilla-Create. En Oasis tambien se usa en gates de IE/AE2/Mek.'
  '&6Oasis:&r Guarda stock: Dynamo, Light Engineering, Inscriber gates lo piden.'
)
Q 'precision' @('electron'; 'deployer') 'create:precision_mechanism' 4 26 -3 'Precision Mechanism' 'Sequenced Assembly' @(
  'Se fabrica en cadena de Deployers (sequenced assembly), no en mesa normal.'
  'JEI muestra el ensamblaje: gold sheet + cogwheels + iron nuggets (loops).'
  '&6Oasis:&r Pieza llave del puente a Immersive Engineering (mesa IE, heavy eng, coil MV, steel casing...).'
)

# ===== BRASS MACHINES =====
Q 'deployer' @('brass_casing') 'create:deployer' 2 24 -1.5 'Deployer' 'Brazo que usa items' @(
  'Simula clicks con el item que lleva. Base de sequenced assembly y automatizacion de crafts raros.'
)
Q 'filter' @('deployer') 'create:filter' 2 26 -1.5 'Filter' 'Lista blanca/negra' @(
  'Configura con click derecho. Ponlo en funnels/deployers/chutes inteligentes.'
) '' 0 $true
Q 'attr_filter' @('filter') 'create:attribute_filter' 1 28 -1.5 'Attribute Filter' 'Filtra por atributos' @(
  'Mas expresivo que el filter basico (max durability, enchantments, etc.).'
) '' 0 $true
Q 'brass_funnel' @('brass_casing'; 'belt') 'create:brass_funnel' 4 24 0.5 'Brass Funnel' 'Funnels con filtro' @(
  'Como andesite funnel pero con filtro y modos smart.'
)
Q 'brass_tunnel' @('brass_funnel') 'create:brass_tunnel' 2 26 0.5 'Brass Tunnel' 'Tuneles inteligentes' @(
  'Reparto condicional en belts. Aprende round-robin / split modes.'
)
Q 'smart_chute' @('brass_funnel') 'create:smart_chute' 2 24 2 'Smart Chute' 'Chute filtrado' @(
  'Caida vertical con filtro. Ideal sobre vaults/barriles.'
) '' 0 $true
Q 'speed_ctrl' @('brass_casing'; 'precision') 'create:rotation_speed_controller' 1 28 -3 'Rotation Speed Controller' 'Fija RPM exactas' @(
  'Necesita precision mechanism. Control fino para crushing wheels y linea brass.'
)
Q 'seq_gear' @('speed_ctrl') 'create:sequenced_gearshift' 1 30 -3 'Sequenced Gearshift' 'Pasos con redstone' @(
  'Cambia ratios por pulsos. Muy usado en timed contraptions.'
) '' 0 $true
Q 'crafter' @('precision'; 'electron') 'create:mechanical_crafter' 9 28 -4.5 'Mechanical Crafter' 'Auto-crafting 3x3' @(
  'Coloca una matriz de crafters. En Oasis la receta pide la mesa del ingeniero de IE.'
  '&6Oasis:&r Gate: Immersive Engineering Engineer''s Crafting Table en lugar de crafting table.'
)
Q 'arm' @('precision') 'create:mechanical_arm' 1 30 -4.5 'Mechanical Arm' 'Logistica precisa' @(
  'Mueve stacks entre depos/inventarios con puntos programados.'
  '&6Oasis:&r Gate: un andesite alloy de la receta se sustituye por IE Iron Component.'
)

# ===== DISPLAY / REDSTONE =====
Q 'sec_redstone' @('electron') 'checkmark' 1 22 2 'Redstone & displays' 'Control y Nixie' @(
  'Create añade redstone utility y paneles de informacion.'
) 'hexagon' 1.25 $true
Q 'nixie' @('sec_redstone') 'create:nixie_tube' 4 20 2 'Nixie Tube' 'Display numerico' @(
  'Muestra senales / datos. Bonito y util en paneles de fabrica.'
) '' 0 $true
Q 'display_board' @('nixie') 'create:display_board' 2 18 2 'Display Board' 'Texto en mundo' @(
  'Carteles electronicos. Conecta con Display Link.'
) '' 0 $true
Q 'display_link' @('display_board') 'create:display_link' 1 16 2 'Display Link' 'Fuente → display' @(
  'Lee inventarios, stressometers, estaciones de tren, etc. y los muestra.'
) '' 0 $true
Q 'redstone_link' @('sec_redstone') 'create:redstone_link' 4 20 3.5 'Redstone Link' 'Redstone inalambrica' @(
  'Frecuencia por item/freq. Emisor/receptor a distancia.'
) '' 0 $true
Q 'pulse_rep' @('redstone_link') 'create:pulse_repeater' 2 18 3.5 'Pulse Repeater' 'Temporizado' @(
  'Extiende logica de pulsos para secuencias.'
) '' 0 $true

# ===== CONTRAPTIONS / TRAINS =====
Q 'sec_move' @('brass_casing') 'checkmark' 1 30 0 'Contraptions y trenes' 'Mundo que se mueve' @(
  'Bearings, gantries y trenes: Create deja de ser solo fabrica estatica.'
) 'hexagon' 1.5
Q 'glue' @('sec_move') 'create:super_glue' 4 32 0 'Super Glue' 'Pega bloques a contraptions' @(
  'Une bloques al bearing/cart assembler. Sin glue, la contraption no lleva estructura.'
)
Q 'bearing' @('glue') 'create:mechanical_bearing' 1 34 0 'Mechanical Bearing' 'Rota estructuras' @(
  'Gira todo lo pegado. Farms, saws, drills rotatorios...'
)
Q 'gantry' @('bearing') 'create:gantry_carriage' 1 36 0 'Gantry Carriage' 'Movimiento lineal' @(
  'Desliza contraptions a lo largo de gantry shafts.'
)
Q 'cart' @('glue') 'create:cart_assembler' 1 32 1.5 'Cart Assembler' 'Contraption en minecart' @(
  'Monta una estructura sobre un cart. Clasico de early mobile farms.'
) '' 0 $true
Q 'rail_casing' @('brass_casing'; 'precision') 'create:railway_casing' 8 34 1.5 'Railway Casing' 'Chasis de trenes' @(
  'Material de estaciones y bloques de tren Create.'
)
Q 'track' @('rail_casing') 'create:track' 32 36 1.5 'Train Track' 'Vias Create' @(
  'Coloca vias (placer). Curvas y pendientes con herramientas de track.'
)
Q 'station' @('track') 'create:track_station' 1 38 1.5 'Train Station' 'Paradas y ensamblaje' @(
  'Ensambla/disassemble trenes y define horarios con Schedule.'
)
Q 'signal' @('station') 'create:track_signal' 2 38 3 'Track Signal' 'Semaforos' @(
  'Controla bloques de via para evitar choques.'
) '' 0 $true
Q 'schedule' @('station') 'create:schedule' 1 36 3 'Schedule' 'Programa rutas' @(
  'Item de horarios: estaciones, condiciones de wait/redstone/cargo.'
)

# ===== TOOLS / SCHEMATICS =====
Q 'sec_tools' @('wrench') 'checkmark' 1 2 1.5 'Herramientas de ingeniero' 'Schematics y arena' @(
  'Calidad de vida para construir fabricas enormes.'
) 'hexagon' 1.25 $true
Q 'sandpaper' @('sec_tools') 'create:sand_paper' 4 0 1.5 'Sand Paper' 'Pule y limpia' @(
  'Pule rose quartz y otros. Version diamond grit en Create Addition.'
) '' 0 $true
Q 'clipboard' @('sec_tools') 'create:clipboard' 1 0 0 'Clipboard' 'Notas / listas' @(
  'Listas de materiales y apuntes in-game. Muy util en multi.'
) '' 0 $true
Q 'schematic_table' @('clipboard') 'create:schematic_table' 1 -2 0 'Schematic Table' 'Carga esquemas' @(
  'Prepara schematics para la Schematicannon.'
) '' 0 $true
Q 'cannon' @('schematic_table') 'create:schematicannon' 1 -2 1.5 'Schematicannon' 'Construye desde schematic' @(
  'Dispara bloques segun plano. Come gunpowder / materiales.'
) '' 0 $true
Q 'potato' @('sec_tools') 'create:potato_cannon' 1 0 3 'Potato Cannon' 'Combate silly' @(
  'Arma using food ammo. No es meta PvP; es Create divertido.'
) '' 0 $true
Q 'extendo' @('brass') 'create:extendo_grip' 1 22 0 'Extendo Grip' 'Alcance extra' @(
  'Mas reach para construir. Craft brass-tier.'
) '' 0 $true

# ===== DECO =====
Q 'sec_deco' @('casing') 'checkmark' 1 4 8 'Create Deco' 'Fabrica bonita' @(
  'Create Deco añade sheet metal, catwalks, lamps y ladrillos industriales.'
) 'hexagon' 1.25 $true
Q 'deco_sheet' @('sec_deco') 'createdeco:andesite_sheet_metal' 32 6 8 'Andesite Sheet Metal' 'Paredes de fabrica' @(
  'Bloque deco barato para cerrar naves industriales.'
) '' 0 $true
Q 'deco_lamp' @('deco_sheet') 'createdeco:yellow_andesite_lamp' 4 8 8 'Lamparas Deco' 'Iluminacion tematica' @(
  'Lamps andesite/brass/zinc... Elige color; aquÍ el amarillo andesite.'
) '' 0 $true
Q 'deco_catwalk' @('deco_sheet') 'createdeco:andesite_catwalk' 16 6 9.5 'Catwalks' 'Pasarelas' @(
  'Pasarelas y railings para segundo piso de fabrica.'
) '' 0 $true
Q 'deco_brick' @('sec_deco') 'createdeco:dean_bricks' 32 8 9.5 'Dean Bricks' 'Ladrillo industrial' @(
  'Paleta Deco (dean/dusk/scarlet...). Combina con Macaw luego.'
) '' 0 $true

# ===== ADDITIONS =====
Q 'sec_add' @('steam'; 'electron') 'checkmark' 1 12 8 'Create Crafts & Additions' 'Electricidad Create' @(
  'CCA añade rolling mill, wires, alternator/motor y tesla coil.'
) 'hexagon' 1.5 $true
Q 'rolling' @('sec_add') 'createaddition:rolling_mill' 1 14 8 'Rolling Mill' 'Varillas y wires' @(
  'Procesa lingotes a rods/wires. Pieza central de CCA.'
) '' 0 $true
Q 'alternator' @('rolling') 'createaddition:alternator' 1 16 8 'Alternator' 'RPM → FE' @(
  'Convierte rotacion Create en energia Forge Energy para otros mods.'
) '' 0 $true
Q 'motor' @('alternator') 'createaddition:electric_motor' 1 18 8 'Electric Motor' 'FE → RPM' @(
  'Motor electrico: alimenta lineas Create con FE si ya tienes generacion.'
) '' 0 $true
Q 'connector' @('alternator') 'createaddition:connector' 4 16 9.5 'Connector' 'Cableado CCA' @(
  'Conecta spools/wires entre maquinas electricas de CCA.'
) '' 0 $true
Q 'capacitor' @('connector') 'createaddition:capacitor' 2 18 9.5 'Capacitor' 'Buffer FE' @(
  'Almacena FE para picos del alternator/motor.'
) '' 0 $true
Q 'tesla' @('motor') 'createaddition:tesla_coil' 1 20 8 'Tesla Coil' 'Carga / daño electrico' @(
  'Utilidad CCA avanzada: carga y efectos electricos. Lee JEI/tooltip.'
) '' 0 $true

# ===== CONNECTED =====
Q 'sec_conn' @('gearbox'; 'brass_casing') 'checkmark' 1 10 8 'Create Connected' 'Kinetic extras' @(
  'Engranajes paralelos, brakes, inventory bridge y mas utilidades de red.'
) 'hexagon' 1.25 $true
Q 'brake' @('sec_conn') 'create_connected:brake' 1 10 9.5 'Brake' 'Freno cinetico' @(
  'Detiene rotacion bajo condicion. Seguridad para lineas peligrosas.'
) '' 0 $true
Q 'parallel_gb' @('sec_conn') 'create_connected:parallel_gearbox' 1 12 9.5 'Parallel Gearbox' 'Layouts densos' @(
  'Gearbox compacto para parallel shafts.'
) '' 0 $true
Q 'inv_port' @('sec_conn') 'create_connected:inventory_access_port' 2 8 9.5 'Inventory Access Port' 'I/O de inventarios' @(
  'Acceso lateral elegante a inventarios / vaults en redes Create Connected.'
) '' 0 $true
Q 'vessel' @('sec_conn'; 'tank') 'create_connected:fluid_vessel' 2 8 11 'Fluid Vessel' 'Tanque Connected' @(
  'Almacen de fluidos del addon. Integra con pipes Create.'
) '' 0 $true

# ===== COPYCATS =====
Q 'sec_copy' @('casing') 'checkmark' 1 2 8 'Copycats+' 'Deco tecnica' @(
  'Copycats imitan la textura de otros bloques en formas de slab/stair/wall/beam...'
) 'hexagon' 1.25 $true
Q 'copy_block' @('sec_copy') 'copycats:copycat_block' 16 0 8 'Copycat Block' 'Camuflaje total' @(
  'Aplica una textura de otro bloque. Perfecto para esconder fabricas feas.'
) '' 0 $true
Q 'copy_slab' @('copy_block') 'copycats:copycat_slab' 16 0 9.5 'Copycat Slab' 'Detalle fino' @(
  'Losas copycat para detalles de interiores industriales.'
) '' 0 $true
Q 'copy_stairs' @('copy_slab') 'copycats:copycat_stairs' 8 -2 9.5 'Copycat Stairs' 'Escaleras camufladas' @(
  'Escaleras con apariencia copiada. Combina con Deco/Macaw.'
) '' 0 $true

# ===== ENCHANTMENT INDUSTRY =====
Q 'sec_cei' @('spout'; 'precision') 'checkmark' 1 28 2 'Enchantment Industry' 'XP como fluido' @(
  'CEI trata la experiencia como liquido Create: grindstone, printer, enchanter.'
  'Requiere Create: Dragons Plus (ya en el pack).'
) 'hexagon' 1.5 $true
Q 'xp_hatch' @('sec_cei') 'create_enchantment_industry:experience_hatch' 1 30 2 'Experience Hatch' 'XP in/out' @(
  'Interfaz de experiencia hacia el sistema de fluids CEI.'
) '' 0 $true
Q 'grindstone' @('xp_hatch') 'create_enchantment_industry:mechanical_grindstone' 1 32 2 'Mechanical Grindstone' 'Desencanta / XP' @(
  'Procesa enchants y genera XP fluido. Pieza early de CEI.'
) '' 0 $true
Q 'printer' @('grindstone') 'create_enchantment_industry:printer' 1 34 2 'Printer' 'Copia patrones' @(
  'Imprime / copia documentos de encantamiento del addon. Mira recetas JEI.'
) '' 0 $true
Q 'blaze_ench' @('printer'; 'blaze_burner') 'create_enchantment_industry:blaze_enchanter' 1 34 3.5 'Blaze Enchanter' 'Encanta con XP fluido' @(
  'Mesa de encantamiento Create alimentada por experiencia liquida.'
) '' 0 $true
Q 'infuser' @('blaze_ench') 'create_enchantment_industry:infuser' 1 32 3.5 'Infuser' 'Infusion CEI' @(
  'Maquina late del addon. Sigue la cadena de templates/essences en JEI.'
) '' 0 $true

# ===== SLICE & FOOD =====
Q 'sec_food' @('mixer'; 'spout') 'checkmark' 1 18 5 'Cocina mecanizada' 'Slice & Dice + Create Food' @(
  'Puente Create ↔ comida. La guia BBQ profunda sigue en el capitulo Cocina, aqui van las maquinas.'
) 'hexagon' 1.5 $true
Q 'slicer' @('sec_food') 'sliceanddice:slicer' 1 20 5 'Slicer' 'Corta comida FD' @(
  'Maquina Slice & Dice para procesar alimentos Farmer''s Delight con rotacion Create.'
) '' 0 $true
Q 'sprinkler' @('slicer') 'sliceanddice:sprinkler' 1 22 5 'Sprinkler' 'Riego' @(
  'Riegua cultivos con fluidos. Automatiza granjas cozy.'
) '' 0 $true
Q 'butter' @('sec_food') 'createfood:butter' 8 20 6.5 'Butter' 'Base Create Food' @(
  'Ingrediente clave de Create Food. Se obtiene en la linea mechanizada de cocina.'
) '' 0 $true
Q 'cheese' @('butter') 'createfood:cheese_slice' 8 22 6.5 'Cheese Slice' 'Lacteos Create Food' @(
  'Uno de los staples del addon. Explora JEI: hay cientos de recetas; no hace falta craftarlas todas.'
) '' 0 $true
Q 'toast' @('cheese') 'createfood:toast_slice' 8 24 6.5 'Toast' 'Desayuno industrial' @(
  'Hito cozy de Create Food. Luego vuelve al capitulo Cocina BBQ para el arco completo.'
) '' 0 $true

# ===== FINALE OASIS =====
Q 'finale' @('precision'; 'electron'; 'crafter') 'checkmark' 1 30 -6 'Listo para Immersive' 'Tech I completa' @(
  'Tienes Precision Mechanism, Electron Tubes y Mechanical Crafters.'
  '&6Oasis:&r Siguiente capitulo: Immersive Engineering. La Engineer''s Crafting Table y varias piezas IE pediran Create.'
  'No hace falta 100% Create para avanzar, pero este arco te deja preparado para IE → AE2 → Mek.'
) 'hexagon' 2.0

Write-Host "Quest defs: $($defs.Count)"

# Build IDs
$idMap = @{}
foreach ($d in $defs) { $idMap[$d.key] = New-Id $d.key }

# Write chapter SNBT
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('{')
[void]$sb.AppendLine("`tdefault_hide_dependency_lines: false")
[void]$sb.AppendLine("`tdefault_quest_shape: `"`"")
[void]$sb.AppendLine("`tfilename: `"create`"")
[void]$sb.AppendLine("`tgroup: `"$groupId`"")
[void]$sb.AppendLine("`ticon: `"create:brass_hand`"")
[void]$sb.AppendLine("`tid: `"$chapterId`"")
[void]$sb.AppendLine("`timages: [ ]")
[void]$sb.AppendLine("`torder_index: 0")
[void]$sb.AppendLine("`tquest_links: [ ]")
[void]$sb.AppendLine("`tquests: [")

for ($i = 0; $i -lt $defs.Count; $i++) {
  $d = $defs[$i]
  $qid = $idMap[$d.key]
  [void]$sb.AppendLine("`t`t{")
  if ($d.deps.Count -gt 0) {
    if ($d.deps.Count -eq 1) {
      [void]$sb.AppendLine("`t`t`tdependencies: [`"$($idMap[$d.deps[0]])`"]")
    } else {
      [void]$sb.AppendLine("`t`t`tdependencies: [")
      foreach ($dep in $d.deps) { [void]$sb.AppendLine("`t`t`t`t`"$($idMap[$dep])`"") }
      [void]$sb.AppendLine("`t`t`t]")
    }
  }
  if ($d.hide) { [void]$sb.AppendLine("`t`t`thide_dependency_lines: true") }
  [void]$sb.AppendLine("`t`t`tid: `"$qid`"")
  if ($d.item -ne 'checkmark') {
    [void]$sb.AppendLine("`t`t`trewards: [")
    $r1 = New-Id "rew1-$($d.key)"; $r2 = New-Id "rew2-$($d.key)"
    [void]$sb.AppendLine("`t`t`t`t{")
    [void]$sb.AppendLine("`t`t`t`t`texclude_from_claim_all: true")
    [void]$sb.AppendLine("`t`t`t`t`tid: `"$r1`"")
    [void]$sb.AppendLine("`t`t`t`t`ttable_id: $tableId")
    [void]$sb.AppendLine("`t`t`t`t`ttype: `"random`"")
    [void]$sb.AppendLine("`t`t`t`t}")
    [void]$sb.AppendLine("`t`t`t`t{")
    [void]$sb.AppendLine("`t`t`t`t`texclude_from_claim_all: true")
    [void]$sb.AppendLine("`t`t`t`t`tid: `"$r2`"")
    [void]$sb.AppendLine("`t`t`t`t`ttable_id: $tableId")
    [void]$sb.AppendLine("`t`t`t`t`ttype: `"random`"")
    [void]$sb.AppendLine("`t`t`t`t}")
    [void]$sb.AppendLine("`t`t`t]")
  }
  if ($d.shape) { [void]$sb.AppendLine("`t`t`tshape: `"$($d.shape)`"") }
  if ($d.size -gt 0) { [void]$sb.AppendLine("`t`t`tsize: $($d.size.ToString([Globalization.CultureInfo]::InvariantCulture))d") }
  # tasks
  $tid = New-Id "task-$($d.key)"
  if ($d.item -eq 'checkmark') {
    [void]$sb.AppendLine("`t`t`ttasks: [{")
    [void]$sb.AppendLine("`t`t`t`tid: `"$tid`"")
    [void]$sb.AppendLine("`t`t`t`ttype: `"checkmark`"")
    [void]$sb.AppendLine("`t`t`t}]")
  } else {
    [void]$sb.AppendLine("`t`t`ttasks: [{")
    if ($d.count -gt 1) { [void]$sb.AppendLine("`t`t`t`tcount: $($d.count)L") }
    [void]$sb.AppendLine("`t`t`t`tid: `"$tid`"")
    [void]$sb.AppendLine("`t`t`t`titem: { count: 1, id: `"$($d.item)`" }")
    [void]$sb.AppendLine("`t`t`t`ttype: `"item`"")
    [void]$sb.AppendLine("`t`t`t}]")
  }
  $xs = $d.x.ToString([Globalization.CultureInfo]::InvariantCulture)
  $ys = $d.y.ToString([Globalization.CultureInfo]::InvariantCulture)
  [void]$sb.AppendLine("`t`t`tx: ${xs}d")
  [void]$sb.AppendLine("`t`t`ty: ${ys}d")
  [void]$sb.AppendLine("`t`t}")
}
# Fix: SNBT quests need commas between objects - FTB uses newlines without commas actually looking at create.snbt - NO COMMAS between quest objects!
# Looking at original create.snbt - quests are separated by newlines only, no commas. Good.

[void]$sb.AppendLine("`t]")
[void]$sb.AppendLine('}')

$utf8 = New-Object System.Text.UTF8Encoding $false
[IO.File]::WriteAllText($chapterPath, $sb.ToString(), $utf8)
Write-Host "Wrote $chapterPath"

# Lang merge: remove old create quest keys that we know, add new
$lang = Get-Content $langPath -Raw
# Remove previous create quest entries by scanning - remove lines for old IDs from previous chapter
$oldIds = @(
  '7EEB30A5394FE9E9','5CE43998E85C62CD','39609D4E31D3A7A1','3E3D2E6FD1407701','2BFE09726CD02016',
  '0A14F9D178806AF6','30D07100E8D40406','3D503A0D4408311D','5FCFB801E9A217B7','5E9E8F927EE79AFE',
  '500A3FEB4A398A07','78F344BFDB8B3A69','164900497993E2C5','30CD48E99C9FE01D','45070C9C0089163F',
  '13EAA5D4B9CD59D8','009EE5213EC547D7','0D13FB98745BE405','078C116F96A75648','601F2834402AC59D',
  '04B6358714B03948','7EC613D792CA188C','6C9C9AC60F41D4ED'
)
$lines = Get-Content $langPath
$filtered = foreach ($line in $lines) {
  $drop = $false
  foreach ($oid in $oldIds) { if ($line -match [regex]::Escape("quest.$oid.")) { $drop = $true; break } }
  if (-not $drop) { $line }
}
# Build new lang entries
$langAdd = New-Object System.Text.StringBuilder
[void]$langAdd.AppendLine("`tchapter.$chapterId.title: `"&b&lCreate`"")
foreach ($d in $defs) {
  $qid = $idMap[$d.key]
  [void]$langAdd.AppendLine("`tquest.$qid.title: `"$(Esc $d.title)`"")
  [void]$langAdd.AppendLine("`tquest.$qid.quest_subtitle: `"$(Esc $d.subtitle)`"")
  if ($d.desc.Count -eq 1) {
    [void]$langAdd.AppendLine("`tquest.$qid.quest_desc: [`"$(Esc $d.desc[0])`"]")
  } else {
    [void]$langAdd.AppendLine("`tquest.$qid.quest_desc: [")
    foreach ($line in $d.desc) { [void]$langAdd.AppendLine("`t`t`"$(Esc $line)`"") }
    [void]$langAdd.AppendLine("`t]")
  }
}

# Reconstruct lang file: header { then chapter titles keep, insert our chapter title replacement, append quests before closing }
# Simpler approach: write filtered lines but replace chapter create title, then before final } insert new quest langs
$outLang = New-Object System.Text.StringBuilder
[void]$outLang.AppendLine('{')
foreach ($line in $filtered) {
  if ($line -match '^\s*\{') { continue }
  if ($line -match '^\s*\}') { continue }
  if ($line -match "chapter\.$chapterId\.title:") { continue }
  [void]$outLang.AppendLine($line)
}
[void]$outLang.Append($langAdd.ToString())
[void]$outLang.AppendLine('}')
[IO.File]::WriteAllText($langPath, $outLang.ToString(), $utf8)
Write-Host "Updated lang with $($defs.Count) quests"

# Sync to client + overrides
foreach ($dest in @(
  (Join-Path $root 'client\config\ftbquests\quests'),
  (Join-Path $root 'curseforge\overrides\config\ftbquests\quests')
)) {
  Copy-Item -Force $chapterPath (Join-Path $dest 'chapters\create.snbt')
  Copy-Item -Force $langPath (Join-Path $dest 'lang\en_us.snbt')
}
Write-Host 'Synced client + CF overrides'
Write-Host "DONE create quests=$($defs.Count)"
