'use strict';
import React, { Component } from 'react';


class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div id="card-table" className="card" style={{display:"none"}}>
    <div className="card-content">
    <div className="row">
      <div className="control-group" style={{float:"right", textAlign:"right", width:"100%", marginRight:"5px", paddingLeft:"10px"}} >
        <label htmlFor="show-columns">Show extra columns</label><br />
        <select id="show-columns" name="state[]" multiple className="demo-default"  placeholder="Include extra column...">
        </select>
      </div>
    </div>
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
    <table id="juan" className=" table-no-hover table-disable-hover search-table"  >
      <thead>
        <tr>
          <th className="col-xs-4"  >
          </th>
          <th className="col-xs-4">
          </th>
          <th className="col-xs-4">
          </th>
        </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
      </tfoot>
    </table>
    </div>
  </div>);
            }
}
export default Results;
