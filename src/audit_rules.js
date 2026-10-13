/* Numerical fixes grounded in the live Combat Reforged tab, read 12 October 2026.
 * Newer user-approved subtype, Attack-preset and offhand decisions take precedence.
 */
const BIBLE_FOOT_QUALITY = {
  Exceptional:{atk:3,def:3,delay:-30,heat:-3},Outstanding:{atk:2,def:2,delay:-20,heat:-2},
  Superior:{atk:1,def:1,delay:-10,heat:-1},Average:{atk:0,def:0,delay:0,heat:0},Inferior:{atk:-2,def:-2,delay:20,heat:1}
};
const BIBLE_MOUNTED_QUALITY = {
  Exceptional:{atk:7,def:2,delay:-30,heat:-3},Outstanding:{atk:5,def:1,delay:-20,heat:-2},
  Superior:{atk:3,def:1,delay:-10,heat:-1},Average:{atk:1,def:0,delay:0,heat:0},Inferior:{atk:-3,def:-2,delay:20,heat:1}
};
const BIBLE_WEAPON_HANDLING = {
  arming_sword:[5,4],falchion:[4,3],war_knife:[5,5],short_sword:[5,5],mace:[3,2],foot_spear:[2,3],
  mounted_spear:[2,3],long_sword:[6,6],great_sword:[6,6],long_axe:[5,5],pike:[1,1],halberd:[6,6],glaive:[6,6],pole_axe:[5,5],bill:[6,6],
  horseman_mace:[2,2],horseman_hammer:[3,3],horseman_pick:[2,2],horseman_axe:[3,3],
  light_couched_lance:[0,0],couched_lance:[-1,-1],heavy_couched_lance:[-1,-1]
};
for(const store of [PRI_PRESETS,SEC_PRESETS]) {
  if(store.arming_sword)Object.assign(store.arming_sword,{charge:3,delay:40,heat:0,charge_mounted:4,delay_mounted:45,heat_mounted:0});
  if(store.falchion)Object.assign(store.falchion,{charge:4,delay:45,heat:1,charge_mounted:4,delay_mounted:50,heat_mounted:0});
}
// Separate the actual mounted ranged rows instead of offering a foot heavy bow as a mounted preset.
PRI_PRESETS.composite_bow.label='Heavy Composite Bow';PRI_PRESETS.composite_bow.roles=['missile'];
for(const [id,label,atk,range,ammo,kind]of [
  ['mounted_short_bow','Mounted Shortbow',2,90,40,'bow'],['mounted_recurve_bow','Mounted Recurve Bow',3,105,40,'bow'],
  ['mounted_heavy_recurve_bow','Mounted Heavy Recurve Bow',4,140,40,'bow'],['mounted_crossbow','Mounted Crossbow',6,95,10,'crossbow'],
  ['mounted_javelin','Mounted Javelin',10,50,6,'thrown']
])PRI_PRESETS[id]={roles:['cav'],label,atk,charge:0,missile:kind==='thrown'?'javelin':kind==='crossbow'?'bolt':'arrow',range,ammo,wtype:kind==='thrown'?'thrown':'missile',tech:'simple',dmg:'piercing',sound:kind==='thrown'?'spear':kind,name:id,attr:kind==='thrown'?'thrown':'',heat:kind==='thrown'?1:0,cdist:20,delay:0};
for(const cat of ['pri','sec']) {
  const store=cat==='pri'?PRI_PRESETS:SEC_PRESETS;
  for(const [id,p]of Object.entries(store)) {
    if(BIBLE_WEAPON_HANDLING[id]){p.handling=BIBLE_WEAPON_HANDLING[id][0];p.handling_mounted=BIBLE_WEAPON_HANDLING[id][1];}
    if(cat==='sec'&&p.atk!==null&&p.heat===undefined)p.heat=['mace','horseman_mace','horseman_axe'].includes(id)?1:0;
  }
  EDITOR_CATS[cat].fields.push({key:'handling_mounted',label:'Mounted weapon Defense Skill modifier',type:'number'});
  for(const [key,label]of [['charge_mounted','Mounted base Charge'],['delay_mounted','Mounted base attack delay'],['heat_mounted','Mounted carried-weapon heat']])EDITOR_CATS[cat].fields.push({key,label,type:'number'});
}
EDITOR_CATS.sec.fields.push({key:'heat',label:'Secondary carried-weapon heat',type:'number'});
// Correct subtype-independent archetype heat/attributes omitted by the old resolver.
CATEGORY_BASE['Royal Retinue'].heat=-2;CATEGORY_BASE['Royal Retinue'].attrs=['general_unit','free_upkeep_unit'];
CATEGORY_BASE['Martial Nobility'].heat=-1;CATEGORY_BASE['Martial Nobility'].attrs=[];
CATEGORY_BASE['Urban Militia'].attrs=['free_upkeep_unit'];CATEGORY_BASE['Rural Militia'].attrs=['free_upkeep_unit'];
CATEGORY_BASE['Emergency Levies'].heat=1;
Object.assign(TERRAIN,{
  Byzantine:{light:[1,0,1,0],medium:[0,-1,0,-1],heavy:[-1,-2,-1,-2]},
  Anatolia:{light:[1,1,1,-1],medium:[0,0,0,-2],heavy:[-1,-1,-1,-3]},
  'Middle East/Persia':{light:[0,3,0,-3],medium:[-1,2,-1,-4],heavy:[-2,1,0,-5]},
  'Cuman/Mongol':{light:[1,0,2,0],medium:[0,-1,1,-1],heavy:[-1,-2,0,-2]}
});
for(const origin of ['Byzantine','Anatolia','Middle East/Persia','Cuman/Mongol'])document.getElementById('origin').add(new Option(origin,origin));
const numericalControls=addFields(document.getElementById('quality').closest('.body'),`<details class="full"><summary>Additional bible modifiers</summary><div class="grid">
  <label>Climate heat origin<select id="climate_heat" onchange="recalc()"><option value="0">No climate modifier / Southern Europe / Byzantine (0)</option><option value="3">Far Northern Europe (+3)</option><option value="2">Northern Europe (+2)</option><option value="1">Northern Italy / Mongol (+1)</option><option value="-1">Anatolia / Persia (−1)</option><option value="-2">Middle East / Africa (−2)</option></select></label>
  <label>Bow culture<select id="bow_culture" onchange="recalc()"><option value="">No culture modifier</option><option value="anatolian">Anatolian: +10 range</option><option value="mongolian">Mongolian / Cuman: +1 Attack, +10 range</option><option value="welsh">Welsh: +1 Attack</option></select></label>
  <label>Terrain specialty<select id="terrain_specialty" onchange="recalc()"><option value="">None</option><option>scrub</option><option>sand</option><option>forest</option><option>snow</option></select></label>
  <label>Mean armor mass for soldier mass<input id="armor_mean_mass" type="number" min="0" step="0.1" placeholder="Selected armor preset" oninput="recalc()" /></label>
  <span class="hint full">Climate origin is separate from terrain origin. Projectile accuracy and mount movement properties are recorded as auxiliary design data; they are not invented EDU fields.</span>
  </div></details>`);
addFields(document.getElementById('sec_attr').closest('.body'),numberField('sec_heat','Secondary carried-weapon heat',0));
const formationBody=document.getElementById('form_preset').closest('.body');
addFields(formationBody,'<label><span><input id="bible_formation_auto" type="checkbox" checked onchange="recalc()" /> Apply bible formation defaults for current choices</span><span class="hint">Editing formation numbers or selecting a manual preset turns this off, preserving your override.</span></label>');
for(const id of ['f_cs','f_cf','f_ls','f_lf','f_ranks','f_types'])document.getElementById(id).addEventListener('input',()=>{document.getElementById('bible_formation_auto').checked=false;},true);
document.getElementById('form_preset').addEventListener('change',()=>{document.getElementById('bible_formation_auto').checked=false;},true);
// Keep attributes last, after adding the missing secondary heat control.
document.getElementById('sec_attr').closest('.body').appendChild(document.getElementById('sec_attribute_block'));
for(const slot of ['pri','sec'])document.getElementById(slot+'_handling').closest('label').insertAdjacentHTML('beforeend','<span class="hint">Legacy full weapon Defense Skill base, not an extra bonus on top of a separate soldier baseline. Adds to archetype training, effective quality and applicable armor/offhand/subtype terms. Only the defending melee slot contributes, never both weapons together.</span>');
const auditedPresetSync=syncPresetCategory;
syncPresetCategory=function(slot){
  auditedPresetSync(slot);
  const p=(slot==='pri'?PRI_PRESETS:SEC_PRESETS)[val(slot+'_preset')];
  if(p){const fallback=BIBLE_WEAPON_HANDLING[val(slot+'_preset')];const handling=val('category')==='cavalry'?(p.handling_mounted??p.handling??fallback?.[1]):(p.handling??fallback?.[0]);if(handling!==undefined){document.getElementById(slot+'_handling').value=handling;document.getElementById(slot+'_handling').dataset.inheritedHandling=handling;}if(slot==='sec')document.getElementById('sec_heat').value=p.heat??(['mace','horseman_mace','horseman_axe'].includes(val(slot+'_preset'))?1:0);}
  if(p)for(const [suffix,key]of [['base_charge','charge'],['delay','delay'],['heat','heat']]){const field=document.getElementById(slot+'_'+suffix),recommended=val('category')==='cavalry'?(p[key+'_mounted']??p[key]):p[key];if(recommended!==undefined){field.value=recommended;field.dataset.inheritedValue=recommended;}}
  recalc();
};
const CATEGORY_HANDLING_FROM_BIBLE={knife:[5,5],sword_cut:[5,4],sword_thrust:[5,4],axe:[4,3],mace:[3,2],pick:[4,3],spear:[2,3],fighting_spear:[2,2],pike:[1,1],longaxe:[5,5],glaive:[6,6],bill:[6,6],halberd:[6,6],poleaxe:[5,5],longsword:[6,6],greatsword:[6,6],lance:[-1,-1]};
const applyCategoryBeforeAudit=applyWeaponCategory;
applyWeaponCategory=function(slot){applyCategoryBeforeAudit(slot);const recommendation=CATEGORY_HANDLING_FROM_BIBLE[val(slot+'_category')];if(recommendation){const field=document.getElementById(slot+'_handling');field.value=recommendation[val('category')==='cavalry'?1:0];delete field.dataset.inheritedHandling;}recalc();};
function bibleMeleeQuality() {
  const q=val('quality');if(val('pri_weapon_type')==='melee'||checked('trait_hybrid'))return q;
  const skirmish=val('class')==='skirmish'||val('pri_weapon_type')==='thrown';
  if(q==='Inferior')return 'Inferior';
  if(skirmish)return ['Exceptional','Outstanding'].includes(q)?'Superior':'Average';
  return q==='Average'?'Inferior':'Average';
}
function bibleRangedQuality() {
  const q=val('quality'), thrown=val('pri_weapon_type')==='thrown',bow=val('pri_sound')==='bow'||val('pri_missile')==='arrow';
  const grade={Exceptional:0,Outstanding:1,Superior:2,Average:3,Inferior:4}[q];
  return {attack:q==='Inferior'?-1:thrown?[3,2,1,0,0][grade]:bow?[2,1,0,0,0][grade]:0,
    range:q==='Inferior'?-10:thrown?[15,10,5,0,0][grade]:[30,20,10,0,0][grade],
    accuracy:[-0.20,-0.10,-0.05,0,0.10][grade],bow};
}
function bibleCavalryStyle() {
  if(val('category')!=='cavalry')return {atk:0,charge:0,def:0,heat:0,speed:0,mass:0,morale:0};
  if(val('pri_weapon_type')!=='melee')return {atk:0,charge:0,def:0,heat:-2,speed:0.1,mass:-0.5,morale:0};
  const style=document.querySelector('input[name="cav_style"]:checked')?.value||'lancer';
  return style==='lancer'?{atk:-1,charge:2,def:-1,heat:-1,speed:0.05,mass:0.25,morale:0}:style==='brawler'?{atk:1,charge:-2,def:1,heat:1,speed:-0.05,mass:-0.25,morale:2}:{atk:0,charge:0,def:0,heat:0,speed:0,mass:0,morale:1};
}
const computeBeforeBibleAudit=compute;
compute=function(){
  const result=computeBeforeBibleAudit(),u=result.unit,base=CATEGORY_BASE[val('unit_category')],mounted=u.category==='cavalry';
  const meleeGrade=bibleMeleeQuality(),melee=(mounted?BIBLE_MOUNTED_QUALITY:BIBLE_FOOT_QUALITY)[meleeGrade],range=bibleRangedQuality(),style=bibleCavalryStyle();
  const subtypeAtk=(checked('trait_aggressive')?1:0)-(checked('trait_guards')?1:0),subtypeDef=(checked('trait_guards')?2:0)-(checked('trait_aggressive')?1:0),archAttack=base.atk_eq+base.atk_tr;
  const attack=(slot)=>{
    if(val(slot+'_weapon_type')!=='melee')return num(slot+'_base_atk',0)+archAttack+range.attack+(val('class')==='skirmish'?1:0)+(range.bow&&['mongolian','welsh'].includes(val('bow_culture'))?1:0);
    const shield=offhandContribution(slot),kite=mounted&&val('offhand')==='legacy'&&val('shield_type')==='kite'&&shield.applicable?-1:0;
    return num(slot+'_base_atk',0)+archAttack+melee.atk+subtypeAtk+style.atk+kite;
  };
  u.pri_attack=attack('pri');if(u.sec_attack!==null)u.sec_attack=attack('sec');
  // No universal charge bonus is specified by either quality table.
  const lance=(slot)=>val(slot+'_category')==='lance'||/lance/i.test(val(slot+'_weapon'));
  u.pri_charge=num('pri_base_charge',0)+(val('pri_weapon_type')==='melee'&&lance('pri')?style.charge:0);
  if(u.sec_attack!==null)u.sec_charge=num('sec_base_charge',0)+(val('sec_weapon_type')==='melee'&&lance('sec')?style.charge:0);
  u.pri_delay=val('pri_weapon_type')==='melee'?Math.max(0,num('pri_delay',0)+melee.delay):num('pri_delay',0);
  if(u.sec_attack!==null)u.sec_delay=val('sec_weapon_type')==='melee'?Math.max(0,num('sec_delay',45)+melee.delay):num('sec_delay',0);
  const defense=(slot)=>Math.max(0,base.def_tr+num('proficiency_def',melee.def)+num('arm_agi',0)+num(slot+'_handling',0)+offhandContribution(slot).def+subtypeDef+style.def);
  const defenseSlot=val('pri_weapon_type')!=='melee'&&u.sec_attack!==null?'sec':'pri';
  u.def_skill=defense(defenseSlot);u.shield=offhandContribution(defenseSlot).shield;
  u.secondary_defense={def_skill:defense('sec'),shield:offhandContribution('sec').shield};
  u.defending_weapon_slot=defenseSlot;
  if(val('pri_weapon_type')!=='melee') {
    u.pri_range=num('pri_range',0)+range.range+(range.bow&&['anatolian','mongolian'].includes(val('bow_culture'))?10:0);
    if(val('class')==='skirmish')u.pri_range=Math.floor(u.pri_range*0.6);
  }
  const st=SHIELD_TYPES[val('shield_type')]||SHIELD_TYPES.none,material=SHIELD_MATERIALS[val('shield_material')]||SHIELD_MATERIALS.wooden;
  const shieldHeat=val('offhand')==='legacy'&&!allEquippedWeaponsTwohanded()&&val('shield_type')!=='none'?(st.heat||0)+(material.heat||0):0;
  u.heat=num('arm_heat',0)+num('pri_heat',0)+(u.sec_attack!==null?num('sec_heat',0):0)+(mounted?num('mount_heat',0):0)+base.heat+shieldHeat+melee.heat+style.heat+num('climate_heat',0);
  const moraleTraining=u.training==='highly_trained'?1:u.training==='untrained'?-1:0;
  const moraleDiscipline=u.discipline==='disciplined'?1:u.discipline==='low'?-1:0;
  const moraleRole=(mounted?1:0)+(val('class')==='missile'?-3:val('class')==='skirmish'?-1:0);
  u.morale=Math.max(0,Math.min(30,u.morale+moraleTraining+moraleDiscipline+moraleRole+style.morale));
  const weight=val('armour_weight')||'medium';
  if(!mounted){const terrain=TERRAIN[val('origin')]||TERRAIN['Western European'];[u.scrub,u.sand,u.forest,u.snow]=terrain[weight];}
  const pike=val('pri_category')==='pike'||tags(u.pri_attr).includes('long_pike');
  if(!mounted){if(pike){u.scrub-=1;u.forest-=2;}else if(checked('pri_twohand'))u.forest-=1;}
  const specialty=val('terrain_specialty');if(specialty)u[specialty]+=1;
  const armor=ARMOUR_PRESETS[val('armour_preset')];
  let mass=0.7+Math.min(5,Math.max(0,Math.floor(num('armor_mean_mass',armor?.mass||0))))*0.1;
  if(val('class')==='missile')mass-=0.1;else if(val('class')==='skirmish')mass-=0.05;
  if(checked('trait_guards'))mass+=0.05;
  const massShield=val('offhand')==='legacy'?val('shield_type'):({large:'kite',medium:'heater',small:'round',buckler:'buckler'}[val('offhand')]||'none');
  const shieldMass=offhandContribution(defenseSlot).applicable?(SHIELD_TYPES[massShield]?.mass||0):0;
  mass+=shieldMass;
  u.offhand.mass_adjustment=shieldMass;u.offhand.mass_legacy_equivalent=massShield;
  if(['fighting_spear','pike','glaive','bill','halberd','poleaxe'].includes(val('pri_category')))mass*=1.5;else if(checked('pri_twohand'))mass*=1.25;
  u.soldier_mass=Math.round(mass*10000)/10000;
  if(val('soldier_count')===''&&!mounted&&base!==CATEGORY_BASE['Royal Retinue'])u.soldier_count=pike?100:val('class')==='spear'?80:base.size_inf;
  u.stat_stl=Math.max(1,Math.floor(u.soldier_count/4));
  u.audit_auxiliary={source:'Combat Reforged Google Docs tab, 12 October 2026',melee_quality:meleeGrade,ranged_accuracy:range.accuracy+(val('class')==='skirmish'?-0.1:0),ranged_movement_speed:val('class')==='skirmish'?0.1:0,accuracy_target:'descr_projectile.txt, not EDU',stat_health_auto_resolve:'Bible proposal requires engine verification; existing health output retained'};
  if(val('pri_weapon_type')==='melee'){u.audit_auxiliary.ranged_accuracy=null;u.audit_auxiliary.ranged_movement_speed=null;}
  if(mounted){const ht=HORSE_TYPES[val('horse_type')],ho=HORSE_ORIGINS[val('horse_origin')],hb=HORSE_BARDING[val('horse_barding')];const ranks={'Very Good':2,Good:1,Average:0,Standard:0};u.mount_design={mount:u.mount,height:ht.height,radius:ht.radius,mass:ht.mass+(hb.mass||0)+style.mass,speed:ht.speed+(ho.speed||0)+(hb.speed||0)+style.speed,stamina_level:(ranks[ht.stamina]||0)+(ho.stamina||0)+(hb.stamina||0),barding_armor:hb.armour||0,implementation:'Mount geometry requires descr_mount; speed/stamina require a verified movement/animation route. Ridden horse defense is not supplied by stat_sec_armour.'};}
  if(mounted&&['destrier','stallion','courser','rouncy','hobby','pony'].includes(val('horse_type')))u.sec_armour=0;
  u.stat_mental_comment=`morale ${u.morale} (${val('quality')})`;
  u.battlefield_role=val('class');if(u.class==='spear')u.class='spearmen';
  result.log=result.log.filter(line=>!/(Melee quality|Defence skill|Attack bonus|delay:|Archetype morale|Shield def skill|Heat:|terrain)/i.test(line));
  result.log.push('--- Live-bible numerical audit ---',`Archetype Attack ${archAttack}; Armor equipment ${base.def_eq}; Defense Skill training ${base.def_tr}`,`Melee quality ${meleeGrade}: Attack ${melee.atk}, Defense Skill ${melee.def}, delay ${melee.delay}, heat ${melee.heat}`,`Defending slot ${defenseSlot}; weapon handling ${num(defenseSlot+'_handling',0)}; cavalry style Attack ${style.atk}, Defense Skill ${style.def}, heat ${style.heat}`,`Morale training ${moraleTraining}, discipline ${moraleDiscipline}, battlefield role ${moraleRole}, cavalry style ${style.morale}`,`EDU totals: Attack ${u.pri_attack}/${u.sec_attack}, Armor/skill/shield ${u.armour}/${u.def_skill}/${u.shield}, heat ${u.heat}, morale ${u.morale}, soldier mass ${u.soldier_mass}`);
  document.getElementById('pri_delay_hint').textContent=`Base ${num('pri_delay',0)} → EDU delay ${u.pri_delay}. Native EDU delay uses tenths of a second, not milliseconds.`;
  document.getElementById('sec_delay_hint').textContent=u.sec_attack===null?'No secondary weapon.':`Base ${num('sec_delay',0)} → EDU delay ${u.sec_delay}. Uses this slot’s effective melee quality.`;
  return result;
};
function bibleFormationValues(){
  if(val('category')==='cavalry')return val('pri_weapon_type')==='thrown'?[2,4.4,3,4.4]:val('pri_weapon_type')!=='melee'?[2,4.4,3,6]:val('class')==='heavy'&&document.querySelector('input[name="cav_style"]:checked')?.value!=='brawler'?[1.5,4.4,2.5,6]:[2,4.4,3,6];
  const pike=val('pri_category')==='pike'||tags(val('pri_attr')).includes('long_pike');
  let values;
  if(pike)values=[1.2,1.2,2.4,2.4];
  else if(val('pri_weapon_type')==='thrown')values=[1.4,1.2,2.8,1.4];
  else if(val('pri_weapon_type')!=='melee'&&(val('pri_sound')==='crossbow'||val('pri_missile')==='bolt'))values=[1.4,1.4,1.4,1.4];
  else if(val('pri_weapon_type')!=='melee')values=val('class')==='skirmish'?[1.4,1.4,2.8,2]:[1.2,1.2,2.4,2.4];
  else if(val('class')==='spear')values=val('quality')==='Inferior'?[1.2,1.2,2.4,2.4]:[1,1,2,2];
  else values=val('quality')==='Inferior'?[1.4,1.2,2.8,2.4]:[1.2,1,2.4,2];
  if(val('class')==='light')values=values.map((n,index)=>n+(index<2?0.2:0.4));
  if(checked('pri_twohand')&&!pike)values=values.map((n,index)=>n+([0,2].includes(index)?0.2:0));
  return values.map(n=>Math.round(n*100)/100);
}
const baseAuditRecalc=recalc;
recalc=function(){const pavise=[...document.getElementById('shield_type').options].find(option=>option.value==='pavise');if(pavise)pavise.disabled=val('category')==='cavalry';if(val('category')==='cavalry'&&val('shield_type')==='pavise'){document.getElementById('shield_type').value='none';document.getElementById('shield').value=0;document.getElementById('shield_hint').textContent='Pavise is unavailable when mounted; select another shield.';}if(checked('bible_formation_auto'))bibleFormationValues().forEach((n,index)=>{document.getElementById(['f_cs','f_cf','f_ls','f_lf'][index]).value=n;});for(const slot of ['pri','sec']){const p=(slot==='pri'?PRI_PRESETS:SEC_PRESETS)[val(slot+'_preset')],field=document.getElementById(slot+'_handling');if(p&&field.dataset.inheritedHandling!==undefined&&field.value===field.dataset.inheritedHandling){const recommended=val('category')==='cavalry'&&p.handling_mounted!==undefined?p.handling_mounted:p.handling;if(recommended!==undefined){field.value=recommended;field.dataset.inheritedHandling=recommended;}}}baseAuditRecalc();const u=window._lastUnit;document.getElementById('runtime_out').textContent=JSON.stringify({campaign_movement_horse_flag:u.campaign_movement_horse_flag,engineer_flag:u.engineer_flag,garrison_flag:u.garrison_flag,automation:u.automation,weapons:u.weapons,unit_custom_attributes:u.unit_custom_attributes,mount_design:u.mount_design||null,audit_auxiliary:u.audit_auxiliary},null,2);};
downloadRuntimeMetadata=function(){const u=compute().unit;downloadText(JSON.stringify({status:'design metadata; external implementation required',unit:u.type,campaign_movement_horse_flag:u.campaign_movement_horse_flag,automation:u.automation,weapons:u.weapons,unit_custom_attributes:u.unit_custom_attributes,mount_design:u.mount_design||null,audit_auxiliary:u.audit_auxiliary},null,2),'combat_reforged_runtime_design.json','application/json');};
const importBeforeAudit=importProjectData;
importProjectData=function(data){if(data?.fields&&!Object.hasOwn(data.fields,'bible_formation_auto'))data={...data,fields:{...data.fields,bible_formation_auto:false}};return importBeforeAudit(data);};
for(const slot of ['pri','sec'])for(const suffix of ['base_charge','delay','heat'])document.getElementById(slot+'_'+suffix).addEventListener('input',event=>{delete event.target.dataset.inheritedValue;},true);
const recalcBeforePresetContexts=recalc;
recalc=function(){for(const slot of ['pri','sec']){const p=(slot==='pri'?PRI_PRESETS:SEC_PRESETS)[val(slot+'_preset')];if(!p)continue;for(const [suffix,key]of [['base_charge','charge'],['delay','delay'],['heat','heat']]){const field=document.getElementById(slot+'_'+suffix);if(field.dataset.inheritedValue!==undefined&&field.value===field.dataset.inheritedValue){const recommended=val('category')==='cavalry'?(p[key+'_mounted']??p[key]):p[key];if(recommended!==undefined){field.value=recommended;field.dataset.inheritedValue=recommended;}}}}recalcBeforePresetContexts();};
const newMountedPresets=Object.fromEntries(Object.entries(PRI_PRESETS).filter(([id])=>['mounted_short_bow','mounted_recurve_bow','mounted_heavy_recurve_bow','mounted_crossbow','mounted_javelin'].includes(id)).map(([id,p])=>[id,JSON.parse(JSON.stringify(p))]));
const loadBeforeAudit=editorLoadPersisted;
editorLoadPersisted=function(){loadBeforeAudit();for(const store of [PRI_PRESETS,SEC_PRESETS]){
  const sword=store.arming_sword;if(sword){if(Number(sword.charge)===4&&Number(sword.delay)===45&&Number(sword.heat||0)===0){sword.charge=3;sword.delay=40;}sword.charge_mounted??=4;sword.delay_mounted??=45;sword.heat_mounted??=0;}
  const falchion=store.falchion;if(falchion){if(Number(falchion.charge)===4&&Number(falchion.delay)===50&&Number(falchion.heat||0)===0){falchion.delay=45;falchion.heat=1;}falchion.charge_mounted??=4;falchion.delay_mounted??=50;falchion.heat_mounted??=0;}
}for(const [id,p]of Object.entries(newMountedPresets))if(!PRI_PRESETS[id])PRI_PRESETS[id]=p;const bow=PRI_PRESETS.composite_bow;if(bow&&bow.atk===5&&bow.range===190){bow.label='Heavy Composite Bow';bow.roles=bow.roles.filter(role=>role!=='cav');}};
