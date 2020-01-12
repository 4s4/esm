'use strict';
import React, { Component } from 'react';
const theMap = require('@highcharts/map-collection/custom/world-continents.geo.json');
import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'
// https://jsfiddle.net/user2314737/uhp2wgkn/
  
function mapData(data, onChangeMapRegion) {
  return {
    chart: {
      map: theMap
    },
  
    title: {
      text: 'Explore the TSM by Geographical Region'
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
        verticalAlign: 'top'
      }
    },
  
    colorAxis: {
      min: 0
    },
  
    series: [{
      data: data,
      name: 'Random data',
      joinBy: ['hc-key', 'code'],
      point: {
        events: {
           click: function(e) {
                console.log('region map click', e.point.options);
                onChangeMapRegion(e.point.options);
            }
        }
      },

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
      if(props.countries && props.frequencies && props.regions){
        const d ={"Europe": 0, "Asia":0, "Africa":0, "Oceania":0, "America":0};
    
        const data= Object.keys(props.frequencies).reduce((x,o) => {
                    const c = props.countries.find(e => e.value === o);
                    x[c.region.label]+=props.frequencies[o];
                    return x;
                    }, d);

        console.log('props.regions', props.regions);
        const regionValue = (x) => props.regions.find(r => r.label === x).value;
        const dataT = [
          {code: 'eu', value:data["Europe"], codeName:"Europe", regValue:regionValue("Europe") },
          {code: 'as', value:data["Asia"], codeName:"Asia", regValue:regionValue("Asia")},
          {code: 'af', value:data["Africa"], codeName:"Africa", regValue:regionValue("Africa")},
          {code: 'na', value:data["America"], codeName:"America",  regValue:regionValue("America")},
          {code: 'sa', value:data["America"], codeName:"America", regValue:regionValue("America")},
          {code: 'oc', value:data["Oceania"],  codeName:"Oceania", regValue:regionValue("Oceania")}
          ];
        return {data: dataT};
      }
    }
    return state;
  }
    
  render() {
    const {data} = this.state;
    return (<HighchartsReact
            options = { mapData(data, this.props.onChangeMapRegion) }
            highcharts = { Highcharts }
            constructorType = { 'mapChart' }
            allowChartUpdate = { true }
            immutable = { false }
            updateArgs = { [true, true, true] }
            />);
  }
}
export default RegionsMap;
