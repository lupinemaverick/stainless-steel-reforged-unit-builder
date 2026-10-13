const {chromium}=require('playwright');
const path=require('path'),assert=require('assert'),fs=require('fs');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.SSR_BROWSER_EXECUTABLE?{executablePath:process.env.SSR_BROWSER_EXECUTABLE}:{})}),p=await b.newPage({viewport:{width:1500,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('file:///'+path.join(__dirname,'../index.html').replaceAll('\\','/'));
 const checks=await p.evaluate(()=>{
  const out=[],eq=(a,b,n)=>{if(JSON.stringify(a)!==JSON.stringify(b))throw Error(n+': '+JSON.stringify(a)+' != '+JSON.stringify(b));out.push(n)},set=(id,v)=>document.getElementById(id).value=v;
  const defaults=()=>{
    eq([val('pri_category'),val('pri_preset'),val('sec_category'),val('sec_preset')],['lance','couched_lance','sword_cut','arming_sword'],'Jerusalem preset selections');
    eq(['aggressive','reckless','fanatic'].map(n=>checked('trait_'+n)),[false,false,false],'Default subtypes unchecked');
    eq(checked('pri_tag_spear'),false,'Lance spear checkbox clear');
    eq([num('pri_base_atk'),num('pri_base_charge')],[-1,12],'Selected lance matches raw stats');
    eq([val('armour_base'),val('armour_layer1'),num('armour')],['double_mail','gambeson',9],'Default mail plus padding');
  };defaults();
  for(const id of ['light_couched_lance','couched_lance','heavy_couched_lance']){set('pri_category','lance');rebuildPresetOptions('pri',id);applyPriPreset();eq(tags(val('pri_attr')).includes('spear'),false,id+' has no spear attribute');}
  set('sec_category','none');changeWeaponCategory('sec');eq([val('sec_category'),val('sec_preset'),compute().unit.sec_attack],['none','none',null],'None category clears secondary');eq(toEdu(compute().unit).includes('\nstat_sec '),false,'None emits no secondary weapon');
  set('sec_category','sword_cut');changeWeaponCategory('sec');eq(val('sec_preset'),'arming_sword','Sword category restores real sidearm');
  resetToJerusalem();defaults();
  for(const [weight,count]of [['light',1],['medium',2],['heavy',3]]){
    set('armour_weight',weight);onArmourWeightChange();
    for(let i=1;i<=3;i++)eq([document.getElementById('layer'+i+'_wrap').style.display!=='none',document.getElementById('armour_layer'+i).disabled],[i<=count,i>count],weight+' layer '+i+' availability');
  }
  set('armour_preset','gothic_plate');applyArmourPreset();eq([val('armour_base'),val('armour_layer1'),val('armour_layer2'),val('armour_layer3'),num('armour'),num('arm_heat')],['gothic_plate','arming_doublet','mail_voiders','none',13,7],'Gothic arrangement counts padding and voiders once');
  eq(+toEdu(compute().unit).split('\n').find(l=>l.startsWith('stat_pri_armour ')).trim().split(/\s+/)[1].replace(',',''),13,'Arrangement reaches EDU Armor');
  set('armour_layer3','gambeson');applyArmourLayers();eq(num('armour'),15,'Third editable heavy layer contributes once');set('armour_weight','medium');onArmourWeightChange();eq([val('armour_layer3'),document.getElementById('armour_layer3').disabled],['none',true],'Weight reduction clears inactive layer');
  for(const [id,weight,base,layers,total]of [['coat_of_plates','medium','coat_of_plates',['gambeson','mail_haubergon'],9],['kataphract','heavy','heavy_lamellar',['gambeson','mail_haubergon'],13],['gambeson','light','gambeson',['coat_cloth'],2],['unarmored','light','unarmored',['none'],0]]){
    set('armour_weight',weight);onArmourWeightChange();set('armour_preset',id);applyArmourPreset();eq([val('armour_base'),...layers.map((_,i)=>val('armour_layer'+(i+1))),num('armour')],[base,...layers,total],id+' representative components');
  }
  set('armour_weight','heavy');onArmourWeightChange();set('armour_preset','italian_plate');applyArmourPreset();set('armour_base','full_plate');set('armour_layer3','reinforcing');applyArmourLayers();const fields=projectFields();fields.armour='19';importProjectData({schema:'combat-reforged-builder',version:1,fields,presets:editorCollectAll()});eq([val('armour_base'),val('armour_layer3'),num('armour')],['full_plate','reinforcing',19],'Project retains custom base/layers and numeric override');
  const old=projectFields();delete old.armour_base;old.armour='17';importProjectData({schema:'combat-reforged-builder',version:1,fields:old});eq([val('armour_base'),num('armour')],['italian_plate',17],'Legacy import uses old preset base and preserves edited total');
  for(const [id,p]of Object.entries(ARMOUR_PRESETS)){set('armour_weight',p.weight);onArmourWeightChange();set('armour_preset',id);applyArmourPreset();eq(!!ARMOUR_PRESETS[val('armour_base')]&&Number.isFinite(num('armour')),true,id+' valid base and computed total');}
  resetToJerusalem();return out;
 });
 await p.locator('#armour_weight').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(__dirname,'armor-loadout-controls.png')});
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(__dirname,'defaults-armor-results.json'),JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({passed:checks.length,errors}));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
