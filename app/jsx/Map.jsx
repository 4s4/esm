'use strict';
import React, { Component } from 'react';
import ReactMapGL, {Layer, Marker, Popup, NavigationControl} from 'react-map-gl';
import {afganJson, geoJson} from './Countries';
import {cities} from './cities';
import {countProp, thematicFocusKeys, thematicFocus} from './utils';
import CityPin from './city-pin';
import ReactHighcharts from 'react-highcharts';




class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this._renderCityMarker = this._renderCityMarker.bind(this);
    this._renderPopup = this._renderPopup.bind(this);
    this._onClick = this._onClick.bind(this);
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


  _renderCityMarker(city, index){
    return (
      <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
        <CityPin size={20} onClick={() => this.setState({popupInfo: city})} />
      </Marker>
    );
  };

  _onClick(event){
    const feature = event.features && event.features[0];
    if (feature) {
//      console.log(feature);
      if (feature.layer.id === "Afghanistan"){
        console.log("selecting country value 010d6483-d82d-48de-88c4-030fc5e7f81e");
        const reportsFiltered = this.props.reports.filter( o => o.country === "010d6483-d82d-48de-88c4-030fc5e7f81e");
        const search = thematicFocusKeys.reduce( (c, o) => {
          c[o]=countProp(reportsFiltered, o);
          return c} , {});

          const keysSorted = Object.keys(search).sort(function(a,b){return search[b]-search[a]})
          console.log('sortedSearch', keysSorted);     // bar,me,you,foo
          const dataChart = keysSorted.slice(0, keysSorted.length > 5 ? 5 : keysSorted.length);
          const xAxisCategories = dataChart.map(o => thematicFocus[o]);
          const seriesData = dataChart.reduce( (c, o) => { c.push(search[o]); return c;}, []);

          console.log('xAxisCategories', xAxisCategories, 'seriesData', seriesData);


        console.log('search', search);
//        this.props.reports.filter( o => o.country === "010d6483-d82d-48de-88c4-030fc5e7f81e").map(o => console.log(o));
          this.setState(
            {popupInfo: 
              { country: "010d6483-d82d-48de-88c4-030fc5e7f81e",
                latitude: 61.210817, 
                xAxisCategories, 
                seriesName: feature.layer.id,
                seriesData,
                longitude: 35.650072 }});
        }
        //      window.alert(`Clicked layer ${feature.layer.id}`); // eslint-disable-line no-alert
      }
  };
  
  render() {
      const parkLayer = {
        id: 'Afghanistan',
        type: 'fill',
        source: {type: 'geojson',  data: afganJson[0].GeoJSON},
        paint: {
          "fill-color": "#1FCB4A",
          "fill-opacity": 0.30
        }
      };
     
    
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
          <Layer {...parkLayer}  ></Layer>

        </div>
        {/* cities.map(this._renderCityMarker) */}
        {this._renderPopup()}

      </ReactMapGL>
      </div>
</div>
</section>
</div>
     );
            }
}
export default Map;
