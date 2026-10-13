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

Derived from the MUG Unit Builder v1.5 and MUG Unit Creation Guide, with Stainless Steel: Reforged / Combat Reforged rules and presentation developed for Pip. Original attribution remains in the source. No new distribution license has been assigned.
