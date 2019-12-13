export const thematicFocus = {
  'environment': 'Environment',
  'gender': 'Gender',
  'poverty_reduction': 'Poverty Reduction',
  'export_strategy': 'Export Strategy',
  'trade_focus': 'Focus on trade',
  'youth': 'Youth',
  'trade_facilitation': 'Trade Facilitation',
  'trade_finance': 'Trade Finance',
  'trade_information': 'Trade Information',
  'trade_promotion': 'Trade Promotion',
  'quality': 'Quality',
  'tvet': 'TVET',
  'regional': 'Regional Scope',
  'regional_integration': 'Regional Integration'};

  const newsTM = ["environment", "focus_on_trade", "gender", "poverty_reduction", "quality", "regional_integration", "trade_facilitation",
   "trade_finance", "trade_information", "trade_promotion", "tvet", "youth"];
export const thematicFocusKeys = Object.keys(thematicFocus);


export function countProp(col, kw) {
  if(col){
    return col.filter(o => o[kw]).length;
  } else {
    return 0;
  }
}
