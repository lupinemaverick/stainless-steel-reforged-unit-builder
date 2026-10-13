/* Phase A: metadata only; migrate recognizable untouched defaults, never custom packets. */
const WEAPON_PHASE_A_REVISION='2026-10-13-a1';
const PHASE_A_ATTRS={bill:['stagger, pikebreaker_1','stagger, hook_drag'],greatsword:['duelist_2, pikebreaker_1','duelist_2']};
const PHASE_A_OLD_CATEGORIES=JSON.parse(JSON.stringify(WEAPON_CATEGORIES));
const PHASE_A_OLD_PRESETS={pri:JSON.parse(JSON.stringify(PRI_PRESETS)),sec:JSON.parse(JSON.stringify(SEC_PRESETS))};
function samePhaseADefault(a,b){
  if(a===b)return true;
  if(!a||!b||typeof a!=='object'||typeof b!=='object')return false;
  const keys=Object.keys(a),other=Object.keys(b);
  return keys.length===other.length&&keys.every(k=>Object.hasOwn(b,k)&&samePhaseADefault(a[k],b[k]));
}
function phaseAPresetUntouched(slot,id,p){
  return [PHASE_A_OLD_PRESETS[slot][id],LEGACY_WEAPON_DEFAULTS[slot][id]].some(old=>samePhaseADefault(p,old));
}
for(const [id,[old,fresh]]of Object.entries(PHASE_A_ATTRS)){
  WEAPON_CATEGORIES[id].attr=fresh;
  for(const store of [PRI_PRESETS,SEC_PRESETS])for(const [key,p]of Object.entries(store))if(presetWeaponCategory(key,p)===id&&p.attr===old)p.attr=fresh;
}
function migratePhaseAStores(data){
  if(!data||data._weapon_phase_a_revision===WEAPON_PHASE_A_REVISION)return data;
  for(const slot of ['pri','sec'])for(const [id,p]of Object.entries(data[slot]||{})){
    const category=presetWeaponCategory(id,p),change=PHASE_A_ATTRS[category];
    if(change&&p.attr===change[0]&&phaseAPresetUntouched(slot,id,p))p.attr=change[1];
  }
  for(const [id,p]of Object.entries(data.weapon_categories||{})){
    const change=PHASE_A_ATTRS[id];
    if(change&&[PHASE_A_OLD_CATEGORIES[id],LEGACY_CATEGORY_DEFAULTS[id]].some(old=>samePhaseADefault(p,old)))p.attr=change[1];
  }
  data._weapon_phase_a_revision=WEAPON_PHASE_A_REVISION;return data;
}
const collectBeforePhaseA=editorCollectAll;
editorCollectAll=function(){return {...collectBeforePhaseA(),_weapon_phase_a_revision:WEAPON_PHASE_A_REVISION};};
const fieldsBeforePhaseA=projectFields;
projectFields=function(){return {...fieldsBeforePhaseA(),weapon_phase_a_revision:WEAPON_PHASE_A_REVISION};};
const loadBeforePhaseA=editorLoadPersisted;
editorLoadPersisted=function(){
  try{const raw=localStorage.getItem(LS_KEY);if(raw)localStorage.setItem(LS_KEY,JSON.stringify(migratePhaseAStores(JSON.parse(raw))));}catch(e){console.warn('Phase A preset migration unavailable:',e);}
  loadBeforePhaseA();
};
function phaseAFieldsUntouched(f,slot,p){
  if(!p||valuelessPhaseAOverride(f[slot+'_effects_json']))return false;
  const fields={base_atk:'atk',base_charge:'charge',weapon_type:'wtype',tech:'tech',damage:'dmg',sound:'sound',weapon:'name',delay:'delay',handling:'handling',heat:'heat'};
  for(const [suffix,key]of Object.entries(fields)){
    if(!Object.hasOwn(f,slot+'_'+suffix))continue;
    const value=f[slot+'_'+suffix],choices=[p[key],p[key+'_mounted']].filter(v=>v!==undefined);
    if(choices.length&&!choices.some(v=>String(v)===String(value)))return false;
  }
  const category=PHASE_A_OLD_CATEGORIES[presetWeaponCategory(f[slot+'_preset'],p)];
  if(Object.hasOwn(f,slot+'_twohand')&&Boolean(f[slot+'_twohand'])!==Boolean(p.twohand??category?.twohand))return false;
  return true;
}
function valuelessPhaseAOverride(value){return typeof value==='string'&&value.trim()!==''&&value.trim()!=='[]';}
const importBeforePhaseA=importProjectData;
importProjectData=function(input){
  const data=JSON.parse(JSON.stringify(input)),f=data.fields;
  // Reject unknown identities before any restore wrapper can recalculate invalid state.
  if(f&&Object.hasOwn(f,'unit_category')&&!CATEGORY_BASE[f.unit_category])throw Error('Project has an unknown archetype.');
  if(f&&f.weapon_phase_a_revision!==WEAPON_PHASE_A_REVISION){
    for(const slot of ['pri','sec']){
      const id=f[slot+'_preset'],old=PHASE_A_OLD_PRESETS[slot][id],stored=data.presets?.[slot]?.[id],category=f[slot+'_category']||presetWeaponCategory(id,old),change=PHASE_A_ATTRS[category];
      const categoryStore=data.weapon_categories?.[category]||data.presets?.weapon_categories?.[category];
      const categoryClean=!categoryStore||[PHASE_A_OLD_CATEGORIES[category],LEGACY_CATEGORY_DEFAULTS[category]].some(p=>samePhaseADefault(categoryStore,p));
      // A custom slot or customized preset/category stays explicitly configured.
      if(change&&f[slot+'_attr']===change[0]&&old&&(!stored||phaseAPresetUntouched(slot,id,stored))&&categoryClean&&[old,LEGACY_WEAPON_DEFAULTS[slot][id]].some(p=>phaseAFieldsUntouched(f,slot,p)))f[slot+'_attr']=change[1];
    }
    f.weapon_phase_a_revision=WEAPON_PHASE_A_REVISION;
  }
  if(data.presets)migratePhaseAStores(data.presets);
  if(data.weapon_categories)migratePhaseAStores({weapon_categories:data.weapon_categories,_weapon_phase_a_revision:input.fields?.weapon_phase_a_revision===WEAPON_PHASE_A_REVISION?WEAPON_PHASE_A_REVISION:undefined});
  return importBeforePhaseA(data);
};
