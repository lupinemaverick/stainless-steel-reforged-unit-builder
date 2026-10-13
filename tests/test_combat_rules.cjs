const {chromium}=require('playwright');
const path=require('path'),fs=require('fs'),assert=require('assert');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.SSR_BROWSER_EXECUTABLE?{executablePath:process.env.SSR_BROWSER_EXECUTABLE}:{})}),p=await b.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('file:///'+path.join(__dirname,'../index.html').replaceAll('\\','/'));
 const checks=await p.evaluate(()=>{
  const checks=[],eq=(a,b,name)=>{if(JSON.stringify(a)!==JSON.stringify(b))throw Error(name+': '+JSON.stringify(a)+' != '+JSON.stringify(b));checks.push(name)};
  const set=(id,value)=>{let e=document.getElementById(id);if(e.type==='checkbox'||e.type==='radio')e.checked=!!value;else e.value=value};
  const clean=()=>{for(const n of CANONICAL_SUBTYPES)set('trait_'+n.toLowerCase(),false);set('category','infantry');set('class','heavy');set('quality','Average');set('unit_category','Urban Militia');set('core_defense_skill',4);set('proficiency_def','');set('arm_agi',0);set('armour',10);set('offhand','empty');applyOffhand();set('sec_base_atk','');set('pri_handling',0);delete document.getElementById('pri_handling').dataset.inheritedHandling;set('horse_type','stallion');set('horse_barding','none');};
  clean();set('unit_category','Martial Nobility');set('pri_category','greatsword');applyWeaponCategory('pri');let u=compute().unit;
  eq([num('pri_base_atk'),num('pri_handling'),u.def_skill,u.pri_attack],[12,0,6,14],'Average noble greatsword uses12 Attack base plus training2');
  eq(toEdu(u).split('\n').find(l=>l.startsWith('stat_pri_armour')).trim().split(/\s+/).slice(1).join(' '),'10, 6, 0, metal','Greatsword Armor/Skill/Shield reaches native EDU');
  const wanted={mace:4,pick:4,fighting_spear:7,pike:5,longaxe:11,glaive:10,bill:9,halberd:10,poleaxe:10,longsword:9,greatsword:12,estoc:7,staff:4};
  for(const [cat,a]of Object.entries(wanted)){set('pri_category',cat);applyWeaponCategory('pri');eq(num('pri_base_atk'),a,cat+' revised category Attack');}
  eq([PRI_PRESETS.great_sword.atk,PRI_PRESETS.long_axe.atk,PRI_PRESETS.pole_axe.atk,SEC_PRESETS.mace.atk],[12,11,10,4],'Existing primary and secondary presets inherit new Attack');
  clean();eq(compute().unit.def_skill,4,'Ordinary neutral unit core Skill4');set('quality','Inferior');eq(compute().unit.def_skill,4,'Inferior removes quality bonus without subtracting Skill');set('unit_category','Emergency Levies');eq(compute().unit.def_skill,4,'Emergency training has no negative Skill');set('trait_aggressive',true);eq(compute().unit.def_skill,3,'Aggressive remains explicit minus-one exception');
  clean();set('trait_guards',true);eq(compute().unit.def_skill,5,'Guards compressed to plus-one');set('trait_guards',false);set('arm_agi',-3);eq(compute().unit.def_skill,4,'Negative armor contribution cannot subtract Skill');set('pri_handling',-2);eq(compute().unit.def_skill,4,'Negative weapon contribution cannot subtract Skill');set('proficiency_def',-2);eq(compute().unit.def_skill,4,'Negative manual quality contribution cannot subtract Skill');
  clean();set('category','cavalry');set('cav_lancer',true);eq(compute().unit.def_skill,4,'Lancer has no negative Skill');set('cav_brawler',true);eq(compute().unit.def_skill,5,'Brawler retains positive Skill');
  clean();set('category','cavalry');for(const [bard,armor]of [['none',10],['surcoat',11],['padded',12],['plate',18],['cataphract',16]]){set('horse_barding',bard);applyMount();u=compute().unit;eq(u.armour,armor,bard+' barding adds once to rider Armor');eq(+toEdu(u).split('\n').find(l=>l.startsWith('stat_pri_armour')).trim().split(/\s+/)[1].replace(',',''),armor,bard+' combined Armor exported');eq(compute().unit.armour,armor,bard+' repeated compute does not double-add');eq(u.sec_armour,0,bard+' does not double-add via horse secondary Armor');}
  set('category','infantry');eq(compute().unit.armour,10,'Retained mount fields do not armor infantry');
  clean();set('unit_category','Martial Nobility');set('pri_category','greatsword');changeWeaponCategory('pri');let fields=projectFields();delete fields.core_defense_skill;fields.pri_base_atk='8';fields.pri_handling='6';fields.arm_agi='-2';
  const old={schema:'combat-reforged-builder',version:1,fields,presets:{pri:JSON.parse(JSON.stringify(LEGACY_WEAPON_DEFAULTS.pri)),sec:JSON.parse(JSON.stringify(LEGACY_WEAPON_DEFAULTS.sec))},weapon_categories:JSON.parse(JSON.stringify(LEGACY_CATEGORY_DEFAULTS))};
  importProjectData(old);eq([num('pri_base_atk'),num('pri_handling'),num('core_defense_skill'),compute().unit.def_skill],[12,0,4,6],'Legacy project migrates recognized Attack/Skill defaults');
  const custom=JSON.parse(JSON.stringify(old));custom.fields.pri_base_atk='17';custom.fields.pri_handling='3';custom.presets.pri.great_sword.atk=17;custom.presets.pri.great_sword.handling=3;importProjectData(custom);eq([num('pri_base_atk'),num('pri_handling'),PRI_PRESETS.great_sword.atk],[17,3,17],'Legacy custom Attack and positive handling retained');
  const fields2=projectFields(),project={schema:'combat-reforged-builder',version:1,fields:fields2,presets:JSON.parse(JSON.stringify(editorCollectAll()))};importProjectData(project);eq([num('pri_base_atk'),num('pri_handling'),num('core_defense_skill')],[17,3,4],'Current-rule project round trip is stable');
  return checks;
 });
 // Persistent item-editor data migrates on a fresh load.
 await p.evaluate(()=>localStorage.setItem(LS_KEY,JSON.stringify({pri:{...LEGACY_WEAPON_DEFAULTS.pri,great_sword:{...LEGACY_WEAPON_DEFAULTS.pri.great_sword,atk:8,handling:6,handling_mounted:6}},sec:LEGACY_WEAPON_DEFAULTS.sec,weapon_categories:LEGACY_CATEGORY_DEFAULTS})));
 await p.reload();assert.deepEqual(await p.evaluate(()=>[PRI_PRESETS.great_sword.atk,PRI_PRESETS.great_sword.handling,WEAPON_CATEGORIES.greatsword.atk]),[12,0,12]);checks.push('Stored legacy defaults migrate on reload');await p.evaluate(()=>localStorage.removeItem(LS_KEY));
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(__dirname,'combat-rules-results.json'),JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({passed:checks.length,errors}));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
