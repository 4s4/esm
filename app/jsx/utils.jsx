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


export const thematicFocusKeys = Object.keys(thematicFocus);


export function countProp(col, kw) {
  if(col){
    return col.filter(o => o[kw]).length;
  } else {
    return 0;
  }
}
