'use strict';
import React, { Component } from 'react';
import MainSelectFilter from './MainSelectFilters';
import ThematicFocus from './ThematicFocus';
import DocumentField from './DocumentField';

require('es6-promise').polyfill();
require('isomorphic-fetch');


class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { qq:{}, reports: null, initialReports:null, regions:null, countries:null, sectors:null, types:null, searchResults: null };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.search = this.search.bind(this);
    this.saveReports = this.saveReports.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
  }

  saveReports(r){
    console.log('save reports!');

    this.setState( { reports: r, initialReports: r});
  }
  componentWillMount() {
    console.log('componentWillMount');
    fetch('./js/data.json')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(this.saveReports);
    
  }
  
  onSelectChange (selectType, vals) {
    if(selectType === "Region"){
      this.setState({ regions: vals });
    } else if(selectType === "Country") {
      this.setState( { countries: vals } );
    } else if(selectType === "Type") {
      this.setState( { types: vals } );
    } else if(selectType === "Sector") {
      this.setState( { sectors: vals } );
    }
    console.log(selectType, `Option selected:`, vals)
  };

  onCheckBoxChange (opt, v){
    const q = v ?  r => r[opt] : null;
    const { ...picked } = this.state.qq;
    if (v){
      picked[opt] = q;
    } else {
      delete picked[opt];
    }
    console.log('keys:', Object.keys(picked));

    const queries = Object.values(picked)
    let reports;
    if (queries.length > 0){
      reports = this.state.initialReports.filter(
        function (r) {
         return queries.reduce(
          function (c, f){
            if(c){
              return f(r);
            }
            return false;
          }, true
          );

        }

      );
    } else {
      reports = this.state.initialReports;
    }
    this.setState({qq: picked,
                  reports,              
                  })
    console.log('listening' , opt, v, this.state.reports.length);
  }

  search(){
    const reportsLength = this.state.reports.length;
    const { reports, ...picked} = this.state;
    const search = {reportsLength, ...picked}
    alert(JSON.stringify(search));
  }

  render() {
    return <div className="card">
            <div className="card-content">
              <div className="row" style={{ marginBottom: '18px' }}>
                <div className="col-xs-12">
                  <div className="search-controls-wrapper">
                    <div className="search-controls">
                      <div className="row" role="form">
                        <div id="main_select_filter">
                        <MainSelectFilter onChange={this.onSelectChange} 
                        reports={this.state.reports}
                        regions={this.state.regions} 
                        types={this.state.types}
                        countries={this.state.countries}
                        sectors={this.state.sectors}
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row ">
                <DocumentField />
                <ThematicFocus reports={this.state.reports} onCheck={this.onCheckBoxChange}/>
              </div>
              <div className="row filters" style={{ marginTop: '0px' }}>
                <div className="text-center search-controls-wrapper">
                  <button className="btn btn-primary btn-filter" id="apply_filters" onClick={this.search}>Apply filters</button>
                  <a id="clear_filters" className="btn-clear-filters" title="Clear filters"><i className="fa fa-times-circle"></i></a>
                </div>
              </div>
            </div>
          </div>;
  }
}

global.window.SearchContainer=SearchContainer;
