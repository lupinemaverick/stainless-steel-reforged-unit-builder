/* Signed offhand tradeoffs; migrate only recognizable previous defaults. */
const OFFHAND_RULES_REVISION='2026-10-12-r2';
const fieldsBeforeOffhandRevision=projectFields;
projectFields=function(){return {...fieldsBeforeOffhandRevision(),offhand_rules_revision:OFFHAND_RULES_REVISION};};
const importBeforeOffhandRevision=importProjectData;
importProjectData=function(input){
  const data=JSON.parse(JSON.stringify(input)),f=data.fields;
  if(f&&f.offhand_rules_revision!==OFFHAND_RULES_REVISION){
    const old={large:[7,0],medium:[5,0],small:[3,1],buckler:[2,1],dagger:[0,1]}[f.offhand],fresh=OFFHANDS[f.offhand];
    if(old&&fresh){
      if(Number(f.offhand_shield)===old[0])f.offhand_shield=fresh.shield;
      if(Number(f.offhand_def)===old[1]||(f.offhand==='buckler'&&Number(f.offhand_def)===3))f.offhand_def=fresh.def;
    }
    f.offhand_rules_revision=OFFHAND_RULES_REVISION;
  }
  return importBeforeOffhandRevision(data);
};
