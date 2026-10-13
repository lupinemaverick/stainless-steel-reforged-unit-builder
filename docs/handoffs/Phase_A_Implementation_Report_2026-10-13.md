# Phase A implementation report — 13 October 2026

Feature branch: `feature/weapon-archetypes-phase-a`, based on `handoff/weapon-archetypes-hook-drag-2026-10-13`.

## Changes

- `src/reforged.js`: recognizes Hook/Drag as custom metadata, records unverified individual-model contact and visual candidate with null chance, lockout and animation ID; excludes the tag from native EDU.
- `src/weapon_controls.js`: primary/secondary Hook/Drag checkboxes, explicit no-runtime description, conditional visual description input. Shield-block-only Stagger remains separate.
- `src/weapon_phase_a.js`: snapshots known previous defaults; changes built-in bill to `stagger, hook_drag` and greatsword to `duelist_2`; migrates exact untouched stores/fields and marks future project/preset snapshots. Rejects unknown archetypes before restore wrappers recalculate invalid state.
- `build.py` and regenerated `index.html`: include Phase A module.
- `package.json`, `.gitignore`, `tests/run.cjs`, `tests/test_phase_a.cjs`: portable pinned Playwright test entry point and dedicated acceptance checks.
- Existing browser regression suites brought into `tests/`: `test_builder.cjs`, `test_bible_audit.cjs`, `test_combat_rules.cjs`, `test_equipment_grade.cjs`, `test_preset_filters.cjs`, `test_defaults_armor.cjs`. Dependencies and browser paths are configurable. The old automatic-Pikebreaker expectations now explicitly select it before testing its existing behavior; inherited test-only text encoding corrected.
- `README.md` and this report: build/test instructions and limitations.

## Migration policy

Whole preset/category records must exactly match known old defaults before their attribute packet migrates. Numeric changes, attribute changes, extra fields and other customized packets prevent migration. Active fields migrate only for a known built-in preset with compatible known numeric fields/grip, untouched saved preset/category and no advanced effect override. Custom slots remain untouched. Existing project schema/version remains v1; arbitrary advanced effect records remain stored and round-trip.

A revision marker prevents repeated migration, so explicitly configuring Pikebreaker afterward stays explicit. Identical pre-revision values cannot reveal undocumented user intent; exact matches are treated as untouched defaults. If deliberate old behavior must be retained without any other distinguishing customization, keep it in an explicit advanced effect override or select it after migration.

## Verification

Commands: `python build.py`, then `npm test` (executed using the installed Node/Playwright runtime and `SSR_BROWSER_EXECUTABLE` pointing to installed Edge). A second Python build produced the identical SHA256: `0ce136a66e7b02676509a1f03210245fe7bcd137bc5eb928bf16a812efdb703e`.

Passed: 25 Phase A assertions; 99 builder assertions; 125 numerical bible assertions; 51 combat rules; 43 equipment grades; 12 preset filtering; 61 defaults/armor. Total 416, plus 2 layout checks, 3 browser checkbox events, 2 formation override checks and 3 preset migration checks. No page errors.

Checks exercise both slots, project round trips, unknown effect payload preservation, metadata downloads, copied EDU/native export filtering, unchanged arbalest packet, exact untouched/default versus customized migrations, invalid-import restoration and persisted browser reload. Existing suites cover core Skill4, current Attack/handling, offhand suppression and signed tradeoffs, equipment math, armor ensembles, horse barding, roles and None secondary. Browser-driven checkbox/settings interactions and desktop/narrow layout smoke checks passed; screenshots are produced locally by the builder tests and excluded from Git.

## Remaining gates / intentionally unchanged

No Phase B archetypes, mace variants, flails, braced-lance behavior or halberd hook default were added. Arbalest ID and all projectile, role, Attack and delay fields remain unchanged; no windlass/cranequin duplicates. No game/mod runtime files, original catalogue or `src/base_v1.5.html` changed. No live hosted-site deployment is part of this feature-branch task.

Hook/Drag trigger, proc chance, lockout, animation identity, root motion, immunity/resistance and interaction with Stagger remain unverified. Real dragging, unhorse and shield bypass remain explicitly unimplemented. Numeric variant balance remains deferred for user review and engine research.
