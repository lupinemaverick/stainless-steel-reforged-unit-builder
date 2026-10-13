/* Category-first weapon selection; retains the existing role eligibility rules. */
const WEAPON_FILTER_GROUPS={...Object.fromEntries(Object.entries(WEAPON_CATEGORIES).map(([k,p])=>[k,p.label])),bow:'Bow',crossbow:'Crossbow',firearm:'Firearm',thrown:'Thrown weapon','':'Unclassified / custom'};
function normalizeKnifePresets(){
  if(SEC_PRESETS.short_sword)Object.assign(SEC_PRESETS.short_sword,{label:'Knife / dagger',weapon_category:'knife',roles:['any']});
  if(PRI_PRESETS.war_knife)PRI_PRESETS.war_knife.label='Knife / dagger';
}
normalizeKnifePresets();
const setSecondaryBeforeKnifeCategories=EDITOR_CATS.sec.setStore;
EDITOR_CATS.sec.setStore=function(store){setSecondaryBeforeKnifeCategories(store);normalizeKnifePresets();};
const loadBeforeKnifeCategories=editorLoadPersisted;
editorLoadPersisted=function(){loadBeforeKnifeCategories();normalizeKnifePresets();};
function presetWeaponCategory(id,p){
  if(!p||p.atk===null)return id==='none'?'none':'';
  if(p.weapon_category&&Object.hasOwn(WEAPON_FILTER_GROUPS,p.weapon_category))return p.weapon_category;
  if(categoryMap[id])return categoryMap[id];
  if(id==='horseman_sword')return 'sword_cut';
  if(p.wtype==='thrown')return 'thrown';
  if(p.wtype==='missile')return p.sound==='bow'?'bow':p.sound==='crossbow'?'crossbow':'firearm';
  return '';
}
function presetRoleAllowed(slot,p,role=currentRole()){
  const roles=p.roles||[];
  return roles.includes(role)||roles.includes('any')||
    (slot==='pri'&&role==='skirmish'&&(roles.includes('missile')||roles.includes('skirmish')))||
    (slot==='sec'&&(role==='missile'||role==='skirmish')&&roles.includes('inf'));
}
for(const slot of ['pri','sec']){
  const preset=document.getElementById(slot+'_preset'),label=preset.closest('label'),category=document.getElementById(slot+'_category'),categoryLabel=category.closest('label');
  label.classList.remove('full');categoryLabel.innerHTML='<strong>Weapon Category</strong>';categoryLabel.append(category);
  category.innerHTML=(slot==='sec'?'<option value="none">None</option>':'')+Object.entries(WEAPON_FILTER_GROUPS).map(([key,name])=>`<option value="${key}">${name}</option>`).join('');
  category.onchange=()=>changeWeaponCategory(slot);
  label.before(categoryLabel);
  label.querySelector('strong').textContent='Weapon Preset';
  const hint=document.createElement('span');hint.className='hint';hint.id=slot+'_preset_filter_hint';label.append(hint);
  for(const field of [{key:'weapon_category',label:'Weapon Category ID (optional; overrides inferred category)',type:'text'}])EDITOR_CATS[slot].fields.push(field);
}
function rebuildPresetOptions(slot,desired,role=currentRole()){
  const select=document.getElementById(slot+'_preset'),store=slot==='pri'?PRI_PRESETS:SEC_PRESETS,group=val(slot+'_category');
  select.innerHTML='';
  if(slot==='sec'&&group==='none'){
    select.add(new Option('— no secondary weapon —','none'));select.value='none';
    document.getElementById(slot+'_preset_filter_hint').textContent='No secondary weapon equipped.';
    return 'none';
  }
  select.add(new Option('— custom —',''));
  const matches=Object.entries(store).filter(([id,p])=>id!=='none'&&presetRoleAllowed(slot,p,role)&&presetWeaponCategory(id,p)===group);
  for(const [id,p]of matches)select.add(new Option(p.label,id));
  if([...select.options].some(o=>o.value===desired))select.value=desired;
  else select.value=matches.length?matches[0][0]:'';
  document.getElementById(slot+'_preset_filter_hint').textContent=matches.length?`${matches.length} matching preset${matches.length===1?'':'s'} for this category and unit role.`:'No matching presets for this category and unit role; configure a custom weapon or add a preset in the Item Editor.';
  return select.value;
}
function changeWeaponCategory(slot){
  const before=val(slot+'_preset'),store=slot==='pri'?PRI_PRESETS:SEC_PRESETS;
  const compatible=before&&before!=='none'&&presetWeaponCategory(before,store[before])===val(slot+'_category');
  const selected=rebuildPresetOptions(slot,compatible?before:'__choose_matching__');
  if(selected&&selected!=='none')(slot==='pri'?applyPriPreset:applySecPreset)();
  else if(selected==='none')applySecPreset();
  else if(WEAPON_CATEGORIES[val(slot+'_category')])applyWeaponCategory(slot);
  recalc();
}
populateWeaponSelects=function(){
  for(const slot of ['pri','sec']){
    const before=val(slot+'_preset'),store=slot==='pri'?PRI_PRESETS:SEC_PRESETS;
    if(!before&&!val(slot+'_category')){
      const initial=slot==='sec'?'arming_sword':currentRole()==='cav'?'couched_lance':Object.keys(store).find(id=>presetRoleAllowed(slot,store[id]));
      if(initial)document.getElementById(slot+'_category').value=presetWeaponCategory(initial,store[initial]);
    }
    const after=rebuildPresetOptions(slot,before);
    if(after!==before&&after)(slot==='pri'?applyPriPreset:applySecPreset)();
  }
};
const syncBeforeCategoryFilter=syncPresetCategory;
syncPresetCategory=function(slot){
  const previousCategory=val(slot+'_category');
  syncBeforeCategoryFilter(slot);
  const id=val(slot+'_preset'),store=slot==='pri'?PRI_PRESETS:SEC_PRESETS;
  if(slot==='sec'&&id==='none')document.getElementById(slot+'_category').value='none';
  else if(id&&id!=='none')document.getElementById(slot+'_category').value=presetWeaponCategory(id,store[id]);
  else document.getElementById(slot+'_category').value=previousCategory;
  rebuildPresetOptions(slot,id);recalc();
};
const resetBeforeCategoryFilter=resetToJerusalem;
resetToJerusalem=function(){
  document.getElementById('pri_category').value='lance';
  document.getElementById('sec_category').value='sword_cut';
  resetBeforeCategoryFilter();
  document.getElementById('pri_category').value='lance';rebuildPresetOptions('pri','couched_lance');applyPriPreset();
  document.getElementById('sec_category').value='sword_cut';rebuildPresetOptions('sec','arming_sword');applySecPreset();
};
const restoreBeforeCategoryFilter=restoreFields;
restoreFields=function(fields){
  // Populate before assigning select values, preserving imported numeric overrides.
  const role=fields.category==='cavalry'?'cav':fields.class==='missile'?'missile':fields.class==='skirmish'?'skirmish':'inf';
  for(const slot of ['pri','sec']){
    const id=fields[slot+'_preset'],store=slot==='pri'?PRI_PRESETS:SEC_PRESETS;
    let category=fields[slot+'_category']??val(slot+'_category');
    if(slot==='sec'&&id==='none')category='none';
    if(id&&id!=='none'&&store[id])category=presetWeaponCategory(id,store[id]);
    document.getElementById(slot+'_category').value=category;
    rebuildPresetOptions(slot,id,role);
  }
  restoreBeforeCategoryFilter({...fields,...(fields.sec_preset==='none'?{sec_category:'none'}:{})});
  for(const slot of ['pri','sec']){
    const id=val(slot+'_preset'),store=slot==='pri'?PRI_PRESETS:SEC_PRESETS;
    if(id&&id!=='none'&&store[id])document.getElementById(slot+'_category').value=presetWeaponCategory(id,store[id]);
    rebuildPresetOptions(slot,id);
  }
};
