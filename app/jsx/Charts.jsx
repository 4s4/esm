'use strict';
import React, { Component } from 'react';


class Charts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="row ">
             <div className="col-xs-12">
              <div className="charts">
                <div className="card">
                  <span className="card-title">Charts</span>
                  <div className="card-content ">
                    <div id="charts-carousel" className="charts-carousel carousel slide" data-ride="carousel" data-interval="0">
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <div className="row">
                            <div className="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" className="img-responsive"
                                  alt=""/>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" className="img-responsive"
                                  alt=""/>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" className="img-responsive"
                                  alt=""/>
                            </div>
                          </div>
                        </div>
                        <div className="item">
                          <div className="row">
                            <div className="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" className="img-responsive"
                                  alt=""/>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" className="img-responsive"
                                  alt=""/>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" className="img-responsive"
                                  alt=""/>
                            </div>
                          </div>
                        </div>
                        <div className="item">
                          <div className="row">
                            <div className="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" className="img-responsive"
                                  alt=""/>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" className="img-responsive"
                                  alt=""/>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" className="img-responsive"
                                  alt=""/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a className="left carousel-control" href="#charts-carousel" role="button"
                        data-slide="prev">
                        <span className="fa fa-chevron-left" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                      </a>
                      <a className="right carousel-control" href="#charts-carousel" role="button"
                        data-slide="next">
                        <span className="fa fa-chevron-right" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                      </a>
                      <ol className="carousel-indicators">
                        <li data-target="#charts-carousel" data-slide-to="0" className="active"></li>
                        <li data-target="#charts-carousel" data-slide-to="1"></li>
                        <li data-target="#charts-carousel" data-slide-to="2"></li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>);
            }
}
export default Charts;
