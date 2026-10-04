# FTB Teams, Chunks, Essentials, Ranks (Server Ops Summary)

Source hub: [FTB Core Suite](https://docs.feed-the-beast.com/mod-docs/mods/suite/)

## FTB Teams

Team/party management used by Quests progress sharing and Chunks claims.

Typical player flow:

- Create party / team
- Invite members
- Shared quest progress depending on pack settings (`default_reward_team`, team data)

## FTB Chunks

Claim and forceload chunks on a map UI.

Server concerns:

- Max claim / forceload budgets per player or team
- Ally/enemy permissions
- Dimension rules

Quests often include a short tutorial (open map → claim → forceload).

## FTB Essentials

Quality-of-life commands commonly used on FTB-style servers (`/home`, `/spawn`, `/rtp`, etc.).

Server config usually lives under `serverconfig` / world config paths. Quests may document the commands players should know on day one.

## FTB Ranks

Permission/rank nodes for commands and features. Integrates with other FTB mods via XMod Compat in many versions.

When generating server-oriented intro chapters, mention ranks only if the instance actually includes FTB Ranks.

## FTB Library / XMod Compat

- **Library**: shared UI/config/networking backbone.
- **XMod Compat**: bridges Quests/Ranks/JEI-REI/Game Stages style integrations.

## Other suite mods

- **Ultimine**: vein-like mining convenience; usually not a full quest chapter.
- **Backups 2/3**: server safety; document in admin notes, not player quests.
- **Team Bases**: optional base/team world features when present.