'use strict';
import React, { Component } from 'react';
import Childo from './Childo';
const cljs = require('../../js/cljs.js');

function yup(filters, freqs, always_show){
  if (filters && freqs){
    return filters.reduce((c, o) => {
    const {...picked} = o;
    if(freqs[picked.value] || picked.level === 0 || always_show ){
      const cont = freqs[picked.value] ? freqs[picked.value] : 0;
      picked.label+=` (${cont})`;
      c.push(picked);
    }
    return c;
  }, []);
  }
}

class MainSelectFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { reports: props.reports, initialReports: props.initialReports, 
      filters: props.filters, frequencies: {}, options:{} };
  }

  
  static getDerivedStateFromProps(props, state) {
    const newState = state || {};
    if (
      props.reports !== state.reports || props.filters !== state.filters 
    ) {
      newState.reports = props.reports;
      newState.initialReports =  props.initialReports;
      newState.frequencies = cljs.countSelects(props.reports, props.filters.types, props.filters.sectors, props.filters.regions);
      newState.filters = props.filters;
    };
    return newState;
  }

  render() { 
    const types = yup(this.state.filters.types, this.state.frequencies.types, true);
    const countries = yup(this.state.filters.countries,this.state.frequencies.countries, false);
    const regions = yup(this.state.filters.regions, this.state.frequencies.regions, false);
    const sectors = yup(this.state.filters.sectors, this.state.frequencies.sectors, false)

    return <div className="col-xs-12">
            <div className="search-controls-wrapper">
              <div className="search-controls">
                <div className="row" role="form">
                  <div id="main_select_filter">
                    <div className="col-xs-12 col-md-12">
                      <div className="row">
                        <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Geographic region where the country belongs.">
                          <Childo options={regions} placeholder="Region" onChange={this.props.onChange} value={this.props.regions}
                          isMulti={true} isClearable={true}/>
                        </div>
                        <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Official country name.">
                          <Childo options={countries} placeholder="Country" onChange={this.props.onChange} value={this.props.countries}
                          isMulti={true} isClearable={true}/>
                        </div>
                        <div className="col-xs-12 col-sm-3"  data-toggle="tooltip" title="Sector " >
                          <Childo options={sectors} placeholder="Sector" onChange={this.props.onChange} value={this.props.sectors}
                          isMulti={true} isClearable={true}/>
                        </div>
                        <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Type of Document" >
                        <Childo 
                        options={types} 
                        placeholder="Type" onChange={this.props.onChange} value={this.props.types}
                        defaultMenuIsOpen={false}
                        isMulti={true} isClearable={false}/>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>;
  }
}
export default MainSelectFilters;