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
    this.state = { regions:null, countries:null, sectors:null, types:null };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.search = this.search.bind(this);
  }
  componentWillMount() {
    fetch('./js/data.json')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(stories) {
      console.log(stories.length);
    });

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

  search(){
    alert(JSON.stringify(this.state));
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
                <ThematicFocus />
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
