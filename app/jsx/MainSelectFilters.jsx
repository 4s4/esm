'use strict';
import React, { Component } from 'react';
import Childo from './Childo';

function countBy(col){
  return col.reduce(function (acc, curr) {
    acc[curr] ? acc[curr]++ : acc[curr] = 1;
    return acc
  }, {});
}
export function countIt(reports, prop){
      return countBy(reports.map(r => r[prop]));
    }
class MainSelectFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { reports: props.reports, initialReports: props.initialReports, countryFilters: props.countryFilters,
      typeFilters: props.typeFilters, sectorFilters: props.sectorFilters

     };
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (
      props.reports !== state.reports 
    ) {
      newState.reports = props.reports;
      newState.initialReports =  props.initialReports;
      newState.types = countIt(props.initialReports, 'type');
      newState.countries =  countIt(props.initialReports, 'country');
      newState.regions = countIt(props.initialReports, 'region');
    };

    if (
      props.countryFilters !== state.countryFilters 
    ) {
      newState.countryFilters = props.countryFilters;
    }
    if (
      props.typeFilters !== state.typeFilters 
    ) {
      newState.typeFilters = props.typeFilters;
    }
    if (
      props.sectorFilters !== state.sectorFilters 
    ) {
      newState.sectorFilters = props.sectorFilters;
    }
    if (
      props.regionFilters !== state.regionFilters 
    ) {
      newState.regionFilters = props.regionFilters;
    }

    return newState;
  }

  render() { 
//    console.log('types', this.state.types);
    let tt = [];
    if (this.state.types){
      tt = this.state.typeFilters.map(o => {
      const {...picked} = o;
//      console.log(picked.value, picked.label, picked);
      const c = this.state.types[picked.value] ? this.state.types[picked.value] : 0;
      picked.label+=` (${c})`;
      return picked;
    });

    }

    let cc = [];
    if (this.state.countries){
      console.log(this.state.countries);
      console.log(this.state.countryFilters);
      
      cc = this.state.countryFilters.map(o => {
      const {...picked} = o;
//      console.log(picked.value, picked.label, picked);
      const c = this.state.countries[picked.value] ? this.state.countries[picked.value] : 0;
      picked.label+=` (${c})`;
      return picked;
    });

    }

    let rr = [];
    if (this.state.regions){      
      rr = this.state.regionFilters.map(o => {
      const {...picked} = o;
//      console.log(picked.value, picked.label, picked);
      const c = this.state.regions[picked.value] ? this.state.regions[picked.value] : 0;
      picked.label+=` (${c})`;
      return picked;
    });

    }

    return <div className="col-xs-12">
            <div className="search-controls-wrapper">
              <div className="search-controls">
                <div className="row" role="form">
                  <div id="main_select_filter">
                    <div className="col-xs-12 col-md-12">
                      <div className="row">
                        <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Geographic region where the country belongs.">
                          <Childo options={rr} placeholder="Region" onChange={this.props.onChange} value={this.props.regions}
                          isMulti={true} isClearable={true}/>
                        </div>
                        <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Official country name.">
                          <Childo options={cc} placeholder="Country" onChange={this.props.onChange} value={this.props.countries}
                          isMulti={true} isClearable={true}/>
                        </div>
                        <div className="col-xs-12 col-sm-3"  data-toggle="tooltip" title="Sector " >
                          <Childo options={this.props.sectorFilters} placeholder="Sector" onChange={this.props.onChange} value={this.props.sectors}
                          isMulti={true} isClearable={true}/>
                        </div>
                        <div className="col-xs-12 col-sm-3" data-toggle="tooltip" title="Type of Document" >
                        <Childo 
                        options={tt} 
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