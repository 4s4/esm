'use strict';
import React, { Component } from 'react';
import Childo from './Childo';
import {types} from './data/types';
import {sectors} from './data/sectors';
import {regions} from './data/regions';
import {countries} from './data/countries';


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
    this.state = { reports: props.reports, initialReports: props.initialReports };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.reports !== state.reports 
    ) {
      return {
        reports: props.reports,
        initialReports: props.initialReports,
        types: countIt(props.initialReports, 'type'),
        countries: countIt(props.initialReports, 'country'),
        regions: countIt(props.initialReports, 'region')

      };
    }
    return null;
  }

  render() { 
//    console.log('types', this.state.types);
    let tt = [];
    if (this.state.types){
      tt = types.map(o => {
      const {...picked} = o;
//      console.log(picked.value, picked.label, picked);
      const c = this.state.types[picked.value] ? this.state.types[picked.value] : 0;
      picked.label+=` (${c})`;
      return picked;
    });

    }
    let cc = [];
    if (this.state.countries){
      cc = countries.map(o => {
      const {...picked} = o;
//      console.log(picked.value, picked.label, picked);
      const c = this.state.countries[picked.value] ? this.state.countries[picked.value] : 0;
      picked.label+=` (${c})`;
      return picked;
    });

    }

    let rr = [];
    if (this.state.regions){
      const geo = regions[0];
      let geoOptions= [];
      geo.options.map(o => {
      const {...picked} = o;
      const c = this.state.regions[picked.value] ? this.state.regions[picked.value] : 0;
      picked.label+=` (${c})`;
      geoOptions.push(picked);
    });
    geo.options = geoOptions;

      const eco = regions[1];
      let ecoOptions = eco.options;
      ecoOptions = ecoOptions.map(o => {
      const {...picked} = o;
      const c = this.state.regions[picked.value] ? this.state.regions[picked.value] : 0;
      picked.label+=` (${c})`;
      return picked;
    });
    eco.options = ecoOptions;
    rr.push(geo);
    rr.push(eco);

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
                          <Childo options={sectors} placeholder="Sector" onChange={this.props.onChange} value={this.props.sectors}
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