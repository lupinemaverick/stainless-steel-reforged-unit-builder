# Deep Research Handoff: Historical Weapons Catalogue, 1050–1550

Prepared 13 October 2026 for the ChatGPT project **Stainless Steel: Reforged (Mobile)**. This is a continuation brief, not a replacement research catalogue. The original catalogue remains unchanged.

## Copy-ready research request

Extend and critically audit the existing Historical Weapons Catalogue, 1050–1550 for Stainless Steel: Reforged / Combat Reforged. Conduct multilingual research using museum object records, archaeological publications, manuscript collections, contemporary inventories and reputable historical scholarship from multiple countries. Identify additional documented weapon forms, correct unsupported terminology or dating, and distinguish meaningful functional differences from regional aliases. Historical credibility matters, but interesting, understandable gameplay comes first. Do not inflate the preset count with renamed weapons.

Read this handoff and the original catalogue before researching. Treat the catalogue's references as starting evidence, not proof that every alias, date or proposed stat is correct. Preserve the existing catalogue as a baseline; produce a separate, traceable supplement and corrections ledger. Separate historical findings, interpretations, gameplay proposals and engine implementation constraints. Do not edit the live builder or its source code as part of this research.

## Original materials and provenance

The original catalogue was prepared 12 October 2026, with its proposed melee Attack headroom subsequently revised to 12. It contains **69 proposed functional profiles: 50 recommended and 19 conditional, representing 231 profile labels/aliases**. These counts describe the design catalogue, not a historical census.

Original archived document, pinned to the GitHub commit that contains both versions:
https://github.com/lupinemaverick/stainless-steel-reforged-unit-builder/blob/58fd2f81f35115e7407a244bc81e4c45ebb475d9/docs/research/Weapon_Catalogue_1050_1550.md

Raw Markdown, suitable for downloading and uploading into ChatGPT project sources:
https://raw.githubusercontent.com/lupinemaverick/stainless-steel-reforged-unit-builder/58fd2f81f35115e7407a244bc81e4c45ebb475d9/docs/research/Weapon_Catalogue_1050_1550.md

Original interactive catalogue:
https://github.com/lupinemaverick/stainless-steel-reforged-unit-builder/blob/58fd2f81f35115e7407a244bc81e4c45ebb475d9/docs/research/Weapon_Catalogue_1050_1550.html

Current builder source:
https://github.com/lupinemaverick/stainless-steel-reforged-unit-builder

Hosted builder:
https://stainless-steel-reforged-unit-builder.lupinemaverick.chatgpt.site/

If a link cannot be read, ask for the corresponding file instead of inventing its contents. The written catalogue includes all profile entries and an evidence/source register. The interactive HTML is a presentation of that research, not independent evidence.

## Mission and geographical scope

The mod pursues historical accuracy while prioritizing interesting and enjoyable gameplay. The central question is whether a documented weapon warrants a distinct tactical choice, rather than merely a different name or model texture.

The original core scope is Europe, North Africa, western Asia and the steppe, 1050–1550 AD. Extend evidence across countries within that area first. Research other regions, including South Asia, East Asia, sub-Saharan Africa and the Americas, as clearly identified comparative or wider-world appendices. Do not silently assign out-of-scope weapons to SSR factions. Modern national borders are research-navigation aids, not medieval political or cultural boundaries.

Maintain the time boundary. Earlier material may establish ancestry; later records may clarify terminology or construction. Neither proves that the exact form was used during 1050–1550. For example, the Florentine Codex was compiled in 1577; distinguish that record's date from the practices it describes.

## What the prior research did and did not establish

The evidence base was predominantly English-language museum records and collection publications, especially the Metropolitan Museum, Royal Armouries, Wallace Collection, Mary Rose, Morgan Library and similar institutions. Limited non-English or manuscript-related references included Dutch-language Kortrijk material, Spanish Biblioteca Nacional research and a historical fight-book digitized by the Bavarian State Library. The catalogue explicitly noted that text extraction for the Mair fight-book was unavailable. Listing it does not establish a detailed page-by-page review.

This was not a systematic multilingual literature review. Non-English names in the catalogue do not demonstrate that scholarship in those languages was investigated. Late-medieval European objects are more securely anchored than several regional extensions. Many alias relationships, local adoption dates and conditional forms still need individual verification.

Museum dates and surviving object measurements can establish a specific artifact's form and chronology. They do not establish universal battlefield prevalence, an invention date, an exact troop recruitment date or a game stat. Decorative, ceremonial, tournament, hunting and civilian examples must be distinguished from military use.

## Existing taxonomy and admission criteria

Existing melee categories: Knife/dagger; one-handed cutting sword; one-handed thrust-oriented sword; one-handed axe; mace/club; warhammer/pick; one-handed spear with shield; two-handed fighting spear; formation pike; longaxe; glaive; bill/hooked polearm; halberd; pollaxe/polehammer; longsword; greatsword; estoc/tuck; staff/long club; mounted lance.

Ranged groups: Bow, Crossbow, Firearm and Thrown weapon. Sling is proposed; Staff flail is conditional on appropriate animations; incendiaries require a separate special-system review. These proposed additions are not all implemented categories. **None** in the secondary weapon selector denotes no weapon, not a historical family.

A separate preset should demonstrate at least one material distinction in grip, reach/geometry, mounted use, contact surface, shield compatibility, formation/bracing behavior, ammunition, spanning/ignition system or tactical handling. The distinction must survive equal Soldier Quality and Equipment Grade and be expressible in the engine.

Regional names, decoration, costliness, noble ownership and nationality alone do not justify separate stats. Investigate whether apparently similar terms are true synonyms, partially overlapping classifications, differently constructed objects or later antiquarian labels. Never merge names solely because their English translations resemble each other.

Priority terminology audits include bill/roncone/guisarme; ranseur/spetum/corseque; pollaxe/polehammer/beaked sidearm; mace/pernach/shestoper/gurz; berdiche; partisan; Ahlspiess; estoc/tuck; regional saber names; and infantry spear versus mounted lance. These are questions to investigate, not asserted equivalences.

## Later decisions that supersede stale catalogue wording

Some original passages say that core soldier Skill, separate Equipment Grade and revised weapon baselines were not yet implemented. That was true at the catalogue's drafting stage; it is no longer current. Do not use those passages as a description of today's builder.

1. Revised weapon category baselines and a default **core soldier Defense Skill of 4** were implemented. The former full weapon Defense Skill baseline was replaced with a small handling bonus, generally 0 or 1 for the existing category defaults. Only the defending weapon's handling contributes, not both weapons simultaneously.
2. Archetypes retain training bonuses, but their former equipment Attack and Armor bonuses were removed. Equipment Grade is separate from Soldier Quality. Common Grade and Average Soldier Quality are intended to predominate; Artisan and Exceptional are rare.
3. Equipment Grade adjustments to each relevant equipped primary stat (weapon Attack, worn Armor, held Shield), followed by recruitment/upkeep percentages, are: Artisan +2 / +15% / +10%; High +1 / +7.5% / +5%; Common 0 / 0% / 0%; Munition −1 / −20% / −15%; Poor −1 / 0% / +10%. Royal Retinue is locked to Artisan. Munition represents selected mass-production contexts; Poor represents poor workmanship or maintenance. They are not the same historical explanation.
4. Ordinary Defense Skill reductions were removed or neutralized, with explicit exceptions for Aggressive subtype (−1) and Large Fighting Shield (−1). Independent offhands: Large Fighting Shield 7 Shield/−1 Skill; Medium 5/0; Low 3/+1; Buckler 1/+2; Parrying dagger 0/+2. Two-handed defending weapons suppress held offhand protection and its Skill contribution.
5. Horse barding Armor adds once to the rider's Armor for eligible horse-mounted units; cavalry is treated as a combined rider/mount health target. This does not make horse protection a weapon statistic.
6. Armor presets now choose editable ensembles. Padding, mail coverage and plate components must not be counted twice. Earlier aspirational protection targets are not guaranteed current preset totals: the current default Double Mail ensemble is 7+2=9 Armor; Gothic plate with fitted doublet and mail voiders is 11+1+1=13 before grade and barding. Do not assume every current plate unit has 18 Armor.
7. Command is an independent selectable subtype that adds the native command attribute. Martial Nobility no longer grants it automatically.
8. Lances no longer receive the native spear attribute by default; the user intends spear specifically for spear infantry. Conditional spear_bonus_X remains distinct from the displayed base Attack.
9. A discussion proposed restricting Hybrid to Skirmish EDU Class, but that restriction was not implemented in this conversation. Distinguish discussed intentions from current behavior.

The user questioned whether increased weapon Attack was stacking excessively with other bonuses. Separating equipment from archetype addressed the main identified stack. **Do not automatically increase every weapon by 50% again.** The catalogue's proposed ceiling of 12 is design headroom for most melee baselines, not a native hard cap or a conclusion from historical evidence.

As a comparison anchor, Average-quality Martial Nobility infantry with a Common-grade greatsword now has base Attack 12 plus archetype training 2 = 14. This is a balance example, not a claim about measured medieval performance. Ranged and mounted quality tables differ; isolate weapon bases from the complete unit result.

## Accepted custom-effect semantics and implementation limits

These definitions are design decisions; the builder currently records custom effects as metadata rather than implementing them in the battle engine. M2EX/Squirrel implementation remains a separate task. Availability of Squirrel alone does not prove that the required model-level engine hooks exist.

- Pikebreaker_1: 10% chance per eligible individual model-to-model pike engagement to force the defending model to its usable secondary weapon permanently for that battle. No unit-wide switch, timeout or automatic restoration. Continued engagements can progressively disable pikes; not every pike is guaranteed to be removed in finite combat.
- Batter_X: permanent, cumulative fatigue points applied to the individual model on damaging contact or nonlethal Armor-absorbed contact. Dodge, Skill parry and Shield block do not qualify. Ordinary fatigue recovery must not remove the Batter contribution. Batter_2 is a testing candidate; native fatigue scale still needs verification.
- Rend_X concerns applicable target Armor for the attack, not additional displayed weapon Attack or permanent armor destruction. Do not automatically stack it with AP. Explicit combinations need an ordering and runtime audit.
- Duelist_X is conditional Attack against eligible infantry excluding spear/pike and missile infantry; it does not lower the defender's Armor or Shield.
- Stagger is tied to an eligible Shield-block outcome, not every hit against a unit carrying a shield. Runtime reaction, timing and resistance require explicit implementation/testing.

Do not introduce undocumented disarm, unhorse, shield-bypass or multi-target effects as if they were existing engine behavior. Where a historically meaningful distinction lacks an engine route, recommend a visual alias, conditional candidate or merged preset.

## Multilingual research priorities

Build a transparent coverage matrix recording country/region, language, institutions searched, sources actually read, relevant records, gaps and inaccessible material. A source located but not read must be labeled accordingly.

Start with regional museum collections, university repositories, national libraries, archaeological publications and scholarly catalogues in French, German, Italian, Spanish, Portuguese, Dutch, Polish, Czech and relevant Scandinavian languages. For the Balkans, Byzantine/eastern Mediterranean, Islamic world and steppe, seek Greek, Turkish, Arabic, Persian and relevant eastern European scholarship when available. Wider-world extensions should use locally relevant languages and institutions rather than relying entirely on English summaries.

These are research priorities, not claims that specific unvisited institutions hold a needed object. Search modern spelling, historical variants, original scripts and transliterations. Translate accurately, identify the source language, preserve technical terms and distinguish translation uncertainty from historical uncertainty. Record publication date separately from artifact date. Avoid treating machine translation of a catalogue label as proof of functional equivalence.

Investigate missing or weakly evidenced forms, especially early regional sidearms and polearms, shield-compatible versus two-handed variants, mounted versus foot use, local crossbow spanning systems, bow construction/use, throwing weapons, slings, early firearm development and conditional flails. Assess source survival bias: famous elite objects are not a representative sample of ordinary military equipment.

## Required record structure and evidence discipline

For each significant finding, capture:

| Field | Required content |
|---|---|
| Identity | Unique supplement ID and existing catalogue profile ID(s), if applicable |
| Names | Original-language name/script, transliteration, English rendering, attested historical versus modern label |
| Context | Region/polity, object or depicted form, military/civilian/ceremonial context |
| Chronology | Artifact/manuscript date, depicted period, confidence/range, earliest secure evidence versus prevalence |
| Provenance | Institution/author, accession/catalogue number or manuscript shelfmark, stable link, page/folio/figure |
| Physical evidence | Grip, length, head/blade construction, weight when measured, and limits of interpretation |
| Tactical evidence | Documented users, mounted/foot context, shields, formations; distinguish evidence from inference |
| Relationship | New functional form, alias, correction, earlier/later anchor, exclusion, or unresolved candidate |
| Game mapping | Existing/proposed category and whether engine geometry/animations can express the distinction |
| Confidence | High/moderate/low with a reason and any contradictory evidence |

Prefer original object records, archaeology and contemporary evidence, supplemented by reputable scholarship. Give precise page/folio/figure references for manuscripts and lengthy publications. Use aggregator images or popular articles as leads, not the sole foundation for a major conclusion. Label inaccessible evidence rather than citing it as examined. Report disagreements and ambiguities instead of manufacturing a single exact date.

No numerical Attack, Defense Skill, fatigue chance or recruitment cost can be inferred directly from an artifact's nationality, price, blade length or survival date. If recommending stats, clearly mark them as optional balance hypotheses and compare against the existing Common-grade baseline under controlled unit conditions.

## Requested deliverables

1. A readable multilingual research supplement, with a short overview of the strongest additions and corrections.
2. A corrections ledger quoting or precisely locating the affected original claim, the new evidence, confidence and proposed disposition. Keep the original unchanged.
3. A table of genuinely new functional candidates versus regional/model aliases. Explain why each proposed preset earns a separate slot.
4. A chronology/region matrix separating secure object dates, inferred adoption and uncertain prevalence.
5. A source bibliography and language/region coverage report, including dead ends and inaccessible records.
6. A structured CSV or JSON supplement using stable IDs and the record fields above, suitable for later human review.
7. An optional, separately labeled gameplay mapping appendix. Identify native EDU options, custom runtime requirements and animation limits; do not implement changes.

Prioritize evidence quality and useful corrections over the number of additions. A finding that an apparent new weapon is an alias, later form or unsuitable military example is a valuable result.

## How to use this handoff in ChatGPT

In Stainless Steel: Reforged (Mobile), add this Markdown file and the original written catalogue as project sources. Start a new chat there, select Deep research if available, and use the copy-ready request at the top. If Markdown preview or GitHub retrieval is unavailable, download the raw file and upload it, or paste the handoff text.

ChatGPT's official project documentation describes adding files, saving eligible chat responses as sources and moving eligible ChatGPT chats. This handoff does not claim that a whole Codex thread is automatically imported as a ChatGPT project source:
https://help.openai.com/en/articles/10169521-projects-in-chatgpt
