/* Adopted revision: weapon Attack headroom12, core Skill4, combined horse/rider Armor. */
const COMBAT_RULES_REVISION='2026-10-12-r2';
const LEGACY_CATEGORY_DEFAULTS=JSON.parse(JSON.stringify(WEAPON_CATEGORIES));
const LEGACY_WEAPON_DEFAULTS={pri:JSON.parse(JSON.stringify(PRI_PRESETS)),sec:JSON.parse(JSON.stringify(SEC_PRESETS))};
const LEGACY_ARMOR_DEFAULTS=JSON.parse(JSON.stringify(ARMOUR_PRESETS));
const LEGACY_HANDLING_DEFAULTS=JSON.parse(JSON.stringify(CATEGORY_HANDLING_FROM_BIBLE));
const REVISED_ATTACK={mace:4,pick:4,fighting_spear:7,pike:5,longaxe:11,glaive:10,bill:9,halberd:10,poleaxe:10,longsword:9,greatsword:12,estoc:7,staff:4};
const REVISED_HANDLING={knife:0,sword_cut:1,sword_thrust:1,axe:0,mace:0,pick:0,spear:0,fighting_spear:1,pike:0,longaxe:0,glaive:0,bill:0,halberd:0,poleaxe:1,longsword:1,greatsword:0,estoc:0,staff:1,lance:0};
for(const [id,atk]of Object.entries(REVISED_ATTACK))WEAPON_CATEGORIES[id].atk=atk;
for(const [id,skill]of Object.entries(REVISED_HANDLING))CATEGORY_HANDLING_FROM_BIBLE[id]=[skill,skill];
const rulePresetCategory=(id,p)=>p?.weapon_category||categoryMap[id]||(id==='horseman_sword'?'sword_cut':'');
for(const [slot,store]of Object.entries({pri:PRI_PRESETS,sec:SEC_PRESETS}))for(const [id,p]of Object.entries(store)){
  const category=rulePresetCategory(id,p);
  if(REVISED_ATTACK[category]!==undefined)p.atk=REVISED_ATTACK[category];
  if(REVISED_HANDLING[category]!==undefined){p.handling=REVISED_HANDLING[category];p.handling_mounted=REVISED_HANDLING[category];}
}
for(const [i,quality]of ['Exceptional','Outstanding','Superior','Average','Inferior'].entries()){
  BIBLE_FOOT_QUALITY[quality].def=[2,1,1,0,0][i];BIBLE_MOUNTED_QUALITY[quality].def=[2,1,1,0,0][i];
}
CATEGORY_BASE['Emergency Levies'].def_tr=0;
// Compress default equipment advantages; custom positive numeric overrides stay editable.
for(const p of Object.values(ARMOUR_PRESETS))p.agi=Math.min(1,Math.max(0,p.agi||0));
for(const p of Object.values(ARMOUR_LAYERS))p.agi=Math.max(0,p.agi||0);
for(const p of Object.values(SHIELD_TYPES))p.def=Math.min(1,Math.max(0,p.def||0));
for(const p of Object.values(SHIELD_MATERIALS))p.def=Math.max(0,p.def||0);
// Independent offhand presets retain their approved signed Skill modifiers.
const REVISED_WEAPON_DEFAULTS={pri:JSON.parse(JSON.stringify(PRI_PRESETS)),sec:JSON.parse(JSON.stringify(SEC_PRESETS))};
const REVISED_CATEGORY_DEFAULTS=JSON.parse(JSON.stringify(WEAPON_CATEGORIES));
addFields(document.getElementById('quality').closest('.body'),numberField('core_defense_skill','Core soldier Defense Skill',4));
document.getElementById('core_defense_skill').min='0';
for(const slot of ['pri','sec']){
  const field=document.getElementById(slot+'_handling'),label=field.closest('label');
  label.firstChild.textContent=(slot==='pri'?'Primary':'Secondary')+' weapon handling Skill bonus';field.min='0';
  label.querySelectorAll('.hint').forEach(h=>h.textContent='Adds a small nonnegative handling bonus to core soldier Skill4. This replaces the former full weapon Skill baseline. Only the defending weapon contributes.');
}
const coreInput=document.getElementById('core_defense_skill');coreInput.insertAdjacentHTML('afterend','<span class="hint">Rules r2: core4 + training + quality + small handling/equipment/subtype advantages. Ordinary penalties removed; Aggressive remains−1. Manual positive overrides are retained.</span>');
document.getElementById('proficiency_def').min='0';
document.getElementById('proficiency_def').closest('label').querySelector('.hint').textContent='Soldier-quality Skill bonus: Exceptional+2, Outstanding+1, Superior+1, Average0, Inferior0. This overrides the quality contribution, not total soldier Skill.';
for(const slot of ['pri','sec'])for(const field of EDITOR_CATS[slot].fields){if(field.key==='handling')field.label='Weapon handling Skill bonus';if(field.key==='handling_mounted')field.label='Mounted handling Skill bonus';}
const offhandBeforeSkillRevision=offhandContribution;
offhandContribution=function(slot='pri'){
  const p=offhandBeforeSkillRevision(slot);
  p.def=val('offhand')==='legacy'?Math.min(1,Math.max(0,p.def)):(val('offhand')==='large'?Math.max(-1,p.def):Math.max(0,p.def));
  return p;
};
const computeBeforeSkillRevision=compute;
compute=function(){
  const result=computeBeforeSkillRevision(),u=result.unit,base=CATEGORY_BASE[val('unit_category')],style=bibleCavalryStyle(),slot=u.defending_weapon_slot;
  const quality=(u.category==='cavalry'?BIBLE_MOUNTED_QUALITY:BIBLE_FOOT_QUALITY)[bibleMeleeQuality()];
  const breakdown=s=>({core:Math.max(0,num('core_defense_skill',4)),archetype_training:Math.max(0,base.def_tr),soldier_quality:Math.max(0,num('proficiency_def',quality.def)),armor:Math.max(0,num('arm_agi',0)),weapon_handling:Math.max(0,num(s+'_handling',0)),offhand:offhandContribution(s).def,guards:checked('trait_guards')?1:0,aggressive:checked('trait_aggressive')?-1:0,cavalry_style:Math.max(0,style.def)});
  const total=b=>Math.max(0,Object.values(b).reduce((a,v)=>a+v,0));
  u.skill_breakdown=breakdown(slot);u.def_skill=total(u.skill_breakdown);
  u.secondary_defense.def_skill=total(breakdown('sec'));
  const horse=u.category==='cavalry'&&['destrier','stallion','courser','rouncy','hobby','pony'].includes(val('horse_type'));
  const bard=horse?Math.max(0,(HORSE_BARDING[val('horse_barding')]||{}).armour||0):0;
  u.armor_breakdown={rider_without_barding:u.armour,horse_barding:bard};u.armour+=bard;
  if(u.mount_design){u.mount_design.barding_armor_applied_to_rider=horse;u.mount_design.barding_armor_destination=horse?'stat_pri_armour Armor':'not applied by horse-only rule';u.mount_design.implementation='Horse barding Armor adds to rider stat_pri_armour Armor. Geometry uses descr_mount; speed/stamina still need verified external configuration.';}
  u.combat_rules_revision=COMBAT_RULES_REVISION;
  result.log=result.log.filter(line=>!line.startsWith('EDU totals:')&&!line.startsWith('Defending slot'));
  result.log.push('--- Adopted combat rules '+COMBAT_RULES_REVISION+' ---',`Defense Skill: ${Object.entries(u.skill_breakdown).map(([k,v])=>k+' '+v).join(' + ')} = ${u.def_skill}`,`Rider Armor ${u.armor_breakdown.rider_without_barding} + horse barding ${bard} = ${u.armour}`,`EDU totals: Attack ${u.pri_attack}/${u.sec_attack}, Armor/Skill/Shield ${u.armour}/${u.def_skill}/${u.shield}`);
  return result;
};
// Upgrade only recognizable legacy defaults; preserve separately customized values.
function migrateRuleStores(data){
  if(!data||data._combat_rules_revision===COMBAT_RULES_REVISION)return data;
  for(const slot of ['pri','sec'])for(const [id,p]of Object.entries(data[slot]||{})){
    const old=LEGACY_WEAPON_DEFAULTS[slot][id],fresh=REVISED_WEAPON_DEFAULTS[slot][id];if(!old||!fresh)continue;
    for(const key of ['atk','handling','handling_mounted'])if(p[key]===undefined||Number(p[key])===Number(old[key]))p[key]=fresh[key];
  }
  for(const [id,p]of Object.entries(data.weapon_categories||{})){const old=LEGACY_CATEGORY_DEFAULTS[id];if(old&&Number(p.atk)===Number(old.atk))p.atk=REVISED_CATEGORY_DEFAULTS[id].atk;}
  for(const [id,p]of Object.entries(data.armour||{})){const old=LEGACY_ARMOR_DEFAULTS[id];if(old&&Number(p.agi)===Number(old.agi))p.agi=Math.min(1,Math.max(0,p.agi||0));}
  for(const p of Object.values(data.layers||{}))if(p.agi<0)p.agi=0;
  for(const p of Object.values(data.shield_type||{}))if(p.def<0)p.def=0;
  for(const p of Object.values(data.shield_mat||{}))if(p.def<0)p.def=0;
  data._combat_rules_revision=COMBAT_RULES_REVISION;return data;
}
const collectBeforeRules=editorCollectAll;
editorCollectAll=function(){return {...collectBeforeRules(),_combat_rules_revision:COMBAT_RULES_REVISION};};
const loadBeforeRules=editorLoadPersisted;
editorLoadPersisted=function(){
  let raw=null;try{raw=localStorage.getItem(LS_KEY);}catch(e){console.warn('Preset storage unavailable:',e);}
  if(raw){try{localStorage.setItem(LS_KEY,JSON.stringify(migrateRuleStores(JSON.parse(raw))));}catch(e){console.warn('Legacy preset migration:',e);}}
  loadBeforeRules();
};
const importBeforeRules=importProjectData;
importProjectData=function(input){
  const data=JSON.parse(JSON.stringify(input));
  if(data.fields&&!Object.hasOwn(data.fields,'core_defense_skill')){
    data.fields.core_defense_skill=4;
    for(const slot of ['pri','sec']){
      const id=data.fields[slot+'_preset'],cat=data.fields[slot+'_category'],old=LEGACY_WEAPON_DEFAULTS[slot][id],fresh=REVISED_WEAPON_DEFAULTS[slot][id];
      const handling=Number(data.fields[slot+'_handling']),oldValues=[old?.handling,old?.handling_mounted,...(LEGACY_HANDLING_DEFAULTS[cat]||[])];
      if(oldValues.some(v=>v!==undefined&&handling===Number(v)))data.fields[slot+'_handling']=REVISED_HANDLING[cat]??fresh?.handling??0;
      const atk=Number(data.fields[slot+'_base_atk']);if(old&&atk===Number(old.atk)&&fresh)data.fields[slot+'_base_atk']=fresh.atk;
      else if(LEGACY_CATEGORY_DEFAULTS[cat]&&atk===Number(LEGACY_CATEGORY_DEFAULTS[cat].atk))data.fields[slot+'_base_atk']=REVISED_CATEGORY_DEFAULTS[cat].atk;
    }
    if(Number(data.fields.proficiency_def)<0)data.fields.proficiency_def=0;
    const armor=LEGACY_ARMOR_DEFAULTS[data.fields.armour_preset];
    if(armor&&Number(data.fields.arm_agi)===Number(armor.agi))data.fields.arm_agi=Math.min(1,Math.max(0,armor.agi));
    if(Number(data.fields.arm_agi)<0)data.fields.arm_agi=0;
    if(Number(data.fields.offhand_def)>1&&data.fields.offhand!=='legacy'){
      if(data.fields.offhand==='buckler'&&Number(data.fields.offhand_def)===3)data.fields.offhand_def=2;
    }
  }
  if(data.presets)migrateRuleStores(data.presets);
  if(data.weapon_categories)migrateRuleStores({weapon_categories:data.weapon_categories});
  return importBeforeRules(data);
};
