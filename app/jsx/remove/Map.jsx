'use strict';
import React, { Component } from 'react';
const cljs = require('../../js/cljs.js');
require('es6-promise').polyfill();
require('isomorphic-fetch');

function countProp(col, kw) {
  if(col){
    return col.filter(o => o[kw]).length;
  } else {
    return 0;
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoCountries:[],
      viewport: {
        attributionControl: false,
        scrollWheelZoom: true,
        zoom: 1,
        minZoom: 1,
        maxZoom: 16,
        continuousWorld: false,
        width: "100%",
        height: "300px",
        center: [15.505, 25.09]
        },
        popupInfo: null

    };
    this._renderPopup = this._renderPopup.bind(this);
    this._onClick = this._onClick.bind(this);
    this.saveCountries = this.saveCountries.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.thematicsFocus !== state.thematicsFocus || props.reports !== state.reports
    ) {
      state.thematicsFocus = props.thematicsFocus;
      state.reports = props.reports;
      if(state.countries){
        state.geoCountries = cljs.geoCountries(state.countries, state.reports);
      }
    }
    return state;
  }

  saveCountries(c){
        const cc = c.map(x => {x.GeoJSON = JSON.parse(x.GeoJSON); return x});
        console.log('countries', cc);
        this.setState( {countries: cc});   
        if(!this.state.geoCountries){
          this.setState( {geoCountries: cljs.geoCountries(cc, this.state.reports)});   
        }
  }
    
  componentDidMount() {
    console.log('Map', 'componentDidMount');
    fetch('./js/geo-countries.json')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(this.saveCountries);
  }

  _renderPopup() {
    const {popupInfo} = this.state;
    const xAxisCategories = popupInfo ? popupInfo.xAxisCategories : [];
    const seriesName = popupInfo ? popupInfo.seriesName : null;
    const seriesData = popupInfo ? popupInfo.seriesData : [];
    const config = {
      chart: {
          type: 'bar',
          height: 200,
          width: 400      
      },
      title: {
          text: undefined,
      },
      xAxis: {
          categories: xAxisCategories //['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
          title: {
              text: undefined,
          }
      },

      series: [{
          name: seriesName,
          data: seriesData, //[1, 0, 4]
          events:{
            click: (e) => console.log(popupInfo.country, e.point.series.name, e.point.category, e.point.y,  e.point)
          }
      }]
  };
    
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          className="YUPIE"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          {/*<ReactHighcharts config ={config} />*/}
        </Popup>
      )
    );
  }

  _renderCountry(country, idx){
    const {value, label, coords, fillOpacity} = country;

    const conf = {
      id: `layer-${idx}`,
      type: 'fill',
      key: `layer-${idx}`,
      metadata: {value, label, coords},
      source: {type: 'geojson',  data: country.geoJSON},
      paint: {
        "fill-color": "#BF0154",
        "fill-opacity": fillOpacity
      }
      
    };
  return ({/*<Layer key={`layer-${idx}`} {...conf}  ></Layer>*/});
  }
  _onClick(event){
    const feature = event.features && event.features[0];
    if (feature) {
       console.log("layer", feature.layer);
      if (feature.layer.id.substring(0, 5) === "layer"){
        const {label, value, coords} = feature.layer.metadata;
        console.log("selecting country value", value);
        const reportsFiltered = this.props.reports.filter( o => o.country === value);
        const search = this.state.thematicsFocus.reduce( (c, o) => {
          c[o.kw]=countProp(reportsFiltered, o.kw);
          return c; } , {});
          const keysSorted = Object.keys(search).sort(function(a,b){return search[b]-search[a]})
          console.log('sortedSearch', keysSorted);     // bar,me,you,foo
          const dataChart = keysSorted.slice(0, keysSorted.length > 5 ? 5 : keysSorted.length);
          const findTF = (x) => this.state.thematicsFocus.find( o => o.kw === x);
          const xAxisCategories = dataChart.map(o => findTF(o).name);
          const seriesData = dataChart.reduce( (c, o) => { c.push(search[o]); return c;}, []);
          console.log('xAxisCategories', xAxisCategories, 'seriesData', seriesData);
        console.log('search', search);
//        this.props.reports.filter( o => o.country === "010d6483-d82d-48de-88c4-030fc5e7f81e").map(o => console.log(o));
          this.setState(
            {popupInfo: 
              { country: value,
                latitude: coords[1], 
                xAxisCategories, 
                seriesName: label,
                seriesData,
                longitude: coords[0]}});
        }
        //      window.alert(`Clicked layer ${feature.layer.id}`); // eslint-disable-line no-alert
      }
  };
  
  render() {
  }

}
export default Map;
