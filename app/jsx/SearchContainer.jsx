'use strict';
import React, { Component } from 'react';
import MainSelectFilter from './MainSelectFilters';
import ThematicFocus from './ThematicFocus';
import DocumentField from './DocumentField';
import Charts from './Charts';
import Map from './Map';
import Results from './Results';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const cljs = require('../../js/cljs.js');

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { qq:{}, filters: {countries:null, regions:null, types: null}, reports: null, initialReports:null, regions:null, countries:null, sectors:null, types:null, searchResults: null, approval_year:null, active_year: null };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.search = this.search.bind(this);
    this.saveReports = this.saveReports.bind(this);
    this.saveFilters = this.saveFilters.bind(this);
    this.searchReports = this.searchReports.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
  }


  saveReports(r){
    console.log('save reports!');
    const rr = cljs.reports(this.state.thematicsFocus, r);
    console.log(rr.map(o => o.type));
    console.log('first report', rr[0]);
    this.setState( { reports: rr, initialReports: rr});
  }

  saveFilters(cc){
    console.log('regions', cljs.regions(cc));
    const state = cljs.assocIn(this.state, 
      [
        [["filters", "countries"], cljs.countries(cc)],
        [["filters", "types"], cljs.types(cc)],
        [["filters", "regions"], cljs.regions(cc)],
        [["filters", "sectors"], cljs.sectors(cc)],
        [["thematicsFocus"], cljs.thematicFocus(cc)]
      ]); 
    console.log(state);
    this.setState( state);   
    fetch('./js/all-records.json')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(this.saveReports);


  }

  componentDidMount() {
    console.log('componentDidMount');

    fetch('./js/filters.json')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(this.saveFilters);
   



  }
  
  selectSelect(vals, kw){
    const { ...picked } = this.state.qq;
    if (vals !== undefined && vals !== null ){
      const dict= new Set(vals.map(o => o.value));
      picked[kw] = o => dict.has(o[kw]);
    } else {
      delete picked[kw];
    }
    this.searchReports(picked);


  }

  onSelectChange (selectType, vals) {
    if(selectType === "Region"){
      this.setState({ regions: vals });
      this.selectSelect.bind(this)(vals, 'region');
    } else if(selectType === "Country") {
      this.setState( { countries: vals } );
      this.selectSelect.bind(this)(vals, 'country');
    } else if(selectType === "Type") {
      this.setState( { types: vals } );
      this.selectSelect.bind(this)(vals, 'type');
    } else if(selectType === "Sector") {
      this.setState( { sectors: vals } );
    }
    console.log(selectType, `Option selected:`, vals)

  };

  onSelectYear (selectType, val) {
    const v = val ? val.value : null ;
    const { ...picked } = this.state.qq;

    if(selectType === "approval_year"){
      this.setState({ approval_year: v });
      if(v){
        const q = v ?  r => r['year'] === v : null;
        picked['approval_year'] = q;
      } else {
        delete picked['approval_year'];
      }
    } else {
      this.setState({ active_year: v });
      if(v){
        const q = v ?  (r) => { 
          const dates = r['implementationPeriod'].split('-').map(o => parseInt(o, 10));
          return v >= dates[0] && v <= dates[1];
          } : null;
        picked['active_year'] = q;
      } else {
        delete picked['active_year'];
      }

    }
    console.log(selectType, `Option selected:`, val)
    this.searchReports(picked);

  };




  searchReports(qqs){
    const queries = Object.values(qqs); 
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
    this.setState({reports, 
      qq: qqs});
    console.log('current results....' ,reports.length);

  }

  onCheckBoxChange (opt, v){
    console.log('listening' , opt, v);
    const q = v ?  r => r[opt] : null;
    const { ...picked } = this.state.qq;
    if (v){
      picked[opt] = q;
    } else {
      delete picked[opt];
    }
    console.log('keys:', Object.keys(picked));
    this.searchReports(picked);
  }

  search(){
    const reportsLength = this.state.reports.length;
    const { reports, initialReports, ...picked} = this.state;
    const search = {reportsLength, ...picked}
    alert(JSON.stringify(search));
  }

  render() {    
//    console.log(cljs.hello(this.state.initialReports));
    return <div>
          {/* <Map reports={this.state.initialReports} /> */}
            <div className="container">
                <section className="search-controls ">
                  <div className="overlay"></div>
                    <div className="card">
                      <div className="card-content">
                        <div className="row" style={{ marginBottom: '18px' }}>
                          <MainSelectFilter
                            onChange={this.onSelectChange} 
                            reports={this.state.reports}
                            initialReports={this.state.initialReports}
                            regions={this.state.regions} 
                            types={this.state.types}
                            countryFilters={this.state.filters.countries}
                            regionFilters={this.state.filters.regions}
                            typeFilters={this.state.filters.types}
                            sectorFilters={this.state.filters.sectors}
                            countries={this.state.countries}
                            sectors={this.state.sectors}
                          />
                        </div>
                        <div className="row ">
                          {/*  <DocumentField reports={this.state.reports} onChange={this.onSelectYear} active_year={this.state.active_year} approval_year={this.state.approval_year}/> */}
                          <ThematicFocus reports={this.state.reports} onCheck={this.onCheckBoxChange}/>
                        </div>
                      </div>
                  </div>

                  {/* <Charts /> */}
                  {/* <Results reports={this.state.reports} /> */}
                </section>
              </div>
            </div>;
  }
}

global.window.SearchContainer=SearchContainer;
