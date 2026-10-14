# Overall unit attribute controls

Added requested unit-wide attribute checkboxes above Extra attributes, grouped for readability. Each selected attribute shows its supplied description. Command remains only in Unit Subtypes. Known tags and free-text tags synchronize; unknown tags remain intact. Sapping mirrors the existing capability control. Archetype-provided attributes are checked and disabled rather than implying that unchecking can remove an archetype effect.

Foot infantry defaults to hide_forest. Explicit hide/no-hide choices survive project export/import; Knights of Jerusalem resets as cavalry without automatic forest hiding. Other native unit effects export as tags rather than being added again to displayed Attack, Skill or Charge. Their descriptions reflect the user's supplied reference, not new engine verification.

Terrain controls add +2 to sand or forest stat_ground. They are excluded from the EDU attributes line; repeated calculations do not stack. Older project imports clear stale terrain toggles. Project schema stays v1 and additional fields carry checkbox choices/forest override.

Changed: src/unit_attribute_controls.js, build.py, index.html, tests/test_unit_attributes.cjs, tests/run.cjs, README.md, and this note.

Verification: 123 new unit-attribute assertions plus all seven previous suites (416 assertions); total 539, with no browser errors. Layout, browser-event, formation and migration checks also pass. Standalone rebuild is stable. No new game runtime or M2EX mechanics were implemented.
