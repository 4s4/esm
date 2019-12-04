'use strict';
import React, { Component } from 'react';
import ReactMapGL, {Layer, Marker, Popup, NavigationControl} from 'react-map-gl';
import {afganJson, geoJson} from './Countries';


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
            }
    };
  }

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

      </ReactMapGL>
      </div>
</div>
</section>
</div>
     );
            }
}
export default Map;
