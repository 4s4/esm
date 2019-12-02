'use strict';
import React, { Component } from 'react';
import MainSelectFilter from './MainSelectFilters';
import ThematicFocus from './ThematicFocus';
import DocumentField from './DocumentField';
import Charts from './Charts';

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
    return <section class="search-controls ">
            <div class="overlay"></div>
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
              <div id="card-table" class="card" style={{display:"none"}}>
                <div class="card-content">
                <div class="row">
                  <div class="control-group" style={{float:"right", textAlign:"right", width:"100%", marginRight:"5px", paddingLeft:"10px"}} >
                    <label for="show-columns">Show extra columns</label><br />
                    <select id="show-columns" name="state[]" multiple class="demo-default"  placeholder="Include extra column...">
                    </select>
                  </div>
                </div>
                <div id="custom-toolbar" class="row">
                  <div class="col-md-3">
                    <ul class="custom-table-toolbar">
                      <li>
                        <span class="dropdown pull-right">
                          <button href="#" title="Export data" data-toggle="dropdown" class="btn btn-default">
                            <i class="fa fa-download fa-fw"></i> Export results
                            <i class="fa fa-caret-down"></i>
                          </button>
                          <ul class="dropdown-menu dropdown-menu-right">
                            <li><a href="#"><i class="fa fa-file-excel-o"></i> XLS</a></li>
                            <li><a href="#"><i class="fa fa-file-pdf-o"></i> PDF</a></li>
                            <li><a href="#"><i class="fa fa-file-text-o"></i> CSV</a></li>
                          </ul>
                        </span>
                      </li>
                      <li>
                        <a href="#" title="Print chart" class="btn btn-default" data-toggle="tooltip"><i class="fa fa-print" ></i></a>
                      </li>

                    </ul>
                  </div>
                  <div class="col-md-5">
                    <select id="sorter">
                      <option value="region left" selected="selected">Order by: Region</option>
                      <option value="country left">Order by: Country</option>
                      <option value="countryCode left">Order by: Country Code</option>
                      <option value="title middle">Order by: Title</option>
                      <option value="year right" >Order by: Year</option>
                      <option value="lastUpdate right">Order by: Last Update</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <select id="sorter-how">
                      <option value="asc" selected="selected">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>

                  </div>
                </div>
                <table id="juan" class=" table-no-hover table-disable-hover search-table"  >
                  <thead>
                    <tr>
                      <th class="col-xs-4"  >
                      </th>
                      <th class="col-xs-4">
                      </th>
                      <th class="col-xs-4">
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                  <tfoot>
                  </tfoot>
                </table>
                </div>
              </div>
            </section>;
  }
}

global.window.SearchContainer=SearchContainer;
