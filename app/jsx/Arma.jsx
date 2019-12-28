import React, {Component, useRef, useEffect} from 'react'
import { Dropdown, Header, Icon, Image, Menu, Segment, Sidebar, Accordion } from 'semantic-ui-react'
import Map from './Map';
const cljs = require('../../js/cljs.js');
import ThematicFocus from './ThematicFocus';
import Highcharts from 'highcharts'
const addSunburst = require('highcharts/modules/sunburst');
import HighchartsReact from 'highcharts-react-official'
//import HighchartsSunburst from "highcharts/modules/sunburst";

class Arma extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex:-1, sidebar:true, leftSidebarWidth:'wide' , rigthSidebarWidth:'wide', rightSidebarVisible:false};
        this.handleAccordion = this.handleAccordion.bind(this);
        this.closeSidebars = this.closeSidebars.bind(this);
        this.handleOver = this.handleOver.bind(this);
      }

      static getDerivedStateFromProps(props, state) {
        if (
          props.reports !== state.reports 
        ) {
            let approvals = cljs.approvalYears(props.reports);
            const approval_year = approvals.filter( o => o.value === props.approval_year ); 
            let actives = cljs.activeYears(props.reports);
            const active_year = actives.filter( o => o.value === props.active_year ); 
            const tt = cljs.countThematicFocus(props.reports, props.thematicsFocus);
            const frequencies = cljs.countSelects(props.reports, props.filters.types, props.filters.sectors, props.filters.regions);
            console.log('frequencies', frequencies);
            console.log('filters', props.filters)
            return {frequencies, reports: props.reports, approvals, actives, active_year, approval_year, thematicsFocus: props.thematicsFocus, tt};
        }
        return state;
      }
    
      handleAccordion (e, titleProps) {
        addSunburst(Highcharts);

        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

          let chartConfig;
          let rightSidebarVisible;
          let rightSidebarWidth;
          console.log(index, 'wow');
          if (index === 0 ) { 
            const catt = this.props.filters.regions.filter(o => o["parent-value"]==="0").map(o => o.label);
            const datt = this.props.filters.regions.filter(o => o["parent-value"]==="0").map(o => this.state.frequencies.regions[o.value]);
            const regionChartConfig = {
                chart: {
                    type: 'pie',
                    height: 400,
                    width: 400      
                },
                xAxis: {
                  categories: catt
                },
                series: [{
                  data: datt
                }]
              };
            chartConfig = regionChartConfig; rightSidebarVisible=true; rightSidebarWidth= 'wide'}
            if (index === 11 ) { 
                const catt = this.props.filters.regions.filter(o => o["parent-value"]==="1").map(o => o.label);
                const datt = this.props.filters.regions.filter(o => o["parent-value"]==="1").map(o => this.state.frequencies.regions[o.value]);
                const regionChartConfig = {
                    chart: {
                        type: 'bar',
                        height: 400,
                        width: 400      
                    },
                    xAxis: {
                      categories: catt
                    },
                    series: [{
                      data: datt
                    }]
                  };
                chartConfig = regionChartConfig; rightSidebarVisible=true; rightSidebarWidth= 'wide'}
                if (index === 2 ) { 
                    const dd = this.props.filters.sectors.map(o => {
                        return {id: o.value, 
                                parent: o['parent-value'] || '0.0',
                                name: o.label, 
                                value: this.state.frequencies.sectors[o.value]};});
                            dd.unshift({id: '0.0', parent:'', name:'all', value: 1800 })
                            console.log('dd', dd);
                            
                    const sectorChartConfig = {
                        chart: {
                            height: 500,
                            width: 500      
                        },
                        series: [{
                            type: "sunburst",
                            data: dd,
                            allowDrillToNode: true,
                            cursor: 'pointer',
                            dataLabels: {
                                format: '{point.name}',
                                filter: {
                                    property: 'innerArcLength',
                                    operator: '>',
                                    value: 16
                                }
                            },
                            levels: [{
                                level: 1,
                                levelIsConstant: false,
                                dataLabels: {
                                    filter: {
                                        property: 'outerArcLength',
                                        operator: '>',
                                        value: 64
                                    }
                                }
                            }, {
                                level: 2,
                                colorByPoint: true
                            },
                            {
                                level: 3,
                                colorVariation: {
                                    key: 'brightness',
                                    to: -0.5
                                }
                            }, {
                                level: 4,
                                colorVariation: {
                                    key: 'brightness',
                                    to: 0.5
                                }
                            }]
                    
                        }],
                        tooltip: {
                            headerFormat: "",
                            pointFormat: 'Reports of <b>{point.name}</b> is <b>{point.value}</b>'
                        }
                    
                      };
                    chartConfig = sectorChartConfig; rightSidebarVisible=true; rightSidebarWidth= 'very wide'}
    
                if (index === 1 ) { 
                    const dict = new Set(Object.keys(this.state.frequencies.countries));
                    const base = this.props.filters.countries.filter(o => dict.has(o.value));
                    const catt = base.map(o => o.label);
                    const datt = base.map(o => this.state.frequencies.countries[o.value] || 0);
                    console.log(catt, datt);
                    const regionChartConfig = {
                        chart: {
                            type: 'bar',
                            height: 400,
                            width: 400      
                        },
                        xAxis: {
                          categories: catt
                        },
                        series: [{
                          data: datt
                        }]
                      };
                    chartConfig = regionChartConfig; rightSidebarVisible=true; rightSidebarWidth= 'wide'}
    
              if (index === 6 ) { 
            console.log(this.state.thematicsFocus);
            console.log(this.state.tt);
            const cats = this.state.thematicsFocus.map( o => o.name);
            const datt = this.state.thematicsFocus.map( o => this.state.tt[o.kw]); 
            const thematicChartConfig = {
                chart: {
                    type: 'bar',
                    height: 400,
                    width: 400      
                },
                xAxis: {
                  categories: cats
                },
                series: [{
                  data: datt
                }]
              };
      
            
            chartConfig = thematicChartConfig; rightSidebarVisible=true; rightSidebarWidth= 'very wide'}
            this.setState({ activeIndex: newIndex, rightSidebarVisible, rightSidebarWidth, chartConfig})
      }
      
      closeSidebars (e) {
        this.setState({ leftSidebarWidth: 'thin', rightSidebarVisible:false })
      }

      handleOver (e) {
          this.setState({ leftSidebarWidth: 'wide' })
      }

     render (){
        const [visible, setVisible] = [true, o => o];
        const { activeIndex, rightSidebarWidth, leftSidebarWidth } = this.state
        const {rightSidebarVisible, chartConfig} = this.state;
      return (
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            onMouseOver={this.handleOver}
            animation='push'
            onHide={() => setVisible(false)}
            visible={visible}
            width={leftSidebarWidth}
          >
      <Accordion styled>

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
          options={this.props.filters.regions && this.props.filters.regions.filter(o => o["parent-value"]==="0").map(o => {return {text: o.label, value: o.value}})}
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
          options={this.props.filters.regions && this.props.filters.regions.filter(o => o["parent-value"]==="1").map(o => {return {text: o.label, value: o.value}})}
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
          options={this.props.filters.countries && this.props.filters.countries.map(o => {return {text: o.label, value: o.value}})}
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
          options={this.props.filters.sectors && this.props.filters.sectors.map(o => {return {text: o.label, value: o.value}})}
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
          options={this.props.filters.types && this.props.filters.types.map(o => {return {text: o.label, value: o.value}})}
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
          options={this.state.approvals && this.state.approvals.map(o => {return {text: o.label, value: o.value}})}
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
        <ThematicFocus reports={this.state.reports} 
            thematicsFocus={this.state.thematicsFocus}                          
            onCheck={this.props.onCheck}
            />
        </Accordion.Content> 


        </Accordion>          
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
            {/*<Map reports={this.state.initialReports} />  */}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      )
    }
    }
export default Arma;
