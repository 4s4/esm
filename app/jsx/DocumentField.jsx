'use strict';
import React, { Component } from 'react';
import Childo from './Childo';
const cljs = require('../../js/cljs.js');

class DocumentField extends Component {
  constructor(props) {
    super(props);
    this.state = { reports:[] };
  }

  static getDerivedStateFromProps(props, state) {
    if (
     props.reports && props.reports !== state.reports 
    ) {
      let approvals = cljs.approvalYears(props.reports);
      const approval_year = approvals.filter( o => o.value === props.approval_year ); 
      let actives = cljs.activeYears(props.reports);
      const active_year = actives.filter( o => o.value === props.active_year ); 
      return {reports: props.reports, approvals, actives, active_year, approval_year};
    }
    return null;
  }

  render() {
    return <div className="well search-tab">
            <a className="btn btn-primary" role="button" data-toggle="collapse" href="#collapseDocument" aria-expanded="false" aria-controls="collapseDocument">
              <span className="glyphicon glyphicon-plus collap plus-minus" aria-hidden="true" ></span>
            </a>
            <a className="" role="button" data-toggle="collapse" href="#collapseDocument" aria-expanded="false" aria-controls="collapseDocument">
              <span className="collapse-title">Document field</span>
            </a>  
            <div className="collapse collapseDiv row" id="collapseDocument">
              <div className="col-xs-2"></div>
              <div className="col-xs-3">
              <label htmlFor="StrategyDate">Active year</label>
                <Childo id="active_year" options={this.state.actives} placeholder="Select year ..." onChange={this.props.onChange} value={this.state.active_year}
                  isMulti={false} isClearable={true}/>
              <label htmlFor="StrategyDate">Approval year</label>
                <Childo id="approval_year" options={this.state.approvals} placeholder="Select year ..." onChange={this.props.onChange} value={this.state.approval_year}
                  isMulti={false} isClearable={true}/>
                <div className="sspace" ></div>
              </div>
              <div className="col-xs-2" >
               <div className="sspace" ></div>
              </div>
              <div className="col-xs-2 s-last-document-field-column "  ></div>
            </div>
          </div>;
  }
}
export default DocumentField;