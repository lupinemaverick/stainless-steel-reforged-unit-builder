# Stainless Steel: Reforged Unit Builder

A browser-based Medieval II: Total War unit designer for Stainless Steel: Reforged / Combat Reforged, based on the MUG Unit Builder.

[Hosted builder](https://stainless-steel-reforged-unit-builder.lupinemaverick.chatgpt.site/)

## Use

Open `index.html` in a modern browser, or serve this folder with `python -m http.server 8000`. The builder produces EDU blocks and CSV rows and imports/exports project JSON. Preset changes are stored in the current browser; project files are the portable way to move your work between the local and hosted versions.

## Build

Python 3 is required only to rebuild the standalone HTML:

```sh
python build.py
```

`src/base_v1.5.html` is the original MUG foundation. `src/` contains the Combat Reforged modules and branding stylesheet; `build.py` combines them into `index.html`. All inputs are included here and no machine-specific input paths are required.

## Current features

- Unit archetypes and selectable subtypes, including Command.
- Independent Equipment Grade; Royal Retinue requires Artisan.
- Category-filtered primary/secondary weapon presets, with a distinct None secondary category.
- Editable armor ensembles and weight-dependent layers.
- Offhand Shield/Defense Skill tradeoffs and corresponding legacy mass adjustments.
- Horse barding applied once to rider Armor.
- Live EDU/CSV output and portable project files.

Custom combat attributes retained as design metadata still require their corresponding engine runtime implementation; the builder does not implement those battle effects itself.

## Attribution

Derived from the MUG Unit Builder v1.5 and MUG Unit Creation Guide, with Stainless Steel: Reforged / Combat Reforged rules and presentation developed for King Siegfried. Original attribution remains in the source. No new distribution license has been assigned.

## Regression tests

The browser tests require Node.js and Playwright. After installing the pinned development dependency, install Chromium and run:

```sh
npm install
npx playwright install chromium
python build.py
npm test
```

To use an already installed compatible browser instead, set `SSR_BROWSER_EXECUTABLE` to its executable path. The suite covers Phase A Hook/Drag metadata, strict EDU exports, legacy/custom migration and rollback, plus existing quality, equipment, armor, barding, subtype and preset filtering behavior. No engine runtime is tested or implemented.

Phase A changes only untouched bill/greatsword attribute defaults. Hook/Drag remains a **Custom proposal — no engine runtime** with unspecified chance/lockout and no animation ID. See `docs/handoffs/Phase_A_Implementation_Report_2026-10-13.md` for verification and migration details.

Overall unit attributes are selected in grouped checkboxes above Extra attributes. The free-text field remains available for unlisted tags. Command stays in Unit Subtypes, sapping controls mirror each other, and attributes inherited from archetypes are shown as such. Forest hiding defaults to foot infantry but an explicit opt-out is saved. Desert Raider and Forest Ambusher each add +2 to the respective `stat_ground` value; their names are not emitted as unit attributes.
