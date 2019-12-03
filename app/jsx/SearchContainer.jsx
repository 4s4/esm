'use strict';
import React, { Component } from 'react';
import MainSelectFilter from './MainSelectFilters';
import ThematicFocus from './ThematicFocus';
import DocumentField from './DocumentField';
import Charts from './Charts';
import Results from './Results';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


require('es6-promise').polyfill();
require('isomorphic-fetch');


class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { qq:{}, reports: null, initialReports:null, regions:null, countries:null, sectors:null, types:null, searchResults: null, approval_year:null, active_year: null };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.search = this.search.bind(this);
    this.saveReports = this.saveReports.bind(this);
    this.searchReports = this.searchReports.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
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
      const { ...picked } = this.state.qq;
      if (vals !== undefined && vals !== null ){
      const dict= new Set(vals.map(o => o.value));
      console.log(dict, dict.has('Other') );
      picked['type'] = o => dict.has(o['type']);
      } else {
        delete picked['type'];
      }

      this.searchReports(picked);

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
    const columns = [{
      dataField: 'type',
      text: 'Type',
      sort: true
    }, {
      dataField: 'title',
      text: 'Report Title',
      sort: true
    }, {
      dataField: 'region',
      text: 'Region',
      sort: true
    }];
    
    const defaultSorted = [{
      dataField: 'title',
      order: 'desc'
    }];
    const results = this.state.reports || [];
    
    return <section className="search-controls ">
            <div className="overlay"></div>
              <div className="card">
                <div className="card-content">
                  <div className="row" style={{ marginBottom: '18px' }}>
                    <div className="col-xs-12">
                      <div className="search-controls-wrapper">
                        <div className="search-controls">
                          <div className="row" role="form">
                            <div id="main_select_filter">
                            <MainSelectFilter onChange={this.onSelectChange} 
                            reports={this.state.reports}
                            initialReports={this.state.initialReports}
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
                    <DocumentField reports={this.state.reports} onChange={this.onSelectYear} active_year={this.state.active_year} approval_year={this.state.approval_year}/>
                    <ThematicFocus reports={this.state.reports} onCheck={this.onCheckBoxChange}/>
                  </div>
                  <div className="row filters" style={{ marginTop: '0px' }}>
                    <div className="text-center search-controls-wrapper">
                      <button className="btn btn-primary btn-filter" id="apply_filters" onClick={this.search}>Apply filters</button>
                      <a id="clear_filters" className="btn-clear-filters" title="Clear filters"><i className="fa fa-times-circle"></i></a>
                    </div>
                  </div>
                </div>
              </div>            
               <Charts />
               <Results />
               <BootstrapTable
                bootstrap4
                keyField="id"
                data={ results }
                columns={ columns }
                defaultSorted={ defaultSorted } 
                pagination={ paginationFactory() }
              />
            </section>;
  }
}

global.window.SearchContainer=SearchContainer;
