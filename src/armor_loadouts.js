/* Presets choose representative ensembles; base and additional layers remain editable. */
function clearLanceSpearDefaults(){
  for(const store of [PRI_PRESETS,SEC_PRESETS])for(const [id,p]of Object.entries(store))if(presetWeaponCategory(id,p)==='lance')p.attr=tags(p.attr).filter(t=>t!=='spear').join(', ');
}
clearLanceSpearDefaults();
const loadBeforeArmorLoadouts=editorLoadPersisted;
editorLoadPersisted=function(){loadBeforeArmorLoadouts();clearLanceSpearDefaults();};
const SUPPORT_ARMOR_LAYERS={
  arming_doublet:{label:'Arming doublet (fitted padding)',arm:1,heat:1,agi:0},
  mail_voiders:{label:'Mail voiders / gap protection',arm:1,heat:1,agi:0}
};
Object.assign(ARMOUR_LAYERS,SUPPORT_ARMOR_LAYERS);
const ARMOR_LOADOUTS={
  unarmored:['unarmored','none'],leather_jerkin:['leather_jerkin','coat_cloth'],
  gambeson:['gambeson','coat_cloth'],leine_croine:['leine_croine','none'],
  scale_light:['scale_light','arming_doublet'],lamellar_light:['lamellar_light','arming_doublet'],
  mail_light:['mail_light','gambeson'],brigandine_late:['brigandine_late','arming_doublet'],
  breast_plate:['breast_plate','arming_doublet'],
  scale_med:['scale_med','gambeson'],lamellar_med:['lamellar_med','gambeson'],mail_med:['mail_med','gambeson'],
  coat_of_plates:['coat_of_plates','gambeson','mail_haubergon'],brigandine:['brigandine','arming_doublet','mail_voiders'],
  heavy_scale:['heavy_scale','gambeson'],heavy_lamellar:['heavy_lamellar','gambeson'],double_mail:['double_mail','gambeson'],
  ren_half_plate:['ren_half_plate','arming_doublet','mail_voiders'],ren_3q_plate:['ren_3q_plate','arming_doublet','mail_voiders'],
  kataphract:['heavy_lamellar','gambeson','mail_haubergon'],
  transitional:['transitional','gambeson','mail_haubergon'],plate_lamellar:['plate_lamellar','arming_doublet','mail_haubergon'],
  full_plate:['full_plate','arming_doublet','mail_voiders'],gothic_plate:['gothic_plate','arming_doublet','mail_voiders'],
  italian_plate:['italian_plate','arming_doublet','mail_voiders'],late_full_plate:['late_full_plate','arming_doublet','mail_voiders']
};
const armorPresetLabel=document.getElementById('armour_preset').closest('label');
armorPresetLabel.querySelector('strong').textContent='Armor preset';
armorPresetLabel.insertAdjacentHTML('afterend','<label><strong>Base armor</strong><select id="armour_base" onchange="applyArmourLayers()"></select><span class="hint">Main protective component; additional layers add once.</span></label>');
document.getElementById('layer1_wrap').querySelector('strong').textContent='Layer 1';
for(let i=1;i<=3;i++)document.getElementById('armour_layer'+i).innerHTML=Object.entries(ARMOUR_LAYERS).map(([id,p])=>`<option value="${id}">${p.label}</option>`).join('');
function populateArmorBase(){
  for(const [id,p]of Object.entries(SUPPORT_ARMOR_LAYERS))if(!ARMOUR_LAYERS[id])ARMOUR_LAYERS[id]={...p};
  for(let i=1;i<=3;i++)for(const [id,p]of Object.entries(ARMOUR_LAYERS)){
    const e=document.getElementById('armour_layer'+i);if(![...e.options].some(o=>o.value===id))e.add(new Option(p.label,id));
  }
  const e=document.getElementById('armour_base'),before=e.value;
  e.innerHTML=Object.entries(ARMOUR_PRESETS).map(([id,p])=>`<option value="${id}">${p.label}</option>`).join('');
  e.value=ARMOUR_PRESETS[before]?before:val('armour_preset');
}
function armorLayerLimit(){return {light:1,medium:2,heavy:3}[val('armour_weight')]||1;}
updateLayerVisibility=function(){
  const max=armorLayerLimit();
  for(let i=1;i<=3;i++){
    const e=document.getElementById('armour_layer'+i),wrap=document.getElementById('layer'+i+'_wrap');
    wrap.style.display=i<=max?'':'none';e.disabled=i>max;if(i>max)e.value='none';
  }
  document.getElementById('armour_layers_hint').textContent=`${val('armour_weight')} armor allows ${max} additional layer${max===1?'':'s'}. Layer slots are additional components, not a required order of dressing. Preset arrangements are representative and editable.`;
};
applyArmourPreset=function(){
  const id=val('armour_preset'),p=ARMOUR_PRESETS[id];if(!p)return;
  populateArmorBase();
  const arrangement=ARMOR_LOADOUTS[id]||[id,'none'];
  document.getElementById('armour_base').value=arrangement[0];
  for(let i=1;i<=3;i++)document.getElementById('armour_layer'+i).value=arrangement[i]||'none';
  applyArmourLayers();
};
applyArmourLayers=function(){
  updateLayerVisibility();
  const p=ARMOUR_PRESETS[val('armour_base')];if(!p)return;
  let arm=p.arm||0,heat=p.heat||0,agi=Math.max(0,p.agi||0),sound=normalizeArmourSound(p.sound);
  const parts=[p.label+' ('+arm+')'];
  for(let i=1;i<=armorLayerLimit();i++){
    const key=val('armour_layer'+i),layer=ARMOUR_LAYERS[key];if(!layer||key==='none')continue;
    arm+=layer.arm||0;heat+=layer.heat||0;agi+=Math.max(0,layer.agi||0);parts.push(layer.label+' (+'+(layer.arm||0)+')');
    if(['mail_haubergon','mail_voiders','coat_of_plates','reinforcing'].includes(key))sound='metal';
    else if(sound==='flesh'&&['gambeson','arming_doublet','leather'].includes(key))sound='leather';
  }
  for(const [id,v]of Object.entries({armour:arm,arm_heat:heat,arm_agi:agi,armour_sound:sound}))document.getElementById(id).value=v;
  document.getElementById('armour_preset_hint').textContent=parts.join(' + ')+` → Armor ${arm}, heat ${heat}, agility +${agi}.`;
  recalc();
};
const restoreBeforeArmorLoadouts=restoreFields;
restoreFields=function(fields){
  // Rebuild choices for imported weight/preset before restoring saved custom numbers.
  if(!Object.keys(fields).some(k=>k.startsWith('armour_')))return restoreBeforeArmorLoadouts(fields);
  if(fields.armour_weight)document.getElementById('armour_weight').value=fields.armour_weight;
  populateArmourPresets();populateArmorBase();
  const restored={...fields};
  if(!Object.hasOwn(restored,'armour_base')&&restored.armour_preset)restored.armour_base=restored.armour_preset;
  restoreBeforeArmorLoadouts(restored);updateLayerVisibility();
};
const computeBeforeArmorLoadouts=compute;
compute=function(){
  const result=computeBeforeArmorLoadouts();
  result.unit.armor_loadout={preset:val('armour_preset'),base:val('armour_base'),weight:val('armour_weight'),layers:Array.from({length:armorLayerLimit()},(_,i)=>val('armour_layer'+(i+1))),revision:'2026-10-12-r1'};
  return result;
};
