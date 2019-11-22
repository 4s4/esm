'use strict';
import React, { Component } from 'react';


class DocumentField extends Component {
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
            <a className="btn btn-primary" role="button" data-toggle="collapse" href="#collapseDocument" aria-expanded="false" aria-controls="collapseDocument">
              <span className="glyphicon glyphicon-plus collap plus-minus" aria-hidden="true" ></span>
            </a>
            <a className="" role="button" data-toggle="collapse" href="#collapseDocument" aria-expanded="false" aria-controls="collapseDocument">
              <span className="collapse-title">Document field</span>
            </a>  
            <div className="collapse collapseDiv row" id="collapseDocument">
              <div className="col-xs-2"></div>
              <div className="col-xs-3">
                <div className="form-group slider-ip" data-toggle="tooltip" title="">
              <label for="StrategyDate">Implementation period</label>
              <br />
              <input id="StrategyDate" type="text" className="slider " value=""
                    data-range="true"
                    data-slider-min="2002"
                    data-slider-max="2015"
                    data-slider-step="1"
                    data-slider-value="[2006,2010]"
                    data-slider-orientation="horizontal"
                    data-slider-selection="after"
                    data-slider-tooltip="show"
                    />
              <label>2009</label>
              <label>2015</label>
            </div>
                <div data-toggle="tooltip" title="Year.">
                        <select className="input-sm select-approval-Year" id="Year">
                            <option value="">Year approval</option>
                            <option value="2015">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                        </select>
                    </div>
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