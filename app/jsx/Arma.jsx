import React, {Component, useRef, useEffect} from 'react'
import { List, Dropdown, Header, Icon, Image, Card, Menu, Segment, Sidebar, Accordion, Table, Container, Statistic, Divider } from 'semantic-ui-react'
import Map from './Map';
import {pieChart, barChart, sunburstChart} from './Charts';
import {geoRegionAccordion, ecoRegionAccordion, countryAccordion, typeAccordion, sectorAccordion, thematicFocusAccordion} from './Accordion';
const cljs = require('../../js/cljs.js');
import ThematicFocus from './ThematicFocus';
import Highcharts from 'highcharts'
const addSunburst = require('highcharts/modules/sunburst');
import HighchartsReact from 'highcharts-react-official'

//import HighchartsSunburst from "highcharts/modules/sunburst";
const rightOption = (  
<List>
    <List.Item>
      <List.Header>Type</List.Header>A lovely city
    </List.Item>
    <List.Item>
      <List.Header>Year</List.Header>
      Also quite a lovely city
    </List.Item>
    <List.Item>
      <List.Header>Period</List.Header>
      Sometimes can be a lovely city
    </List.Item>
  </List>
);
const leftOption = (  
  <List>
      <List.Item>
        <List.Header>Region</List.Header>Oceania
      </List.Item>
      <List.Item>
        <List.Header>Country</List.Header>
        Thailand(THA)
      </List.Item>
    </List>
  );
const centerOption = (  
    <List>
        <List.Item>
          <List.Header>UNPAF Thailand 2012-2016</List.Header>
          The ADB presents the business plan for 2015-2017 with the country partnership strategy, updated country partnership strategy results framework and summary of changes to lending and nonlending programs in the country.

        </List.Item>
        <List.Item>
          <List.Header>Sectors:</List.Header>
          <List bulleted horizontal link>
            <List.Item as='a'>Terms and Conditions</List.Item>
            <List.Item as='a'>Privacy Policy</List.Item>
            <List.Item as='a'>Contact Us</List.Item>
          </List>
        </List.Item>
      </List>
    );
  
const tableData = [
  { id:1, lo: leftOption, co: centerOption, ro: rightOption },
  { id:2, lo: leftOption, co: centerOption, ro: rightOption },
  { id:3, lo: leftOption, co: centerOption, ro: rightOption },
  { id:4, lo: leftOption, co: centerOption, ro: rightOption },
]

class Arma extends Component {
    constructor(props) {
        super(props);
        this.state = { direction:null, column:null, data: tableData, activeItem: 'section1', activeIndex:-1, sidebar:true, leftSidebarWidth:'wide' , rigthSidebarWidth:'wide',leftSidebarVisible:true};
        this.handleAccordion = this.handleAccordion.bind(this);
        this.closeSidebars = this.closeSidebars.bind(this);
        this.handleOver = this.handleOver.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleSort = this.handleSort.bind(this);
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
        addSunburst(Highcharts);

        const { index } = titleProps;
        const { activeIndex, frequencies } = this.state;      
        const newIndex = activeIndex === index ? -1 : index
        const {filters} = this.props;

        console.log('index', index);
          if (index === 0 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = geoRegionAccordion(filters.regions, frequencies.regions);
            this.setState({ activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }
          if (index === 11 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = ecoRegionAccordion(filters.regions, frequencies.regions);
            this.setState({ activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }
          if (index === 1 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = countryAccordion(filters.countries, frequencies.countries);
            this.setState({ activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }
          if (index === 2 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = sectorAccordion(filters.sectors, frequencies.sectors);
            this.setState({ activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }

          if (index === 3 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = typeAccordion(filters.types, frequencies.types);
            this.setState({ activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }

          if (index === 6 ) { 
            let [chartConfig, rightSidebarWidth, rightSidebarVisible] = thematicFocusAccordion(filters.thematicsFocus, frequencies.thematicsFocus);
            this.setState({ activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
            return;
          }
      }
      
      closeSidebars (e) {
        this.setState({ leftSidebarWidth: 'wide', rightSidebarVisible:false, leftSidebarVisible:false })
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
        return ( <Table sortable celled fixed striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort('name')}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'age' ? direction : null}
                onClick={this.handleSort('age')}
              >
                Age
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'gender' ? direction : null}
                onClick={this.handleSort('gender')}
              >
                Gender
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(({id, lo, co, ro }) => (
              <Table.Row key={id}>
                <Table.Cell>{lo}</Table.Cell>
                <Table.Cell>{co}</Table.Cell>
                <Table.Cell>{ro}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>);

      }

     render (){
        const { reports, approvals, activeItem, activeIndex, rightSidebarWidth, rightSidebarVisible,leftSidebarVisible, leftSidebarWidth, chartConfig } = this.state
        const { filters, onCheck } = this.props;
        const cardVisible = true;
        const items = [
          {
            header: 'Geographical Region',
            description: 'This option gets: 1000 documents',
            meta: 'selected Oceania',
            extra: (<a><Icon name='user' />22 Friends</a>)
          },
          {
            header: 'Project Report - May',
            description:
              'Bring to the table win-win survival strategies to ensure proactive domination.',
            meta: 'ROI: 34%',
          },
          {
            header: 'Project Report - May',
            description:
              'Bring to the table win-win survival strategies to ensure proactive domination.',
            meta: 'ROI: 34%',
          },
          {
            header: 'Project Report - May',
            description:
              'Bring to the table win-win survival strategies to ensure proactive domination.',
            meta: 'ROI: 34%',
          },
          {
            header: 'Project Report - May',
            description:
              'Bring to the table win-win survival strategies to ensure proactive domination.',
            meta: 'ROI: 34%',
          },
          {
            header: 'Project Report - May',
            description:
              'Bring to the table win-win survival strategies to ensure proactive domination.',
            meta: 'ROI: 34%',
          },
          {
            header: 'Project Report - May',
            description:
              'Bring to the table win-win survival strategies to ensure proactive domination.',
            meta: 'ROI: 34%',
          },
          {
            header: 'Project Report - June',
            description:
              'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
            meta: 'ROI: 27%',
          },
        ]
        
      return (
        <Sidebar.Pushable as={Segment} >
         <Sidebar
            onMouseOver={this.handleOver}
            animation='push'
            onHide={() => console.log('setVisible(false)')}
            visible={leftSidebarVisible}
            width={leftSidebarWidth}
          >
          <Card
          visible={cardVisible}
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
         { chartConfig && <HighchartsReact highcharts={Highcharts} options={chartConfig} />}
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
            {activeItem === 'section1' && 
            <Segment attached> {this.reportsTable(this.state.column, this.state.data, this.state.direction)}</Segment> }
            {activeItem === 'section2' && 
            <Segment attached><Map reports={this.state.initialReports} /></Segment> }
            {this.innerMenu('bottom', activeItem)}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      )
    }
    }
export default Arma;
