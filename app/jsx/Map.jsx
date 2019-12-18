'use strict';
import React, { Component } from 'react';
import ReactMapGL, {Layer, Popup, NavigationControl} from 'react-map-gl';
import ReactHighcharts from 'react-highcharts';
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
          width: 400,
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
          data: seriesData //[1, 0, 4]
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
          <ReactHighcharts config ={config} />
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
    return (<Layer key={`layer-${idx}`} {...conf}  ></Layer>);
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
    if (this.state.countries){
    return (
      <div className="container">
        <ol className="breadcrumb pull-right">
        <li><a href="#">Home</a></li>
        </ol>
        <h2>Search documents</h2>
        <section className="map-container map-container-details">
        <div className="container">
          <div id="map">
            <ReactMapGL
              {...this.state.viewport}
              onClick={this._onClick}
              mapStyle="mapbox://styles/mapbox/streets-v10"
              mapboxApiAccessToken="pk.eyJ1IjoiZGViYWppdG11a2hlcmplZSIsImEiOiJjaWV2YzVlMWowd2N3czltMm43aGt5Z2t5In0.AeB5WR5Tl0bGXHr-A7iyJA"
              onViewportChange={(viewport) => this.setState({viewport})}
            > 
            <div style={{position: 'absolute', left: "10px", top: "10px"}}>
              <NavigationControl />
            </div>
            {this.state.geoCountries.map( (o, idx) => {
                return this._renderCountry({geoJSON: o.GeoJSON,
                                            value: o.CountryID,
                                            label: o.CountryName,
                                            coords: o.coords,   
                                            fillOpacity: o.FillOpacity                                   
                                          }, idx);
            } )}
            {this._renderPopup()}
          </ReactMapGL>
      </div>
    </div>
  </section>
</div>
     );
            }
            return (<div></div>);
          }

}
export default Map;
