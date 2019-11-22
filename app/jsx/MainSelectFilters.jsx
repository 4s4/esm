'use strict';
import React, { Component, createElement } from 'react';
import Childo from './Childo';
import {regions, countries, types, sectors} from './data';


class MainSelectFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
    this.wow = this.wow.bind(this);
  }

  wow (e) {
    console.log('wow', e, this.state);
  }

  render() {
    return <div className="col-xs-12 col-md-12">
            <div className="row">
              <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Geographic region where the country belongs.">
                <Childo options={regions} placeholder="Region" onChange={this.props.onChange} value={this.props.regions}/>
              </div>
              <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Official country name.">
                <Childo options={countries} placeholder="Country" onChange={this.props.onChange} value={this.props.countrie}/>
              </div>
              <div className="col-xs-12 col-sm-3"  data-toggle="tooltip" title="Sector " >
                <Childo options={sectors} placeholder="Sector" onChange={this.props.onChange} value={this.props.sectors}/>
              </div>
              <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Type of Document" >
              <Childo options={types} placeholder="Type" onChange={this.props.onChange} value={this.props.types}/>
              </div>
            </div>
          </div>;
  }
}
export default MainSelectFilters;