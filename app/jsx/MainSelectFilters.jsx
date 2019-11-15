'use strict';
import React, { Component, createElement } from 'react';
import Childo from './Childo';


class MainSelectFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, region:'' };
    this.wow = this.wow.bind(this);
  }

  wow (e) {
    console.log('wow', e, this.state);
  }

  render() {
    return <div className="col-xs-12 col-md-12">
      <div className="row">
	<div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Geographic region where the country belongs.">

    <Childo />
	</div>
	<div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Official country name.">	
          <select id="select_country" placeholder="Country" className="input-sm" >
            <option value="">Country</option>
            <option value="12">Nairobi</option>
            <option value="13">Pune</option>
            <option value="14">Geneva</option>
          </select>
	</div>
	<div className="col-xs-12 col-sm-3"  data-toggle="tooltip" title="Sector " >
	  
	  <select className="input-sm" id="select_sector">
            <option value="">Sector</option>
            <option value="2">Business Process Outsourcing</option>
            <option>Cocoa</option>
            <option>Coffee</option>
            <option>Cotton</option>
            <option>Creative Services</option>
            <option>Essential Oils</option>
	  </select>
	</div>
	<div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Type of Document" >
	  <select id="select_document_type" placeholder="Document type" className="input-sm">
            <option value="">Document type</option>
            <option value="12">Type2</option>
            <option value="13">Type3</option>
            <option value="14">Typ4</option>
	  </select>
	</div>
      </div></div>;

    
  }
    
}

global.window.MainSelectFilters=MainSelectFilters;
