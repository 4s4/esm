'use strict';
import React, { Component } from 'react';
const theMap = require('@highcharts/map-collection/custom/world-continents.geo.json');
import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'
// https://jsfiddle.net/user2314737/uhp2wgkn/

const dataT = [
  {code: 'eu', codeId:1, value:0, codeName:"EU"},
  {code: 'as', codeId:2, value:0, codeName:"AS"},
  {code: 'af', codeId:3, value:0, codeName:"AF"},
  {code: 'na', codeId:4, value:0, codeName:"AM"},
  {code: 'sa', codeId:4, value:0, codeName:"AM"},
  {code: 'oc', codeId:5, value:0, codeName:"OC"}
  ]
  
function mapData(data) {
  return {
    chart: {
      map: 'custom/world-continents'
    },
  
    title: {
      text: 'Highmap: group two regions NA and SA'
    },
  
    plotOptions: {
      map: {
        point: {
          events: {
            mouseOver: function() {
              var v = this.codeId;
              console.log('v', v);
              Highcharts.each(this.series.points, function(p) {
                if (v == p.codeId) {
                  p.setState('hover')
  
                }
              })
            },
            mouseOut: function() {
              Highcharts.each(this.series.points, function(p) {
                p.setState('')
              })
            }
          }
        },
        tooltip: {
                  headerFormat: '',
                  pointFormat: '{point.codeName}: <b>{series.name}</b>'
              },
        allAreas: false,
      }
    },
    subtitle: {
      text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world-continents.js">World continents</a>'
    },
  
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
  
    colorAxis: {
      min: 0
    },
  
    series: [{
      data: data,
      name: 'Random data',
      joinBy: ['hc-key', 'code'],
  
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.codeName}'
      }
    }]
  };
}
class RegionsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }
  
  static getDerivedStateFromProps(props, state) {
    if (
      props !== state
    ) {
      if(props.countries && props.frequencies){
        const data= Object.keys(props.frequencies).map((o) => { 
                    const c = props.countries.find(e => e.value === o);
                    return  {'name':c.label, 'value':props.frequencies[o], 'code': c.code};
                    })
        return {data};
      }
    }
    return state;
  }
    
  render() {
    const {data} = this.state;
    return (<HighchartsReact
    options = { mapData(dataT) }
    highcharts = { Highcharts }
    constructorType = { 'mapChart' }
    allowChartUpdate = { true }
    immutable = { false }
    updateArgs = { [true, true, true] }
    />);
  }

}
export default RegionsMap;
