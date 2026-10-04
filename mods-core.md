# Oasis — lista de mods (v1)

**Tope duro: 160** | Plataforma: NeoForge 21.1.253 / MC 1.21.1  
**Fuente unica:** CurseForge (1.21.1 + NeoForge).

Conteo actual: **117 client** / **112 server** jars. Cupo restante client: **43**.

---

## Fases OK
0 Loader · 1 Perf/FTB/QoL · 1b Combate · 2 Overworld · 3 Cocina/deco · 3b Tombstone · 4 Dimensiones · 5 Tech · 6 Magia/dragona · **7 KubeJS tech progression**

## 6) Magia + dragona — OK

| Mod | Rol |
|---|---|
| Iron's Spells 'n Spellbooks 3.16.3 | Magia suave (hechizos) |
| Iron's Lib | dep Iron's |
| Malum 1.8.2 | Magia suave (espiritus) |
| Lodestone | dep Malum |
| Curios API | slots magia/jefes |
| playerAnimator | dep Iron's |
| GeckoLib | ya presente (dep animaciones) |
| End Remastered 6.3.0 | ojos + pelea dragona exigente |
| L_Ender's Cataclysm 3.33 | jefes opcionales |
| Lionfish API | dep Cataclysm |

**No instalado (cupo/prioridad):** Legendary Monsters (pesado; Cataclysm cubre bosses opcionales).

Smoke: **OK** — `Done` ~22.6s. Warn menor Cataclysm tags tool + Create Deco placard (previo). Log: `server/smoke-phase5.log`.

## 7) KubeJS tech — INSTALADA (pendiente autorizacion)

Cadena: **Create → IE → AE2 → Mekanism**. Solo recetas existentes (crafting + infuser). Sin items nuevos. Recipe ids originales (EMI/JEI).  
Docs: `docs/TECH_PROGRESSION.md`. Smoke: **OK** — Added 12 / removed 12 / modified 22 / 0 failed. Alloy=certus (no fluix). `Done` ~7s.

## 8) FTB Quests — INSTALADA (pendiente autorizacion)

`config/ftbquests/quests/` — 11 capítulos, 405 quests, 1 reward table vacía/placeholder por capítulo.  
Docs: `docs/QUESTS.md`. Smoke: Loaded 6 groups / 11 chapters / 405 quests.

## 9) Perfil CurseForge — GENERADO (pendiente autorizacion)

- `curseforge/Oasis-1.0.0.zip` — import CurseForge App  
- `manifest.json`: MC 1.21.1 + NeoForge 21.1.253 + **117 mods**  
- `overrides/`: kubejs + ftbquests + configs (sin jars)  
- Docs: `docs/INSTALL.md` · CSV: `docs/cf-manifest-files.csv`

## 10) Siguiente
**GitHub** — repo configs/scripts/perfiles (sin mods)

Sin pregen aqui (no es el servidor final).

---

## Conteo
```
Total jars client: 117
Total jars server: 112
Cupo restante (client): 160 - 117 = 43
```
