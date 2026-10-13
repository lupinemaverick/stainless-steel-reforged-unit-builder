/* Equipment quality is independent of soldier quality and archetype training. */
const EQUIPMENT_GRADES={
  artisan:{label:'Artisan Grade',stat:2,recruit:0.15,upkeep:0.10},
  high:{label:'High Grade',stat:1,recruit:0.075,upkeep:0.05},
  common:{label:'Common Grade',stat:0,recruit:0,upkeep:0},
  munition:{label:'Munition Grade',stat:-1,recruit:-0.20,upkeep:-0.15},
  poor:{label:'Poor Grade',stat:-1,recruit:0,upkeep:0.10}
};
for(const base of Object.values(CATEGORY_BASE)){base.atk_eq=0;base.def_eq=0;}
document.getElementById('quality').closest('label').insertAdjacentHTML('afterend',`<label><strong>Equipment Grade</strong><select id="equipment_grade" onchange="recalc()">${Object.entries(EQUIPMENT_GRADES).map(([id,g])=>`<option value="${id}"${id==='common'?' selected':''}>${g.label}</option>`).join('')}</select><span class="hint" id="equipment_grade_hint"></span></label>`);
// Pair equipment controls on the left with EDU classification on the right.
const cavalryStyleRow=document.getElementById('cav_style_row');
cavalryStyleRow.classList.remove('full');
document.getElementById('class').closest('label').before(cavalryStyleRow);
document.getElementById('class').closest('label').style.gridColumn='-2 / -1';
function enforceEquipmentGrade(){
  const field=document.getElementById('equipment_grade'),royal=val('unit_category')==='Royal Retinue';
  if(royal)field.value='artisan';
  if(!EQUIPMENT_GRADES[field.value])field.value='common';
  field.disabled=royal;
  const g=EQUIPMENT_GRADES[field.value],signed=n=>(n>0?'+':'')+n;
  document.getElementById('equipment_grade_hint').textContent=(royal?'Royal Retinue requires Artisan Grade. ':'')+`${signed(g.stat)} weapon Attack / worn Armor / held Shield; ${signed(g.recruit*100)}% recruit, ${signed(g.upkeep*100)}% upkeep. Training and horse barding are separate.`;
  return g;
}
const computeBeforeEquipmentGrade=compute;
compute=function(){
  const g=enforceEquipmentGrade(),result=computeBeforeEquipmentGrade(),u=result.unit;
  const before={attack:u.pri_attack,secondary_attack:u.sec_attack,armor:u.armour,shield:u.shield,recruit:u.cost_construct,upkeep:u.cost_upkeep};
  u.pri_attack+=g.stat;
  if(u.sec_attack!==null)u.sec_attack+=g.stat;
  // Grade actual worn armor, never flesh or the horse's separately chosen barding.
  if(num('armour',0)>0)u.armour=Math.max(0,u.armour-(u.armor_breakdown?.horse_barding||0)+g.stat)+(u.armor_breakdown?.horse_barding||0);
  const gradeShield=(slot,value)=>offhandContribution(slot).applicable&&value>0?Math.max(0,value+g.stat):value;
  u.shield=gradeShield(u.defending_weapon_slot,u.shield);
  u.secondary_defense.shield=gradeShield('sec',u.secondary_defense.shield);
  u.cost_construct=Math.round(u.cost_construct*(1+g.recruit));
  u.cost_upkeep=Math.round(u.cost_upkeep*(1+g.upkeep));
  u.equipment_grade={id:val('equipment_grade'),...g,locked:val('unit_category')==='Royal Retinue',before};
  u.armor_breakdown.equipment_grade=num('armour',0)>0?g.stat:0;
  result.log=result.log.filter(line=>!line.startsWith('EDU totals:'));
  result.log.push(`Equipment: ${g.label}; Attack ${before.attack} → ${u.pri_attack}, Armor ${before.armor} → ${u.armour}, Shield ${before.shield} → ${u.shield}; recruit ${before.recruit} → ${u.cost_construct}, upkeep ${before.upkeep} → ${u.cost_upkeep}. Archetype equipment bonuses removed.`, `EDU totals: Attack ${u.pri_attack}/${u.sec_attack}, Armor/Skill/Shield ${u.armour}/${u.def_skill}/${u.shield}`);
  return result;
};
const importBeforeEquipmentGrade=importProjectData;
importProjectData=function(input){
  const data=JSON.parse(JSON.stringify(input));
  if(data.fields&&!Object.hasOwn(data.fields,'equipment_grade'))data.fields.equipment_grade='common';
  if(data.fields&&Object.hasOwn(data.fields,'equipment_grade')&&!EQUIPMENT_GRADES[data.fields.equipment_grade])throw Error('Unknown Equipment Grade.');
  return importBeforeEquipmentGrade(data);
};
const resetBeforeEquipmentGrade=resetToJerusalem;
resetToJerusalem=function(){document.getElementById('equipment_grade').value='common';resetBeforeEquipmentGrade();};
