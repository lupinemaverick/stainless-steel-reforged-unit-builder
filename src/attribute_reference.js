/* Explanatory data from the user's SS6.4 attribute handoff, 12 October 2026. */
const UNIT_ATTRIBUTE_DEFINITIONS = {
  troublemaker:'Decreases public order/income when garrisoned: −5% per 80 soldiers; income debuff = soldier count × 2.',
  police:'Increases public order when garrisoned: +5% per 80 soldiers.',
  client_kingdom_only_units:'Recruitable only when under protectorate state.',
  infinite_ammo:'Infinite ammunition.',
  no_scale:'Unit size is fixed by the EDU soldier count and does not change with unit scale.',
  single_entity:'Creates a single-model unit that does not scale with unit size/general size.',
  no_custom:'The unit cannot be selected in custom battles.',
  is_peasant:'Reduces auto-resolve values so peasants do not consistently win.',
  hide_forest:'Can hide in dense forests/tree stands; usual for foot infantry.',
  hide_improved_forest:'Enhanced forest hiding; harder for enemy scouts to detect.',
  hide_anywhere:'Can hide on open terrain, including bare fields and scrubland.',
  stakes:'Can plant wooden anti-cavalry stakes during deployment.',
  command:'Acts as an auxiliary commander, giving nearby friendly troops a morale boost within 75 m.',
  frighten_foot:'Causes a morale penalty to enemy foot infantry within 100 m.',
  frighten_mounted:'Causes a morale penalty to enemy cavalry/camels within 100 m.',
  can_run_amok:'Can go out of control, become berserk and ignore orders under extreme stress or casualties.',
  general_unit:'Designates a faction leader or general’s bodyguard.',
  expendable:'Does not inflict the friendlies-routing morale penalty on non-expendable units.',
  elitist:'Ignores the friendlies-routing morale penalty from non-elitist units.',
  steadfast:'Reduced friendlies-routing morale penalty.',
  intimidate:'Lower-scale fear effect.',
  immune_to_psychology:'Ignores fear effects.',
  sea_faring:'Can board ships and transport navies on the campaign map.',
  can_withdraw:'Can skirmish or retreat off the battlefield edge when ordered or pressured.',
  cannot_skirmish:'Forces missile units to stay and fight in melee rather than automatically retreating to skirmish.',
  free_upkeep_unit:'Can receive free upkeep as a settlement garrison where recruitment structures match.',
  hardy:'Reduces fatigue accumulation (−2) and improves recovery during sustained fighting or running.',
  very_hardy:'Further reduces fatigue accumulation (−4).',
  relentless:'Reduces fatigue accumulation rate (−2).',
  disciplined_missile:'Reduces fatigue accumulation when shooting (−1).',
  inexhaustible:'Never gets tired.',
  can_sap:'Can dig siege tunnels beneath stone walls during assault battles.',
  druid:'Can perform a special morale-raising chant.',
  gunpowder_unit:'Identifies black-powder weapons; triggers gunpowder-related morale penalties on targets and links to regional powder buildings.',
  mercenary_unit:'Recruitable strictly from regional mercenary pools on the campaign map. The source calls this Mercenary; the builder emits mercenary_unit through its Mercenary subtype.',
  brace_for_charge:'Increases bracing: halves incoming charge bonus when ready.',
  aggressive_push:'Provides +1 charge bonus; units push more when charging.',
  power_charge:'Charge bonus decays more slowly: a 33% reduction, from 3 down to 2.',
  disciplined_charge:'Tighter charge with less charge decay, similar to power_charge.'
};
const FORMATION_DEFINITIONS = {
  shield_wall:'Front ranks interlock shields, greatly boosting frontal Defense Skill and mass against frontal charges while slowing movement.',
  schiltron:'A tight defensive spear circle; immune to flank or rear cavalry charges.',
  phalanx:'Pikes/long spears lower into horizontal rows, presenting a spear wall from the front.',
  spear_wall:'Pikes/long spears lower into horizontal rows, presenting a spear wall from the front.',
  wedge:'Cavalry forms a V-shaped point to punch through thin enemy formations.',
  cantabrian_circle:'Mounted missile troops maintain fire while riding in a defensive loop and remain harder targets for enemy archers.',
  square:'Standard structured mass formation.',
  horde:'Loose, unorganized skirmish grouping.'
};
const TERRAIN_DEFINITIONS = {
  desert_raider:'Combat bonus in desert (+2). Listed in the supplied reference under terrain/stat_ground.',
  forest_ambusher:'Combat bonus in forests (+2). Listed in the supplied reference under terrain/stat_ground.'
};
const MATCHUP_DESCRIPTIONS = [
  'Mounted units: +2 Attack against infantry; −2 Attack against spearmen.',
  'Mounted units charging into ready spears have 7 of their charge bonus used against them; ready light_spears use 3.',
  'Infantry: +3 Attack against spears; −3 Attack against cavalry.',
  'Spearmen: −1 Attack against spears.'
];
function definitionList(definitions) {
  return Object.entries(definitions).map(([tag,description])=>`<div class="attribute-definition"><strong>${tag}</strong> · ${description}</div>`).join('');
}
addFields(document.getElementById('extra_attrs').closest('.body'), '<div id="unit_attribute_descriptions"></div><details><summary>General unit attribute descriptions · supplied SS6.4 reference</summary>'+definitionList(UNIT_ATTRIBUTE_DEFINITIONS)+'</details>');
addFields(document.getElementById('f_types').closest('.body'), '<div id="formation_descriptions"></div><details><summary>Formation and activated-ability descriptions · supplied reference</summary>'+definitionList(FORMATION_DEFINITIONS)+'</details>');
const referenceSection=document.createElement('section');referenceSection.id='combat_reference_section';referenceSection.className='collapsed';
referenceSection.innerHTML='<h2 onclick="this.parentElement.classList.toggle(\'collapsed\')">Combat & Terrain Reference</h2><div class="body"><span class="hint">Your supplied SS6.4 descriptions, 12 October 2026. These conditional effects describe engine behavior; they do not add another set of bonuses to the builder’s ordinary Attack, Armor or Defense Skill.</span>'+MATCHUP_DESCRIPTIONS.map(text=>'<p>'+text+'</p>').join('')+definitionList(TERRAIN_DEFINITIONS)+'</div>';
document.getElementById('art_commentary_section').before(referenceSection);
function renderReferenceDescriptions() {
  const unit=window._lastUnit;
  const selected=[...new Set(tags(unit.attributes).concat(checked('can_sap')?['can_sap']:[]))];
  document.getElementById('unit_attribute_descriptions').innerHTML=definitionList(Object.fromEntries(selected.filter(tag=>UNIT_ATTRIBUTE_DEFINITIONS[tag]).map(tag=>[tag,UNIT_ATTRIBUTE_DEFINITIONS[tag]])));
  const formations=tags(val('f_types'));
  document.getElementById('formation_descriptions').innerHTML=definitionList(Object.fromEntries(formations.filter(tag=>FORMATION_DEFINITIONS[tag]).map(tag=>[tag,FORMATION_DEFINITIONS[tag]])));
}
const recalcBeforeReference=recalc;
recalc=function(){recalcBeforeReference();renderReferenceDescriptions();};
