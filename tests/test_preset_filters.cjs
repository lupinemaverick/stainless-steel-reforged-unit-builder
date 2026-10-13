const {chromium}=require('playwright');
const path=require('path'),assert=require('assert'),fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.SSR_BROWSER_EXECUTABLE?{executablePath:process.env.SSR_BROWSER_EXECUTABLE}:{})});
 const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('file:///'+path.join(__dirname,'../index.html').replaceAll('\\','/'));
 const checks=[];const check=(ok,msg)=>{assert(ok,msg);checks.push(msg)};
 for(const slot of ['pri','sec']){
  const pos=await page.evaluate(slot=>{let a=document.getElementById(slot+'_category').getBoundingClientRect(),b=document.getElementById(slot+'_preset').getBoundingClientRect();return {sameRow:Math.abs(a.top-b.top)<3,left:a.left<b.left}},slot);
  check(pos.sameRow&&pos.left,slot+' selectors adjacent category first');
 }
 await page.locator('#pri_category').selectOption('mace');
 check(await page.locator('#pri_preset').inputValue()==='horseman_mace','Category change picks compatible mounted mace');
 check(await page.locator('#pri_preset option').evaluateAll(os=>os.filter(o=>o.value).every(o=>o.value.includes('mace'))),'Mace list excludes swords/lances');
 await page.locator('#sec_category').selectOption('pick');
 check(await page.locator('#sec_preset option').count()===1,'Empty preset category retains only custom choice');
 await page.evaluate(()=>{document.getElementById('category').value='infantry';document.getElementById('class').value='missile';populateWeaponSelects()});
 await page.locator('#pri_category').selectOption('bow');
 check(await page.locator('#pri_preset option').count()===5,'Foot bows list four matching presets and custom');
 await page.locator('#pri_preset').selectOption('long_bow');
 check(await page.locator('#pri_category').inputValue()==='bow','Preset selection retains ranged category');
 const restored=await page.evaluate(()=>{let fields=projectFields();fields.pri_base_atk='19';fields.sec_preset='arming_sword';fields.sec_category='sword_cut';let data={schema:'combat-reforged-builder',version:1,fields,presets:editorCollectAll()};document.getElementById('pri_category').value='crossbow';changeWeaponCategory('pri');importProjectData(JSON.parse(JSON.stringify(data)));return [val('pri_category'),val('pri_preset'),val('pri_base_atk'),val('sec_preset')]});
 check(JSON.stringify(restored)===JSON.stringify(['bow','long_bow','19','arming_sword']),'Project import rebuilds category options and preserves numeric overrides');
 await page.evaluate(()=>resetToJerusalem());
 check(await page.locator('#pri_preset').inputValue()==='couched_lance','Reset restores Lance from unrelated category');
 check(await page.locator('#sec_preset').inputValue()==='arming_sword','Reset restores matching sword sidearm');
 await page.locator('#pri_category').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(__dirname,'category-preset-selectors.png')});
 await page.setViewportSize({width:600,height:900});check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Narrow layout has no page overflow');
 check(!errors.length,'No browser errors');
 fs.writeFileSync(path.join(__dirname,'preset-filter-results.json'),JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({passed:checks.length,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
