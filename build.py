from pathlib import Path
import re

root = Path(__file__).parent / 'src'
p = root.parent / 'index.html'
s = (root / 'base_v1.5.html').read_text(encoding='utf-8-sig')
# Canonical taxonomy, with narrow provisional morale/discipline baselines.
archetypes = [('Royal Retinue',16,'disciplined'),('Martial Nobility',13,'normal'),('Household Soldiers',12,'disciplined'),('Career Soldiers',10,'normal'),('Urban Militia',9,'normal'),('Rural Militia',7,'low'),('Warrior Levies',8,'normal'),('Emergency Levies',5,'low')]
bonuses={'Royal Retinue':(2,2,2,3),'Martial Nobility':(2,2,2,2),'Household Soldiers':(1,1,1,1),'Career Soldiers':(0,1,0,1),'Emergency Levies':(0,-1,0,-1)}
table = 'const CATEGORY_BASE = {\n' + ',\n'.join('  '+repr(n)+': { training:"trained", discipline:"'+d+'", morale:'+str(m)+', '+', '.join(k+':'+str(v) for k,v in zip(['atk_eq','atk_tr','def_eq','def_tr'],bonuses.get(n,(0,0,0,0))))+', heat:0, attrs:[], size_inf:'+('30' if n=='Royal Retinue' else '60')+', size_cav:'+('15' if n=='Royal Retinue' else '30')+' }' for n,m,d in archetypes) + '\n};'
s = re.sub(r'const CATEGORY_BASE = \{.*?\n\};',lambda _:table,s,count=1,flags=re.S)
s = re.sub(r'(<select id="unit_category"[^>]*>).*?(</select>)',lambda m:m[1]+''.join('<option'+(' selected' if n=='Martial Nobility' else '')+'>'+n+'</option>' for n,_,_ in archetypes)+m[2],s,count=1,flags=re.S)
for a,b in [('Sergeants-at-Arms','Royal Retinue'),('Household Nobles','Martial Nobility')]: s=s.replace(a,b)
s=s.replace('Category, Quality & Traits','Archetype, Quality & Subtypes').replace('Archetype (MUG Unit Category)','Unit Archetype')
subtypes=['Guards','Hybrid','Aggressive','Reckless','Fanatic','Bloc','Raider','Mounted','Engineer','Mercenary','Garrison','Command']
start=s.index('          <strong style="font-size:0.78rem;color:var(--muted)">Sub-Categories')
end=s.index('        <div class="full" id="cav_style_row">',start)
s=s[:start]+'''          <strong style="font-size:0.78rem;color:var(--muted)">Unit Subtypes — may stack</strong>
          <div class="checks" style="margin-top:6px">'''+''.join('<label><input type="checkbox" id="trait_'+n.lower()+'" onchange="recalc()"'+''+' /> '+n+'</label>' for n in subtypes)+'''</div>
          <span class="hint">Canonical handoff · numbers provisional. Aggressive: +1 melee Attack / −1 Defense Skill. Guards: −1 melee Attack / +2 Defense Skill. Reckless overrides discipline; Fanatic adds +1 morale and locks morale. Bloc, Raider and campaign Mounted effects are design metadata.</span>
          <input type="hidden" id="trait_religious" /><input type="hidden" id="trait_berserker" />
        </div>
        <label><strong>Project profile</strong><select id="project_profile" onchange="recalc()"><option>SSR</option><option>Combat Reforged</option></select></label>
        <label><strong>Independent sapping capability</strong><span><input type="checkbox" id="can_sap" onchange="recalc()" /> can_sap</span></label>
        <label><strong>Morale baseline override</strong><input id="morale_baseline" type="number" min="0" max="30" placeholder="Archetype default" oninput="recalc()" /></label>
        <label><strong>Discipline tendency override</strong><select id="discipline_baseline" onchange="recalc()"><option value="">Archetype default</option><option>low</option><option>normal</option><option>disciplined</option></select></label>
        <label><strong>Training override</strong><select id="training_override" onchange="recalc()"><option value="">Quality default</option><option>untrained</option><option>trained</option><option>highly_trained</option></select></label>
        <label><strong>Proficiency Defense Skill</strong><input id="proficiency_def" type="number" placeholder="Quality default" oninput="recalc()" /><span class="hint">Quality defaults: 3 / 2 / 1 / 0 / −2; retained as a provisional starting scale.</span></label>
'''+s[end:]
# Replace the legacy mental and hidden archetype skill resolver.
start=s.index('  // Training / discipline\n',s.index('function compute()'))
end=s.index('  // Primary weapon\n',start)
s=s[:start]+'''  // Deterministic resolver: identity baseline, quality, then subtype flags.
  const hybridEligible = val("pri_weapon_type") === "missile";
  let training = val("training_override") || ({Exceptional:"highly_trained", Outstanding:"highly_trained", Superior:"trained", Standard:"trained", Inferior:"untrained"}[quality]);
  if (checked("trait_hybrid") && hybridEligible) training = "highly_trained";
  let discipline = val("discipline_baseline") || base.discipline;
  const guardMorale = checked("trait_guards") && discipline === "disciplined" ? 1 : 0;
  if (checked("trait_guards")) discipline = "disciplined";
  if (checked("trait_reckless")) discipline = "impetuous";
  let morale = Math.max(0, Math.min(30, num("morale_baseline",base.morale) + qmod.morale + guardMorale + (checked("trait_fanatic") ? 1 : 0)));
  const lockMorale = checked("trait_fanatic");
  const subtypeAttack = (checked("trait_aggressive") ? 1 : 0) - (checked("trait_guards") ? 1 : 0);
  const archetypeAttack = base.atk_eq + base.atk_tr;
  const archetypeDefense = base.def_tr;
  const atkBonus = archetypeAttack + qmod.atk + subtypeAttack;
  let defBonus = archetypeDefense + num("proficiency_def", {Exceptional:3, Outstanding:2, Superior:1, Standard:0, Inferior:-2}[quality]);
  defBonus += (checked("trait_guards") ? 2 : 0) - (checked("trait_aggressive") ? 1 : 0);
  log.push(`Archetype morale ${base.morale}; quality morale ${qmod.morale}; Guards morale ${guardMorale}; Fanatic ${lockMorale ? 1 : 0} → ${morale}`);
  log.push(`Training ${training}; discipline ${discipline}. Reckless takes precedence over Guards.`);
  log.push(`Melee quality ${qmod.atk}; subtype Attack ${subtypeAttack}; proficiency + subtype Defense Skill ${defBonus}`);
  log.push(`Bible archetype Attack: equipment ${base.atk_eq} + training ${base.atk_tr} = ${archetypeAttack}; Armor equipment bonus ${base.def_eq}; Defense Skill training bonus ${base.def_tr}`);
  if (checked("trait_guards")) log.push("Guards morale uses the pre-subtype discipline tendency; this provisional collision rule is open to balance testing.");

'''+s[end:]
s=s.replace('  if (lockMorale) attrs.push("lock_morale");','  if (checked("trait_mercenary")) attrs.push("mercenary_unit");\n  if (checked("can_sap")) attrs.push("can_sap");\n  if (checked("trait_command")) attrs.push("command");')
s=re.sub(r'  if \(checked\("trait_mercenary"\)\) \{\n    construct.*?\n  \}', '',s,count=1,flags=re.S)
s=re.sub(r'  if \(checked\("trait_religious"\)\) \{\n    upkeep.*?\n  \}', '',s,count=1,flags=re.S)
s=s.replace('  if (checked("trait_berserker")) attrs.push("frighten_foot");','')
s=s.replace('if (checked("trait_hybrid")) {\n    construct','if (checked("trait_hybrid") && hybridEligible) {\n    construct')
# Subtype Attack never changes charge. Preserve existing quality charge contribution.
s=s.replace('Math.floor(atkBonus / 2)','Math.floor(qmod.atk / 2)')
s=s.replace('priAtk = priBaseAtk + qmod.rng_atk;','priAtk = priBaseAtk + archetypeAttack + qmod.rng_atk;')
s=s.replace('secAtk = num("sec_base_atk", 0) + atkBonus;','secAtk = num("sec_base_atk", 0) + (val("sec_weapon_type") === "melee" ? atkBonus : archetypeAttack + qmod.rng_atk);')
s=s.replace('if (checked("trait_hybrid") && ammo > 0)','if (checked("trait_hybrid") && p.wtype === "missile" && ammo > 0)')
# Store full ammunition in the input; derive Hybrid reduction without repeated halving.
s=s.replace('if (checked("trait_hybrid") && p.wtype === "missile" && ammo > 0) ammo = Math.max(1, Math.floor(ammo / 2));','// Hybrid ammunition is derived during compute, preserving the full base value.')
s=s.replace('pri_ammo: num("pri_ammo", 0),','pri_ammo: checked("trait_hybrid") && hybridEligible ? Math.floor(num("pri_ammo", 0) / 2) : num("pri_ammo", 0),')
s=s.replace('const defSkill = Math.max(0, defBonus + armAgi + shieldDefMod);','const off = offhandContribution();\n  const defSkill = Math.max(0, defBonus + armAgi + num("pri_handling",0) + off.def);')
s=s.replace('const shield = num("shield", 0);','const shield = off.shield;')
s=s.replace('armour: arm + (typeof armourBonusFromShield !== "undefined" ? armourBonusFromShield : 0),','armour: arm + base.def_eq + (typeof armourBonusFromShield !== "undefined" ? armourBonusFromShield : 0),')
# Offhand proposal replaces old held-equipment contribution, retaining legacy mode.
s=s.replace('const armourBonusFromShield = (st.armourBonus || 0);','const armourBonusFromShield = val("offhand") === "legacy" && !allEquippedWeaponsTwohanded() ? (st.armourBonus || 0) : 0;')
s=s.replace('const shieldHeat = (val("shield_type") === "none") ? 0 : ((st.heat || 0) + (mat.heat || 0));','const shieldHeat = val("offhand") === "legacy" && !checked("pri_twohand") && val("shield_type") !== "none" ? ((st.heat || 0) + (mat.heat || 0)) : 0;')
s=s.replace('if (val("shield_type") === "kite")','if (val("offhand") === "legacy" && !checked("pri_twohand") && val("shield_type") === "kite")')
# Safe exporter: design tags remain in project data and comments, never EDU tokens.
s=s.replace('line("attributes", u.attributes);','line("attributes", exportableAttrs(u.attributes, false));')
s=s.replace('line("stat_pri_attr", u.pri_attr)','line("stat_pri_attr", exportableAttrs(u.pri_attr, true))').replace('line("stat_sec_attr", u.sec_attr)','line("stat_sec_attr", exportableAttrs(u.sec_attr, true))')
s=s.replace('function toEdu(u) {\n  const L = [];','function toEdu(u) {\n  const errors = validateReforged(u);\n  if (errors.length) return "; EXPORT BLOCKED\\n" + errors.map(e => "; " + e).join("\\n");\n  const L = ["; Combat Reforged · weapon/offhand proposal v0.1 · custom effects retained in project JSON"];')
s=s.replace('k.padEnd(16) + v','k.padEnd(16) + " " + v')
for era in range(3):
    s=s.replace(f'if (u.era_{era}) line("era {era}", "");',f'if (u.era_{era}) line("era {era}", u.ownership);')
s=s.replace('  return L.join("\\n");','  if (u.visual_profile.enabled) {\n    L.push("", "; Art direction commentary (designer notes; no gameplay effect)");\n    const comment = (label, value) => String(value || "").split(/\\r?\\n/).forEach(text => L.push("; " + label + ": " + text));\n    comment("Equipment uniformity",u.visual_profile.equipment_uniformity);\n    comment("Livery tendency",u.visual_profile.livery_tendency);\n    comment("Equipment variation",u.visual_profile.equipment_variation);\n    comment("Modeling notes",u.visual_profile.notes);\n  }\n  return L.join("\\n");')
s=re.sub(r'(<select id="category"[^>]*>).*?(</select>)',lambda m:m[1]+'<option>infantry</option><option selected>cavalry</option><option>ship</option><option>siege</option>'+m[2],s,count=1,flags=re.S)
s=s.replace('  return { unit, log };','  attachReforgedData(unit);\n  return { unit, log };')
# Namespace old item storage to avoid overwriting v1.5 presets.
s=s.replace('const LS_KEY = ', 'const LS_KEY = "combat_reforged_v1_" + ')
s=s.replace('· ready to paste','· validated export; proposals kept in project JSON')
s=s.replace('MUG Unit Builder — Medieval II Total War','MUG Unit Builder — Combat Reforged v1.6')
s=s.replace('MUG Unit Builder — Combat Reforged v1.6','Stainless Steel: Reforged Unit Builder')
s=s.replace('<h1>MUG Unit Builder</h1>','<h1>Stainless Steel: Reforged Unit Builder</h1>')
s=s.replace('Attack delay (ms)','Attack delay (EDU units)')
s=s.replace('Quality defaults: 3 / 2 / 1 / 0 / −2; retained as a provisional starting scale.','Blank uses the appropriate foot or mounted quality table. A manual value overrides the quality Defense Skill contribution.')
s=s.replace('Main-weapon Defense Skill modifier','Weapon Defense Skill baseline')
s=s.replace('<option>spear</option>','<option value="spear">spearmen</option>')
s=s.replace('pri_skel: 0.35','pri_skel: 1').replace('sec_skel: hasSec ? 0.35 : null','sec_skel: hasSec ? 1 : null').replace('${u.sec_delay || 0}, 0.35','${u.sec_delay || 0}, ${u.sec_skel || 1}')
s=re.sub(r'(<select id="armour_sound"[^>]*>).*?(</select>)',lambda m:m[1]+'<option>flesh</option><option>leather</option><option selected>metal</option>'+m[2],s,count=1,flags=re.S)
s=s.replace('document.getElementById("armour_sound").value = p.sound;','document.getElementById("armour_sound").value = normalizeArmourSound(p.sound);')
s=s.replace('</style>','  [hidden] { display: none !important; }\n</style>',1)
s=s.replace('</style>',(root/'branding.css').read_text(encoding='utf-8')+'\n</style>',1)
extension='\n'.join((root/name).read_text(encoding='utf-8') for name in ['reforged.js','weapon_controls.js','attribute_reference.js','audit_rules.js','combat_rules.js','preset_filters.js','equipment_grade.js','armor_loadouts.js','offhand_revision.js'])
s=s.replace('// Initial setup\n', extension+'\n// Initial setup\n')
s=s.replace('updateMountVisibility();\npopulateWeaponSelects();', 'updateMountVisibility();\ndocument.getElementById("pri_category").value = "lance";\ndocument.getElementById("sec_category").value = "sword_cut";\npopulateWeaponSelects();')
s=s.replace('Reforged weapon category · editable proposal v0.1','Reforged weapon category · editable defaults')
s=s.replace('Standard','Average')
p.write_text(s,encoding='utf-8')
print('Updated', p)
