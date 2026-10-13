/* Combat Reforged extension. Custom effects describe proposals, not runtime code. */
const REFORGED_VERSION = 'Combat Reforged v1.6 / combat rules 2026-10-12-r2 / equipment grades r1';
const WEAPON_CATEGORIES = {
  knife: {label:'Knife / dagger',atk:2,attr:'',twohand:false},
  sword_cut: {label:'Sword (1H-cut)',atk:6,attr:'',twohand:false},
  sword_thrust: {label:'Sword (1H-thrust)',atk:5,attr:'rend_2',twohand:false},
  axe: {label:'Axe',atk:4,attr:'stagger',twohand:false},
  mace: {label:'Mace',atk:3,attr:'rend_2, batter_2',twohand:false},
  pick: {label:'Pick / warhammer',atk:3,attr:'rend_5',twohand:false},
  spear: {label:'Spear (1H)',atk:3,attr:'spear_bonus_4',twohand:false},
  fighting_spear: {label:'Fighting spear (2H)',atk:4,attr:'rend_2, spear_bonus_4',twohand:true},
  pike: {label:'Formation pike',atk:3,attr:'long_pike, spear_bonus_8',twohand:true},
  longaxe: {label:'Longaxe',atk:7,attr:'stagger, rend_4',twohand:true},
  glaive: {label:'Glaives',atk:7,attr:'duelist_2',twohand:true},
  bill: {label:'Bills',atk:5,attr:'stagger, pikebreaker_1',twohand:true},
  halberd: {label:'Halberds',atk:6,attr:'rend_3, spear_bonus_6',twohand:true},
  poleaxe: {label:'Poleaxes',atk:6,attr:'rend_4, duelist_3',twohand:true},
  longsword: {label:'Longswords / bastard swords',atk:7,attr:'duelist_2',twohand:true},
  greatsword: {label:'Greatswords',atk:8,attr:'duelist_2, pikebreaker_1',twohand:true},
  estoc: {label:'Estocs',atk:4,attr:'rend_6',twohand:true},
  staff: {label:'Staff',atk:3,attr:'',twohand:true},
  lance: {label:'Lance',atk:-1,attr:'',twohand:false}
};
const OFFHANDS = {
  empty:{label:'Empty hand',shield:0,def:0}, buckler:{label:'Buckler',shield:1,def:2},
  small:{label:'Low fighting shield',shield:3,def:1}, medium:{label:'Medium fighting shield',shield:5,def:0},
  large:{label:'Large fighting shield',shield:7,def:-1}, dagger:{label:'Parrying dagger',shield:0,def:2}
};
const CANONICAL_SUBTYPES = ['Guards','Hybrid','Aggressive','Reckless','Fanatic','Bloc','Raider','Mounted','Engineer','Mercenary','Garrison','Command'];
const NATIVE_WEAPON_TAGS = new Set(['ap','sp','spear','light_spear','long_pike','spear_bonus_2','spear_bonus_4','spear_bonus_6','spear_bonus_8','spear_bonus_10','spear_bonus_12','prec','thrown','launching','area','bp','short_pike']);
const CUSTOM_TAG = /^(rend(?:_\d+)?|stagger(?:_\d+)?|duelist(?:_\d+)?|duel(?:_\d+)?|pikebreaker(?:_\d+)?|batter(?:_\d+)?|crush(?:_\w+)?|hemorrhage(?:_\w+)?|hamstring(?:_\w+)?|cleave(?:_\w+)?|linebreaker(?:_\w+)?|stalwart(?:_\w+)?)$/i;
const tags = text => (text || '').split(',').map(t=>t.trim()).filter(Boolean);
function exportableAttrs(text, weapon) {
  return tags(text).filter(t => weapon ? NATIVE_WEAPON_TAGS.has(t) : !CUSTOM_TAG.test(t) && t !== 'lock_morale' && !['campaign_movement_horse_flag','engineer_flag','garrison_flag','bloc_flag','raider_flag'].includes(t)).join(', ');
}
function addFields(anchor, html) {
  const node = document.createElement('div'); node.className='full'; node.innerHTML=html;
  anchor.appendChild(node); return node;
}
function numberField(id,label,value,step='1') {
  return `<label>${label}<input type="number" id="${id}" value="${value}" step="${step}" oninput="recalc()" /></label>`;
}
// Add compact controls inside the existing sections, preserving CSS and pane structure.
for (const slot of ['pri','sec']) {
  const anchor=document.getElementById(slot+'_attr').closest('.body');
  addFields(anchor, `<details open><summary>Reforged weapon category · editable proposal v0.1</summary><div class="grid">
    <label>Category<select id="${slot}_category" onchange="recalc()"><option value="">Individual / legacy weapon</option>${Object.entries(WEAPON_CATEGORIES).map(([k,p])=>`<option value="${k}">${p.label}</option>`).join('')}</select></label>
    <label>Apply selected category<button type="button" onclick="applyWeaponCategory('${slot}')">Apply Attack & attributes</button></label>
    <label><span><input type="checkbox" id="${slot}_twohand" onchange="recalc()" /> Two-handed grip</span></label>
    ${numberField(slot+'_handling',(slot==='pri'?'Primary':'Secondary')+' weapon Defense Skill baseline (legacy)',0)}
    <span class="hint full" id="${slot}_inheritance"></span>
    <label>Separate bracing / charge notes<input id="${slot}_bracing" oninput="recalc()" /></label>
  </div></details>`);
}
addFields(document.getElementById('shield').closest('.body'), `<div class="grid">
  <label>Independent offhand preset<select id="offhand" onchange="applyOffhand()"><option value="legacy">Existing shield / material (including pavise)</option>${Object.entries(OFFHANDS).map(([k,p])=>`<option value="${k}">${p.label}</option>`).join('')}</select></label>
  ${numberField('offhand_shield','Offhand Shield contribution',0)}${numberField('offhand_def','Offhand Defense Skill modifier',0)}
  <span class="hint full">Offhand proposal v0.1. Replaces the existing shield/material contribution when selected; does not add it twice. Two-handed slots suppress held offhand contributions. Pavise direction/state remains a separate unresolved mechanic.</span>
  <label class="full">Unit Stalwart / custom defense attributes<input id="unit_custom_attrs" placeholder="stalwart" oninput="recalc()" /><span class="hint">Independent unit effects retained as design metadata.</span></label>
  </div>`);
const archetypeSection=document.getElementById('unit_category').closest('section');
const mercSection=document.createElement('section');mercSection.id='mercenary_section';
mercSection.innerHTML=`<h2 onclick="this.parentElement.classList.toggle('collapsed')">Mercenary Recruitment Pools</h2><div class="body"><span class="hint" id="merc_disabled_banner">Select the Mercenary subtype to enable recruitment pool settings.</span><fieldset id="merc_fields" class="grid" style="border:0;padding:0;margin:0">
  <label class="full">Pool IDs (comma separated)<input id="merc_pools" oninput="recalc()" placeholder="Required when Mercenary is selected" /></label>
  ${numberField('merc_experience','Pool experience',0)}${numberField('merc_cost','Pool cost',500)}
  ${numberField('merc_replenish_min','Minimum replenishment',0.1,'0.01')}${numberField('merc_replenish_max','Maximum replenishment',0.2,'0.01')}
  ${numberField('merc_maximum','Maximum availability',2)}${numberField('merc_initial','Initial availability',1)}
  <label>Armor level (optional M2EX metadata)<input type="number" id="merc_armour" min="0" oninput="recalc()" /></label>
  <label>Weapon level (optional M2EX metadata)<input type="number" id="merc_weapon_lvl" min="0" oninput="recalc()" /></label>
  <span class="hint full">Pool records are merge snippets for existing pools. Armor/weapon extensions remain in JSON until exact target syntax is configured. No faction-building recruitment is generated.</span>
  </fieldset></div>`;
archetypeSection.insertAdjacentElement('afterend',mercSection);
const artSection=document.createElement('section');artSection.id='art_commentary_section';
artSection.innerHTML=`<h2 onclick="this.parentElement.classList.toggle('collapsed')">Art Direction Commentary · optional</h2><div class="body">
  <label><span><input type="checkbox" id="visual_enabled" onchange="recalc()" /> Append art direction commentary to the bottom of the EDU block</span></label>
  <span class="hint">Off by default. All exported art notes begin with a semicolon and have no gameplay effect.</span>
  <fieldset id="visual_fields" class="grid" style="border:0;padding:0;margin:8px 0 0">
    <label>Equipment uniformity<select id="visual_uniformity" onchange="recalc()"><option>medium</option><option>low</option><option>high</option></select></label>
    <label>Livery tendency<select id="visual_livery" onchange="recalc()"><option>possible</option><option>none</option><option>likely</option></select></label>
    <label>Equipment variation<select id="visual_variation" onchange="recalc()"><option>medium</option><option>low</option><option>high</option></select></label>
    <label>Modeling notes<textarea id="visual_notes" rows="2" oninput="recalc()"></textarea></label>
  </fieldset></div>`;
document.querySelector('.form-pane > .toolbar').before(artSection);
const preview=document.querySelector('.preview-pane');
addFields(preview, '<div class="preview-block"><h3>Validation & proposal status</h3><pre id="reforged_validation" style="white-space:pre-wrap"></pre></div><div class="preview-block"><h3>descr_mercenaries.txt · pool merge snippets</h3><pre id="merc_out"></pre><button type="button" onclick="downloadMercenaries()">Download pool snippets</button></div><div class="preview-block"><h3>Runtime design metadata · implementation unspecified</h3><pre id="runtime_out" style="white-space:pre-wrap"></pre><button type="button" onclick="downloadRuntimeMetadata()">Download runtime design JSON</button></div>');
addFields(document.querySelector('.form-pane > .toolbar'), '<button class="ghost" type="button" onclick="exportProject()">Export project JSON</button> <button class="ghost" type="button" onclick="document.getElementById(\'project_file\').click()">Import project JSON</button><input type="file" accept="application/json,.json" id="project_file" hidden onchange="importProjectFile(event)" /><span class="hint" id="project_status"></span>');

function applyWeaponCategory(slot) {
  const p=WEAPON_CATEGORIES[val(slot+'_category')]; if(!p)return;
  document.getElementById(slot+'_base_atk').value=p.atk;
  document.getElementById(slot+'_attr').value=p.attr;
  document.getElementById(slot+'_twohand').checked=p.twohand;
  // Converting a ranged slot to a melee category is explicit, not accidental.
  document.getElementById(slot+'_weapon_type').value='melee';
  if(slot==='pri') { document.getElementById('pri_missile').value='no'; document.getElementById('pri_ammo').value=0; document.getElementById('pri_range').value=0; }
  recalc();
}
function applyOffhand() {
  const p=OFFHANDS[val('offhand')];
  if(p){document.getElementById('offhand_shield').value=p.shield;document.getElementById('offhand_def').value=p.def;}
  recalc();
}
function offhandContribution(slot='pri') {
  if(checked(slot+'_twohand')) return {shield:0,def:0,applicable:false};
  if(val('offhand')==='legacy') {
    const st=SHIELD_TYPES[val('shield_type')]||SHIELD_TYPES.none, mat=SHIELD_MATERIALS[val('shield_material')]||SHIELD_MATERIALS.wooden;
    return {shield:num('shield',0),def:val('shield_type')==='none'?0:(st.def||0)+(mat.def||0),applicable:true};
  }
  return {shield:Math.max(0,num('offhand_shield',0)),def:num('offhand_def',0),applicable:true};
}
function weaponEffects(slot) {
  const effects=tags(val(slot+'_attr')).map(tag=>{
    const m=tag.match(/_(\d+)$/), magnitude=m?Number(m[1]):null;
    const e={tag,scope:slot+'_active_weapon',status:NATIVE_WEAPON_TAGS.has(tag)?'EDU vocabulary':'custom proposal',magnitude,trigger:'configured implementation required',target:'configured eligibility required'};
    if(/^rend_/.test(tag)) Object.assign(e,{trigger:'applicable attack',target:'otherwise applicable target Armor',formula:'max(0, Armor - X)',persistent:false,ap_order:'AP first using the supplied SS6.4 reference (ignore 50% effective Armor, rounded up), then rend; custom combination remains a proposal'});
    if(/^duel(?:ist)?_/.test(tag)) Object.assign(e,{trigger:'attack against eligible opponent',target:'infantry excluding spear/pike and missile infantry',classifier:'opponent unit category/role; not active weapon',stat:'conditional Attack'});
    if(/^spear_bonus_/.test(tag)) Object.assign(e,{trigger:'mounted matchup',target:'mounted opponent',stat:'conditional Attack',interpretation:'draft values pending implementation verification'});
    if(tag==='stagger') Object.assign(e,{trigger:'melee attack stopped specifically by Shield',target:'shield blocker',chance_percent:num(slot+'_stagger_chance',100),lockout_seconds:num(slot+'_stagger_lockout',1),reaction:val(slot+'_reaction')||null,reaction_duration:null,stalwart_resistance:checked(slot+'_stalwart_resistance'),original_attack_stopped:true,excluded:['skill parry','duplicate armor-hit reaction']});
    if(/^pikebreaker_/.test(tag)) Object.assign(e,{trigger:'attack reaches active formation-pike interaction; exclude skill parry',target:'individual model presenting formation pike with usable secondary weapon',chance_percent:Math.min(100,10*magnitude),persistence:'remainder of battle',permanent:true,restores_pike:false,stacks:false,design_status:'finalized',implementation_status:'pending'});
    if(/^batter(?:_|$)/.test(tag)) Object.assign(e,{magnitude:magnitude===null?2:magnitude,trigger:'damaging contact or nonlethal Armor-absorbed hit',target:'individual defending model',units:'fatigue points; native scale requires verification',excluded:['dodge','shield block','skill parry'],persistence:'remainder of battle',permanent:true,stacks:true,recovery:'batter contribution does not recover; ordinary fatigue remains separate',runtime_scale_mapping:'unspecified',design_status:'finalized',implementation_status:'pending',magnitude_status:'2-point default pending battle testing'});
    return e;
  });
  const overrides=val(slot+'_effects_json').trim();
  if(overrides) { const rows=JSON.parse(overrides); if(!Array.isArray(rows))throw Error(slot+' effect overrides must be a JSON array'); for(const row of rows) {if(!row||typeof row!=='object'||typeof row.tag!=='string')throw Error(slot+' effect override needs a tag'); const index=effects.findIndex(e=>e.tag===row.tag); const e={...(index>=0?effects[index]:{}),...row,scope:slot+'_active_weapon',status:'custom proposal'}; if(index>=0)effects[index]=e;else effects.push(e);} }
  return effects;
}
function mercenaryData() {
  return {enabled:checked('trait_mercenary'),pool_ids:tags(val('merc_pools')),experience:num('merc_experience',0),cost:num('merc_cost',0),replenish_min:num('merc_replenish_min',0),replenish_max:num('merc_replenish_max',0),maximum:num('merc_maximum',0),initial:num('merc_initial',0),armour:val('merc_armour')===''?null:num('merc_armour',0),weapon_lvl:val('merc_weapon_lvl')===''?null:num('merc_weapon_lvl',0)};
}
function attachReforgedData(unit) {
  unit.unit_archetype=val('unit_category'); unit.unit_subtypes=CANONICAL_SUBTYPES.filter(n=>checked('trait_'+n.toLowerCase()));
  unit.category_comment=[unit.unit_archetype,...unit.unit_subtypes].join(' + ');
  unit.builder_version=REFORGED_VERSION; unit.project_profile=val('project_profile');
  unit.visual_profile={enabled:checked('visual_enabled'),equipment_uniformity:val('visual_uniformity'),livery_tendency:val('visual_livery'),equipment_variation:val('visual_variation'),notes:val('visual_notes')};
  unit.mercenary=mercenaryData();
  unit.automation={recruitment_mode:unit.mercenary.enabled?'mercenary_pool':'faction',mercenary_pool_ids:unit.mercenary.pool_ids,runtime_tags:unit.unit_subtypes.filter(n=>['Bloc','Raider','Mounted','Engineer','Garrison'].includes(n)),implementation_target:'unspecified'};
  unit.campaign_movement_horse_flag=checked('trait_mounted'); unit.engineer_flag=checked('trait_engineer'); unit.garrison_flag=checked('trait_garrison');
  unit.unit_custom_attributes=tags(val('unit_custom_attrs')).concat(tags(unit.attributes).filter(t=>CUSTOM_TAG.test(t)));
  unit.weapons={};
  for(const slot of ['pri','sec']) {
    let effects=[],error=null; try {effects=weaponEffects(slot);}catch(e){error=e.message;}
    unit.weapons[slot]={category:val(slot+'_category'),twohand:checked(slot+'_twohand'),handling:num(slot+'_handling',0),effects,effect_error:error,bracing:val(slot+'_bracing'),offhand:offhandContribution(slot)};
    if(effects.some(e=>/^rend_/.test(e.tag))&&tags(val(slot+'_attr')).includes('ap'))unit.weapons[slot].explicit_ap_rend_override=true;
  }
  const secOff=offhandContribution('sec');
  // Replace only primary handling/offhand when deriving secondary defence.
  const base=CATEGORY_BASE[val('unit_category')];
  const proficiency=base.def_tr+num('proficiency_def',{Exceptional:3,Outstanding:2,Superior:1,Standard:0,Inferior:-2}[val('quality')]);
  const subtype=(checked('trait_guards')?2:0)-(checked('trait_aggressive')?1:0);
  unit.secondary_defense={def_skill:Math.max(0,proficiency+subtype+num('arm_agi',0)+num('sec_handling',0)+secOff.def),shield:secOff.shield};
  unit.offhand={preset:val('offhand'),shield:num('offhand_shield',0),def:num('offhand_def',0)};
}
function validateReforged(unit) {
  const errors=[];
  if(val('unit_category')==='Royal Retinue'&&checked('trait_guards'))errors.push('Royal Retinue cannot take Guards.');
  if(checked('trait_mounted')&&(unit.mount||val('category')==='cavalry'))errors.push('Mounted subtype requires an unmounted battlefield unit.');
  if(checked('trait_engineer')&&val('category')!=='siege')errors.push('Engineer requires EDU category siege.');
  if(checked('trait_garrison')&&val('project_profile')==='SSR')errors.push('Garrison is disabled in the SSR profile.');
  if(checked('trait_hybrid')&&val('pri_weapon_type')!=='missile')errors.push('Hybrid requires a ranged primary weapon, excluding thrown weapons.');
  if(!/^[A-Za-z0-9_ -]+$/.test(unit.type||''))errors.push('Unit type must contain only letters, numbers, spaces, underscores or hyphens.');
  const m=unit.mercenary;
  if(m.enabled) {
    if(!m.pool_ids.length)errors.push('Mercenary requires at least one pool assignment.');
    if(m.pool_ids.some(id=>!/^[-\w ]+$/.test(id)))errors.push('Pool IDs must contain only letters, numbers, spaces, underscores or hyphens.');
    if(m.replenish_min<0||m.replenish_max<m.replenish_min)errors.push('Mercenary replenishment must be nonnegative, with minimum ≤ maximum.');
    if(m.initial<0||m.maximum<m.initial)errors.push('Mercenary initial availability must be between zero and maximum.');
    for(const field of ['experience','cost','maximum','initial','armour','weapon_lvl'])if(m[field]!==null&&(!Number.isInteger(m[field])||m[field]<0))errors.push('Mercenary '+field+' must be a nonnegative integer.');
  }
  for(const slot of ['pri','sec']) {
    const w=unit.weapons[slot];if(w.effect_error)errors.push(w.effect_error);
    if(num(slot+'_stagger_chance',100)<0||num(slot+'_stagger_chance',100)>100)errors.push(slot+' stagger chance must be 0–100%.');
    if(num(slot+'_stagger_lockout',1)<0)errors.push(slot+' stagger lockout cannot be negative.');
    const t=tags(val(slot+'_attr'));if(t.some(t=>/^duel_/.test(t))&&t.some(t=>/^duelist_/.test(t)))errors.push(slot+' uses duel and duelist aliases together; retain one effect.');
    if(t.some(tag=>/^spear_bonus_/.test(tag)&&!/^spear_bonus_(2|4|6|8|10|12)$/.test(tag)))errors.push(slot+' spear_bonus_X must use 2, 4, 6, 8, 10 or 12.');
  }
  return [...new Set(errors)];
}
function mercenaryText(unit) {
  if(!unit.mercenary.enabled)return '; No Mercenary subtype selected.';
  const errors=validateReforged(unit);if(errors.length)return '; EXPORT BLOCKED\n'+errors.map(e=>'; '+e).join('\n');
  const m=unit.mercenary;
  return '; Merge each unit line into the named existing pool; preserve its regions.\n'+m.pool_ids.map(id=>`pool ${id}\n  unit ${unit.type} exp ${m.experience} cost ${m.cost} replenish ${m.replenish_min} - ${m.replenish_max} max ${m.maximum} initial ${m.initial}`).join('\n\n');
}
const baseRecalc=recalc;
recalc=function() {
  for(const [id,eligible,reason] of [['trait_engineer',val('category')==='siege','Requires Siege Unit Classification.'],['trait_hybrid',val('pri_weapon_type')==='missile','Requires a ranged primary weapon; thrown weapons are excluded.'],['trait_guards',val('unit_category')!=='Royal Retinue','Royal Retinue cannot take Guards.'],['trait_garrison',val('project_profile')!=='SSR','Garrison is unavailable in the SSR profile.'],['trait_mounted',val('category')!=='cavalry','For units that ride on campaign but fight unmounted; already-mounted cavalry does not need this subtype.']]) {
    const input=document.getElementById(id);input.disabled=!eligible;if(!eligible)input.checked=false;
    input.closest('label').style.opacity=eligible?'1':'0.45';input.closest('label').title=eligible?'':reason;
  }
  for(const [id,enabled] of [['merc_fields',checked('trait_mercenary')],['visual_fields',checked('visual_enabled')]]) {
    const fields=document.getElementById(id);fields.disabled=!enabled;fields.style.opacity=enabled?'1':'0.45';
  }
  document.getElementById('merc_disabled_banner').style.display=checked('trait_mercenary')?'none':'block';
  mercSection.hidden=!checked('trait_mercenary');
  document.getElementById('armour_sound').value=normalizeArmourSound(val('armour_sound'));
  updateShieldEligibility();
  syncAttributeControls('pri');syncAttributeControls('sec');
  baseRecalc();
  const u=window._lastUnit, errors=validateReforged(u), notices=[];
  for(const slot of ['pri','sec']) {
    const w=u.weapons[slot],p=WEAPON_CATEGORIES[w.category];
    document.getElementById(slot+'_inheritance').textContent=p?(Number(val(slot+'_base_atk'))===Number(p.atk)&&val(slot+'_attr')===p.attr&&w.twohand===p.twohand?'Inherited category Attack / attributes / grip.':'Individual override of category Attack, attributes or grip.'):'Individual weapon values; no category preset applied.';
    document.getElementById(slot+'_effects_view').textContent=JSON.stringify(w.effects,null,2);
    const omitted=tags(val(slot+'_attr')).filter(t=>!NATIVE_WEAPON_TAGS.has(t));
    if(omitted.length)notices.push(slot+': design-only tags omitted from EDU: '+omitted.join(', '));
    if(w.explicit_ap_rend_override)notices.push(slot+': explicit AP + rend override; the supplied AP description applies before proposed rend reduction.');
    if(w.twohand&&val('offhand')!=='empty')notices.push(slot+': two-handed grip suppresses held offhand Shield and Defense Skill contribution.');
  }
  if(u.automation.runtime_tags.length)notices.push('Unimplemented runtime tags retained as metadata: '+u.automation.runtime_tags.join(', '));
  if(u.unit_custom_attributes.length)notices.push('Unit custom effects retained separately: '+u.unit_custom_attributes.join(', '));
  if(u.sec_attack!==null)notices.push('Secondary-slot handling / offhand defense is retained in design JSON; an active-slot defense runtime route is not configured.');
  if(u.mercenary.armour!==null||u.mercenary.weapon_lvl!==null)notices.push('Mercenary armor/weapon extensions retained in JSON; output syntax remains unconfigured.');
  document.getElementById('reforged_validation').textContent=(errors.length?'Export blocked:\n'+errors.join('\n'):'Eligibility valid. Native EDU fields available.')+'\n\n'+notices.join('\n')+'\n\nBalance defaults are provisional; this builder does not implement battle or campaign runtime effects.';
  document.getElementById('merc_out').textContent=mercenaryText(u);
  document.getElementById('runtime_out').textContent=JSON.stringify({campaign_movement_horse_flag:u.campaign_movement_horse_flag,engineer_flag:u.engineer_flag,garrison_flag:u.garrison_flag,automation:u.automation,unit_custom_attributes:u.unit_custom_attributes},null,2);
};
const baseCopyEdu=copyEdu;
copyEdu=function(){const u=compute().unit;if(validateReforged(u).length){flash('Resolve validation errors before copying EDU.');return;}baseCopyEdu();};
const baseCopyCsv=copyCsv;
copyCsv=function(){if(validateReforged(compute().unit).length){flash('Resolve validation errors before copying CSV.');return;}baseCopyCsv();};
function downloadText(text,name,type='text/plain') {const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function downloadMercenaries(){const u=compute().unit;if(validateReforged(u).length){flash('Resolve validation errors first.');return;}downloadText(mercenaryText(u),'descr_mercenaries_snippets.txt');}
function downloadRuntimeMetadata(){const u=compute().unit;downloadText(JSON.stringify({status:'design metadata; runtime implementation unspecified',unit:u.type,campaign_movement_horse_flag:u.campaign_movement_horse_flag,engineer_flag:u.engineer_flag,garrison_flag:u.garrison_flag,automation:u.automation,weapons:u.weapons,unit_custom_attributes:u.unit_custom_attributes},null,2),'combat_reforged_runtime_design.json','application/json');}
function projectFields(){const fields={};document.querySelectorAll('.form-pane input[id],.form-pane select[id],.form-pane textarea[id]').forEach(e=>{if(e.type!=='file'&&(e.type!=='hidden'||['pri_attr','sec_attr'].includes(e.id)))fields[e.id]=(e.type==='checkbox'||e.type==='radio')?e.checked:e.value;});return fields;}
function exportProject(){downloadText(JSON.stringify({schema:'combat-reforged-builder',version:1,fields:projectFields(),presets:editorCollectAll(),weapon_categories:WEAPON_CATEGORIES,unit:compute().unit},null,2),'combat_reforged_project.json','application/json');}
function restoreFields(fields){for(const [id,value]of Object.entries(fields)){const e=document.getElementById(id);if(!e||!e.closest('.form-pane')||e.type==='file')continue;if(e.type==='checkbox'||e.type==='radio')e.checked=!!value;else e.value=id==='armour_sound'?normalizeArmourSound(value):id==='quality'&&value===('Stan'+'dard')?'Average':value;}}
function importProjectData(data){
  if(data.schema!=='combat-reforged-builder'||data.version!==1||!data.fields||typeof data.fields!=='object')throw Error('Choose a Combat Reforged builder project JSON.');
  const previous=projectFields(),before=JSON.parse(JSON.stringify(editorCollectAll())),categories=JSON.parse(JSON.stringify(WEAPON_CATEGORIES));
  try {
    if(data.presets)for(const cat of Object.keys(EDITOR_CATS)){if(data.presets[cat])EDITOR_CATS[cat].setStore(data.presets[cat]);}
    if(data.weapon_categories)for(const key of Object.keys(WEAPON_CATEGORIES)){const p=data.weapon_categories[key];if(p)Object.assign(WEAPON_CATEGORIES[key],p);}
    populateWeaponSelects();populateArmourPresets();refreshShieldSelects();
    restoreFields(data.fields);
    if(!CATEGORY_BASE[val('unit_category')])throw Error('Project has an unknown archetype.');
    const errors=validateReforged(compute().unit);if(errors.length)throw Error(errors.join(' '));
    editorPersist();updateMountVisibility();restoreFields(data.fields);recalc();
  } catch(e) {for(const cat of Object.keys(EDITOR_CATS))EDITOR_CATS[cat].setStore(before[cat]);Object.assign(WEAPON_CATEGORIES,categories);populateWeaponSelects();populateArmourPresets();refreshShieldSelects();restoreFields(previous);updateMountVisibility();restoreFields(previous);recalc();throw e;}
}
function importProjectFile(event){const file=event.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{importProjectData(JSON.parse(r.result));document.getElementById('project_status').textContent='Project imported.';}catch(e){document.getElementById('project_status').textContent='Import rejected: '+e.message;}};r.readAsText(file);event.target.value='';}
// Category defaults are editable through the existing Item Editor and project JSON.
EDITOR_CATS.weapon_categories={title:'Weapon categories · proposal v0.1',store:()=>WEAPON_CATEGORIES,setStore:o=>{for(const key of Object.keys(WEAPON_CATEGORIES)){if(o[key])Object.assign(WEAPON_CATEGORIES[key],o[key]);}},fields:[{key:'key',label:'Category ID',type:'text',required:true},{key:'label',label:'Label',type:'text',required:true},{key:'atk',label:'Base Attack',type:'number'},{key:'attr',label:'Default attributes',type:'text'},{key:'twohand',label:'Two-handed (true / false)',type:'text'}],defaults:{atk:0,attr:'',twohand:false},onChange:()=>recalc()};
const catButton=document.createElement('button');catButton.type='button';catButton.textContent='Weapon categories';catButton.dataset.cat='weapon_categories';catButton.onclick=()=>editorSelectCat('weapon_categories');document.querySelector('[data-cat="pri"]').parentElement.appendChild(catButton);
const baseSnapshot=editorSnapshotBuiltins;
editorSnapshotBuiltins=function(){baseSnapshot();if(!editorBuiltins.weapon_categories)editorBuiltins.weapon_categories=JSON.parse(JSON.stringify(WEAPON_CATEGORIES));};
const originalEditorSave=editorSave;
editorSave=function(){if(editorCat==='weapon_categories'){const id=document.getElementById('ef_key').value;if(!Object.hasOwn(WEAPON_CATEGORIES,id)||editorSelectedKey!==id){editorStatus('Edit an existing canonical category; category IDs are fixed.',true);return;}}originalEditorSave();for(const p of Object.values(WEAPON_CATEGORIES))p.twohand=p.twohand===true||p.twohand==='true';editorPersist();recalc();};
const originalEditorDelete=editorDelete;
editorDelete=function(){if(editorCat==='weapon_categories'){editorStatus('Canonical weapon categories may be edited, but not deleted.',true);return;}originalEditorDelete();};
const originalPri=applyPriPreset,originalSec=applySecPreset;
const categoryMap={arming_sword:'sword_cut',falchion:'sword_cut',war_knife:'knife',mace:'mace',foot_spear:'spear',long_sword:'longsword',great_sword:'greatsword',long_axe:'longaxe',pike:'pike',halberd:'halberd',glaive:'glaive',bill:'bill',pole_axe:'poleaxe',war_hammer:'pick',battle_axe:'axe',horsemans_sword:'sword_cut',horsemans_mace:'mace',horsemans_hammer:'pick',horsemans_pick:'pick',horsemans_axe:'axe',light_couched_lance:'lance',couched_lance:'lance',heavy_couched_lance:'lance'};
Object.assign(categoryMap,{horseman_mace:'mace',horseman_hammer:'pick',horseman_pick:'pick',horseman_axe:'axe',mounted_spear:'spear',short_sword:'knife'});
for(const store of [PRI_PRESETS,SEC_PRESETS])for(const [id,p]of Object.entries(store)){const category=WEAPON_CATEGORIES[categoryMap[id]];if(category&&categoryMap[id]!=='lance'){p.atk=category.atk;p.attr=category.attr;}}
function syncPresetCategory(slot){const key=categoryMap[val(slot+'_preset')];const p=(slot==='pri'?PRI_PRESETS:SEC_PRESETS)[val(slot+'_preset')]||{};document.getElementById(slot+'_category').value=key||'';document.getElementById(slot+'_twohand').checked=p.twohand!==undefined?(p.twohand===true||p.twohand==='true'):(key?WEAPON_CATEGORIES[key].twohand===true:false);if(p.handling!==undefined)document.getElementById(slot+'_handling').value=p.handling;recalc();}
applyPriPreset=function(){originalPri();syncPresetCategory('pri');};applySecPreset=function(){originalSec();syncPresetCategory('sec');};
for(const cat of ['pri','sec'])EDITOR_CATS[cat].fields.push({key:'twohand',label:'Two-handed grip (true / false)',type:'text'},{key:'handling',label:'Weapon Defense Skill modifier',type:'number'});
const oldReset=resetToJerusalem;
resetToJerusalem=function(){for(const n of CANONICAL_SUBTYPES)document.getElementById('trait_'+n.toLowerCase()).checked=false;oldReset();document.getElementById('trait_religious').checked=false;for(const n of CANONICAL_SUBTYPES)document.getElementById('trait_'+n.toLowerCase()).checked=false;recalc();};
