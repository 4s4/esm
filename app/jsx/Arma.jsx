import React, {Component} from 'react'
import { Label, Rail, List, Dropdown, Header, Icon, Image, Card, Menu, Segment, Sidebar, Accordion, Table, Container, Statistic, Divider } from 'semantic-ui-react'
import {geoRegionAccordion, ecoRegionAccordion, countryAccordion, typeAccordion, sectorAccordion, thematicFocusAccordion} from './Accordion';
const cljs = require('../../js/cljs.js');
import ThematicFocus from './ThematicFocus';
import WorldMap from './WorldMap';
import RegionsMap from './RegionsMap';
import Highcharts from 'highcharts/highmaps'
const addSunburst = require('highcharts/modules/sunburst');
import HighchartsReact from 'highcharts-react-official'
const items = [
  {
    header: 'Geographical Region',
    description: 'This option gets: 1000 documents',
    meta: 'selected Oceania',
    extra: (<a><Icon name='user' />22 Friends</a>)
  },
  {
    header: 'Economical Region',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
  {
    header: 'Country',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
  {
    header: 'Sector',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
  {
    header: 'Type',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
  {
    header: 'Active year',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
  {
    header: 'Approval year',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
  {
    header: 'Thematic Focus',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'ROI: 27%',
  },
]


const rightOption = (  
       
<List>
<List.Item>
      <List horizontal link>
        <List.Item><Label color='blue' basic as='b'>Oceania:<Label.Detail >Thailand(THA)</Label.Detail></Label></List.Item>
      </List>
    </List.Item>

    <List.Item>
      <List horizontal link>
        <List.Item><Label basic color='blue' as='b'>Year:<Label.Detail >2014</Label.Detail></Label></List.Item>
      </List>
    </List.Item>
    <List.Item>
      <List horizontal link>
      <List.Item><Label basic color='blue' as='b'>Period:<Label.Detail >2016-2020</Label.Detail></Label></List.Item>
      </List>
    </List.Item>
    <List.Item>
      <List horizontal link>
        <List.Item><Label color='blue' as='b'>Type:<Label.Detail >Terms and Conditions</Label.Detail></Label></List.Item>
      </List>
    </List.Item>
  </List>
);
const centerOption = (  
    <List>
        <List.Item>
          <List.Header>
          <Header as='h3' dividing>
          UNPAF Thailand 2012-2016
          </Header>
          </List.Header>
          The ADB presents the business plan for 2015-2017 with the country partnership strategy, updated country partnership strategy results framework and summary of changes to lending and nonlending programs in the country.

        </List.Item>
        <List.Item>
          <List.Header>Sectors:</List.Header>
          <List horizontal link>
            <List.Item><Label basic color='blue'>Terms and Conditions</Label></List.Item>
            <List.Item><Label basic color='blue'>Privacy Policy</Label></List.Item>
            <List.Item><Label basic color='blue'>Contact Us</Label></List.Item>
          </List>
        </List.Item>
      </List>
    );
  
const tableData = [
  { id:1,  co: centerOption, ro: rightOption },
  { id:2,  co: centerOption, ro: rightOption },
  { id:3, co: centerOption, ro: rightOption },
  { id:4, co: centerOption, ro: rightOption },
]

class Arma extends Component {
    constructor(props) {
        super(props);
        this.state = {visibleOptions:false, direction:null, column:null, data: tableData, activeItem: 'section1', activeIndex:-1, sidebar:true, leftSidebarWidth:'wide' , rigthSidebarWidth:'wide',leftSidebarVisible:true};
        this.handleAccordion = this.handleAccordion.bind(this);
        this.closeSidebars = this.closeSidebars.bind(this);
        this.handleOver = this.handleOver.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
      }

      static getDerivedStateFromProps(props, state) {
        if (
          props.reports !== state.reports 
        ) {
            let approvals = cljs.approvalYears(props.reports);
            const approval_year = approvals.filter( o => o.value === props.approval_year ); 
            let actives = cljs.activeYears(props.reports);
            const active_year = actives.filter( o => o.value === props.active_year ); 
            const tt = cljs.countThematicFocus(props.reports, props.filters.thematicsFocus);
            const frequencies = cljs.countSelects(props.reports, props.filters.types, props.filters.sectors, props.filters.regions);
            frequencies.thematicsFocus = tt;
            console.log('frequencies', frequencies);
            console.log('filters', props.filters)
            return {frequencies, reports: props.reports, approvals, actives, active_year, approval_year};
        }
        return state;
      }
    
      handleAccordion (e, titleProps) {
        console.log('sunnn', addSunburst(Highcharts));

        const { index } = titleProps;
        const { activeIndex, frequencies } = this.state;      
        const newIndex = activeIndex === index ? -1 : index
        const {filters} = this.props;

        console.log('index', index);
          if (index === 0 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = geoRegionAccordion(filters.regions, frequencies.regions);
            this.setState({ isSunburst: false, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }
          if (index === 11 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = ecoRegionAccordion(filters.regions, frequencies.regions);
            this.setState({ isSunburst: false, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }
          if (index === 1 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = countryAccordion(filters.countries, frequencies.countries);
            this.setState({ isSunburst: false, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
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

          if (index === 6 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = thematicFocusAccordion(filters.thematicsFocus, frequencies.thematicsFocus);
            this.setState({ isSunburst: false, activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }
      }
      
      closeSidebars (e) {
        this.setState({ visibleOptions:true, leftSidebarWidth: 'wide', rightSidebarVisible:false, leftSidebarVisible:false })
      }
      handleOptions(e){
        this.setState({visibleOptions:false, leftSidebarVisible:true, leftSidebarWidth: 'wide'});
      }

      handleOver (e) {
          this.setState({ leftSidebarWidth: 'wide' })
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

      accordion(activeIndex, filters, approvals, onCheck, reports){
        return (<Accordion styled>
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
        options={filters.regions && filters.regions.filter(o => o["parent-value"]==="1").map(o => {return {text: o.label, value: o.value}})}
      />
                </Accordion.Content> 
  
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
        options={filters.countries && filters.countries.map(o => {return {text: o.label, value: o.value}})}
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
        options={filters.sectors && filters.sectors.map(o => {return {text: o.label, value: o.value}})}
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
        options={filters.types && filters.types.map(o => {return {text: o.label, value: o.value}})}
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
        multiple
        search
        selection
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
        multiple
        search
        selection
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
  
  
              </Accordion>   
        
  );
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

     render (){
        const { visibleOptions, reports, approvals, activeItem, activeIndex, rightSidebarWidth, rightSidebarVisible,leftSidebarVisible, leftSidebarWidth, chartConfig, isSunburst, frequencies } = this.state
        const { filters, onCheck } = this.props;
        
      return (
        <div style={{height:'100%'}}>{ visibleOptions &&
          <Menu icon vertical >
        <Menu.Item
          name='options' onClick={this.handleOptions}        
        >
          <Icon name='options'  size='small'  />
        </Menu.Item>
      </Menu>
       }<Sidebar.Pushable as={Segment} >
         <Sidebar

            onMouseOver={this.handleOver}
            animation='push'
            onHide={() => console.log('setVisible(false)')}
            visible={leftSidebarVisible}
            width={leftSidebarWidth}
          >
          <Card
            link
            header='TSM'
            meta='The Trade Strategy Map (TSM) is a repository of strategic policy documents dealing with trade and development issues from around the world.'
            description='Use the options below to search the TSM repository'
          />
          {this.accordion(activeIndex, filters, approvals, onCheck, reports)}
          </Sidebar>


          <Sidebar        
            animation='overlay'
            direction='right'
            width={rightSidebarWidth}
            visible={rightSidebarVisible}
          >
         { chartConfig && isSunburst ? <HighchartsReact highcharts={Highcharts} options={chartConfig} /> : 
         <HighchartsReact highcharts={Highcharts} options={chartConfig} />}
          </Sidebar>
          <Sidebar.Pusher onClick={this.closeSidebars}>
          

            <Segment basic onClick={this.closeSidebars} style={{height:"100%"}}>
              <Segment>
                <Header as='h2'>
              <Icon name='search' />
              <Header.Content>Current Query: </Header.Content>            
              </Header>
              <Card.Group items={items} itemsPerRow="8" stackable/>
              </Segment>

            {this.innerMenu('top', activeItem)}
            {activeItem === 'section2' && 
            <Segment attached> {this.reportsTable(this.state.column, this.state.data, this.state.direction)}</Segment> }
            {activeItem === 'section1' && 
            <Segment attached>              
              <WorldMap countries={filters && filters.countries} frequencies={frequencies && frequencies.countries}/>
              </Segment> }
            {this.innerMenu('bottom', activeItem)}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable></div>
      )
    }
    }
export default Arma;
