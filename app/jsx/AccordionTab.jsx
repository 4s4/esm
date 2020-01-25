import React from 'react'
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';

import {tab, ecoRegionAccordion, typeAccordion, sectorAccordion, thematicFocusAccordion, approvalsAccordion, activesAccordion} from './Accordion';
import RegionsMap from './maps/RegionsMap';

const cljs = require('../../js/cljs.js');
const analytics = window.analytics;
import {look} from './utils';

function activeContent (selections, reports, activeIndex, onYear){
    if (activeIndex === 4) {
      const actives = cljs.activeYears();
      return <Dropdown placeholder='Year'
      fluid search selection clearable
      value={selections.active_year !== undefined ? selections.active_year : null}
      onChange={(ev, o) => onYear('active_year', o)}
      options={actives && actives.map(o => {return {text: o.label, value: o.value}})}
    />
    } else { return ''}
  }
export function activeTab(activeIndex, selections, reports, onYear){
    console.log("elapsed ... ", activeIndex === 4);
    return tab.bind(this)(4, activeIndex, 
    <span>Active year</span>,
    activeContent.bind(this)(selections, reports, activeIndex, onYear),
    (x, o) => {
      console.log('yuhu', o.active, o.index)                          
      const t0 = performance.now();    
      let chartConfig  = activesAccordion(cljs.activeYears(), o => onYear('active_year', {value: o}));            
      this.setState({ isSunburst: false, 
                      activeIndex:  o.active ? null : 4,
                      mapConfig: null, 
                      chartConfig,
                       m: null});
      this.handleAccordion(4); 
      look('Accordion/activesTab', t0);                
  });}

function approvalContent (selections, reports, activeIndex, onYear){
      if (activeIndex === 5) {
        const approvals = cljs.approvalYears();
        return <Dropdown placeholder='Year'
        fluid search selection clearable
        value={selections.approval_year !== undefined ? selections.approval_year : null}
        onChange={(ev, o) => onYear('approval_year', o)}
        options={approvals && approvals.map(o => {return {text: o.label, value: o.value}})}
      />
      } else { return ''}
  }
export function  approvalTab(activeIndex, selections, reports, onYear){
      return tab.bind(this)(5, activeIndex, 
      <span>Approval year</span>, 
      approvalContent.bind(this)(selections, reports, activeIndex, onYear),
       
      (x, o) => {
        console.log('yuhu', o.active, o.index);
        const approvals = cljs.approvalYears();                         
        const t0 = performance.now(); 
        let chartConfig  = approvalsAccordion(approvals, o => this.props.onYear('approval_year', {value: o}));
        this.setState({ isSunburst: false, 
                        activeIndex:  o.active ? null : 5,
                        mapConfig: null, 
                        chartConfig,
                         m: null});
        this.handleAccordion(5); 
        look('Accordion/approvalsTab', t0);                
  });}

function sectorContent (selections, activeIndex, onSelectChange){
    if (activeIndex === 2) {
      const sectors = cljs.sectors();
      return     <Dropdown placeholder='Sector'
      fluid multiple search selection
      value={selections.sectors.map(o => o.value)}
      onChange={(ev, o) => onSelectChange('sectors', o.value.map(id => o.options.find( e => e.value === id)))}
      options={sectors && sectors.map(o => {return {text: o.label, value: o.value, className:`dropdown-level-${o.level}`}})}
    />;
    } else { return ''}
}

export function sectorTab(activeIndex, selections, reports, onSelectChange){
    return tab.bind(this)(2, activeIndex, 
    <span>Sector</span>, 
    sectorContent.bind(this)(selections, activeIndex, onSelectChange),
    (x, o) => {
        console.log('yuhu', o.active, o.index)                          
        const t0 = performance.now();         
        let chartConfig = sectorAccordion(cljs.sectors(), cljs.countSectors().sectors, this.handleOpen);
  
        this.setState({ isSunburst: true, 
                        activeIndex:  o.active ? null : 2,
                        mapConfig: null, 
                        chartConfig,
                         m: null});
        this.handleAccordion(2); 
        look('Accordion/sectorsTab', t0);                
});}


function typeContent (selections, activeIndex, onSelectChange){
    if (activeIndex === 3) {
      const types = cljs.types();
      return     <Dropdown placeholder='Type'
      fluid multiple search selection
      value={selections.types.map(o => o.value)}
      onChange={(ev, o) => onSelectChange('type', o.value.map(id => o.options.find( e => e.value === id)))}
      options={types && types.map(o => {return {text: o.label, value: o.value, className:`dropdown-level-${o.level}`}})}
    />;
    } else { return ''}
}

export function typeTab(activeIndex, selections, reports, onSelectChange){
    return tab.bind(this)(3, activeIndex, 
    <span>Type</span>, 
    typeContent.bind(this)(selections, activeIndex, onSelectChange),
    (x, o) => {
        console.log('yuhu', o.active, o.index)                          
        const t0 = performance.now();    
        let chartConfig = typeAccordion(cljs.types(), cljs.countTypes().types, this.onChangeSelect);                                 
        this.setState({ isSunburst: true, 
                        activeIndex:  o.active ? null : 3,
                        mapConfig: null, 
                        chartConfig,
                         m: null});
        this.handleAccordion(3); 
        look('Accordion/typeTab', t0);                
      });}


function ecoRegionContent (selections, activeIndex, onSelectChange){
    if (activeIndex === 11) {
        const ecoRegions = cljs.regions();
        return <Dropdown placeholder='Region'
        fluid multiple search selection
        value={selections.ecoRegions.map(o => o.value)}
        onChange={(ev, o) => onSelectChange('ecoRegion', o.value.map(id => o.options.find( e => e.value === id)))}
        options={ecoRegions && ecoRegions.filter(o => o["parent-value"]==="1").map(o => {return {text: o.label, value: o.value, countries: o.countries}})}
    />;
    } else { return ''}
}

export function ecoRegionTab(activeIndex, selections, reports, onSelectChange){
    return tab.bind(this)(11, activeIndex, 
    <span  >Economical Region</span>, 
        ecoRegionContent.bind(this)(selections, activeIndex, onSelectChange),
        (x, o) => {
        console.log('yuhu', o.active, o.index)                          
        const t0 = performance.now();                 
        this.setState({ isSunburst: false, 
                        activeIndex:  o.active ? null : 11,
                        mapConfig: null, 
                        chartConfig:ecoRegionAccordion(cljs.regions(), 
                            cljs.countRegions().regions, 
                            this.ecoRegionsClick, selections.ecoRegions),
                            m: null});
        this.handleAccordion(11); 
        look('Accordion/ecoRegionsTab', t0);                
        }
);}
          
function geoRegionContent (selections, activeIndex, onSelectChange){
    if (activeIndex === 0) {
        const regions = cljs.regions();
        return <Dropdown placeholder='Region'
        fluid multiple search selection
        value={selections.geoRegions.map(o => o.value)}
        onChange={(ev, o) => onSelectChange('geoRegion', o.value.map(id => o.options.find( e => e.value === id)))}
        options={regions && regions.filter(o => o["parent-value"]==="0").map(o => {return {text: o.label, value: o.value}})}
/>;
    } else { return ''}
}
                
export function geoRegionTab(activeIndex, selections, reports, onSelectChange){
    return tab.bind(this)(0, activeIndex, 
    <span  >Geographical Region</span>, 
        geoRegionContent.bind(this)(selections, activeIndex, onSelectChange),
        (x, o) => {
            console.log('yuhu', o.active, o.index)                          
            const t0 = performance.now();                
            this.setState({ isSunburst: false, 
                            activeIndex:  o.active ? null : 0,
                            mapConfig: {frequencies: cljs.countCountries().countries}, 
                                        chartConfig:null, m: RegionsMap});
            this.handleAccordion(0); 
            look('Accordion/geoRegionsTab', t0);                
            }
        
);}
                