'use strict';
import React, { Component } from 'react';
//const theMap = require('@highcharts/map-collection/custom/world-continents.geo.json');
const theMap = require('@highcharts/map-collection/custom/world.geo.json');
import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'

function mapData(data, onChangeMap) {
  const h = window.innerHeight-150;
  return {
  chart: {
      map: theMap,
      height: h,
      events: {
        load: function () {
          this.mapZoom(0.5);          
        }
    }
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
        [1, '#0470D9']
    ]
  },

  subtitle: {
    text: ''
},
title: {
  text: ''
},

  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom'
},

  series: [
    {
      name: 'Documents by country',
      joinBy: ['iso-a3', 'code'],
      cursor: 'pointer',
      point: {
          events: {
             click: function(e) {
                  onChangeMap('country', e.point.options);
             }
         }
     },

      data,
      states: {
        hover: {
            borderWidth: 1,
            color: '#ED7DAE'
        }
    },
    mapNavigation: {
      enabled: true
  },

      tooltip: {
          headerFormat: '',
          pointFormat: '{point.name}: {point.value} documents'
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
        return {data, selections: new Set(props.countrySelections.map(x => x.code))};
      }
    }
    return state;
  }
    
  render() {
    const {data, selections} = this.state;
    return (data && data.length >0 && <HighchartsReact
              options = { mapData(data.map(x => { selections.has(x.code) ? x.color="#ED7DAE" : null; return x}), this.props.onChangeMap) }
              highcharts = { Highcharts }
              constructorType = { 'mapChart' }
              allowChartUpdate = { true }
              immutable = { false }
              updateArgs = { [true, true, true] }
           />);
  }

}
export default WorldMap;
