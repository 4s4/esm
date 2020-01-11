import React, {Component} from 'react'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion/Accordion';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';
import {geoRegionAccordion, ecoRegionAccordion, countryAccordion, typeAccordion, sectorAccordion, thematicFocusAccordion, approvalsAccordion, activesAccordion} from './Accordion';
const cljs = require('../../js/cljs.js');
import ThematicFocus from './ThematicFocus';
import WorldMap from './maps/WorldMap';
import SunCharty from './charts/SunCharty';
import Charty from './charts/Charty';
import {items} from './Query';
import Highcharts from 'highcharts';

import TableResults from './TableResults';

class Arma extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visibleOptions:false, 
          direction:null, 
          column:null, 
          activeIndex:1, 
          sidebar:true, 
          leftSidebarWidth:'wide' , 
          rigthSidebarWidth:'wide',
          leftSidebarVisible:true, 
          m: WorldMap
          };
        this.handleAccordion = this.handleAccordion.bind(this);
        this.onAccordionSelectChange = this.onAccordionSelectChange.bind(this);
        this.ecoRegionsClick = this.ecoRegionsClick.bind(this);
        this.onChangeMapCountry = this.onChangeMapCountry.bind(this);
        this.showCombinedResults = this.showCombinedResults.bind(this);
      }

      static getDerivedStateFromProps(props, state) {
        if (
          props.reports !== state.reports 
        ) {
            let approvals = cljs.approvalYears(props.reports);
            let actives = cljs.activeYears(props.reports);
            const tt = cljs.countThematicFocus(props.reports, props.filters.thematicsFocus);
            const frequencies = cljs.countSelects(props.reports, props.filters.types, props.filters.sectors, props.filters.regions);
            frequencies.thematicsFocus = tt;
            console.log('frequencies', frequencies);
            console.log('filters', props.filters)
            return {frequencies, reports: props.reports, approvals, actives, combinedResults: props.combinedResults};
        }else if(props.combinedResults !== state.combinedResults){
          return {combinedResults: props.combinedResults};
        }
        return state;
      }

      onChangeMapCountry(d){
        const { filters, selections, onSelectChange } = this.props;
        console.log('onChangeMapCountry', d);
        const reg = filters.countries.find(c => c.value===d.id);
        let data = selections.countries;
        if(data.find(d => d.value === reg.value) === undefined){
          data.push(reg);
        } else {
          data = data.filter(d => d.value !== reg.value);
        }
        onSelectChange('country', data);       
      }

      ecoRegionsClick(d){
        const { filters, selections, onSelectChange } = this.props;
        const reg = filters.regions.find(r => r.value === d.id);
        let data = selections.ecoRegions;
        if(data.find(d => d.value === reg.value) === undefined){
          data.push(reg);
        } else {
          data = data.filter(d => d.value !== reg.value);
        }
        onSelectChange('ecoRegion', data); 
      }
      
      handleAccordion (e, titleProps) {
        console.log('accordion selected', titleProps.index, titleProps.active );

        const { index } = titleProps;
        const { activeIndex, frequencies, actives, approvals } = this.state;      
        const newIndex = activeIndex === index ? -1 : index
        const {filters, selections} = this.props;

        console.log('index', index);
          if (index === 0 ) { 
            let  m = geoRegionAccordion(filters.regions, frequencies.regions);
            this.setState({ isSunburst: false, activeIndex: newIndex, chartConfig: null, m})
            return;
          }
          if (index === 11 ) { 
            let chartConfig = ecoRegionAccordion(filters.regions, frequencies.regions, this.ecoRegionsClick, selections.ecoRegions);
            this.setState({ isSunburst: false, chartConfig, activeIndex: newIndex})
            return;
          }
          if (index === 1 ) { 
            let m = countryAccordion(filters.countries, frequencies.countries);
            this.setState({ isSunburst: false, activeIndex: newIndex,  chartConfig:null, m})
            return;
          }
          if (index === 2 ) { 
            let chartConfig = sectorAccordion(filters.sectors, frequencies.sectors);
            this.setState({ isSunburst: true, activeIndex: newIndex, chartConfig})
            return;
          }

          if (index === 3 ) { 
            let chartConfig = typeAccordion(filters.types, frequencies.types);
            this.setState({ isSunburst: true, activeIndex: newIndex, chartConfig})
            return;
          }
          if (index === 4 ) { 
            let chartConfig  = activesAccordion(actives);
            this.setState({ isSunburst: false, activeIndex: newIndex,  chartConfig})
            return;
          }
          
          if (index === 5 ) { 
            let chartConfig  = approvalsAccordion(approvals);
            this.setState({ isSunburst: false, activeIndex: newIndex,  chartConfig})
            return;
          }

          if (index === 6 ) { 
            let chartConfig = thematicFocusAccordion(filters.thematicsFocus, frequencies.thematicsFocus);
            this.setState({ isSunburst: false, activeIndex: newIndex, chartConfig})
            return;
          }

      }
      
      accordion(activeIndex, filters, approvals, onCheck, reports, onSelectChange, onYear, selections){
        console.log('selections', selections);
        return (<Accordion styled onTitleClick={this.handleAcoordionTitleClick}>
                  <Accordion.Title
                    index={1}
                    active={activeIndex === 1}
                    onClick={this.handleAccordion}
                  >
                  <Icon name='dropdown' />
                  Country
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 1}>
                  <Dropdown
                    placeholder='Country'
                    fluid
                    multiple
                    search
                    selection
                    value={selections.countries.map(o => o.value)}
                    onChange={(ev, o) => onSelectChange('country', o.value.map(id => o.options.find( e => e.value === id)))}
                    options={filters.countries && filters.countries.map(o => {return {text: o.label, value: o.value}})}
                  />
                  </Accordion.Content> 
                  <Accordion.Title
                    index={0}
                    active={activeIndex === 0}
                    onClick={this.handleAccordion}
                    >
                    <Icon name='dropdown' />
                    Geographical Region
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0}>
                  <Dropdown
                    placeholder='Region'
                    fluid
                    multiple
                    search
                    selection
                    onChange={(ev, o) => onSelectChange('geoRegion', o.value.map(id => o.options.find( e => e.value === id)))}
                    options={filters.regions && filters.regions.filter(o => o["parent-value"]==="0").map(o => {return {text: o.label, value: o.value}})}
                  />
                </Accordion.Content>
                  <Accordion.Title
                    index={11}
                    active={activeIndex === 11}
                    onClick={this.handleAccordion}
                  >
        <Icon name='dropdown' />
        Economical Region
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 11}>
                    <Dropdown
                      placeholder='Region'
                      fluid
                      multiple
                      search
                      selection
                      value={selections.ecoRegions.map(o => o.value)}
                      onChange={(ev, o) => onSelectChange('ecoRegion', o.value.map(id => o.options.find( e => e.value === id)))}
                      options={filters.regions && filters.regions.filter(o => o["parent-value"]==="1").map(o => {return {text: o.label, value: o.value, countries: o.countries}})}
                    />
                  </Accordion.Content>   
                  <Accordion.Title
                    index={2}
                    active={activeIndex === 2}
                    onClick={this.handleAccordion}
                              >
                    <Icon name='dropdown' />
                    Sector
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 2}>
                    <Dropdown
                      placeholder='Sector'
                      fluid
                      multiple
                      search
                      selection
                      onChange={(ev, o) => onSelectChange('sectors', o.value.map(id => o.options.find( e => e.value === id)))}
                      options={filters.sectors && filters.sectors.map(o => {return {text: o.label, value: o.value, className:`dropdown-level-${o.level}`}})}
                    />
                  </Accordion.Content> 
                  <Accordion.Title
                    index={3}
                    active={activeIndex === 3}
                    onClick={this.handleAccordion}
                    >
                    <Icon name='dropdown' />
                    Type
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 3}>
                    <Dropdown
                      placeholder='Type'
                      fluid
                      multiple
                      search
                      selection
                      onChange={(ev, o) => onSelectChange('type', o.value.map(id => o.options.find( e => e.value === id)))}
                      options={filters.types && filters.types.map(o => {return {text: o.label, value: o.value, className:`dropdown-level-${o.level}`}})}
                    />
                  </Accordion.Content> 
                  <Accordion.Title
                    index={4}
                    active={activeIndex === 4}
                    onClick={this.handleAccordion}
                  >
                    <Icon name='dropdown' />
                    Active year
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 4}>
                    <Dropdown
                      placeholder='Year'
                      fluid
                      search
                      selection
                      clearable
                      onChange={(ev, o) => onYear('active_year', o)}
                      options={this.state.actives && this.state.actives.map(o => {return {text: o.label, value: o.value}})}
                    />
                  </Accordion.Content> 
                  <Accordion.Title
                    index={5}
                    active={activeIndex === 5}
                    onClick={this.handleAccordion}
                  >
                    <Icon name='dropdown' />
                    Approval year
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 5}>
                    <Dropdown
                      placeholder='Year'
                      fluid
                      search
                      selection
                      clearable
                      onChange={(ev, o) => onYear('approval_year', o)}
                      options={approvals && approvals.map(o => {return {text: o.label, value: o.value}})}
                    />
                  </Accordion.Content> 
                  <Accordion.Title
                    index={6}
                    active={activeIndex === 6}
                    onClick={this.handleAccordion}
                  >
                    <Icon name='dropdown' />
                    Thematic Focus
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 6}>
                    <ThematicFocus reports={reports} 
                            thematicsFocus={filters.thematicsFocus}                          
                            onCheck={onCheck}
                    />
                  </Accordion.Content> 
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
          chartConfig: ecoRegionAccordion(filters.regions, frequencies.regions, this.ecoRegionsClick, d)})
       } else if (t === 'country'){
       // TODO

       }     
     }
     showCombinedResults(v){
       return () => {
         if(this.state.showCombinedResults!==v){
          this.setState({showCombinedResults:v})
         }
       };
     }
     render (){
        const {  reports, approvals, activeIndex,
        chartConfig, isSunburst, frequencies , m, showCombinedResults, combinedResults} = this.state
        const { filters, onCheck, query, selections, results, onYear  } = this.props;
        const Element = m;
//        console.log('query', query);
//        console.log('selections', selections);
//       console.log('results', results);
          console.log('combinedResuls', combinedResults);
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
              <Card.Group items={items(query, selections, results, filters.thematicsFocus, this.onChangeMapCountry)} itemsPerRow="8" stackable />
            </Segment>}
          
           {true && reports ?
            <TableResults column={this.state.column} data={reports} filters={filters} direction={this.state.direction} />
           :            
            chartConfig ? 
              isSunburst ? 
                <SunCharty Highcharts={Highcharts} chartOpts={chartConfig}/> 
              : 
                <Charty  Highcharts={Highcharts} chartOpts={chartConfig}/> 
              :
              <Element 
              onChangeCountry={this.onChangeMapCountry}
              countries={filters && filters.countries} 
              frequencies={frequencies && frequencies.countries}/>
            }
          
          </Grid.Column>
        </Grid>
      )
    }
    }
export default Arma;
