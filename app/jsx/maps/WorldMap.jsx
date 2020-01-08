'use strict';
import React, { Component } from 'react';
//const theMap = require('@highcharts/map-collection/custom/world-continents.geo.json');
const theMap = require('@highcharts/map-collection/custom/world.geo.json');
import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'

function mapData(data, onChangeCountry) {
  return {
  chart: {
      map: theMap
  },
  
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'top'
    }
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
      text: 'Explore the TSM by country'
  },

  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom'
},

  series: [{
      name: 'Country',
      joinBy: ['iso-a3', 'code'],
      cursor: 'pointer',
      point: {
          events: {
             click: function(e) {
                  console.log('worldmap click', e.point.options);
                  onChangeCountry(e.point.options);
             }
         }
     },

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
class WorldMap extends Component {
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
                    return  {'name':c.label, 'value':props.frequencies[o], 'code': c.code, 'id': c.value};
                    })
        return {data};
      }
    }
    return state;
  }
    
  render() {
    const {data} = this.state;
    return (<HighchartsReact
              options = { mapData(data, this.props.onChangeCountry) }
              highcharts = { Highcharts }
              constructorType = { 'mapChart' }
              allowChartUpdate = { true }
              immutable = { false }
              updateArgs = { [true, true, true] }
           />);
  }

}
export default WorldMap;
