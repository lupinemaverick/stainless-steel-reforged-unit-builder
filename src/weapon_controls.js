/* Checkbox attributes, conditional parameter panels, and held-shield eligibility. */
const ATTRIBUTE_CONTROLS = [
  {key:'ap',label:'AP',native:true},{key:'sp',label:'sp',native:true},
  {key:'spear',label:'Spear',native:true},{key:'light_spear',label:'Light spear',native:true},
  {key:'long_pike',label:'Long pike',native:true},{key:'spear_bonus',label:'spear_bonus_X',magnitude:4,native:true},
  {key:'rend',label:'Rend',magnitude:2},{key:'stagger',label:'Stagger'},
  {key:'hook_drag',label:'Hook',metadataOnly:true},
  {key:'duelist',label:'Duelist',magnitude:2},{key:'pikebreaker',label:'Pikebreaker',magnitude:1},
  {key:'batter',label:'Batter',magnitude:2},
  {key:'crush',label:'Crush',magnitude:''},{key:'hemorrhage',label:'Hemorrhage',magnitude:''},
  {key:'hamstring',label:'Hamstring',magnitude:''},{key:'cleave',label:'Cleave',magnitude:''},
  {key:'linebreaker',label:'Linebreaker',magnitude:''},{key:'stalwart',label:'Weapon Stalwart',magnitude:''},
  ...['prec','thrown','launching','area','bp','short_pike'].map(key=>({key,label:key,native:true}))
];
const ATTRIBUTE_DEFINITIONS = {
  hook_drag:'Custom proposal — no engine runtime: a hooked head may catch or pull a shield, limb or opponent off balance. A defender forward-step / stumble is a visual candidate only; no model-level trigger, animation asset, root motion or movement API has been verified. Chance and lockout are unspecified. Separate from shield-block-only Stagger; no assumed double-hit, unhorse or shield bypass.',
  ap:'Armor piercing: ignores 50% of the target’s effective Armor stat, rounded up. Defense Skill and Shield remain separate.',
  sp:'Shield piercing: ignores 50% of the target’s Shield stat, rounded up.',
  spear:'Adds +8 Attack against cavalry and −4 Attack against infantry. When braced, reflects full cavalry charge damage back onto charging horses.',
  light_spear:'Adds +8 Defense against cavalry and −4 Defense against infantry. When braced, reflects half cavalry charge damage.',
  long_pike:'Enables maximum reach for phalanx/pike units.',
  short_pike:'Intermediate-reach polearm; provides anti-cavalry bracing without requiring a phalanx setup.',
  spear_bonus:'Conditional Attack bonus against cavalry. Choose X = 2, 4, 6, 8, 10 or 12. This tag does not automatically add spear-family penalties or bracing behavior.',
  bp:'Body piercing: a missile can pass through a model and hit models behind it. This describes projectile penetration through bodies, not Armor piercing (ap).',
  prec:'Pre-charge missile: throws a quick salvo immediately before charging into melee. Fire-at-will is disabled by default at battle start.',
  thrown:'For short-range thrown weapons such as javelins, throwing axes and darts. Applies a large bonus against high-HP targets such as Elephants and speeds up volley delay.',
  launching:'Melee or missile attacks knock targeted models into the air, disrupting formations.',
  area:'Damage affects a radius around the hit point rather than a single soldier, as with trebuchets or catapults.',
  fire:'Legacy tag in this builder; a verified EDU weapon-attribute definition was not found in the supplied reference. Fire damage/projectile settings are separate. Retained as design data until verified.',
  anti_horse:'Legacy tag in this builder; exact meaning and export support are unverified in the supplied reference. For the documented mounted Attack bonus, use spear_bonus_X. Retained as design data until verified.',
  rend:'Custom proposal: ignore up to X applicable target Armor for this attack, flooring at zero. No persistent damage, and no change to Defense Skill or Shield. AP, when explicitly combined, resolves before rend using the verified AP rule.',
  stagger:'Custom proposal: after an eligible melee attack is stopped specifically by Shield, apply the selected defender reaction. The original attack stays blocked. Chance is per eligible shield-block outcome, subject to per-defender lockout and configured Stalwart resistance.',
  duelist:'Custom proposal: add X Attack against opposing infantry classified as neither spear/pike nor missile infantry. Eligibility uses opponent unit category/role, not an automatic active-weapon classifier.',
  pikebreaker:'Finalized design · runtime pending: each eligible model-to-model pike engagement has chance = min(100%, 10% × X) to force that defending model to its usable secondary weapon permanently for the battle. No automatic pike restoration. Skill-parried attacks are excluded.',
  batter:'Finalized design · runtime pending: add X permanent fatigue points to the individual defending model on a successful hit or nonlethal Armor-absorbed hit. Dodges, skill parries and shield blocks prevent a stack. Native fatigue scale requires verification; 2 points is a testing default.',
  crush:'Custom proposal retained as an override. The supplied handoff does not define its exact trigger, target eligibility, numerical effect or duration; configure those in advanced effect definitions before implementation.',
  hemorrhage:'Custom proposal retained as an override. Its exact trigger, target eligibility, numerical effect and duration are not defined in the supplied handoff.',
  hamstring:'Custom proposal retained as an override. Its exact trigger, target eligibility, numerical effect and duration are not defined in the supplied handoff.',
  cleave:'Custom proposal retained as an override. Its exact trigger, target eligibility, numerical effect and duration are not defined in the supplied handoff; do not assume it equals native area.',
  linebreaker:'Custom proposal retained as an override. Its exact trigger, target eligibility, numerical effect and duration are not defined in the supplied handoff.',
  stalwart:'Custom resistance proposal. Stagger can respect configured Stalwart resistance, but the resistance amount/variants are not defined in the supplied handoff. This weapon-slot tag is separate from independent unit Stalwart.'
};
for(const slot of ['pri','sec']) {
  const raw=document.getElementById(slot+'_attr'),oldLabel=raw.closest('label'),anchor=raw.closest('.body');
  raw.type='hidden';oldLabel.remove();
  const block=addFields(anchor, `<strong style="display:block;margin-top:12px">${slot}_attr · active-weapon attributes</strong>
    <span class="hint">Select attributes, then set X where applicable. Native descriptions follow your SS6.4 attribute reference (12 October 2026). Custom proposals remain separate. Effects apply only to this active weapon; conditional bonuses are not added again to ordinary stats.</span>
    <div class="checks" style="margin-top:8px">${ATTRIBUTE_CONTROLS.map(def=>`<label title="${ATTRIBUTE_DEFINITIONS[def.key]}"><input type="checkbox" id="${slot}_tag_${def.key}" onchange="updateWeaponAttributes('${slot}')" /> ${def.label}</label>`).join('')}</div>
    <div class="grid" style="margin-top:8px">${ATTRIBUTE_CONTROLS.filter(def=>def.magnitude!==undefined).map(def=>`<label id="${slot}_value_wrap_${def.key}" hidden>${def.label} · X${def.magnitude===''?' (optional variant)':''}${def.key==='spear_bonus'?`<select id="${slot}_value_spear_bonus" onchange="updateWeaponAttributes('${slot}')">${[2,4,6,8,10,12].map(n=>`<option${n===4?' selected':''}>${n}</option>`).join('')}</select>`:`<input type="number" id="${slot}_value_${def.key}" value="${def.magnitude}" min="0" step="1" oninput="updateWeaponAttributes('${slot}')" />`}</label>`).join('')}
      ${ATTRIBUTE_CONTROLS.map(def=>`<div class="full attribute-definition" id="${slot}_definition_${def.key}" hidden><strong>${def.label}</strong> · ${ATTRIBUTE_DEFINITIONS[def.key]}</div>`).join('')}
      <div class="full" id="${slot}_settings_rend" hidden><span class="hint">On an applicable attack, ignore up to X target Armor: max(0, Armor − X). Defense Skill and Shield are unchanged. No persistent Armor damage.</span></div>
      <div class="full" id="${slot}_settings_hook_drag" hidden><label>Visual candidate (description only)<input type="text" id="${slot}_hook_visual" value="defender forward-step / stumble" oninput="recalc()" /></label><span class="hint">Custom proposal — no engine runtime. Trigger, chance, lockout and animation ID are unverified or unspecified. No model movement is implemented.</span></div>
      <div class="full" id="${slot}_settings_spear_bonus" hidden><span class="hint">Conditional Attack against mounted opponents. EDU vocabulary supports X = 2, 4, 6, 8, 10 or 12. Bracing and charge mechanics remain separate.</span></div>
      <div class="full" id="${slot}_settings_duelist" hidden><span class="hint">Add X Attack only against infantry classified as neither spear/pike nor missile infantry. No reduction to Armor or Shield.</span></div>
      <div class="full" id="${slot}_settings_stagger" hidden><p class="hint">Stagger is checked only when an eligible melee attack is stopped specifically by Shield. It is not checked on every hit, a skill parry, or an existing armor-hit reaction. The blocked attack remains stopped. A 100% chance means every eligible shield-block outcome, subject to lockout and configured resistance.</p><div class="grid">
        ${numberField(slot+'_stagger_chance','Chance after eligible shield block (%)',100)}
        ${numberField(slot+'_stagger_lockout','Per-defender retrigger lockout (seconds)',1,'0.1')}
        <label>Selected defender reaction<input id="${slot}_reaction" placeholder="Animation not yet selected" oninput="recalc()" /></label>
        <label><span><input type="checkbox" id="${slot}_stalwart_resistance" onchange="recalc()" /> Respect configured Stalwart resistance</span></label>
        <span class="hint full">Lockout is not the reaction duration; duration remains undefined until an animation is selected.</span>
      </div></div>
      <div class="full" id="${slot}_settings_pikebreaker" hidden><p class="hint">A switch is possible only when an attack reaches interaction with an opposing model actively presenting a formation pike. Skill-parried attacks are excluded, and a usable secondary weapon is required. Chance = min(100%, 10% × X), not an automatic switch on contact.</p><span class="hint" id="${slot}_pike_chance"></span><div class="grid">
        <span class="hint">Successful switch permanently removes this individual model’s pike use for the remainder of the battle.</span>
        <span class="hint">No timeout, refresh or automatic restoration. A usable secondary weapon must exist; no arbitrary replacement weapon is supplied.</span>
      </div></div>
      <div class="full" id="${slot}_settings_batter" hidden><span class="hint">Add X permanent fatigue points to the individual defending model on a successful hit or a nonlethal Armor-absorbed hit. Dodges, shield blocks and skill parries prevent stacks. Batter’s accumulated contribution does not recover during the battle; ordinary fatigue is separate. Two points per hit remains a testing default; native fatigue mapping is pending.</span></div>
      <div class="full" id="${slot}_settings_long_pike" hidden><span class="hint">Requires suitable pike formation and animation support. Native spear behavior is a separate integration choice.</span></div>
      <details class="full"><summary>Other attributes and advanced effect definitions</summary>
        <label>Additional / legacy tags<input id="${slot}_extra_weapon_attrs" oninput="updateWeaponAttributes('${slot}')" placeholder="Comma-separated tags not listed above" /></label>
        <label>Effect overrides (JSON)<textarea id="${slot}_effects_json" rows="2" placeholder='[]' oninput="recalc()"></textarea><span class="hint">Optional design records with tag, trigger, target, magnitude and duration. No custom runtime route is configured.</span></label>
        <pre id="${slot}_effects_view" style="white-space:pre-wrap"></pre>
      </details>
    </div>`);
  block.id=slot+'_attribute_block';block.appendChild(raw);
}
function attributeMatch(def,tag) {
  if(def.magnitude===undefined)return tag===def.key;
  return tag===def.key||new RegExp('^'+def.key+'_\\d+$').test(tag);
}
function syncAttributeControls(slot) {
  const active=tags(val(slot+'_attr')),unknown=active.filter(tag=>!ATTRIBUTE_CONTROLS.some(def=>attributeMatch(def,tag)));
  for(const def of ATTRIBUTE_CONTROLS) {
    const matches=active.filter(tag=>attributeMatch(def,tag));const selected=matches.length>0;
    document.getElementById(slot+'_tag_'+def.key).checked=selected;
    if(def.magnitude!==undefined) {
      const input=document.getElementById(slot+'_value_'+def.key),wrap=document.getElementById(slot+'_value_wrap_'+def.key);
      wrap.hidden=!selected;input.disabled=!selected;
      if(selected){const last=matches[matches.length-1],m=last.match(/_(\d+)$/);input.value=m?m[1]:(def.magnitude===''?'':def.magnitude);}
    }
    const settings=document.getElementById(slot+'_settings_'+def.key);if(settings)settings.hidden=!selected;
    document.getElementById(slot+'_definition_'+def.key).hidden=!selected;
  }
  document.getElementById(slot+'_extra_weapon_attrs').value=unknown.join(', ');
  document.getElementById(slot+'_pike_chance').textContent='Current chance after an eligible pike interaction: '+Math.min(100,10*num(slot+'_value_pikebreaker',1))+'%.';
}
function updateWeaponAttributes(slot) {
  const active=[];
  for(const def of ATTRIBUTE_CONTROLS) {
    if(!checked(slot+'_tag_'+def.key))continue;
    let tag=def.key;
    if(def.magnitude!==undefined){const value=val(slot+'_value_'+def.key);if(value!=='')tag+='_'+value;else if(def.magnitude!=='')tag+='_'+def.magnitude;}
    active.push(tag);
  }
  active.push(...tags(val(slot+'_extra_weapon_attrs')));
  document.getElementById(slot+'_attr').value=[...new Set(active)].join(', ');
  recalc();
}
// Group only shield/offhand inputs. Unit custom defense effects remain independent.
const shieldAnchor=document.getElementById('shield_type').closest('.body');
const shieldFields=document.createElement('fieldset');shieldFields.id='shield_fields';shieldFields.className='full grid';shieldFields.style.cssText='border:1px solid var(--border);border-radius:4px;padding:10px;min-width:0';
shieldFields.innerHTML='<legend>Shield / offhand equipment</legend><span class="hint full" id="shield_disabled_banner" hidden>Disabled: every equipped weapon uses a two-handed grip. Remove two-handed grip from an equipped slot to enable held offhand equipment.</span>';
document.getElementById('shield_type').closest('label').before(shieldFields);
for(const id of ['shield_type','shield_material','shield','offhand','offhand_shield','offhand_def'])shieldFields.appendChild(document.getElementById(id).closest('label'));
const unitCustom=document.getElementById('unit_custom_attrs').closest('label');shieldAnchor.appendChild(unitCustom);
function allEquippedWeaponsTwohanded(){return checked('pri_twohand')&&(val('sec_base_atk')===''||checked('sec_twohand'));}
function updateShieldEligibility(){const disabled=allEquippedWeaponsTwohanded();shieldFields.disabled=disabled;shieldFields.style.opacity=disabled?'0.45':'1';document.getElementById('shield_disabled_banner').hidden=!disabled;}
// The existing stylesheet targets explicit text input types.
document.querySelectorAll('input:not([type])').forEach(input=>input.type='text');
function normalizeArmourSound(sound){if(['flesh','leather','metal'].includes(sound))return sound;if(sound==='padded')return 'leather';if(['chain','plate'].includes(sound))return 'metal';return 'flesh';}
