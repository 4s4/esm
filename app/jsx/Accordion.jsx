import {pieChart, barChart, sunburstChart} from './Charts';
import WorldMap from './WorldMap';
import RegionsMap from './RegionsMap';

export function geoRegionAccordion(regionsFilters, regionsFrequencies){
//    const catt = regionsFilters.filter(o => o["parent-value"]==="0").map(o => o.label);
//    const datt = regionsFilters.filter(o => o["parent-value"]==="0").map(o => regionsFrequencies[o.value]);
//    console.log('geoRegionAccordion', catt, datt);
    // pieChart(400, 400, catt, datt)
    return [null, 'wide', true, RegionsMap];
}

export function ecoRegionAccordion(regionsFilters, regionsFrequencies, onClick, selections){
    const catt = regionsFilters.filter(o => o["parent-value"]==="1").map(o => o.label);
    const datt = regionsFilters.filter(o => o["parent-value"]==="1").map(o => {        
        return {count: regionsFrequencies[o.value],
                value: o.value}});
    return pieChart('Economical Regions', 400, 400, catt, datt, onClick, selections);
}

export function countryAccordion(countryFilters, countriesFrequencies){
    // const dict = new Set(Object.keys(countriesFrequencies));
    // const base = countryFilters.filter(o => dict.has(o.value));
    // const catt = base.map(o => o.label);
    // const datt = base.map(o => countriesFrequencies[o.value] || 0);
    // barChart(400, 400, catt, datt)
    return [null,'wide', true, WorldMap];
}

export function typeAccordion(typesFilters, typesFrequencies){
    const dd = typesFilters.map(o => {
        return {id: o.value, 
                parent: o['parent-value'] || '0.0',
                name: o.label, 
                value: typesFrequencies[o.value]};});
    dd.unshift({id: '0.0', parent:'', name:'all', value: 1800 })
            
    return [sunburstChart(500, 500, dd), 'very wide', true];
}

export function sectorAccordion(sectorFilters, sectorFrequencies){
    const dd = sectorFilters.map(o => {
        return {id: o.value, 
                parent: o['parent-value'] || '0.0',
                name: o.label, 
                value: sectorFrequencies[o.value]};});
      dd.unshift({id: '0.0', parent:'', name:'all', value: 1800 })                    
    return[sunburstChart(500, 500, dd),'very wide', true];
}

export function thematicFocusAccordion(thematicFocusFilters, thematicFocusFrequencies){
    const cats = thematicFocusFilters.map( o => o.name);
    const datt = thematicFocusFilters.map( o => thematicFocusFrequencies[o.kw]); 
    return [barChart(400, 400, cats, datt), 'very wide', true, WorldMap];
}

export function approvalsAccordion(approvals){
    const catt = approvals.map(o => o.label);
    const datt = approvals.map(o => o.count || 0);
    return [barChart(400, 400, catt, datt),'wide', true, WorldMap];
}
export function activesAccordion(actives){
    const catt = actives.map(o => o.label);
    const datt = actives.map(o => o.count || 0);
    return [barChart(400, 400, catt, datt),'wide', true, WorldMap];
}

