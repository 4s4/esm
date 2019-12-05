'use strict';
import React, { Component } from 'react';
import ReactMapGL, {Layer, Marker, Popup, NavigationControl} from 'react-map-gl';
import {afganJson, geoJson} from './Countries';
import {cities} from './cities';
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
  }

  _renderPopup() {
    const {popupInfo} = this.state;
    const config = {
      chart: {
          type: 'bar',
          height: 200,
          width: 200,
      },
      title: {
          text: undefined,
      },
      xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
          title: {
              text: undefined,
          }
      },

      series: [{
          name: 'Afga',
          data: [1, 0, 4]
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
          <ReactHighcharts 
  
          config = {config}></ReactHighcharts>
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

  render() {
      const parkLayer = {
        id: 'states-fill',
        type: 'fill',
        source: {type: 'geojson',  data: geoJson},
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
      mapStyle="mapbox://styles/mapbox/streets-v10"
      mapboxApiAccessToken="pk.eyJ1IjoiZGViYWppdG11a2hlcmplZSIsImEiOiJjaWV2YzVlMWowd2N3czltMm43aGt5Z2t5In0.AeB5WR5Tl0bGXHr-A7iyJA"
      onViewportChange={(viewport) => this.setState({viewport})}
    > 
        <div style={{position: 'absolute', left: "10px", top: "10px"}}>
          <NavigationControl />
          <Layer {...parkLayer} ></Layer>

        </div>
        {cities.map(this._renderCityMarker)}
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
