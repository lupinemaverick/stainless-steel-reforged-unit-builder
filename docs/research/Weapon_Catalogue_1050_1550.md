# Combat Reforged weapon catalogue:1050–1550

Prepared12 October2026. **69 proposed functional presets, covering 231 labels/aliases.** This is a design catalogue, not a claim that history had exactly this many weapon types. 50 are recommended profiles and 19 are conditional candidates. Some conditional profiles should be merged if engine geometry/animations cannot give them meaningful behavior.

## Recommendation

Keep the19 melee categories and4 ranged groups already in the builder. Consider **Sling** as one additional ranged category and **Staff flail** only if appropriate animation support exists. Incendiaries belong in a separate special-system review. Do not add a category for each regional name. A realistic production starting point is about40–45 useful presets, expanding toward this larger catalogue only where tests justify another choice.

Scope: Europe, North Africa, western Asia and the steppe, across1050–1550, with wider-world candidates separately listed. This is not an exhaustive inventory of every global weapon. Ordinary widespread families are covered broadly; several regional names and early adoption dates remain conditional. No builder stats or live presets have been changed.

## What earns a separate preset?

1. Different actual grip/reach/geometry or mounted context.
2. Different contact/damage package: cut, concentrated point or percussion.
3. Different shield compatibility, bracing/formation behavior or ammunition/spanning/ignition package.
4. A real tactical tradeoff which survives equivalent Soldier Quality and Equipment Grade.

Different names, ornament, smithing grade, national origin or elite troop labels do not by themselves earn different weapon stats. Military mace/pernach/shestoper/gurz can share a preset unless the depicted heads behave differently. A bill/roncone/guisarme can share a preset; a long-handled beak is a polehammer while a short one is a sidearm pick. Ranseur/spetum/corseque require actual head inspection rather than blanket synonym treatment.

## Stat conventions and current decisions

**Latest Attack revision:** Common-grade melee base Attack now has design headroom up to12, rather than approximately8. General-purpose2H damage weapons occupy roughly9–12; point/formation specialists can sit lower with their conditional effects. One-handed arms mostly remain2–6. Final unit Attack can exceed12 after training, Soldier Quality and Equipment Grade. This is not a hard native/export cap; ranged firearms and lance Charge are separate scales. The JSON/CSV retain previous Attack for comparison.

The user's stated protection targets are heavy mail around9–10, later Gothic/Milanese plate around18, and armored cavalry potentially in the20s with barding contributing to combined rider protection. Treat these as CR design inputs, not museum-derived universal numbers. The released builder currently retains barding protection as auxiliary data rather than adding it to rider Armor; implementing the confirmed combined-protection rule remains separate from this catalogue update.

The live builder's weapon handling value6 is a **legacy full weapon Defense Skill base**, not this catalogue's small+0/+1 handling bonus. Current Martial Nobility contributes+2 training Skill, so Average-quality greatsword/no shield can total6+2=8 before other terms. The proposed core baseline4 would REPLACE that6; adding4 to6 would double-count. With unchanged noble+2 and handling0, that becomes6. A further proposed noble reduction to+1 would give5. Neither Skill revision has been applied silently.

Increasing raw Attack does not guarantee a proportional casualty increase. Defense Skill/parry behavior, Shield, effective Armor, animations, fatigue and cost must be tested together. Permanent Batter/Pikebreaker can change the time-course of combat substantially. Avoid trying to fix shield dominance by making every2H weapon receive all specialist effects.

- All numbers are **proposed Common-grade weapon bases**, before Soldier Quality, archetype training, subtypes or equipment grades. Museum artifacts establish form/dates, not game Attack or fatigue probabilities.
- Handling is a proposed small **positive bonus**, not the current builder's full legacy weapon Defense Skill baseline.0 means no bonus, not a0-Skill soldier. The proposed core Skill baseline is separate and not yet implemented. No weapon preset here adds a Defense Skill penalty.
- Attack values anchor to current CR categories. Variant packets and numbers are proposals, while the previously assigned custom attribute definitions remain finalized.
- Delay is native EDU delay units, provisionally anchored to existing controls; the local header describes tenths of a second. Actual attack cadence also depends on skeleton/animation. Ranged delay is left unspecified because reload behavior needs verified family animations.
- Reach is a design class, not a new EDU field. If geometry/skeletons cannot express it, merge the affected presets instead of selling a fictitious reach advantage.
- Pikebreaker1:10% per eligible individual pike engagement, permanent secondary-weapon switch for that model for the battle. No temporary duration or restoration. Every pike is not guaranteed to be removed in finite combat; facing, engagement, casualties and opportunities matter.
- Batter2: permanent cumulative2 fatigue points per eligible hit against the individual model, pending magnitude testing. Hits/Armor-absorbed contact qualify; dodge/parry/Shield block do not. Ordinary recovery must not remove Batter's contribution. Native fatigue scale needs verification.
- Soldier Quality and Equipment Grade remain independent. Common/Average predominate. Do not add a “noble sword” or “artisan mace” physical subtype to duplicate grade selection.
- Spear_bonus values require a native dependency audit. Current reference says spear/light_spear requirements and additional matchup effects exist. Do not silently add light_spear's negative infantry Defense Skill under the new no-routine-Skill-penalty policy. No half-Skill pike modifier is recommended here.
- AP and Rend must not stack automatically. Newly proposed firearm AP packets need projectile-level verification before grade/testing. No new undocumented cleave, disarm, unhorse or shield-bypass mechanic is assumed.
- Period bands are approximate **roster discussion windows**, not invention dates, precise unlocks or evidence of universal use. Exact artifacts/date notes are supplied alongside each proposal.

## Chronological reading

**1050–1250:** Fundamental knife/sword/axe/mace/spear/lance/bow and crossbow choices already offer broad variation. Start with those differences and regional models, not a false assumption that all early weapons are crude.

**1250–1400:** More long-sword and staff-weapon profiles become useful; improved ranged equipment and formation contexts need region-specific evidence. Late14th-century halberd artifacts and around1400 handguns are firm late-band anchors. A band beginning1250 does not make handguns available then.

**1400–1500:** This is the richest expansion for armored close combat: rigid points, hammer/beak sidearms, pollaxes, more developed halberds, long formation pikes and mechanically spanned crossbows. Technology access remains faction/unit-specific.

**1500–1550:** Late infantry two-handers, broad-bladed fighting spears and coherent firearm packages can deepen roles. Keep early pistols and rest-supported muskets selective. Familiar later caliver, mature rapier, polearm and regional sword labels must not backdate their exact forms.

These timelines synthesize the source examples and design assumptions below; they are not a complete independent adoption chronology.

## Proposed presets by category

### Knife / dagger

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Utility knife / improvised sidearm | 1050–1250; Pan-regional | 2 / 1 / 15 | 0 / +0 | — / — | None | Recommend |
| Edged fighting dagger | 1250–1400; Europe | 2 / 2 / 20 | 0 / +1 | — / — | None | Recommend |
| Rigid thrusting dagger | 1400–1500; Europe | 2 / 1 / 25 | 0 / +0 | — / — | Rend_2 · variant proposal | Recommend |

**Utility knife / improvised sidearm** (utility_knife) — 1H; reach: Very short.

Aliases/variants: Common knife, Work knife.

Distinct job: Fast emergency weapon once inside reach. Tradeoff: Very short engagement reach; no hidden armor bypass.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Edged fighting dagger** (fighting_dagger) — 1H; reach: Very short.

Aliases/variants: Quillon dagger, Bollock dagger, Baselard (short forms).

Distinct job: Close-combat defensive sidearm. Tradeoff: Still needs proximity; hilt variants are aliases unless blade geometry changes.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [London Museum: rondel dagger](https://www.londonmuseum.org.uk/collections/v/object-29505/dagger-rondel-dagger/), [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Rigid thrusting dagger** (rondel) — 1H; reach: Very short.

Aliases/variants: Rondel dagger (thrusting blade), Mail-oriented dagger.

Distinct job: Contact-range armor specialist. Tradeoff: No automatic plate penetration; vulnerable before closing distance.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [London Museum: rondel dagger](https://www.londonmuseum.org.uk/collections/v/object-29505/dagger-rondel-dagger/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Sword · 1H cutting

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Compact cutting sword | 1400–1500; Europe | 5 / 3 / 30 | 0 / +1 | — / — | None | Recommend |
| Full-length cutting sword | 1050–1250; Europe / western Asia | 6 / 3 / 40 | 0 / +1 | — / — | None | Recommend |
| Mounted cutting sword / sabre | 1050–1250; Steppe / Anatolia / eastern Europe | 6 / 4 / 45 | 0 / +0 | — / — | None | Recommend |

**Compact cutting sword** (short_cut_sword) — 1H; reach: Short.

Aliases/variants: Short sword, Katzbalger (late example; date separately).

Distinct job: Practical sidearm in crowded engagements. Tradeoff: Less reach and raw Attack than full sword; Katzbalger label is late and requires exact model dating.

Dating: Generic short swords are earlier; late German named form is not backdated to1050.

Evidence: [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Full-length cutting sword** (cut_sword) — 1H; reach: Medium.

Aliases/variants: Broad arming sword, One-handed messer, Falchion, Malchus, Tesak (object-dependent), Straight single-edged sword.

Distinct job: Reliable general infantry damage. Tradeoff: No armor-specialist effect; individual falchion/messer forms need separate chronology.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about), [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Mounted cutting sword / sabre** (cavalry_sabre) — Mounted 1H; reach: Medium.

Aliases/variants: Steppe sabre, Turco-Mongol sabre, Kilij (period form), Szablya (period form), Mounted falchion.

Distinct job: Mounted cutting and charge follow-through. Tradeoff: Mounted context supplies the distinction; no racial/cultural damage bonus.

Dating: Sabre family is earlier; the linked Ottoman object overlaps1522–66 and is not an early-form template.

Evidence: [Met: Islamic Arms and Armor collection catalogue](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf), [Met: Ottoman saber](https://www.metmuseum.org/art/collection/search/24320). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Sword · 1H thrust emphasis

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Tapered cut-and-thrust sword | 1250–1400; Europe / western Asia | 5 / 3 / 40 | 0 / +1 | — / — | Rend_2 | Recommend |
| Mounted point-oriented sword | 1250–1400; Pan-regional | 5 / 4 / 50 | 0 / +0 | — / — | Rend_2 | Recommend |

**Tapered cut-and-thrust sword** (thrust_sword) — 1H; reach: Medium.

Aliases/variants: Point-oriented arming sword, Early sidesword (suitable blade).

Distinct job: Trades cutting output for point effectiveness. Tradeoff: Rend is a game abstraction; not a claim that every thrust ignores armor.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: two-handed sword](https://www.metmuseum.org/art/collection/search/35388), [Cleveland: estoc](https://www.clevelandart.org/art/1916.686). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Mounted point-oriented sword** (cavalry_point) — Mounted 1H; reach: Medium.

Aliases/variants: Mounted straight sword, Thrust-oriented cavalry sword.

Distinct job: More concentrated contact than cutting cavalry sword. Tradeoff: Less ordinary Attack; requires its own attack/animation context.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: two-handed sword](https://www.metmuseum.org/art/collection/search/35388), [Met: Islamic Arms and Armor collection catalogue](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Axe · 1H

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Light fighting axe | 1050–1250; Pan-regional | 3 / 3 / 35 | 0 / +0 | — / — | Stagger | Recommend |
| Full battle axe | 1050–1250; Pan-regional | 4 / 4 / 45 | 1 / +0 | — / — | Stagger | Recommend |
| Mounted fighting axe | 1050–1250; Europe / western Asia | 4 / 4 / 50 | 1 / +0 | — / — | Stagger | Recommend |

**Light fighting axe** (light_axe) — 1H; reach: Short.

Aliases/variants: Light hand axe, Light bearded axe.

Distinct job: Relatively quick shield-contact pressure. Tradeoff: Low ordinary Attack; Stagger only on eligible shield-block outcome.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Full battle axe** (battle_axe) — 1H; reach: Short–medium.

Aliases/variants: Bearded battle axe, Tabar (short axe form), Sekira (short form).

Distinct job: Stronger cutting/charge than light axe. Tradeoff: Slower/hotter; hooks are not automatic dismount mechanics.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Mounted fighting axe** (mounted_axe) — Mounted 1H; reach: Short–medium.

Aliases/variants: Horseman’s axe, Mounted tabar.

Distinct job: Mounted shield-contact pressure. Tradeoff: Mounted cadence/charge context, not a culturally stronger axe.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: Islamic Arms and Armor collection catalogue](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Mace / club · 1H

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Plain club / mallet | 1050–1250; Pan-regional | 3 / 2 / 40 | 0 / +0 | — / — | Batter_1 · variant proposal | Recommend |
| Military mace | 1050–1250; Pan-regional | 4 / 2 / 60 | 1 / +0 | — / — | Rend_2; Batter_2 | Recommend |
| Horseman’s mace | 1250–1400; Europe / western Asia | 4 / 4 / 65 | 1 / +0 | — / — | Rend_2; Batter_2 | Recommend |

**Plain club / mallet** (club) — 1H; reach: Short.

Aliases/variants: Wooden club, Iron-bound club, Archer’s mallet.

Distinct job: Low-cost percussion without specialist armor reduction. Tradeoff: No automatic Rend merely because the sound is mace.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Military mace** (mace) — 1H; reach: Short.

Aliases/variants: Solid-headed mace, Flanged mace, Pernach, Shestoper, Gurz / gürz.

Distinct job: Armor-contact and permanent per-model fatigue pressure. Tradeoff: Short reach; flute/flange names do not justify free extra damage.

Dating: Generic mace family earlier; late flanged designs require later models rather than universal1050 issue.

Evidence: [Met: flanged horseman’s mace](https://www.metmuseum.org/art/collection/search/33836), [Met: Islamic Arms and Armor collection catalogue](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Horseman’s mace** (mounted_mace) — Mounted 1H; reach: Short.

Aliases/variants: Mounted military mace.

Distinct job: Cavalry percussion sidearm. Tradeoff: Mounted reach and recovery differ; exact late flanged form anchored by object.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: flanged horseman’s mace](https://www.metmuseum.org/art/collection/search/33836). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Warhammer / pick · 1H

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Hammer-face sidearm | 1400–1500; Europe | 4 / 3 / 65 | 1 / +0 | — / — | Rend_3; Batter_2 · variant proposal | Recommend |
| Military pick / beak emphasis | 1400–1500; Europe / western Asia | 4 / 3 / 60 | 1 / +0 | — / — | Rend_5 | Recommend |

**Hammer-face sidearm** (hammer) — 1H; reach: Short.

Aliases/variants: Short warhammer, Bec-de-corbin (short form).

Distinct job: Trades maximum point effectiveness for fatigue pressure. Tradeoff: Distinct from pick through effect package, not name.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: French war hammer](https://www.metmuseum.org/art/collection/search/25073). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Military pick / beak emphasis** (pick) — 1H or mounted1H; reach: Short.

Aliases/variants: Horseman’s pick, Nadziak (period form).

Distinct job: Concentrated immediate armor interaction. Tradeoff: No Batter addition by default; precise point/animation matters.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: French war hammer](https://www.metmuseum.org/art/collection/search/25073). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Spear · 1H / shield

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Compact spear with shield | 1050–1250; Pan-regional | 3 / 3 / 55 | 0 / +0 | — / — | Spear_bonus_2 · native dependency check | Recommend |
| Full spear with shield | 1050–1250; Pan-regional | 3 / 3 / 75 | 0 / +0 | — / — | Spear_bonus_4 · native dependency check | Recommend |

**Compact spear with shield** (short_spear) — 1H + shield; reach: Medium.

Aliases/variants: Short infantry spear.

Distinct job: Shield-compatible thrusting with manageable frontage. Tradeoff: Less reach/cavalry emphasis than full spear.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Full spear with shield** (shield_spear) — 1H + shield; reach: Long.

Aliases/variants: Infantry spear, Lancea, Kontarion (shielded form).

Distinct job: Frontal thrusting while retaining a shield. Tradeoff: Crowding/flanking counterplay; physical spear family spans many labels.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Fighting spear · 2H

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Two-handed fighting spear | 1050–1250; Pan-regional | 7 / 4 / 65 | 1 / +1 | — / — | Rend_2; Spear_bonus_4 · native dependency check | Recommend |
| Broad-bladed fighting spear | 1500–1550; Europe | 8 / 4 / 75 | 1 / +0 | — / — | Rend_1; Spear_bonus_4 · variant proposal | Recommend |
| Awl-pike / Ahlspiess | 1400–1500; Central Europe | 7 / 3 / 75 | 1 / +0 | — / — | Rend_4; Spear_bonus_4 · variant proposal | Recommend |
| Forked/control spear | 1500–1550; Europe | 6 / 3 / 70 | 1 / +1 | — / — | Spear_bonus_4 · native dependency check | Conditional |
| Dismounted lance / long thrusting spear | 1250–1400; Europe | 6 / 3 / 85 | 1 / +0 | — / — | Spear_bonus_4 · native dependency check | Conditional |

**Two-handed fighting spear** (fighting_spear) — 2H; reach: Long.

Aliases/variants: Stout spear, Winged spear, Boar spear (military use needs evidence).

Distinct job: Thrusting control without a shield. Tradeoff: Winged head is an alias unless a verified control mechanic earns a split.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about), [Met: partisan](https://www.metmuseum.org/art/collection/search/26090). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Broad-bladed fighting spear** (partisan) — 2H; reach: Long.

Aliases/variants: Partisan, Spetum (appropriate blade), Corseque (appropriate head).

Distinct job: Cut/thrust versatility at spear reach. Tradeoff: Lower Rend than point specialist; classify side blades from actual construction.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: partisan](https://www.metmuseum.org/art/collection/search/26090). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Awl-pike / Ahlspiess** (ahlspiess) — 2H; reach: Long.

Aliases/variants: Ahlspiess, Ahlspieß.

Distinct job: Rigid thrusting staff weapon. Tradeoff: Not automatically a long_pike formation weapon despite English name.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: awl-pike / Ahlspiess](https://www.metmuseum.org/art/collection/search/25623). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Forked/control spear** (forked_spear) — 2H; reach: Long.

Aliases/variants: Ranseur, Spetum (narrow side-prong form), Military fork, Corseque (narrow form).

Distinct job: Candidate handling/control rather than higher damage. Tradeoff: No automatic disarm; merge into fighting spear if prongs cannot alter observed behavior.

Dating: Partisan is a family comparison, not evidence dating each named forked form; exact objects need verification.

Evidence: [Met: partisan](https://www.metmuseum.org/art/collection/search/26090). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Dismounted lance / long thrusting spear** (dismounted_lance) — 2H infantry; reach: Long.

Aliases/variants: Dismounted cavalry lance.

Distinct job: Infantry use of an existing mounted weapon. Tradeoff: Keep only if reach/animation differs from fighting spear; not an extra category.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Formation pike

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Compact formation pike | 1250–1400; Europe | 4 / 2 / 90 | 1 / +0 | — / — | Long_pike; Spear_bonus_6 · variant proposal | Conditional |
| Long formation pike | 1400–1500; Europe | 5 / 2 / 105 | 1 / +0 | — / — | Long_pike; Spear_bonus_8 | Recommend |

**Compact formation pike** (compact_pike) — 2H formation; reach: Formation reach.

Aliases/variants: Short formation pike.

Distinct job: More manageable formation weapon. Tradeoff: Requires a formation/skeleton supporting multiple-rank presentation; not merely a long fighting spear.

Dating: Early window is a roster hypothesis; cited1545 evidence anchors later pikes, not this early subtype.

Evidence: [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Long formation pike** (long_pike) — 2H formation; reach: Deep formation reach.

Aliases/variants: Swiss pike, Landsknecht pike, Scottish long spear (only if true formation length).

Distinct job: Supported frontal formation coverage. Tradeoff: Permanently vulnerable to successful individual Pikebreaker events; no Skill-halving rule proposed.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Longaxe

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Open-head longaxe | 1050–1250; Northern / western Europe | 11 / 5 / 80 | 2 / +0 | — / — | Stagger; Rend_4 | Recommend |
| Long-bladed axe | 1400–1500; Eastern Europe / western Asia | 11 / 5 / 85 | 2 / +0 | — / — | Stagger; Rend_4 | Conditional |

**Open-head longaxe** (dane_axe) — 2H; reach: Long.

Aliases/variants: Dane axe, Sparth, Long battle axe.

Distinct job: Extended cutting and shield pressure. Tradeoff: No held shield; exposed recovery/geometry matters.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Long-bladed axe** (berdiche) — 2H; reach: Long.

Aliases/variants: Berdiche, Bardiche, Voulge (axe construction).

Distinct job: Long edge and different head geometry. Tradeoff: Merge numerically with Dane axe if its animation/reach cannot supply a real distinction.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: berdiche](https://www.metmuseum.org/art/collection/search/35947). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Glaive / bladed polearm

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Long-bladed glaive | 1250–1400; Europe | 10 / 4 / 80 | 1 / +0 | — / — | Duelist_2 | Recommend |
| Point-oriented swordstaff | 1500–1550; Northern Europe | 8 / 4 / 65 | 1 / +1 | — / — | Rend_2 · variant proposal | Conditional |

**Long-bladed glaive** (glaive) — 2H; reach: Long.

Aliases/variants: Glaive, Fauchard, Voulge (knife construction).

Distinct job: Cutting reach and infantry matchup emphasis. Tradeoff: Not a greatsword, not automatic AP or multi-target cleave.

Dating: Linked Venetian exact form is later15th century; earlier-family assignment is provisional.

Evidence: [Met: Venetian glaive](https://www.metmuseum.org/art/collection/search/26689). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Point-oriented swordstaff** (swordstaff) — 2H; reach: Long.

Aliases/variants: Swordstaff, Svärdstav (verify particular form).

Distinct job: Lighter cut/thrust staff-blade candidate. Tradeoff: Exact regional model/date requires verification; merge if it behaves like standard glaive.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: Venetian glaive](https://www.metmuseum.org/art/collection/search/26689). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Bill / hooked polearm

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Military bill | 1250–1400; Europe | 9 / 4 / 85 | 1 / +0 | — / — | Stagger; Pikebreaker_1 | Recommend |
| Agricultural bill on pole | 1050–1250; Europe | 6 / 3 / 100 | 2 / +0 | — / — | Stagger · variant proposal | Conditional |

**Military bill** (bill) — 2H; reach: Long.

Aliases/variants: Bill, Roncone, Guisarme (strongly hooked military form).

Distinct job: Shield pressure and individual pike clearing. Tradeoff: No automatic horseman removal; hook opportunity and repeated eligible engagements matter.

Dating: Exact early subtype assignment provisional; Mary Rose provides firm1545 military-bill anchor.

Evidence: [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Agricultural bill on pole** (tool_bill) — 2H; reach: Long.

Aliases/variants: Hedging bill, Improvised hooked pole tool.

Distinct job: Improvised cutting/hooking role. Tradeoff: No free military Pikebreaker; use manufacturing grade independently of tool geometry.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Halberd

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Early chopping halberd | 1250–1400; Alpine Europe | 9 / 4 / 95 | 2 / +0 | — / — | Stagger; Spear_bonus_4 · variant proposal | Recommend |
| Developed halberd | 1400–1500; Europe | 10 / 5 / 100 | 2 / +0 | — / — | Rend_3; Spear_bonus_6 | Recommend |
| Formation-oriented halberd | 1400–1500; Europe | 9 / 3 / 105 | 2 / +1 | — / — | Spear_bonus_4 · native dependency check | Conditional |

**Early chopping halberd** (early_halberd) — 2H; reach: Long.

Aliases/variants: Early Swiss halberd, Voulge (early halberd construction).

Distinct job: Transition from chopping blade to combined infantry weapon. Tradeoff: Less armor-specialist package than developed form; actual head must match model.

Dating: Concrete source dates1375–1400; broad era filter is not a1250 unlock.

Evidence: [Met: Fribourg halberd](https://www.metmuseum.org/art/collection/search/25854), [Met: early Swiss halberd](https://www.metmuseum.org/art/collection/search/845840). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Developed halberd** (halberd) — 2H; reach: Long.

Aliases/variants: Swiss halberd, German halberd, Italian halberd.

Distinct job: Versatile infantry cutting/point package. Tradeoff: No pike-level formation reach and no held shield.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: early Swiss halberd](https://www.metmuseum.org/art/collection/search/845840). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Formation-oriented halberd** (formation_halberd) — 2H formation; reach: Long frontal presentation.

Aliases/variants: Phalanx halberd (game loadout).

Distinct job: Positional defense and frontage control. Tradeoff: Proposed tactical loadout, not a distinct historical invention; give up general Rend package.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: early Swiss halberd](https://www.metmuseum.org/art/collection/search/845840). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Pollaxe / polehammer

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Axe/beak pollaxe | 1400–1500; Europe | 10 / 4 / 85 | 2 / +1 | — / — | Rend_4; Duelist_3 | Recommend |
| Hammer/beak staff weapon | 1400–1500; Europe | 9 / 4 / 95 | 2 / +0 | — / — | Rend_5; Batter_2 · variant proposal | Recommend |

**Axe/beak pollaxe** (pollaxe) — 2H; reach: Medium–long.

Aliases/variants: Pollaxe, Poleaxe, Hache (actual composite head).

Distinct job: Controlled armored infantry combat. Tradeoff: Cannot keep a held shield; do not assume every pollaxe shorter than every halberd.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: Burgundian pollaxe](https://www.metmuseum.org/art/collection/search/26720). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Hammer/beak staff weapon** (polehammer) — 2H; reach: Long.

Aliases/variants: Lucerne hammer, Polehammer, Bec-de-corbin (staff form).

Distinct job: Concentrated armor contact plus fatigue pressure. Tradeoff: Lower general cutting usefulness; high permanent fatigue needs model-level testing.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: French war hammer](https://www.metmuseum.org/art/collection/search/25073), [Met: Burgundian pollaxe](https://www.metmuseum.org/art/collection/search/26720). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Longsword · 2H

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Balanced longsword | 1250–1400; Europe | 9 / 4 / 60 | 1 / +1 | — / — | Duelist_2 | Recommend |
| Point-oriented longsword | 1400–1500; Europe | 8 / 4 / 60 | 1 / +1 | — / — | Rend_3 · variant proposal | Recommend |

**Balanced longsword** (longsword) — 2H; reach: Long.

Aliases/variants: Hand-and-a-half sword in2H grip, Bastard sword in2H grip.

Distinct job: General infantry control with two hands. Tradeoff: No held shield; preserve class-based Duelist eligibility as finalized.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: two-handed sword](https://www.metmuseum.org/art/collection/search/35388). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Point-oriented longsword** (longsword_point) — 2H; reach: Long.

Aliases/variants: Rigid diamond-section longsword.

Distinct job: Armored-infantry point specialization. Tradeoff: Replace, rather than stack, general Duelist advantage in this candidate.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: two-handed sword](https://www.metmuseum.org/art/collection/search/35388). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Greatsword

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Large two-handed cutter | 1400–1500; Central Europe | 11 / 5 / 75 | 2 / +0 | — / — | Duelist_2 | Conditional |
| Formation-clearing greatsword | 1500–1550; Europe | 12 / 5 / 80 | 2 / +1 | — / — | Duelist_2; Pikebreaker_1 | Recommend |

**Large two-handed cutter** (twohand_cutter) — 2H; reach: Long.

Aliases/variants: Large Messer, Kriegsmesser (date separately), Cutting two-hander.

Distinct job: Cutting/reach profile. Tradeoff: No automatic Pikebreaker; large blade alone does not prove formation-clearing behavior.

Dating: Family supported; exact Messer model/date still requires a verified object before roster assignment.

Evidence: [Met: two-handed sword](https://www.metmuseum.org/art/collection/search/35388). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Formation-clearing greatsword** (greatsword) — 2H; reach: Very long.

Aliases/variants: Zweihänder, Spadone, Montante, Large infantry two-hander.

Distinct job: Engages exposed formation pikes at personal risk. Tradeoff: Permanent per-model pike loss can become powerful; test10% per eligible engagement against intact ranks.

Dating: Earlier large2H swords exist; this specialized tactical preset is conservatively late, not an invention date.

Evidence: [Met: two-handed sword](https://www.metmuseum.org/art/collection/search/35388). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Estoc / tuck

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Estoc / tuck | 1400–1500; Europe / eastern frontier | 7 / 3 / 55 | 1 / +0 | — / — | Rend_6 | Recommend |

**Estoc / tuck** (estoc) — 2H or specific mounted form; reach: Long.

Aliases/variants: Tuck, Koncerz (object-dependent), Thrust-only rigid sword.

Distinct job: Focused armor interaction without general cutting strength. Tradeoff: No automatically excellent Skill; mounted grip needs a separately valid animation.

Dating: Exact Cleveland example is early1500s; broad earlier-family window is a provisional assignment.

Evidence: [Cleveland: estoc](https://www.clevelandart.org/art/1916.686). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Staff / long club

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Fighting staff | 1050–1250; Pan-regional | 4 / 3 / 45 | 0 / +1 | — / — | None | Conditional |
| Heavy long club | 1050–1250; Pan-regional | 7 / 4 / 75 | 2 / +0 | — / — | Batter_2 · variant proposal | Conditional |
| Spike-ended heavy club | 1250–1400; Flanders | 6 / 3 / 75 | 1 / +0 | — / — | Batter_1; Spear_bonus_2 · variant proposal | Conditional |

**Fighting staff** (quarterstaff) — 2H; reach: Long.

Aliases/variants: Quarterstaff, Bâton, Long staff.

Distinct job: Light reach/handling with limited cutting lethality. Tradeoff: No universal peasant Skill penalty; staff user competence separate.

Dating: Early continuity is a design assumption; precise regional instruction/dating remains to be checked.

Evidence: [Bavarian State Library: Mair, De arte athletica II](https://www.digitale-sammlungen.de/en/view/bsb00007894). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Heavy long club** (great_club) — 2H; reach: Medium–long.

Aliases/variants: Great club, Heavy staff-club, Studded long club.

Distinct job: Impact pressure instead of staff finesse. Tradeoff: Higher heat/cadence cost; do not label generic club an armor-piercing maul.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Spike-ended heavy club** (goedendag) — 2H; reach: Medium.

Aliases/variants: Goedendag.

Distinct job: Candidate blend of thrust and percussion. Tradeoff: Detailed head/handling reconstruction and native spear-tag compatibility need verification.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Kortrijk museum: naming a goedendag](https://www.kortrijk.be/musea/het-groeningemonument-de-maagd-van-vlaanderen). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Lance · mounted

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Light mounted lance | 1050–1250; Pan-regional | 2 / 8 / 90 | 1 / +0 | — / — | None | Recommend |
| Ordinary couched lance | 1050–1250; Europe | -1 / 12 / 110 | 2 / +0 | — / — | None | Recommend |
| Heavy war lance | 1400–1500; Europe | -2 / 14 / 120 | 2 / +0 | — / — | None | Conditional |

**Light mounted lance** (light_lance) — Mounted1H; reach: Long.

Aliases/variants: Non-couched lance, Light thrusting cavalry spear.

Distinct job: Useful mounted thrust and less specialized charge. Tradeoff: Lower couched impact than specialized lance; needs correct mounted thrust animation.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about), [Met: Islamic Arms and Armor collection catalogue](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Ordinary couched lance** (couched_lance) — Mounted1H; reach: Long charge delivery.

Aliases/variants: Knightly couched lance.

Distinct job: Strong approach-dependent charge. Tradeoff: Negative raw Attack is intentional current design; evaluate final stats after soldier/training terms.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Heavy war lance** (heavy_lance) — Mounted; shield policy to decide; reach: Very long charge delivery.

Aliases/variants: Braced war lance (appropriate late loadout).

Distinct job: More charge specialization. Tradeoff: Equipment/shield restrictions and reseting charge opportunity; no negative Skill modifier.

Dating: Wartime loadout must be dated independently; tournament-only large lances excluded.

Evidence: [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Bow

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Light self bow | 1050–1250; Pan-regional | 3 / 0 / reload TBD | 0 / +0 | 125 / 40 | None; projectile behavior requires a verified package | Recommend |
| Strong self war bow | 1050–1250; Europe | 4 / 0 / reload TBD | 0 / +0 | 150 / 35 | None; projectile behavior requires a verified package | Recommend |
| Heavy long war bow | 1250–1400; Western Europe | 5 / 0 / reload TBD | 1 / +0 | 180 / 30 | None; projectile behavior requires a verified package | Recommend |
| Military composite bow · foot | 1050–1250; Steppe / western Asia | 5 / 0 / reload TBD | 0 / +0 | 180 / 35 | None; projectile behavior requires a verified package | Recommend |
| Skirmish bow / heavy-arrow doctrine | 1050–1250; Pan-regional | 4 / 0 / reload TBD | 0 / +0 | 115 / 35 | None; projectile behavior requires a verified package | Recommend |
| Mounted composite bow · skirmish | 1050–1250; Steppe / western Asia | 4 / 0 / reload TBD | 0 / +0 | 80 / 45 | None; projectile behavior requires a verified package | Recommend |
| Mounted composite bow · missile | 1050–1250; Steppe / western Asia | 3 / 0 / reload TBD | 0 / +0 | 150 / 45 | None; projectile behavior requires a verified package | Recommend |

**Light self bow** (self_bow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Simple wooden bow, Short self bow.

Distinct job: Accessible ranged fire. Tradeoff: Lower reach/power than war bows; quality remains independent.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Strong self war bow** (war_bow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: War bow, Regional strong self bow.

Distinct job: Middle-power military bow. Tradeoff: No free reload/accuracy advantage from draw-weight alone.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Heavy long war bow** (longbow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: English longbow, Welsh longbow, Other qualifying long war bows.

Distinct job: Sustained long-range fire with strong arrows. Tradeoff: Draw/arrow/animation package; not every long wooden bow deserves this profile.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Military composite bow · foot** (composite_foot) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Seljuk bow, Mamluk bow, Mongol bow, Cuman bow, Ottoman bow (period construction).

Distinct job: Compact construction with military performance. Tradeoff: Higher intrinsic manufacturing/supply cost should offset the generous ammunition/heat package; do not give it equal-cost dominance or a fictitious weather penalty. Regional labels remain aliases until verified..

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: Islamic Arms and Armor collection catalogue](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Skirmish bow / heavy-arrow doctrine** (skirmish_bow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Direct-fire bow package.

Distinct job: Shorter-range opportunities and controlled direct fire. Tradeoff: Doctrine variant, not a new physical invention; accuracy/cadence need actual projectile/skeleton support.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Mounted composite bow · skirmish** (mounted_skirmish_bow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Horse-archer heavy-arrow package.

Distinct job: Mobile close-range arrow pressure. Tradeoff: Range80 is RC-inspired starting point; mounted accuracy and AI behavior must work.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: Islamic Arms and Armor collection catalogue](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Mounted composite bow · missile** (mounted_missile_bow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Horse-archer lighter-arrow package.

Distinct job: Longer-range mobile harassment. Tradeoff: Less raw contact damage; do not grant higher speed and perfect accuracy simultaneously.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: Islamic Arms and Armor collection catalogue](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Crossbow

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Light wooden crossbow | 1050–1250; Europe | 7 / 0 / reload TBD | 0 / +0 | 130 / 24 | None; projectile behavior requires a verified package | Recommend |
| Composite-prod military crossbow | 1250–1400; Europe | 9 / 0 / reload TBD | 0 / +0 | 155 / 20 | None; projectile behavior requires a verified package | Recommend |
| Light lever-spanned crossbow | 1400–1500; Europe | 8 / 0 / reload TBD | 0 / +0 | 120 / 20 | None; projectile behavior requires a verified package | Recommend |
| Heavy mechanically spanned crossbow | 1400–1500; Europe | 12 / 0 / reload TBD | 1 / +0 | 180 / 15 | None; projectile behavior requires a verified package | Recommend |
| Mounted light crossbow | 1400–1500; Europe | 7 / 0 / reload TBD | 0 / +0 | 100 / 20 | None; projectile behavior requires a verified package | Conditional |

**Light wooden crossbow** (wood_crossbow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Wood-prod crossbow.

Distinct job: Light ranged punch and workable reload. Tradeoff: Lower power than heavier bows; spanning method must match weapon.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: A Deadly Art—European Crossbows1250–1850](https://resources.metmuseum.org/resources/metpublications/pdf/A_Deadly_Art_European_Crossbows_1250_1850.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Composite-prod military crossbow** (composite_crossbow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Horn/sinew composite crossbow.

Distinct job: Intermediate power/reload package. Tradeoff: Not every composite crossbow is automatically heavier than every wooden/steel one.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: A Deadly Art—European Crossbows1250–1850](https://resources.metmuseum.org/resources/metpublications/pdf/A_Deadly_Art_European_Crossbows_1250_1850.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Light lever-spanned crossbow** (lever_crossbow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Goat’s-foot crossbow, Light mounted crossbow.

Distinct job: Handling/reload emphasis, including eligible mounted use. Tradeoff: Draw/spanning/reload and mounted animations required; less effective range than heavy infantry bow.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: A Deadly Art—European Crossbows1250–1850](https://resources.metmuseum.org/resources/metpublications/pdf/A_Deadly_Art_European_Crossbows_1250_1850.pdf), [Wallace Collection: crossbow](https://wallacelive.wallacecollection.org/eMP/eMuseumPlus?module=collection&objectId=61529&service=ExternalInterface). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Heavy mechanically spanned crossbow** (heavy_crossbow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Windlass crossbow, Cranequin crossbow, Arbalest (construction determines assignment).

Distinct job: Strong individual shots with slow loading. Tradeoff: Spanning mechanisms are not synonymous; split further only if actual reload behavior differs.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: A Deadly Art—European Crossbows1250–1850](https://resources.metmuseum.org/resources/metpublications/pdf/A_Deadly_Art_European_Crossbows_1250_1850.pdf), [Wallace Collection: crossbow](https://wallacelive.wallacecollection.org/eMP/eMuseumPlus?module=collection&objectId=61529&service=ExternalInterface). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Mounted light crossbow** (mounted_crossbow) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Cavalry crossbow.

Distinct job: Mounted ranged option distinct from bow firing rhythm. Tradeoff: Only if mounted loading animation works; otherwise merge with lever crossbow metadata.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: A Deadly Art—European Crossbows1250–1850](https://resources.metmuseum.org/resources/metpublications/pdf/A_Deadly_Art_European_Crossbows_1250_1850.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Firearm

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Handgonne / hand cannon | 1250–1400; Europe / western Asia | 10 / 0 / reload TBD | 0 / +0 | 65 / 12 | AP | Recommend |
| Early stocked handgun | 1400–1500; Europe | 12 / 0 / reload TBD | 0 / +0 | 90 / 12 | AP | Recommend |
| Matchlock arquebus | 1500–1550; Europe / Ottoman world | 14 / 0 / reload TBD | 1 / +0 | 120 / 15 | AP | Recommend |
| Heavy rest-supported musket | 1500–1550; Europe | 18 / 0 / reload TBD | 2 / +0 | 140 / 12 | AP | Conditional |
| Early wheellock cavalry pistol | 1500–1550; Europe | 10 / 0 / reload TBD | 1 / +0 | 45 / 4 | AP | Conditional |

**Handgonne / hand cannon** (handgonne) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Bâton à feu, Early handheld gun.

Distinct job: Early short-range armor-threatening shot. Tradeoff: Ignition/reload/accuracy and campaign availability must limit it.

Dating: Source anchors around1400; not a1250 pan-European unlock.

Evidence: [Royal Armouries: Hundred Years’ War weapons](https://royalarmouries.org/objects-and-stories/stories/the-hundred-years-war-1337-1453). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Early stocked handgun** (early_arquebus) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Early arquebus, Hook gun (handheld form).

Distinct job: Improved aiming/handling over pole handgonne. Tradeoff: Keep reload burden; hook-supported weapon may need stationary setup.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Royal Armouries: Hundred Years’ War weapons](https://royalarmouries.org/objects-and-stories/stories/the-hundred-years-war-1337-1453), [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Matchlock arquebus** (matchlock) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Arquebus, Arkebuse, Tüfek (appropriate form).

Distinct job: Organized firearm infantry. Tradeoff: Projectile, smoke, reload and AI need coherent package; no universal cultural stat boost.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Heavy rest-supported musket** (heavy_musket) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Early heavy matchlock musket.

Distinct job: Powerful late-window shot with setup cost. Tradeoff: Needs a real rest/reload/mobility distinction; not a straight upgrade at equal cost.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [NRA museum: Spanish matchlock musket](https://www.nramuseum.org/guns/the-galleries/ancient-firearms-1350-to-1700/case-3-old-guns-in-the-new-world/spanish-matchlock-musket.aspx). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Early wheellock cavalry pistol** (wheel_pistol) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Wheellock pistol, Brace of pistols (loadout).

Distinct job: Very short mounted firearm burst. Tradeoff: Rare endpoint technology; double-barrel court artifact not evidence of mass deployment.

Dating: Firm example ca.1540–45; restrict initial candidate to late endpoint, not all1500s.

Evidence: [Met: Peter Peck wheellock pistol](https://www.metmuseum.org/art/collection/search/22387). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Thrown weapon

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Light javelin | 1050–1250; Mediterranean / western Asia | 9 / 0 / reload TBD | 0 / +0 | 55 / 6 | None; projectile behavior requires a verified package | Recommend |
| Heavy throwing spear | 1050–1250; Pan-regional | 12 / 0 / reload TBD | 1 / +0 | 40 / 3 | None; projectile behavior requires a verified package | Conditional |

**Light javelin** (javelin) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Javelin, Azagaya, Jinete javelin, Jereed (war form), Javelin for light cavalry.

Distinct job: Mobile short-range burst damage. Tradeoff: Finite carried ammunition; do not accidentally grant Hybrid to thrown users.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Met: Islamic Arms and Armor collection catalogue](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Heavy throwing spear** (heavy_throw_spear) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Heavy javelin, Short-range cast spear.

Distinct job: Closer and stronger burst than light javelin. Tradeoff: Short range and very limited ammo; avoid reviving ancient Roman pilum designs by name alone.

Dating: Roster window is approximate design guidance; regional adoption needs checking.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Sling · proposed category

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Hand sling | 1050–1250; Pan-regional | 3 / 0 / reload TBD | 0 / +0 | 95 / 50 | None; projectile behavior requires a verified package | Conditional |
| Staff sling | 1050–1250; Europe / Mediterranean | 5 / 0 / reload TBD | 1 / +0 | 100 / 20 | None; projectile behavior requires a verified package | Conditional |

**Hand sling** (hand_sling) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Shepherd’s sling, War sling.

Distinct job: Low-cost projectile option with distinct launch behavior. Tradeoff: No AP or thrown elephant bonus by default; period battlefield regional evidence still needs checking.

Dating: Biblical medieval imagery alone does not demonstrate routine recruitment; exact unit culture requires further evidence.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

**Staff sling** (staff_sling) — Ranged; secondary melee loadout separate; reach: Projectile.

Aliases/variants: Fustibalus.

Distinct job: Larger projectile and different launch geometry. Tradeoff: Animation/projectile/period-use verification needed; no fabricated explosion radius.

Dating: Named candidate not securely dated by the linked generic manuscript reference; hold until a specific depiction/text is matched.

Evidence: [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). Links provide form/context evidence, not proof of the proposed stat package or every alias.

### Staff flail · conditional category

| Preset | Discussion window / region | Attack / Charge / Delay | Heat / handling bonus | Range / Ammo | Effect package | Decision |
|---|---|---|---|---|---|---|
| Reinforced staff flail | 1400–1500; Central Europe | 8 / 4 / 90 | 2 / +0 | — / — | Stagger; Batter_1 · variant proposal | Conditional |

**Reinforced staff flail** (staff_flail) — 2H; reach: Articulated long reach.

Aliases/variants: Agricultural staff flail, Hussite-style staff flail (verify model).

Distinct job: Articulated impact has potentially distinct timing. Tradeoff: Include only with a genuinely appropriate animation; no automatic Shield bypass.

Dating: Museum attribution spans15th–17th; regional earlier battlefield model still needs source-specific confirmation.

Evidence: [Science Museum Group: weighted flail](https://collection.sciencemuseumgroup.org.uk/objects/co155369/flail-with-stone-for-extra-weight), [Bavarian State Library: Mair, De arte athletica II](https://www.digitale-sammlungen.de/en/view/bsb00007894). Links provide form/context evidence, not proof of the proposed stat package or every alias.

## The most useful splits and the splits to merge first

- **Hammer versus pick:** A fatigue-oriented hammer face and an immediate point-oriented pick can earn separate effect packages. Do not award both every maximal effect.
- **Balanced versus point-oriented longsword:** Same family; generic infantry advantage versus more focused Rend provides a tradeoff. This is more meaningful than separate national swords.
- **Glaive versus bill:** Infantry reach versus shield/pike engagement. Keep effects eligibility precise; hook does not mean automatic dismount.
- **Pollaxe versus polehammer:** Composite cutting/point/control versus greater percussion/point emphasis, with cadence differences.
- **Pike length variants:** Worth it only if reach and formation behavior actually differ; a number or label alone is insufficient.
- **Dane axe versus berdiche:** Merge first if head geometry/reach animations produce no practical distinction. The names can remain as model aliases.
- **Forked spear versus fighting spear:** Merge unless defensive handling/control differences are verified. Do not invent guaranteed disarming to preserve a dropdown.
- **Swordstaff versus glaive:** Conditional; preserve only if a distinct thrust/handling profile is real and the regional model is verified.
- **Crossbow constructions/spanning:** Useful packet differences, but windlass/cranequin/goat’s-foot are mechanisms, not universal damage grades. The object’s energy/reload/mobility package determines the preset.
- **Pavise crossbow:** Not a separate bow invention; combine an existing crossbow with the shield/deployment system. Avoid double-counting shield bonuses.
- **Bow doctrine:** Add skirmish/missile variants of supported bow families as a coherent loadout/arrow/animation choice, not a second blanket range penalty.
- **Claymore, Zweihänder, spadone and montante:** Regional names do not mandate four distinct damage packages. Inspect size, grip, doctrine and actual period. “Claymore” itself is not a precise universal geometry label.

## Builder implementation proposal

Use Category → functional Preset → optional Regional model/name, followed by the independent Soldier Quality and Equipment Grade controls. Store category IDs explicitly on presets. Give each profile a brief “Why this is different” explanation; group regional aliases beneath it rather than filling the selector with duplicates.

Within the current sections, expose conditional details: mounted context, grip, formation/brace, projectile/arrow package and required animation. Show external-file/runtime dependencies and distinguish finalized effect design from runtime verification. User-created presets can retain their own labels and stats.

This catalogue JSON/CSV is research data, **not a ready-to-import builder project**. Many new profiles lack verified native weapon/projectile/skeleton IDs. Creating those IDs out of plausible names would not make them work. Existing defaults stay intact until selected profiles are approved and configured.

Recommended first implementation wave: knife/dagger variants, cut/thrust sword variants, axe/mace/hammer/pick, fighting-spear/partisan/Ahlspiess, pollaxe/polehammer, and light/intermediate/heavy crossbows. Next, validate doctrine and mounted packets. Put geometry-dependent and exotic-boundary candidates behind explicit readiness criteria.

## Hold, merge, or investigate further

- **Ball-and-chain flail / morningstar flail — Hold.** Do not confuse a fixed studded club with an articulated weapon. Ubiquitous1H medieval spiked-ball use is not established by this pass; requires exact dated object, deployment evidence and animation.

- **Fixed-head morningstar — Merge with club/mace by construction.** Spikes alone do not justify another category or automatic armor/shield bypass.

- **Lochaber axe — Boundary candidate.** Keep under bill/longaxe depending construction; exact models often have broad16th–later dates. Do not introduce as an11th-century Scottish standard.

- **War scythe / military fork / pitchfork — Conditional improvised variant.** Use blade orientation and action, not the agricultural name. Only a verified different profile merits another preset; no automatic levy weapon list.

- **Caliver — Hold name for later.** Do not add a familiar later standardized label to1050–1550 without an independently verified early form. Use stocked handgun/arquebus in this pass.

- **Rapier — Late-boundary candidate; sword_thrust.** An early Renaissance cut-and-thrust sidearm can be covered by that preset. Mature slender rapier forms should not be backdated merely because a hilt looks complex.

- **Scimitar / shamshir / saif — Classify actual blade.** Scimitar is a broad modern umbrella. Saif can label straight or curved swords. Late strongly curved shamshir examples are not medieval pan-Islamic templates.

- **Yatagan — Late selective alias: knife or sword_cut.** Met discusses a courtly Ottoman early16th-century example. Exotic name does not establish widespread infantry issue or require a new category.

- **Kilij / tulwar — Blade and period first.** Map suitable cutting forms to sword_cut; exact kilij blade features and South Asian chronology need individual model evidence, not a generic scimitar package.

- **Greek-fire siphon / cheirosiphon — Separate naval/siege/special system.** BNE manuscript depicts earlier naval action; insufficient for a generic handheld infantry flame preset. Design damage only after actual unit form/projectile behavior is verified.

- **Incendiary pots / fire arrows / grenades — Ammunition or special-system variants.** Do not label all as identical explosives. Payload, ignition, area behavior and supply need their own sources and verified engine implementation; no speculative stat package here.

- **Siege artillery / naval cannon — Separate equipment catalogue.** Torsion/traction/counterweight and gunpowder engines deserve classification beyond personal weapons; excluded from the preset counts here, not ignored as historical weapons.

## Wider-world expansion candidates

These are category mappings and research leads, not a completed global chronology or additional verified SSR presets.

- **Tachi / katana / uchigatana: sword_cut or longsword, by grip and blade.** Japanese tachi has a firm late12th–early13th-century artifact anchor. Map1H mounted versus2H foot use; no automatic AP, speed or superior steel bonus. Katana/uchigatana forms require their own dating. [Context source](https://www.metmuseum.org/art/collection/search/24355).

- **Naginata / nagamaki / odachi / yari: glaive / greatsword / fighting_spear or pike.** Useful analogues for an East Asian expansion. Exact length, grip, formation and period need a dedicated source pass; do not import the later stereotypical roster. [Context source](https://www.metmuseum.org/art/collection/search/24355).

- **Jian / dao / qiang / Chinese polearms: sword_thrust / sword_cut / fighting_spear / glaive.** Mechanically map actual form. Some familiar named late weapons have uncertain medieval attributions; no numeric presets adopted in the core SSR survey. [Context source](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf).

- **Katar / khanda / pata / South Asian swords: knife / sword_cut / sword_thrust by construction.** Some traditions predate late museum examples, but many catalogued objects are after1550. Keep candidate vocabulary separate from a verified pre1550 roster. [Context source](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf).

- **Macuahuitl / tepoztopilli / atlatl: new material/launch behavior or sword_cut / glaive / thrown.** Relevant to an Americas expansion. Getty’s1577 Florentine Codex describes earlier/conquest-era culture. Its compilation date is not weapon manufacture date; exact pages/material behaviors need a dedicated study. [Context source](https://florentinecodex.getty.edu/en/).

- **Regional African swords, clubs, spears and bows: existing families by actual form.** Do not infer medieval kaskara/takouba/shotel subtype dates from19th-century ethnographic objects. Core generic forms can exist without adopting every later regional name. [Context source](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf).

## Evidence register and limits

Some relevant museum pages block automated access. Those are research leads, not silently treated as inspected objects. Firm inspected examples include Met sword, pollaxe, hammer, glaive, berdiche, partisan/awl-pike, mace, early halberd, Cleveland estoc and museum excavation/manuscript catalogues. Different levels of source strength are stated in each row. A catalogue link is not verification of every regional alias.

- **morgan:** [Morgan Crusader Bible: medieval weapons in contemporary imagery](https://www.themorgan.org/collection/crusader-bible/about). 13th-century manuscript; biblical scenes are not evidence of a universal military issue list.

- **rondel:** [London Museum: rondel dagger](https://www.londonmuseum.org.uk/collections/v/object-29505/dagger-rondel-dagger/). 15th-century object; hilt name alone does not establish blade cross-section.

- **sword:** [Met: two-handed sword](https://www.metmuseum.org/art/collection/search/35388). ca.1400–1450; cut/thrust construction and two-handed use.

- **estoc:** [Cleveland: estoc](https://www.clevelandart.org/art/1916.686). Early1500s artifact; curatorial discussion also describes earlier use. Do not equate that discussion with dating this object.

- **halberd:** [Met: early Swiss halberd](https://www.metmuseum.org/art/collection/search/845840). ca.1400, transitional head and original shaft. Supports evolution rather than a universal invention date.

- **early_halberd:** [Met: Fribourg halberd](https://www.metmuseum.org/art/collection/search/25854). 1375–1400.

- **pollaxe:** [Met: Burgundian pollaxe](https://www.metmuseum.org/art/collection/search/26720). ca.1450; axe/beak/point assembled head; this example is208cm, so pollaxe does not universally mean a short weapon.

- **hammer:** [Met: French war hammer](https://www.metmuseum.org/art/collection/search/25073). ca.1450; concentrated hammer and beak; museum discusses long-shafted hammer use.

- **mace:** [Met: flanged horseman’s mace](https://www.metmuseum.org/art/collection/search/33836). Late15th century; a specific light flanged form, not evidence that all earlier maces had this construction.

- **glaive:** [Met: Venetian glaive](https://www.metmuseum.org/art/collection/search/26689). Mid–late15th century; exact surviving form should not be backdated indiscriminately.

- **berdiche:** [Met: berdiche](https://www.metmuseum.org/art/collection/search/35947). ca.14th–15th century, possibly Turkish; regional attribution remains qualified.

- **partisan:** [Met: partisan](https://www.metmuseum.org/art/collection/search/26090). ca.1500, probably Venice; broad point and basal projections.

- **ahlspiess:** [Met: awl-pike / Ahlspiess](https://www.metmuseum.org/art/collection/search/25623). 15th century, Austrian; label pike does not automatically imply formation-pike handling.

- **sabre:** [Met: Ottoman saber](https://www.metmuseum.org/art/collection/search/24320). 1522–66 attribution overlaps the endpoint but does not prove a securely pre1550 manufacture date for this individual object.

- **islamic:** [Met: Islamic arms and armor](https://www.metmuseum.org/essays/islamic-arms-and-armor). Regional weapons and Ottoman yatagan; modern labels and late decorated examples require chronological caution.

- **islamic_catalogue:** [Met: Islamic Arms and Armor collection catalogue](https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_Arms_and_Armor_in_The_Metropolitan_Museum_of_Art.pdf). Regional evidence source; do not use18th-century shamshirs or bows as exact medieval models.

- **maryrose:** [Mary Rose: excavated weaponry](https://maryrose.org/discover/collections/the-weaponry-of-the-mary-rose/). 1545 endpoint: bows, bills, pikes, handguns, swords and daggers. A naval assemblage is not the whole European arsenal.

- **crossbows:** [Met: A Deadly Art—European Crossbows1250–1850](https://resources.metmuseum.org/resources/metpublications/pdf/A_Deadly_Art_European_Crossbows_1250_1850.pdf). Spanning systems, construction and regional variants. Draw weight alone does not establish projectile energy or game damage.

- **crossbow_object:** [Wallace Collection: crossbow](https://wallacelive.wallacecollection.org/eMP/eMuseumPlus?module=collection&objectId=61529&service=ExternalInterface). About1487–1500; late-period artifact anchor.

- **handgun:** [Royal Armouries: Hundred Years’ War weapons](https://royalarmouries.org/objects-and-stories/stories/the-hundred-years-war-1337-1453). European handgun around1400 and period weapon examples.

- **pistol:** [Met: Peter Peck wheellock pistol](https://www.metmuseum.org/art/collection/search/22387). ca.1540–45; exceptional courtly double-barrel object. Supports endpoint technology, not routine cavalry saturation.

- **musket:** [NRA museum: Spanish matchlock musket](https://www.nramuseum.org/guns/the-galleries/ancient-firearms-1350-to-1700/case-3-old-guns-in-the-new-world/spanish-matchlock-musket.aspx). Museum attributes fork-rest example to ca.1530; late-window candidate.

- **flail:** [Science Museum Group: weighted flail](https://collection.sciencemuseumgroup.org.uk/objects/co155369/flail-with-stone-for-extra-weight). Broad15th–17th-century attribution; conditional animation/form candidate, not proof of widespread medieval ball-and-chain weapons.

- **mair:** [Bavarian State Library: Mair, De arte athletica II](https://www.digitale-sammlungen.de/en/view/bsb00007894). Period fight-book source. Browser text extraction was unavailable; precise plate-specific recruitment dating remains to be checked.

- **goedendag:** [Kortrijk museum: naming a goedendag](https://www.kortrijk.be/musea/het-groeningemonument-de-maagd-van-vlaanderen). Museum explicitly corrects later confusion of a scythe with the1302 weapon; detailed reconstruction remains a separate evidence task.

- **skylitzes:** [BNE: Madrid Skylitzes exhibition research](https://www.bne.es/sites/default/files/repositorio-archivos/universo-imagenes-skylitzes-matritensis.pdf). 12th-century depiction of earlier naval Greek-fire use; not proof of standard portable medieval infantry flamethrowers.

- **tachi:** [Met: tachi blade](https://www.metmuseum.org/art/collection/search/24355). Late12th–early13th-century Japanese artifact, outside the core SSR geographical survey.

- **florentine:** [Getty: Digital Florentine Codex](https://florentinecodex.getty.edu/en/). Compiled1577, describing pre-Hispanic and conquest-era Mexico; source date is later than the survey endpoint.
