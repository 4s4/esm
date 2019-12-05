"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countProp = countProp;
exports.thematicFocusKeys = exports.thematicFocus = void 0;
var thematicFocus = {
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
  'regional_integration': 'Regional Integration'
};
exports.thematicFocus = thematicFocus;
var thematicFocusKeys = Object.keys(thematicFocus);
exports.thematicFocusKeys = thematicFocusKeys;

function countProp(col, kw) {
  if (col) {
    return col.filter(function (o) {
      return o[kw];
    }).length;
  } else {
    return 0;
  }
}
