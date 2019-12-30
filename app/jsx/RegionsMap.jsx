'use strict';
import React, { Component } from 'react';
const theMap = require('@highcharts/map-collection/custom/world-continents.geo.json');
import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'

function mapData(data) {
  return {
  chart: {
      map: theMap,
      borderWidth: 1
  },
  mapNavigation: {
    enabled: true
},
colorAxis: {
  min: 0,
  stops: [
      [0, '#EFEFFF'],
      [0.5, Highcharts.getOptions().colors[0]],
      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
  ]
},

  title: {
      text: 'World map'
  },

  subtitle: {
      text: 'Explore the documents by country'
  },

  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'bottom'
},

  series: [{
      name: 'Country',
      joinBy: ['iso-a3', 'code'],

      data,
      dataLabels: {
          enabled: true,
          color: '#FFFFFF',
          formatter: function () {
              if (this.point.value) {
                  return this.point.name;
              }
          }
      },
      states: {
        hover: {
            borderWidth: 1
        }
    },
      tooltip: {
          headerFormat: '',
          pointFormat: '{point.name}: {point.value}'
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
