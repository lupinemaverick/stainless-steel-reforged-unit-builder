# Codex implementation hand-off — functional weapon archetypes & Hook/Drag
**Project:** Stainless Steel: Reforged (Mobile) / Combat Reforged Unit Builder  
**Prepared:** 13 October 2026  
**Repository:** https://github.com/lupinemaverick/stainless-steel-reforged-unit-builder  
**Companion manifest:** `docs/handoffs/Weapon_Archetype_Change_Manifest_2026-10-13.json`  
**Scope:** implement builder data/UX changes and tests, **not** M2EX battle-engine scripting.  
**Status:** design-approved directions with explicit engine-verification gates; a separate Deep Research animation/M2EX investigation was requested but its result is **not included** in this hand-off.

## Copy/paste this instruction into Codex

> Work in the Stainless Steel: Reforged Unit Builder repository. Read this hand-off and its companion JSON manifest, plus the existing weapon catalogue and research hand-off. Implement **Phase A** only, using a feature branch. Do not edit the original research catalogue or hand-wave M2EX APIs. Preserve user-customized presets, legacy project imports, EDU export safety, and current balance rules. Regenerate `index.html` with `python build.py`. Add or run regression tests and report exact files changed, verification performed, remaining engine gates, and any balance decisions deliberately left unresolved. Do not implement Phase B candidates as active presets until approved. No direct changes to the live mod or game runtime.

## 1. Sources and precedence

1. **Explicit user decision:** heavy crossbow remains **one heavy crossbow archetype**. Windlass/cranequin differences do not justify splitting a preset when projectile physics, Attack, and reload time capture the intended gameplay.
2. **User-approved research direction:** hook-capable bill/roncone/guisarme-style polearms should be defined around **Hook/Drag/Control**, not assumed pike-shaft cutting. A defender forward-step/stumble is a **candidate visual simulation** only.
3. **Research findings (prior conversation; not a checked-in revised catalogue):** mace contact geometry deserves a solid/knobbed versus flanged/projecting split; short flexible impact weapon and staff flail are separate conditional forms; braced couched lance deserves examination; a developed halberd might have a weaker hook function; greatsword default Pikebreaker lacks sufficient support; regional names alone are not presets. Treat these as a prioritized backlog unless this document says otherwise.
4. **Existing checked-in material:** `docs/research/Weapon_Catalogue_1050_1550.md` and `docs/research/Deep_Research_Handoff_Historical_Weapons_1050_1550.md`. The original catalogue is a historical design baseline, not a fully approved implementation table. Its stale notes about unimplemented combat-rule revisions are superseded by current code and its hand-off.
5. **Current builder code:** inspect actual source before editing. This hand-off was checked against `main` on 13 October 2026, but do not assume line numbers or defaults remain unchanged when Codex begins.

When a claim conflicts, prioritize the explicit user decisions and **current builder mechanics** over older catalogue prose. Never infer numerical Attack or an engine trigger from museum evidence alone.

## 2. Verified current code integration points

- `src/reforged.js` defines `WEAPON_CATEGORIES`, `NATIVE_WEAPON_TAGS`, `CUSTOM_TAG`, `exportableAttrs()`, `weaponEffects()`, project JSON import/export, and the category-to-preset map. It currently gives `bill` default `stagger, pikebreaker_1` and `greatsword` default `duelist_2, pikebreaker_1`.
- `src/combat_rules.js` applies the revised Attack and handling values **after** `src/reforged.js`. Current revised category Attack includes **bill 9, greatsword 12, mace 4**. Do not accidentally revert these to older initializer values or add a global Attack increase.
- `src/weapon_controls.js` already exposes the custom `stagger` tag and settings. Its current definition is **only** a melee attack stopped specifically by Shield, with the original attack remaining blocked. Current defaults are 100% of eligible shield blocks, 1-second per-defender lockout, and a free-text unselected defender reaction. The reaction is **not** implemented in the game engine.
- `src/preset_filters.js` handles category-first filtering. `src/audit_rules.js` and `src/combat_rules.js` wrap preset loading/import/migration and may restore legacy defaults.
- `src/base_v1.5.html` contains original preset IDs, including `arbalest` (the current heavy-crossbow-equivalent preset), `crossbow`, and `light_crossbow`. Preserve `arbalest` as an ID rather than breaking saved projects.
- `build.py` assembles source modules into generated `index.html`. Edit sources, not generated HTML alone.
- `README.md` correctly warns that custom effects are **design metadata** and not game runtime effects.

## 3. Phase A — implement now

### A1. Hook/Drag as a **new metadata-only weapon effect**

Introduce the stable tag `hook_drag` in the weapon attribute UI, parser/recognition, effect record, project JSON, and downloadable runtime-design JSON. Mark it **Custom proposal — no engine runtime** everywhere relevant. It must **never** be emitted as a native EDU weapon attribute.

Use a semantic record compatible with the current `weaponEffects()` array, e.g.:

```json
{
  "tag": "hook_drag",
  "scope": "pri_active_weapon",
  "status": "custom proposal",
  "effect_family": "control",
  "target": "individual defending model",
  "trigger": "unverified: eligible hooked-weapon contact",
  "trigger_status": "engine event not verified",
  "chance_percent": null,
  "lockout_seconds": null,
  "implementation_status": "design_metadata_only",
  "visual_candidate": {
    "description": "defender forward-step / stumble",
    "animation_id": null,
    "root_motion_verified": false
  },
  "physical_displacement_implemented": false,
  "unhorse_implemented": false,
  "shield_bypass_implemented": false
}
```

This is a **proposed shape**, not a mandatory global schema migration. Reuse existing naming conventions where sensible. `null` is deliberate: do **not** invent a 10%, 25%, or 100% Hook/Drag proc chance, a duration, or an animation ID.

Add a small, clear UI description: a hooked head can catch or pull a shield, limb, or opponent off balance; an animation might represent the result, but there is no verified model-level trigger or movement API. The free-text visual candidate may default to the descriptive phrase above, **not** to a claimed game animation asset. No real animation or position change should occur in builder code.

**Important separation:** the existing `stagger` tag stays **shield-block-only**. Do not silently redefine it to fire on every contact or convert it into Hook/Drag. A bill may carry both tags as distinct proposals. Do not allow both to create an assumed double-hit or automatic unhorse.

### A2. Revise only built-in polearm and greatsword defaults

| Category ID | Existing built-in default | New built-in default | Preserve |
|---|---|---|---|
| `bill` | `stagger, pikebreaker_1` | `stagger, hook_drag` | Category, Attack, handling, two-handed grip, existing saved overrides |
| `greatsword` | `duelist_2, pikebreaker_1` | `duelist_2` | Category, Attack, handling, two-handed grip, existing saved overrides |

Treat `bill` as the **hooked control polearm** category. The label may be clarified to “Bill / hooked polearm”; do not change its stable key. Bill, roncone, and suitably hooked guisarme are aliases by *actual construction*, not separate national-stat entries.

`pikebreaker_1` is **not deleted** from the builder. Its already documented metadata definition remains available for explicitly configured weapons, but is no longer the automatic default for bills or greatswords. Do not silently strip it from an existing user-customized preset or project. A conditional halberd hook is a separate later decision, not a global default.

### A3. Preserve **one heavy crossbow** preset

Do **not** create `cranequin_heavy_crossbow` and `windlass_heavy_crossbow`. The existing `arbalest` preset is the current heavy crossbow analogue. Preserve its ID, role eligibility, projectile configuration, Attack, and delay/reload values. If helpful, clarify the display label to “Heavy Crossbow / Arbalest” while retaining `arbalest` as the key and treating spanning mechanisms as descriptive aliases.

Light, intermediate, and heavy crossbows can remain distinct by projectile and balance parameters; the prohibition is against subdividing the **heavy** archetype merely by spanning mechanism. Do not replace existing delays with invented historical seconds or assume the EDU `delay` field alone equals the full reload cycle.

### A4. Migration, editor, and exports

- Preserve current project JSON schema/version unless a demonstrable incompatibility requires a documented migration. Preserve imported `fields`, `presets`, and `weapon_categories`; preserve unrecognized advanced effect override records.
- Update **only recognizable untouched built-in defaults**. Compare exact legacy default values before migrating. Do not overwrite customized `bill`/`greatsword` attrs, including users who deliberately added `pikebreaker_1`.
- Ensure both primary and secondary slots can select/serialize `hook_drag` and that the checkbox syncs after applying categories, presets, restoring projects, and reloading browser storage.
- If adding preset IDs in future, note that `syncPresetCategory()` currently uses a fixed `categoryMap` in places, while `presetWeaponCategory()` honors an explicit `weapon_category`. Align those paths before relying on new IDs.
- Keep native EDU filtering strict: `hook_drag`, `stagger`, `pikebreaker_1`, `batter_X`, `rend_X`, etc. are **not** emitted as native EDU tags. Design records stay in project/runtime JSON, with any optional EDU comments clearly labeled.
- Do not change equipment-grade math, Soldier Quality, core Defense Skill 4, small weapon handling, offhand suppression, Armor ensembles, mounted barding, or native lance/spear defaults.

## 4. Phase B — research-backed candidate backlog; **not active without review**

| Candidate | Intended design distinction | Implementation disposition |
|---|---|---|
| **Solid/knobbed mace vs flanged/projecting mace** | Different contact area and concentrated armor-threat geometry | Develop two functional profiles within the existing `mace` filter group; preserve legacy `mace` ID. Exact Attack/Rend/Batter differences require separate balance approval. Do not create “Pernach,” “Shestoper,” and “Gurz” as automatic nationality presets. |
| **Short flexible impact weapon** | A short articulated/weighted striking head, distinct from fixed mace and long staff flail; Rus `kiścień` / kisten evidence merits investigation | Conditional catalogue candidate; animation, contact behavior, date and faction mapping gates. No assumed shield bypass. |
| **Long staff flail** | Two-handed staff and hinged striking element, different reach/handling from short flexible weapon | Conditional candidate; requires verified model/animation/AI support and period/faction evidence. No shield-bypass claim. |
| **Braced couched lance system** | Lance-rest + armor support enabling a more firmly braced couched thrust | Candidate in existing `lance` category, with explicit equipment/loadout metadata. No native `spear` attribute by default; don't invent engine-specific bracing bonuses. |
| **Developed halberd hook** | Some heads may combine chop, thrust and weaker catch/pull function | Optional construction-specific Hook/Drag candidate; not every halberd gets bill-strength control. |
| **Armor-point variants** | Rigid concentrated point on estoc, dagger, fighting spear or polehammer | Preserve or refine only where geometry/armor interaction genuinely differs. Avoid duplicating the same function under regional names. |
| **Greatsword/polearm aliases** | Regional greatsword names, swordstaff, formation-oriented halberd and mounted bow doctrines often map to existing handling | Merge/alias unless a verified mechanic survives equal Soldier Quality and Equipment Grade. |

If the user later approves numerical profiles, use the existing catalogue as a **candidate baseline**, not an automatic production import. Document each proposed change to Attack, delay, charge, handling, armor interaction, animation and historical scope separately. Avoid a mass import of all 69 catalogue profiles.

## 5. Forward-step animation experiment — engine investigation, not Phase A runtime

The user's proposed visual is **a defender stepping forward or stumbling as if pulled by the hooked weapon**. It is plausible as a *visual language*, but no verified M2TW/M2EX per-hit trigger, exact animation, root-motion behavior, collision displacement or unhorse API is established in the materials checked for this hand-off.

Do not code a fictitious Squirrel call or assume that playing an animation repositions a unit. After the dedicated animation research returns, investigate in this order:

1. Inventory real vanilla/M2EX hit-reaction, stagger, recoil, forward-step, knockback and attack animations and how they bind to skeletons. Record file/asset names and source links, or mark absent.
2. Verify whether a mod can identify **an individual defending model**, classify an eligible hooked-weapon contact or shield block, and request a defender animation. Verify event timing and whether model root motion is applied or only visual.
3. Prototype **attacker hook gesture + defender existing reaction** first; then a defender forward-step/stumble **only if verified**. Prefer a purely visual result if physical movement breaks formation/collision.
4. Test pikes, dense formations, shields, cavalry, synchronized multiplayer (if applicable), and mobile performance. Do not claim real dragging, dismounting or shield bypass until observed and reproducible.
5. If engine support is missing, keep `hook_drag` as design metadata, use a suitable attack animation as a visual approximation where legal, or fall back to ordinary `stagger`'s separate shield-block concept without changing its definition.

**Possible future runtime policy, not approved behavior:** a brief individual-model reaction/recovery interruption could simulate imbalance if the engine exposes a safe mechanism. Exact trigger, chance, cooldown, immunity, resistance and movement distance are **TBD**, not defaults.

## 6. Acceptance criteria and test matrix

**Must pass for Phase A:**

- `python build.py` succeeds; regenerated `index.html` contains source changes. A second build is stable.
- Fresh/default bill shows `stagger, hook_drag`, with unchanged current category Attack/handling. Fresh/default greatsword shows `duelist_2`, with unchanged Attack/handling.
- Existing `stagger` tooltip and effect JSON still describe a **Shield-block-only** trigger and the original attack remaining blocked.
- `hook_drag` is selectable in both slots, survives a project JSON export/import round-trip, and appears in downloaded runtime-design JSON with **unverified** status and no fabricated animation ID or chance.
- EDU export and copied EDU never include `hook_drag`, `stagger`, or other custom tags as native attributes. Native tags still export normally.
- An old saved project containing customized `bill` or `greatsword` attrs, including an explicit `pikebreaker_1`, is preserved exactly; recognizable untouched built-in defaults may migrate to the new defaults. Rollback behavior on invalid imports still works.
- One heavy crossbow archetype remains; `arbalest` ID still loads; no cranequin/windlass duplicate preset. Existing light/intermediate crossbows remain available.
- Core Defense Skill 4, current category Attack/handling, equipment grades, offhands, armor, cavalry barding, unit role filters, secondary “None”, and existing metadata exports show no regression.
- No M2EX/Squirrel runtime feature is represented as implemented. No new custom tag leaks into valid EDU syntax.

**Report with Codex output:** concise changed-file list, build/test commands and results, migration behavior, manual UI smoke-test results, a screenshot if easy, and blocked Phase B questions. Prefer small isolated changes over refactoring the entire builder.

## 7. Explicit non-goals and questions

Do not edit `src/base_v1.5.html` except where absolutely necessary to preserve the build system. Do not rewrite the original weapon catalogue. Do not change live M2EX game files, invent Squirrel APIs, create national-name duplicates, apply global +50% Attack increases, or automatically implement unhorse/disarm/shield bypass.

**Unresolved, to be revisited after animation research and user balance approval:** Hook/Drag event trigger and chance; whether the defender step has real root motion; target immunity/resistance and overlap with Stagger; exact mace variant stats; short/long flail animation support; braced-lance engine effects; and whether any weaker halberd hook should be enabled by default.

## 8. Historical/context references

- Original research catalogue: https://github.com/lupinemaverick/stainless-steel-reforged-unit-builder/blob/main/docs/research/Weapon_Catalogue_1050_1550.md
- Original deep-research hand-off: https://github.com/lupinemaverick/stainless-steel-reforged-unit-builder/blob/main/docs/research/Deep_Research_Handoff_Historical_Weapons_1050_1550.md
- Polish Army Museum on `kiścień`: https://muzeumwp.pl/mwpedia/kiscien/
- Metropolitan Museum crossbow reference: https://www.metmuseum.org/art/collection/search/33739
- Cleveland Museum lance rest: https://www.clevelandart.org/art/1916.1804.b
- Royal Armouries period overview: https://royalarmouries.org/objects-and-stories/stories/the-hundred-years-war-1337-1453

These references support historical research directions; **they do not verify M2EX runtime hooks or numerical game balance**.
