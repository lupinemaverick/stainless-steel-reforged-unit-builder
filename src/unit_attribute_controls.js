/* Unit-wide attributes; weapon attributes and Command subtype remain separate. */
const UNIT_ATTRIBUTE_GROUPS={
  'Management & Unit Size':['troublemaker','police','client_kingdom_only_units','infinite_ammo','no_scale','single_entity','no_custom','is_peasant'],
  'Deployment & Concealment':['hide_forest','hide_improved_forest','hide_anywhere','stakes'],
  'Command & Morale Factors':['frighten_foot','frighten_mounted','can_run_amok','general_unit','expendable','elitist','steadfast','intimidate','immune_to_psychology'],
  'Movement & Logistics':['sea_faring','can_withdraw','cannot_skirmish','free_upkeep_unit','hardy','very_hardy','relentless','disciplined_missile','inexhaustible'],
  'Combat Mechanics':['can_sap','druid','gunpowder_unit','brace_for_charge','aggressive_push','power_charge','disciplined_charge'],
  'Terrain (stat_ground)':['desert_raider','forest_ambusher']
};
const UNIT_TERRAIN_TAGS={desert_raider:'sand',forest_ambusher:'forest'};
let hideForestOverride=null;
const unitAttributeBlock=document.createElement('div');unitAttributeBlock.id='unit_attribute_controls';unitAttributeBlock.className='full';
unitAttributeBlock.innerHTML='<strong>Overall unit attributes</strong><p class="hint">Unit-wide effects, separate from active-weapon attributes. Command remains in Unit Subtypes. Descriptions use your supplied reference; engine attributes are exported without duplicating their conditional effects in ordinary stats. Terrain choices add +2 to the corresponding stat_ground field.</p>'+Object.entries(UNIT_ATTRIBUTE_GROUPS).map(([group,keys])=>`<fieldset style="border:1px solid var(--border);border-radius:4px;margin:10px 0;padding:10px;min-width:0"><legend>${group}</legend><div class="checks">${keys.map(tag=>`<label title="${UNIT_ATTRIBUTE_DEFINITIONS[tag]||TERRAIN_DEFINITIONS[tag]}"><input type="checkbox" id="unit_tag_${tag}" onchange="setUnitAttribute('${tag}',this.checked)" /> ${tag}</label>`).join('')}</div>${keys.map(tag=>`<div id="unit_definition_${tag}" class="hint" hidden><strong>${tag}</strong> · ${UNIT_ATTRIBUTE_DEFINITIONS[tag]||TERRAIN_DEFINITIONS[tag]}</div>`).join('')}</fieldset>`).join('');
document.getElementById('extra_attrs').closest('label').before(unitAttributeBlock);
function setUnitAttribute(tag,enabled){
  document.getElementById('unit_tag_'+tag).checked=enabled;
  if(tag==='hide_forest')hideForestOverride=enabled;
  if(tag==='can_sap')document.getElementById('can_sap').checked=enabled;
  if(UNIT_TERRAIN_TAGS[tag]&&!enabled)document.getElementById('extra_attrs').value=tags(val('extra_attrs')).filter(t=>t!==tag).join(', ');
  if(!UNIT_TERRAIN_TAGS[tag]){
    const current=tags(val('extra_attrs')).filter(t=>t!==tag);
    if(enabled&&tag!=='can_sap')current.push(tag);
    document.getElementById('extra_attrs').value=[...new Set(current)].join(', ');
  }
  recalc();
}
const computeBeforeUnitAttributes=compute;
compute=function(){
  const result=computeBeforeUnitAttributes(),u=result.unit,selected=new Set(tags(u.attributes));
  if(hideForestOverride===true||(hideForestOverride===null&&u.category==='infantry'))selected.add('hide_forest');
  for(const [tag,field]of Object.entries(UNIT_TERRAIN_TAGS)){
    if(checked('unit_tag_'+tag)||selected.has(tag))u[field]+=2;
    selected.delete(tag);
  }
  u.attributes=[...selected].join(', ');
  u.unit_attribute_choices={hide_forest_override:hideForestOverride,terrain:Object.keys(UNIT_TERRAIN_TAGS).filter(tag=>checked('unit_tag_'+tag)||tags(val('extra_attrs')).includes(tag))};
  return result;
};
function renderUnitAttributeControls(){
  const selected=new Set(tags(window._lastUnit.attributes)),extra=new Set(tags(val('extra_attrs')));
  for(const keys of Object.values(UNIT_ATTRIBUTE_GROUPS))for(const tag of keys){
    const e=document.getElementById('unit_tag_'+tag),terrain=UNIT_TERRAIN_TAGS[tag];
    if(!terrain)e.checked=selected.has(tag);
    else if(extra.has(tag))e.checked=true;
    const inherited=!terrain&&tag!=='hide_forest'&&tag!=='can_sap'&&selected.has(tag)&&!extra.has(tag);
    e.disabled=inherited;e.closest('label').title=(inherited?'Provided by the current archetype. ':'')+(UNIT_ATTRIBUTE_DEFINITIONS[tag]||TERRAIN_DEFINITIONS[tag]);
    document.getElementById('unit_definition_'+tag).hidden=!e.checked;
  }
}
const recalcBeforeUnitAttributes=recalc;
recalc=function(){recalcBeforeUnitAttributes();renderUnitAttributeControls();};
const fieldsBeforeUnitAttributes=projectFields;
projectFields=function(){return {...fieldsBeforeUnitAttributes(),hide_forest_override:hideForestOverride};};
const restoreBeforeUnitAttributes=restoreFields;
restoreFields=function(fields){
  if(Object.hasOwn(fields,'hide_forest_override'))hideForestOverride=typeof fields.hide_forest_override==='boolean'?fields.hide_forest_override:null;
  // An older complete project has no terrain checkboxes; don't inherit the current unit's choices.
  if(Object.hasOwn(fields,'extra_attrs')){
    if(!Object.hasOwn(fields,'hide_forest_override'))hideForestOverride=null;
    for(const tag of Object.keys(UNIT_TERRAIN_TAGS))if(!Object.hasOwn(fields,'unit_tag_'+tag))document.getElementById('unit_tag_'+tag).checked=false;
  }
  restoreBeforeUnitAttributes(fields);
};
const resetBeforeUnitAttributes=resetToJerusalem;
resetToJerusalem=function(){hideForestOverride=null;for(const tag of Object.keys(UNIT_TERRAIN_TAGS))document.getElementById('unit_tag_'+tag).checked=false;resetBeforeUnitAttributes();};
