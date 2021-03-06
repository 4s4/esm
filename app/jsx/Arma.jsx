import React, {Component} from 'react'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion/Accordion';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';
import Portal from 'semantic-ui-react/dist/commonjs/addons/Portal/Portal';

import { ecoRegionAccordion} from './Accordion';
import {activeTab, approvalTab, sectorTab, typeTab, ecoRegionTab, geoRegionTab, countryTab, thematicFocusTab} from './AccordionTab';
const cljs = require('../../js/cljs.js');
import WorldMap from './maps/WorldMap';
import SunCharty from './charts/SunCharty';
import Charty from './charts/Charty';
import {items} from './Query';
import Highcharts from 'highcharts';

import TableResults from './TableResults';
const analytics = window.analytics;
import {look} from './utils';
import RegionsMap from './maps/RegionsMap';
import logLevel from 'loglevel';
var log = logLevel.getLogger("Arma");
log.setLevel("INFO");
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
            const newState = {
              isSunburst: false,
              activeIndex:  1,
//              mapConfig: {frequencies: cljs.countCountries().countries}, 
              version: props.version, 
              dicts: props.dicts, 
              selections: props.selections, 
              combinedResults: props.combinedResults};
              look('Arma/getDerivedStateFromProps', t0);

            return newState;
        }
        return state;
      }
      componentDidMount(){
        const t0 = performance.now();

        // this.setState({ isSunburst: false, 
        //                 activeIndex:  1,
        //                 mapConfig: {frequencies: cljs.countCountries().countries}, 
        //                             chartConfig:null, 
        //                             m: WorldMap});
       look('Arma/componentDidMount', t0);

      }
      splitSearch(kw){
        log.debug('splitSearch', kw, this.props.results)

        if(kw){
          analytics('ShowSplittedQueryResults', {resultsSize: this.props.results[kw].length});
          this.setState({splitSearchKey:kw, splitSearchResults:this.props.results[kw], showCombinedResults:false})
        } else {
          this.setState({splitSearchResults:null, splitSearchKey:null});
        }
      }
      onChangeSelect(t, d){
        const {  selections, onSelectChange } = this.props;
        log.debug('onChangeSelect', t, d);

        let kks;        
        switch(t){
          case 'country': kks = ['countries', 'countries',cljs.countries]; break;
          case 'geoRegion': kks = ['regions', 'geoRegions', cljs.regions]; break;
          case 'ecoRegion': kks = ['regions', 'ecoRegions', cljs.regions]; break;
          case 'type': kks = ['types', 'types', cljs.types]; break;
          case 'sectors': kks = ['sectors', 'sectors', cljs.sectors]; break;
          default:
            log.debug('ERROR', 'type not expected!', t);        
        } 
        const filters_ = kks[2]();
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
        log.debug('accordion selected', index);
        this.setState({showCombinedResults: false, splitSearchResults:null, splitSearchKey:null});
        log.debug('index', index);
      }


      accordion(activeIndex, onCheck,  onSelectChange, onYear, selections){
        const panels = [
          countryTab.bind(this)(activeIndex, selections,   onSelectChange),                    

              geoRegionTab.bind(this)(activeIndex, selections,  onSelectChange),                    
              ecoRegionTab.bind(this)(activeIndex, selections,  onSelectChange),                    
              typeTab.bind(this)(activeIndex, selections,  onSelectChange),                    
              sectorTab.bind(this)(activeIndex, selections,  onSelectChange),                    
              activeTab.bind(this)(activeIndex, selections,  onYear),                    
              approvalTab.bind(this)(activeIndex, selections,  onYear),
              thematicFocusTab.bind(this)(activeIndex, selections,  onCheck)];
        () => {}
        log.debug('selections', selections);
        return (<Accordion styled onTitleClick={this.handleAcoordionTitleClick} panels={panels}>
                </Accordion>);
      }


     onAccordionSelectChange (t, d){
       this.props.onSelectChange(t, d);
       const { filters } = this.props;
       const { frequencies } = this.state
      log.debug('onAccordionSelectChange', t, d);
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
      log.debug('handle open sector', sector); 
      this.setState({ open: true, selectedSector: sector })}
   
     render (){
        const { splitSearchKey, splitSearchResults, selectedSector, open, activeIndex,
        chartConfig, isSunburst,  m, combinedResults, mapConfig} = this.state
        const { filters, onCheck, query, selections, results, onYear  } = this.props;
        const Element = m;
       log.debug('query', query);
       log.debug('splitSearchResults', splitSearchResults);
//        log.debug('selections', selections);
//       log.debug('results', results);
          let { showCombinedResults } = this.state
          log.debug('showCombinedResults', showCombinedResults, 'combinedResuls', combinedResults && combinedResults.length);
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
          {this.accordion(activeIndex, onCheck, this.onAccordionSelectChange, onYear, selections)}
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
