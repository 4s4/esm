import React, {Component} from 'react'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion/Accordion';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';
import Portal from 'semantic-ui-react/dist/commonjs/addons/Portal/Portal';

import {tab, ecoRegionAccordion, typeAccordion, sectorAccordion, thematicFocusAccordion, approvalsAccordion, activesAccordion} from './Accordion';
import {activeTab, approvalTab, sectorTab, typeTab, ecoRegionTab, geoRegionTab} from './AccordionTab';
const cljs = require('../../js/cljs.js');
import ThematicFocus from './ThematicFocus';
import WorldMap from './maps/WorldMap';
import SunCharty from './charts/SunCharty';
import Charty from './charts/Charty';
import {items} from './Query';
import Highcharts from 'highcharts';

import TableResults from './TableResults';
const analytics = window.analytics;
import {look} from './utils';

class Arma extends Component {
    constructor(props) {
        super(props);
        this.state = {
          version: -1,
          visibleOptions:false, 
          direction:null, 
          column:null, 
          activeIndex:1, 
          sidebar:true, 
          leftSidebarWidth:'wide' , 
          rigthSidebarWidth:'wide',
          leftSidebarVisible:true, 
          m: WorldMap,
          open:false,
          selectedSector:null,
          splitSearchResults:null,
          splitSearchKey:null
          };
        this.handleAccordion = this.handleAccordion.bind(this);
        this.onAccordionSelectChange = this.onAccordionSelectChange.bind(this);
        this.ecoRegionsClick = this.ecoRegionsClick.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.showCombinedResults = this.showCombinedResults.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.splitSearch = this.splitSearch.bind(this);
        
      }

      static getDerivedStateFromProps(props, state) {
        if (
          props.version !== state.version
        ) {
          const t0 = performance.now();
            look('Arma/getDerivedStateFromProps', t0);
            return {
              version: props.version, 
              dicts: props.dicts, 
              selections: props.selections, 
              combinedResults: props.combinedResults};
        }
        return state;
      }
      
      splitSearch(kw){
        console.log('splitSearch', kw, this.props.results)

        if(kw){
          analytics('ShowSplittedQueryResults', {resultsSize: this.props.results[kw].length});
          this.setState({splitSearchKey:kw, splitSearchResults:this.props.results[kw], showCombinedResults:false})
        } else {
          this.setState({splitSearchResults:null, splitSearchKey:null});
        }
      }

      onChangeSelect(t, d){
        const { filters, selections, onSelectChange } = this.props;
        console.log('onChangeSelect', d);
        let kks;        
        switch(t){
          case 'country': kks = ['countries', 'countries']; break;
          case 'geoRegion': kks = ['regions', 'geoRegions']; break;
          case 'ecoRegion': kks = ['regions', 'ecoRegions']; break;
          case 'type': kks = ['types', 'types']; break;
          case 'sectors': kks = ['sectors', 'sectors']; break;
          default:
            console.log('ERROR', 'type not expected!', t);        
        } 
        const filters_ = filters[kks[0]];
        let reg = filters_.find(c => c.value === d.id);
        let data = selections[kks[1]];
        if(data.find(d => d.value === reg.value) === undefined){
          data.push(reg);
        } else {
          data = data.filter(d => d.value !== reg.value);
        }
        onSelectChange(t, data);       
      }

      ecoRegionsClick(d){
        const { selections, onSelectChange } = this.props;
        const reg = cljs.regions().find(r => r.value === d.id);
        let data = selections.ecoRegions;
        if(data.find(d => d.value === reg.value) === undefined){
          data.push(reg);
        } else {
          data = data.filter(d => d.value !== reg.value);
        }
        onSelectChange('ecoRegion', data); 
      }
      
      handleAccordion (index) {
        console.log('accordion selected', index);
        this.setState({showCombinedResults: false, splitSearchResults:null, splitSearchKey:null});
        console.log('index', index);
      }


      accordion(activeIndex, filters, approvals, onCheck, reports, onSelectChange, onYear, selections){
        const panels = [
          tab.bind(this)(1, activeIndex, 
                        <span>Country</span>, 
                        <Dropdown placeholder='Country'
                                  fluid multiple search selection
                                  value={selections.countries.map(o => o.value)}
                                  onChange={(ev, o) => onSelectChange('country', o.value.map(id => o.options.find( e => e.value === id)))}
                                  options={cljs.countries() && cljs.countries().map(o => {return {text: o.label, value: o.value}})}
                        />,
                        (x, o) => {
                          console.log('yuhu', o.active, o.index)                          
                          const t0 = performance.now();                
                          this.setState({ isSunburst: false, 
                                          activeIndex:  o.active ? null : 1,
                                          mapConfig: {frequencies: cljs.countCountries().countries}, 
                                                      chartConfig:null, m: WorldMap});
                          this.handleAccordion(1); 
                          look('Accordion/countryTab', t0);                
                        }),
              geoRegionTab.bind(this)(activeIndex, selections, reports, onSelectChange),                    
              ecoRegionTab.bind(this)(activeIndex, selections, reports, onSelectChange),                    
              typeTab.bind(this)(activeIndex, selections, reports, onSelectChange),                    
                sectorTab.bind(this)(activeIndex, selections, reports, onSelectChange),                    
                activeTab.bind(this)(activeIndex, selections, reports, onYear),                    
                    approvalTab.bind(this)(activeIndex, selections, reports, onYear),
                    tab.bind(this)(6, activeIndex, 
                      <span>Thematic Focus</span>, 
                      <ThematicFocus reports={reports} 
                          version={this.state.version}
                          thematicsFocus={cljs.thematicFocus()}                          
                          selections={selections}
                          onCheck={onCheck}
                          />, 
                      (x, o) => {
                        console.log('yuhu', o.active, o.index)                          
                        const t0 = performance.now();    
                        let chartConfig = thematicFocusAccordion(cljs.thematicFocus(), 
                          cljs.countThematicFocus(cljs.thematicFocus()), 
                          (o) => this.props.onCheck(o.kw, {checked: true}));
                        this.setState({ isSunburst: false, 
                                        activeIndex:  o.active ? null : 6,
                                        mapConfig: null, 
                                        chartConfig,
                                         m: null});
                        this.handleAccordion(6); 
                        look('Accordion/thematicFocusTab', t0);                
                      }),
    
                      
  
                        
          ];
        () => {}
        console.log('selections', selections);
        return (<Accordion styled onTitleClick={this.handleAcoordionTitleClick} panels={panels}>
                </Accordion>);
      }


     onAccordionSelectChange (t, d){
       this.props.onSelectChange(t, d);
       const { filters } = this.props;
       const { frequencies } = this.state
      console.log('onAccordionSelectChange', t, d);
       if(t === 'ecoRegion'){
        this.setState({ 
          isSunburst: false, 
          chartConfig: ecoRegionAccordion(cljs.regions(), frequencies.regions, this.ecoRegionsClick, d)})
       } else if (t === 'country'){
       // TODO

       }     
     }
     showCombinedResults(v){
       return () => {
         if(this.state.showCombinedResults!==v){
          analytics('ShowCombinedQueryResults', {resultsSize: this.state.combinedResults.length});
          this.setState({showCombinedResults:v})
          if(v){
            this.setState({splitSearchResults:null, splitSearchKey:null});
          }
         }
       };
     }
     handleClose(){this.setState({ open: false, selectedSector: null })}
     handleOpen(sector){
      console.log('handle open sector', sector); 
      this.setState({ open: true, selectedSector: sector })}
   
     render (){
        const reports = cljs.reports();
        console.log('oh my ', reports);
        const { splitSearchKey, splitSearchResults, selectedSector, open, approvals, activeIndex,
        chartConfig, isSunburst, frequencies , m, combinedResults, mapConfig} = this.state
        const { filters, onCheck, query, selections, results, onYear  } = this.props;
        const Element = m;
       console.log('query', query);
       console.log('splitSearchResults', splitSearchResults);
//        console.log('selections', selections);
//       console.log('results', results);
          let { showCombinedResults } = this.state
          console.log('showCombinedResults', showCombinedResults, 'combinedResuls', combinedResults && combinedResults.length);
      const finalData = showCombinedResults && combinedResults.length > 0 ? combinedResults : splitSearchResults && splitSearchResults.length > 0 ? splitSearchResults : [];
      const itemsToShow = items(query, selections, results, cljs.thematicFocus(), this.onChangeSelect, onYear, onCheck, this.splitSearch, splitSearchKey);

      return (
       <Grid stackable columns={2}>
       <Grid.Column width={4}>
         <Card
            link
            header='TSM'
            meta='The Trade Strategy Map (TSM) is a repository of strategic policy documents dealing with trade and development issues from around the world.'
            description='Use the options below to search the TSM repository'
          />
          {this.accordion(activeIndex, filters, approvals, onCheck, reports, this.onAccordionSelectChange, onYear, selections)}
        </Grid.Column>

       <Grid.Column width={12}>
              {Object.keys(query).length > 0 && <Segment>
              <Header as='h5' dividing>
              <Button.Group>
                <Button onClick={this.showCombinedResults(false)} color={!showCombinedResults ? 'blue' : 'grey'}>Keep searching</Button>
                <Button.Or />
              <Button onClick={this.showCombinedResults(true)} color={showCombinedResults ? 'blue' : 'grey'}>List query result: {combinedResults && combinedResults.length} docs </Button>
              </Button.Group>
              </Header>
             <Card.Group items={itemsToShow} itemsPerRow={itemsToShow.length < 6 ? 6 : itemsToShow.length} stackable />
            </Segment>}
            <Portal onClose={this.handleClose} open={selectedSector && !selections.sectors.find(s => s.id === selectedSector.id ) && open}>
            <Segment
              style={{
                left: '40%',
                position: 'fixed',
                top: '50%',
                zIndex: 1000,
              }}
            >
     <Header>Would you like to add "{selectedSector && selectedSector.label}" to your search query?</Header>
     <Button
                content='No'
                negative
                onClick={this.handleClose}
              />
              <Button
                content='Yes'
                positive
                onClick={() => { this.onChangeSelect('sectors', selectedSector); this.handleClose();}}
              />
            </Segment>
          </Portal>

           {finalData.length > 0 ?
            <TableResults version={this.state.version} dicts={this.state.dicts} selections={selections} column={this.state.column} data={finalData} filters={filters} direction={this.state.direction} />
           :            
            chartConfig ? 
              isSunburst ? 
                <SunCharty Highcharts={Highcharts} chartOpts={chartConfig}/> 
              : 
                <Charty  Highcharts={Highcharts} chartOpts={chartConfig}/> 
              :
              <Element
              version={this.state.version}
              onChangeMap={this.onChangeSelect}
              countries={cljs.countries()} 
              countrySelections={selections && selections.countries}
              regionsSelections={selections && selections.geoRegions}
              regions={cljs.regions() && cljs.regions().filter(x => x['parent-value'] === '0')} 
              {...mapConfig}
              //frequencies={frequencies && frequencies.countries}
              />
            }
          
          </Grid.Column>
        </Grid>
      )
    }
    }
export default Arma;
