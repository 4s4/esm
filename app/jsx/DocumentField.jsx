'use strict';
import React, { Component } from 'react';
import Childo from './Childo';
import {countIt} from './MainSelectFilters';


class DocumentField extends Component {
  constructor(props) {
    super(props);
    this.state = { reports:[] };
  }

  static getDerivedStateFromProps(props, state) {
    if (
     props.reports && props.reports !== state.reports 
    ) {
      let approvals = props.reports.reduce( (c, o) => {c.add(o['year']); return c;}, new Set());
      const approvals_counts= countIt(props.reports, 'year');
      approvals = Array.from(approvals).sort().map((o) => {return { value: o, label: `${o} (${approvals_counts[o]})`, level: 0 }});
      let actives = props.reports.map( r => r['implementationPeriod'].split("-")).reduce( (c, o) => {c.add(o[0]); c.add(o[1]); return c;}, new Set());    
      actives = Array.from(actives).sort().map((o) => {return { value: o, label: o, level: 0 }});      
      return {reports: props.reports, approvals, actives};
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
              <label for="StrategyDate">Active year</label>
                <Childo options={this.state.actives} placeholder="Select year ..." onChange={this.props.onChange} value={this.props.active_year}
                  isMulti={false}/>
              <label for="StrategyDate">Approval year</label>
                <Childo options={this.state.approvals} placeholder="Select year ..." onChange={this.props.onChange} value={this.props.approval_year}
                  isMulti={false}/>
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