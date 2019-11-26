'use strict';
import React, { Component } from 'react';

function countProp(col, kw){
  if(col){
    return col.filter(o => o[kw]).length;
  } else {
    return 0;
  }
}

function CheckBox(props){
  return <div className="checkbox" data-toggle="tooltip" title={props.title}>
    <label>
      <input type="checkbox" id={props.id} onChange={props.onChange(props.id)}/>
      {props.name} ({props.count[props.id] ? props.count[props.id] : 0})
    </label>
  </div>;
}

class ThematicFocus extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, region:'', reports:[] };
    this.wow = this.wow.bind(this);
    this.check = this.check.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.reports !== state.reports 
    ) {
      return {
        reports: props.reports,
        environment: countProp(props.reports, 'environment'),
        gender: countProp(props.reports, 'gender'),
        poverty_reduction: countProp(props.reports, 'poverty_reduction'),
      };
    }
    return null;
  }

  wow (e) {
    console.log('wow', e, this.state);
  }

  check(kw){
    return event => this.props.onCheck(kw, event.target.checked);
  }

  render() {
    return (<div className="well search-tab">
      <a className="btn btn-primary" role="button" data-toggle="collapse" href="#collapseTheme" aria-expanded="false" aria-controls="collapseTheme">
        <span className="glyphicon glyphicon-plus collap plus-minus" aria-hidden="true" ></span>
      </a>
      <a className="" role="button" data-toggle="collapse" href="#collapseTheme" aria-expanded="false" aria-controls="collapseTheme">
        <span className="collapse-title">Thematic focus</span>
      </a>
      <div className="collapse collapseDiv row" id="collapseTheme">
        <div className="col-xs-2"></div>
        <div className="col-xs-2">
          <div className="form-group" data-toggle="tooltip" title="">
            <CheckBox id="environment" name="Environment" onChange={this.check} count={this.state}
                      title="The strategy focuses on environmental sustainability"
            />
            <CheckBox id="gender" name="Gender" onChange={this.check} count={this.state}
                      title="The strategy focuses on gender equality"
            />
            <CheckBox id="poverty_reduction" name="Poverty Reduction" onChange={this.check} count={this.state}
                      title="The strategy focuses on poverty reduction"
            />
          </div>
        </div>
        <div className="col-xs-2">
          <div className="form-group" data-toggle="tooltip" title="">

            <CheckBox id="export_strategy" name="Export Strategy" onChange={this.check} count={this.state}
                      title="The trade export strategy"
            />
            <CheckBox id="trade_focus" name="Focus on trade" onChange={this.check} count={this.state}
                      title="Trade focus"
            />
            <CheckBox id="youth" name="Youth" onChange={this.check} count={this.state}
                      title="The strategy focuses on youth integration"
            />
          </div>
        </div>
        <div className="col-xs-2">
	  <CheckBox id="trade_facilitation" name="Trade Facilitation" onChange={this.check} count={this.state}
                    title="The document focuses on trade facilitation."
          />
	  <CheckBox id="trade_finance" name="Trade Finance" onChange={this.check} count={this.state}
                    title="The document focuses on trade finance and/or access to credit."
          />
	  <CheckBox id="trade_information" name="Trade Information" onChange={this.check} count={this.state}
                    title="The document focuses on trade information and/or market intelligence."
          />
        </div>
        <div className="col-xs-2">
          <div className="checkbox" data-toggle="tooltip" title="The document focuses on trade promotion.">
            <label>
              <input type="checkbox" id="trade_promotion"/>
              Trade Promotion
            </label>
          </div>
          <div className="checkbox" data-toggle="tooltip" title="The document focuses on standards and/or quality management.">
            <label>
              <input type="checkbox" id="quality"/>
              Quality
            </label>
          </div>
          <div className="checkbox" data-toggle="tooltip" title="The strategy focuses on Technical and Vocational Education and Training (TVET).">
            <label>
              <input type="checkbox" id="tvet"/>
              TVET
            </label>
          </div>
        </div>
        <div className="col-xs-2">
          <div className="checkbox" data-toggle="tooltip" title="The document has a regional scope. The information included applies to a group of countries.">
            <label>
              <input type="checkbox" id="regional"/>
              Regional Scope
            </label>
          </div>
          <div className="checkbox" data-toggle="tooltip" title="The document focuses on regional integration.">
            <label>
              <input type="checkbox" id="regional_integration"/>
              Regional Integration
            </label>
          </div>
          <div className="checkbox" data-toggle="tooltip" title="select all theme options">
            <label style={{fontWeight: "bolder", textDecoration: "underline"}}>
              <input type="checkbox" id="all_theme"/>
              Select all
            </label>
          </div>
        </div>
      </div>
    </div>);
  }
}
export default ThematicFocus;
