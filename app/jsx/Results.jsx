'use strict';
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';



class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const country= (c, cc) => {
      if (c.length<7) {
        return (<div  style={{marginTop:"8px"}} className="left-first-colum-first-row">
                  <span className="left-table-row-title">Country:</span>
                  <div className="div-country"> 
                    <span className="table-value boldi">{c}</span> 
                    <span style={{color:"black"}} className="table-value boldi">({cc})</span> 
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
                <span style={{color:"black"}} className="table-value boldi">({cc})</span> 
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
    const leftFormatter = (c, o) => { 
      return (<div>
                <div className="left-first-colum-first-row" > 
                  <span className="left-table-row-title">Region:</span>
                <div className="span-region table-value boldi" >{o.region}</div>
                </div>
                {country(o.country, o.countryCode)}
                <div style={{ marginTop:"18px", padding:"10px", border:"1px solid rgb(187, 187, 187)", textAlign: "center" }} > 
                  <img className="world" src={`./img/maps/${o.region}.png`} />
                </div>
              </div>);
    };
    const rightFormatter = (c, o) => {
      return (<div>
                <div className="first-colum-first-row first-colum-first-row-bis" >
                <span className="table-row-title " >Type: </span><span style={{float:"right"}} className="table-value " >{o.type}</span>
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
    const sectorsFormatter = (value) => {
      const screen_bigger = $( window ).width()>760;
//      let chunk = 3;
      let css_class = "col-sm-4";
      if(screen_bigger){
  //        chunk = 6;
          css_class = "col-sm-2";
      }
      const row = (row_data, idx) => (<div key={idx} className="row" style={{marginLeft: "-38px", marginBottom: "10px"}}>{row_data}</div>);
      const extractRowData = (value, idx) => {  
            return (<div className={css_class} key={`one-${idx}`} >
                      <div className={`label label-default label-table ${css_class}`} key={`two-${idx}`} >
                        <div className="" key={`three-${idx}`} >{value}</div>
                      </div>
                    </div>);
      };
      
      const r = (i, idx) => row(<ul id="grid" key={idx}>{extractRowData(i, idx)}</ul>, idx);
      return (<div className="container-fluid">{value.map(r)}</div>);
  }

    const middleFormatter = (c, o) => {
      return (<div className="middle-column">
      <h2 className="middle-column-title"><a href="search_details.html#">{o.title}</a></h2>
      {o.description}
    <h3 className="middle-column-seectors" >Sectors:</h3>
      {sectorsFormatter(o.sectors)}
      </div>);
    };

              
    const columns = [{
      formatter:leftFormatter,
      sort: false
    }, {
      formatter:middleFormatter,
      sort: false
    }, {
      formatter:rightFormatter,
      sort: false
    }];
    
    const defaultSorted = [{
      dataField: 'title',
      order: 'desc'
    }];
    const results = this.props.reports || [];

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
        bootstrap4
        keyField="sectors"
        data={ results }
        columns={ columns }
        classes="table-no-hover table-disable-hover search-table"
        defaultSorted={ defaultSorted } 
        pagination={ paginationFactory() }
      />
    </div>
  </div>);
            }
}
export default Results;
