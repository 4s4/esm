'use strict';
import React, { Component } from 'react';

class ThematicFocus extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, region:'' };
    this.wow = this.wow.bind(this);
  }

  wow (e) {
    console.log('wow', e, this.state);
  }

  render() {
    return <div className="well search-tab">
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
                <div className="checkbox" data-toggle="tooltip" title="The strategy focuses on environmental sustainability">
                  <label>
                    <input type="checkbox" id="environment"/>
                    Environment
                    </label>
                </div>
                <div className="checkbox" data-toggle="tooltip" title="The strategy focuses on gender equality">
                  <label>
                    <input type="checkbox" id="gender"/>
                    Gender
                  </label>
                </div>
                <div className="checkbox" data-toggle="tooltip" title="The strategy focuses on poverty reduction">
                  <label>
                    <input type="checkbox" id="poverty_reduction"/>
                    Poverty Reduction
                  </label>
                </div>
              </div>
            </div>
            <div className="col-xs-2">
              <div className="form-group" data-toggle="tooltip" title="">
                <div className="checkbox" data-toggle="tooltip" title="The trade export strategy ">
                  <label>
                    <input type="checkbox" id="export_strategy"/>
                    Export Strategy
                  </label>
                </div>
                <div className="checkbox" data-toggle="tooltip" title="Trade focus">
                  <label>
                    <input type="checkbox" id="trade_focus"/>
                    Focus on trade
                  </label>
                </div>
                <div className="checkbox" data-toggle="tooltip" title="The strategy focuses on youth integration">
                  <label>
                    <input type="checkbox" id="youth"/>
                    Youth
                  </label>
                </div>
              </div>
            </div>
            <div className="col-xs-2">
              <div className="checkbox" data-toggle="tooltip" title="The document focuses on trade facilitation.">
                <label>
                  <input type="checkbox" id="trade_facilitation"  />
                  Trade Facilitation
                </label></div>
              <div className="checkbox" data-toggle="tooltip" title="The document focuses on trade finance and/or access to credit.">
                <label>
                  <input type="checkbox" id="trade_finance"/>
                  Trade Finance
                </label>
              </div>
              <div className="checkbox" data-toggle="tooltip" title="The document focuses on trade information and/or market intelligence.">
                <label>
                  <input type="checkbox" id="trade_information"/>
                  Trade Information
                </label>
              </div>
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
           </div>;
  }
}
export default ThematicFocus;