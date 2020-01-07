'use strict';
import React, { Component } from 'react';
const theMap = require('@highcharts/map-collection/custom/world-continents.geo.json');
import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'
// https://jsfiddle.net/user2314737/uhp2wgkn/
  
function mapData(data) {
  return {
    chart: {
      map: theMap
    },
  
    title: {
      text: 'Geographical regions'
    },
  
    plotOptions: {
      map: {
        point: {
          events: {
            mouseOver: function() {
              var v = this.codeName;
              Highcharts.each(this.series.points, function(p) {
                if (v == p.codeName) {
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
                  pointFormat: '{point.codeName}: <b>{point.value}</b>'
              },
        allAreas: false,
      }
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
        const d ={"Europe": 0, "Asia":0, "Africa":0, "Oceania":0, "America":0};
    
        const data= Object.keys(props.frequencies).reduce((x,o) => {
                    const c = props.countries.find(e => e.value === o);
                    x[c.region.label]+=props.frequencies[o];
                    return x;
                    }, d);
        const dataT = [
          {code: 'eu', value:data["Europe"], codeName:"Europe"},
          {code: 'as', value:data["Asia"], codeName:"Asia"},
          {code: 'af', value:data["Africa"], codeName:"Africa"},
          {code: 'na', value:data["America"], codeName:"America"},
          {code: 'sa', value:data["America"], codeName:"America"},
          {code: 'oc', value:data["Oceania"],  codeName:"Oceania"}
          ];
        return {data: dataT};
      }
    }
    return state;
  }
    
  render() {
    const {data} = this.state;
    return (<HighchartsReact
            options = { mapData(data) }
            highcharts = { Highcharts }
            constructorType = { 'mapChart' }
            allowChartUpdate = { true }
            immutable = { false }
            updateArgs = { [true, true, true] }
            />);
  }
}
export default RegionsMap;
