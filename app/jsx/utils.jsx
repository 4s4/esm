export const thematicFocusKeys = ['environment', 'gender', 'poverty_reduction', 'export_strategy', 'trade_focus',
'youth', 'trade_facilitation', 'trade_finance', 'trade_information', 'trade_promotion', 'quality',
'tvet', 'regional', 'regional_integration'];


export function countProp(col, kw) {
  if(col){
    return col.filter(o => o[kw]).length;
  } else {
    return 0;
  }
}
