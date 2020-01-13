import {pieChart, barChart, sunburstChart} from './charts/Charts';
import WorldMap from './maps/WorldMap';
import RegionsMap from './maps/RegionsMap';

export function geoRegionAccordion(regionsFilters, regionsFrequencies){
//    const catt = regionsFilters.filter(o => o["parent-value"]==="0").map(o => o.label);
//    const datt = regionsFilters.filter(o => o["parent-value"]==="0").map(o => regionsFrequencies[o.value]);
//    console.log('geoRegionAccordion', catt, datt);
    // pieChart(400, 400, catt, datt)
    return RegionsMap;
}

export function ecoRegionAccordion(regionsFilters, regionsFrequencies, onClick, selections){
    const catt = regionsFilters.filter(o => o["parent-value"]==="1").map(o => o.label);
    const datt = regionsFilters.filter(o => o["parent-value"]==="1").map(o => {        
        return {count: regionsFrequencies[o.value],
                value: o.value}});
    return pieChart('Explore the TSM by Economical Region', 400, 400, catt, datt, onClick, selections);
}

export function countryAccordion(countryFilters, countriesFrequencies){
    // const dict = new Set(Object.keys(countriesFrequencies));
    // const base = countryFilters.filter(o => dict.has(o.value));
    // const catt = base.map(o => o.label);
    // const datt = base.map(o => countriesFrequencies[o.value] || 0);
    // barChart(400, 400, catt, datt)
    return WorldMap;
}

export function typeAccordion(typesFilters, typesFrequencies, onSelect){
    const dd = typesFilters.map(o => {
        return {id: o.value, 
                parent: o['parent-value'] || '0.0',
                name: o.label, 
                value: typesFrequencies[o.value]};});
    dd.unshift({id: '0.0', parent:'', name:'all', value: 1800 })
    const finder = (x) => {
        if(!x) return;
        const h = typesFilters.find(y => y.value === x); 
        h.id= h.value;
    return h;};

    return sunburstChart('Explore the TSM by Type', dd, false, finder, onSelect);
}

export function sectorAccordion(sectorFilters, sectorFrequencies, handleOpen){
    const dd = sectorFilters.map(o => {
        return {id: o.value, 
                parent: o['parent-value'] || '0.0',
                name: o.label, 
                value: sectorFrequencies[o.value]};});
      dd.unshift({id: '0.0', parent:'', name:'all', value: 1800 });
      const finder = (x) => {
          if(!x) return;
          const h = sectorFilters.find(y => y.value === x); 
        h.id= h.value;
    return h;};                    
    return sunburstChart('Explore the TSM by Sector', dd, true, finder, handleOpen);
}
const mockSelection = (x) => {console.log('mockSelection', x); return x; };

export function thematicFocusAccordion(thematicFocusFilters, thematicFocusFrequencies, onSelect){
    const cats = thematicFocusFilters.map( o => o.name);
    const datt = thematicFocusFilters.map( o => thematicFocusFrequencies[o.kw]); 
    const finder = (x) => thematicFocusFilters.find(y => y.name === x);
    return barChart('Explore the TSM by Thematic Focus', cats, datt, finder, onSelect);
}
const mockFinder = (x) => {console.log('mockFinder', x); return x;};
export function approvalsAccordion(approvals, onYear){
    const catt = approvals.map(o => o.label);
    const datt = approvals.map(o => o.count || 0);
    return barChart('Explore the TSM by Approval Year', catt, datt, mockFinder, onYear);
}
export function activesAccordion(actives, onYear){
    const catt = actives.map(o => o.label);
    const datt = actives.map(o => o.count || 0);
    return barChart('Explore the TSM by Active Year', catt, datt, mockFinder, onYear);
}

