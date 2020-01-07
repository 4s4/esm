import React, {Component} from 'react'
import {geoRegionAccordion, ecoRegionAccordion, countryAccordion, typeAccordion, sectorAccordion, thematicFocusAccordion, approvalsAccordion, activesAccordion} from './Accordion';
const cljs = require('../../js/cljs.js');
import ThematicFocus from './ThematicFocus';
import WorldMap from './WorldMap';
import SunCharty from './SunCharty';
import Charty from './Charty';
import {items} from './Query';
import Highcharts from 'highcharts';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion/Accordion';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';


import {rightOption, centerOption, tableData} from './TableResults';

class Arma extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visibleOptions:false, 
          direction:null, 
          column:null, 
          data: tableData, 
          activeItem: 'section1', 
          activeIndex:1, 
          sidebar:true, 
          leftSidebarWidth:'wide' , 
          rigthSidebarWidth:'wide',
          leftSidebarVisible:true, 
          m: WorldMap
          };
        this.handleAccordion = this.handleAccordion.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.onAccordionSelectChange = this.onAccordionSelectChange.bind(this);
        this.ecoRegionsClick = this.ecoRegionsClick.bind(this);
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
            return {frequencies, reports: props.reports, approvals, actives};
        }
        return state;
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
            let [chartConfig, rightSidebarWidth, rightSidebarVisible, m] = geoRegionAccordion(filters.regions, frequencies.regions);
            this.setState({ isSunburst: false, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig, m})
            return;
          }
          if (index === 11 ) { 
            let chartConfig = ecoRegionAccordion(filters.regions, frequencies.regions, this.ecoRegionsClick, selections.ecoRegions);
            this.setState({ isSunburst: false, chartConfig, activeIndex: newIndex})
            return;
          }
          if (index === 1 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible, m] = countryAccordion(filters.countries, frequencies.countries);
            this.setState({ isSunburst: false, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig, m})
            return;
          }
          if (index === 2 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = sectorAccordion(filters.sectors, frequencies.sectors);
            this.setState({ isSunburst: true, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }

          if (index === 3 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = typeAccordion(filters.types, frequencies.types);
            this.setState({ isSunburst: true, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }
          if (index === 4 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible, m] = activesAccordion(actives);
            this.setState({ isSunburst: false, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig, m})
            return;
          }
          
          if (index === 5 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible, m] = approvalsAccordion(approvals);
            this.setState({ isSunburst: false, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig, m})
            return;
          }

          if (index === 6 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible, m] = thematicFocusAccordion(filters.thematicsFocus, frequencies.thematicsFocus);
            this.setState({ isSunburst: false, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig, m})
            return;
          }

      }
      

      handleItemClick (e, { name }) { this.setState({ activeItem: name })}

      innerMenu(where, activeItem){
        return (<Menu attached={where}>
        <Menu.Item
          name='section1'
          active={activeItem === 'section1'}
          onClick={this.handleItemClick}
        >
          Section 1
        </Menu.Item>

        <Menu.Item
          name='section2'
          active={activeItem === 'section2'}
          onClick={this.handleItemClick}
        >
          Section 2
        </Menu.Item>
        </Menu>
);
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

      handleSort(clickedColumn) {
      return function() {
        const { column, data, direction } = this.state
    
        if (column !== clickedColumn) {
          this.setState({
            column: clickedColumn,
            data: data, //_.sortBy(data, [clickedColumn]),
            direction: 'ascending',
          })
    
          return
        }
    
        this.setState({
          data: data.reverse(),
          direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
      }
    }
    
      reportsTable(column, data, direction){
        return ( <Table sortable fixed striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width='12'
                sorted={column === 'age' ? direction : null}
                onClick={this.handleSort('age')}
              >
                Document
              </Table.HeaderCell>
              <Table.HeaderCell width='4'
                sorted={column === 'gender' ? direction : null}
                onClick={this.handleSort('gender')}
              >
                Type/Year/Period/Region/Country
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(({id, co, ro }) => (
              <Table.Row key={id}>
                <Table.Cell>{co}</Table.Cell>
                <Table.Cell textAlign='right'>{ro}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>);

      }

     onAccordionSelectChange (t, d){
       this.props.onSelectChange(t, d);
       const { filters } = this.props;
       const { frequencies } = this.state
      console.log('onAccordionSelectChange', t, d);
       if(t === 'ecoRegion'){
        console.log('onAccordionSelectChange', 'ecoRegion');
        this.setState({ 
          isSunburst: false, 
          chartConfig: ecoRegionAccordion(filters.regions, frequencies.regions, this.ecoRegionsClick, d)})
       }     
     }

     render (){
        const {  reports, approvals, activeItem, activeIndex,
        chartConfig, isSunburst, frequencies , m} = this.state
        const { filters, onCheck, query, selections, results, onYear } = this.props;
        const Element = m;
//        console.log('query', query);
//        console.log('selections', selections);
//       console.log('results', results);

      return (
        <div style={{height:'100%'}}>
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
            <Segment basic style={{height:"100%"}}>
              {Object.keys(query).length > 0 && <Segment>
              <Header as='h2'>
                <Icon name='search' />
                <Header.Content>Current Query: </Header.Content>            
              </Header>
              <Card.Group items={items(query, selections, results, filters.thematicsFocus)} itemsPerRow="8" stackable/>
              </Segment>}

            {this.innerMenu('top', activeItem)}
            {activeItem === 'section2' && 
            <Segment attached> {this.reportsTable(this.state.column, this.state.data, this.state.direction)}</Segment> }
            {activeItem === 'section1' && 
            <Segment attached>
        { chartConfig ? 
          isSunburst ? 
         <SunCharty Highcharts={Highcharts} chartOpts={chartConfig}/> 
         : 
         <Charty  Highcharts={Highcharts} chartOpts={chartConfig}/> 
         :
         <Element countries={filters && filters.countries} frequencies={frequencies && frequencies.countries}/>
         }
              
              
              </Segment> }
            {this.innerMenu('bottom', activeItem)}
            </Segment>
            </Grid.Column>
        </Grid>
          </div>
      )
    }
    }
export default Arma;
