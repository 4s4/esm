'use strict';
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { reports: []};
  }

  static getDerivedStateFromProps(props, state) {
    const newState = state || {};
    if (
      props.reports !== null && props.reports !== state.reports 
    ) {
      newState.reports = props.reports;
    }
    if (
      props.filters !== state.filters 
    ) {
      newState.filters = props.filters;
    }
    return state;
  }


  render() {
    const country= (countries, countryValue) => {
      const co = countries.find( x => x.value === countryValue );
      const c = co.label;

      if (c.length<7) {
        return (<div  style={{marginTop:"8px"}} className="left-first-colum-first-row">
                  <span className="left-table-row-title">Country:</span>
                  <div className="div-country"> 
                    <span className="table-value boldi">{c}</span> 
                    <span style={{color:"black"}} className="table-value boldi">( {co.code})</span> 
                  </div>
                </div>);
      }
      return (<div>
              <div style={{marginTop:"8px", borderBottom:"0px", marginBottom:"-17px"}} className="left-first-colum-first-row">
                <span className="left-table-row-title">Country:</span> 
                <div style={{float:"right"}} className="hidden-div-country"> 
                <span  className="table-value boldi" >&nbsp;</span> 
                <span style={{color:"black"}} className="table-value boldi">&nbsp;</span> 
                </div> 
              </div> 
              <div style={{marginTop:"8px"}} className="left-first-colum-first-row">
                <span className="left-table-row-title">&nbsp;</span>
                <div className="div-country"> 
                <span  className="table-value boldi">{c}</span> 
                <span style={{color:"black"}} className="table-value boldi">( {co.code})</span> 
                </div>
              </div>
              </div>);
    };

    const wrap_show_less = (css, value) => {
      return (<div className="text-container"> 
                <div className={`text-content ${css}`}> {value} </div> 
                <div className="show-more "> 
                  <div className="rounded-box">
                    <a style={{margin:"10px"}} href="#">show more</a>
                  </div> 
                </div>
              </div> );
    };
    const leftFormatter = (countries, regions) => (c, o) => { 
      const r = regions.find( r => r.value === o.region );
      return (<div key={`left-${o.id}`}>
                <div className="left-first-colum-first-row" > 
                  <span className="left-table-row-title">Region:</span>
                <div className="span-region table-value boldi" >{r.label}</div>
                </div>
                {country(countries, o.country)}
                <div style={{ marginTop:"18px", padding:"10px", border:"1px solid rgb(187, 187, 187)", textAlign: "center" }} > 
                  {/* <img className="world" src={`./img/maps/${r.label}.png`} /> */}
                </div>
              </div>);
    };
    const rightFormatter = (types) => (c, o) => {
      const t =  types.find( x => x.value === o.type ) || {label: o.type};
      return (<div>
                <div className="first-colum-first-row first-colum-first-row-bis" >
                <span className="table-row-title " >Type: </span><span style={{float:"right"}} className="table-value " >{t.label}</span>
                <hr className="hr-table-column" />
                </div> 
                <div   className="left-first-colum-first-row">
                  <span className="left-table-row-title">Year:</span>
                  <div className="div-year"> 
                    <span  className="table-value boldi">{o.year}</span> 
                  </div>
                </div> 
                <div className="left-first-colum-first-row">
                  <span className="left-table-row-title">Period:</span>
                  <div className="div-ip" > 
                    <span  className="table-value boldi">{o.implementationPeriod}</span> 
                  </div>
                </div> 
              </div>
        );
    };
    const sectorsFormatter = (sectors, value) => {
      const screen_bigger = $( window ).width()>760;
//      let chunk = 3;
      let css_class = "col-sm-4";
      if(screen_bigger){
  //        chunk = 6;
          css_class = "col-sm-2";
      }
      const row = (row_data, idx) => (<div key={idx} className="row" style={{marginLeft: "-38px", marginBottom: "10px"}}>{row_data}</div>);
      const extractRowData = (value, idx) => {  
        const s = sectors.find( x => x.value === value );
        return (<div className={css_class} key={`one-${idx}`} >
                  <div className={`label label-default label-table ${css_class}`} key={`two-${idx}`} >
                    <div className="" key={`three-${idx}`} >{s.label}</div>
                  </div>
                </div>);
      };
      
      const r = (i, idx) => row(<ul id="grid" key={idx}>{extractRowData(i, idx)}</ul>, idx);
      return (<div className="container-fluid">{value.map(r)}</div>);
  }

    const middleFormatter = (sectors) => (c, o) => {
      return (<div className="middle-column">
      <h2 className="middle-column-title"><a href="search_details.html#">{o.title}</a></h2>
      {o.description}
    <h3 className="middle-column-seectors" >Sectors:</h3>
      {sectorsFormatter(sectors, o.sectors)}
      </div>);
    };

    const leftHeaderFormatter = (c, idx, cs) => {
      return null;
    };
              
    const columns = (filters) => {
      return [{
        formatter:leftFormatter(filters.countries, filters.regions),
        sort: false,
        dataField: 'region',
        text: ""
      }, {
        formatter:middleFormatter(filters.sectors),
        sort: false, 
        dataField: 'title',
        text: ""
  
      }, {
        formatter:rightFormatter(filters.types),
        sort: false,
        dataField: 'type',
        text: ""
      }]
    };
    
    const defaultSorted = [{
      dataField: 'title',
      order: 'desc'
    }];
    return (<div id="card-table" className="card" style={{display:"inherit"}}>
    <div className="card-content">
    {/*
    <div className="row">
      <div className="control-group" style={{float:"right", textAlign:"right", width:"100%", marginRight:"5px", paddingLeft:"10px"}} >
        <label htmlFor="show-columns">Show extra columns</label><br />
        <select id="show-columns" name="state[]" multiple className="demo-default"  placeholder="Include extra column...">
        </select>
      </div>
    </div>
    */}
    {/* 
    
    <div id="custom-toolbar" className="row">
      <div className="col-md-3">
        <ul className="custom-table-toolbar">
          <li>
            <span className="dropdown pull-right">
              <button href="#" title="Export data" data-toggle="dropdown" className="btn btn-default">
                <i className="fa fa-download fa-fw"></i> Export results
                <i className="fa fa-caret-down"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li><a href="#"><i className="fa fa-file-excel-o"></i> XLS</a></li>
                <li><a href="#"><i className="fa fa-file-pdf-o"></i> PDF</a></li>
                <li><a href="#"><i className="fa fa-file-text-o"></i> CSV</a></li>
              </ul>
            </span>
          </li>
          <li>
            <a href="#" title="Print chart" className="btn btn-default" data-toggle="tooltip"><i className="fa fa-print" ></i></a>
          </li>

        </ul>
      </div>
      <div className="col-md-5">
        <select id="sorter">
          <option value="region left" defaultValue="true">Order by: Region</option>
          <option value="country left">Order by: Country</option>
          <option value="countryCode left">Order by: Country Code</option>
          <option value="title middle">Order by: Title</option>
          <option value="year right" >Order by: Year</option>
          <option value="lastUpdate right">Order by: Last Update</option>
        </select>
      </div>
      <div className="col-md-4">
        <select id="sorter-how">
          <option value="asc" defaultValue="selected">Ascending</option>
          <option value="desc">Descending</option>
        </select>

      </div>
    </div>
    */}
    <BootstrapTable
      //  bootstrap4
        keyField="id"
        data={ this.state.reports }
        columns={ columns(this.state.filters) }
        classes="table-no-hover table-disable-hover search-table"
        defaultSorted={ defaultSorted } 
        pagination={ paginationFactory() }
      />
    </div>
  </div>);
            }
}
export default Results;
