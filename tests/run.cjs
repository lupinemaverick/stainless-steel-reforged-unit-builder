const {spawnSync}=require('node:child_process');
const path=require('node:path');
for(const name of ['test_unit_attributes.cjs','test_phase_a.cjs','test_builder.cjs','test_bible_audit.cjs','test_combat_rules.cjs','test_equipment_grade.cjs','test_preset_filters.cjs','test_defaults_armor.cjs']){
  const result=spawnSync(process.execPath,[path.join(__dirname,name)],{stdio:'inherit'});
  if(result.status!==0)process.exit(result.status||1);
}
