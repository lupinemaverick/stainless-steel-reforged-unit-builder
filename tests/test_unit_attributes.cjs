const {chromium}=require('playwright'),{pathToFileURL}=require('node:url'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.SSR_BROWSER_EXECUTABLE?{executablePath:process.env.SSR_BROWSER_EXECUTABLE}:{})}),p=await b.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(pathToFileURL(path.join(__dirname,'../index.html')).href);
 const checks=await p.evaluate(()=>{
  const out=[],eq=(a,b,n)=>{if(JSON.stringify(a)!==JSON.stringify(b))throw Error(n+': '+JSON.stringify(a)+' != '+JSON.stringify(b));out.push(n)},set=(id,v)=>document.getElementById(id).value=v;
  eq(document.getElementById('unit_tag_command'),null,'Command stays in subtype section');
  eq(document.getElementById('unit_attribute_controls').nextElementSibling.contains(document.getElementById('extra_attrs')),true,'Unit choices immediately precede Extra attributes');
  set('unit_category','Career Soldiers');set('category','infantry');recalc();eq(checked('unit_tag_hide_forest'),true,'Foot infantry defaults to forest hiding');setUnitAttribute('hide_forest',false);eq(tags(compute().unit.attributes).includes('hide_forest'),false,'Forest hiding can be explicitly disabled');
  const base=compute().unit;
  for(const keys of Object.values(UNIT_ATTRIBUTE_GROUPS))for(const tag of keys){
    if(UNIT_TERRAIN_TAGS[tag]||tag==='hide_forest')continue;
    setUnitAttribute(tag,true);let u=compute().unit;eq(tags(u.attributes).filter(t=>t===tag).length,1,tag+' exports once');
    eq(toEdu(u).split('\n').find(l=>l.startsWith('attributes ')).includes(tag),true,tag+' reaches native unit attributes');
    setUnitAttribute(tag,false);eq(tags(compute().unit.attributes).includes(tag),false,tag+' can be deselected');
  }
  setUnitAttribute('desert_raider',true);setUnitAttribute('forest_ambusher',true);let u=compute().unit;eq([u.sand,u.forest],[base.sand+2,base.forest+2],'Terrain choices add +2 to sand/forest');eq([compute().unit.sand,compute().unit.forest],[u.sand,u.forest],'Terrain does not accumulate on recompute');eq(tags(u.attributes).some(t=>t==='desert_raider'||t==='forest_ambusher'),false,'Terrain choices do not leak into attributes');
  const fields=projectFields();setUnitAttribute('desert_raider',false);importProjectData({schema:'combat-reforged-builder',version:1,fields});eq([checked('unit_tag_desert_raider'),checked('unit_tag_forest_ambusher'),tags(compute().unit.attributes).includes('hide_forest')],[true,true,false],'Project restores terrain and explicit hiding choice');
  set('extra_attrs',val('extra_attrs')+', unlisted_native_tag, police');recalc();eq(checked('unit_tag_police'),true,'Free-text tags sync checkboxes');setUnitAttribute('police',false);eq(tags(val('extra_attrs')).includes('unlisted_native_tag'),true,'Unlisted tags retained');
  setUnitAttribute('can_sap',true);eq(checked('can_sap'),true,'Sapping checkbox syncs existing control');document.getElementById('can_sap').checked=false;recalc();eq(checked('unit_tag_can_sap'),false,'Existing sapping control syncs checkbox');
  document.getElementById('trait_command').checked=true;recalc();eq(tags(compute().unit.attributes).filter(t=>t==='command').length,1,'Command subtype still exports once');
  set('unit_category','Royal Retinue');recalc();eq(document.getElementById('unit_tag_general_unit').disabled,true,'Inherited general attribute cannot be falsely unchecked');
  resetToJerusalem();eq([checked('unit_tag_desert_raider'),checked('unit_tag_forest_ambusher'),checked('unit_tag_hide_forest')],[false,false,false],'Reset clears terrain and respects cavalry hiding default');
  return out;
 });assert.deepEqual(errors,[]);console.log(JSON.stringify({unitAttributeAssertions:checks.length,pageErrors:errors}));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
