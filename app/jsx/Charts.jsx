'use strict';
import React, { Component } from 'react';


class Charts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div class="row ">
             <div class="col-xs-12">
              <div class="charts">
                <div class="card">
                  <span class="card-title">Charts</span>
                  <div class="card-content ">
                    <div id="charts-carousel" class="charts-carousel carousel slide" data-ride="carousel" data-interval="0">
                      <div class="carousel-inner" role="listbox">
                        <div class="item active">
                          <div class="row">
                            <div class="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" class="img-responsive"
                                  alt=""/>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" class="img-responsive"
                                  alt=""/>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" class="img-responsive"
                                  alt=""/>
                            </div>
                          </div>
                        </div>
                        <div class="item">
                          <div class="row">
                            <div class="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" class="img-responsive"
                                  alt=""/>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" class="img-responsive"
                                  alt=""/>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" class="img-responsive"
                                  alt=""/>
                            </div>
                          </div>
                        </div>
                        <div class="item">
                          <div class="row">
                            <div class="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" class="img-responsive"
                                  alt=""/>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" class="img-responsive"
                                  alt=""/>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                              <img src="placeholders/2014-09-15_08432.png" class="img-responsive"
                                  alt=""/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a class="left carousel-control" href="#charts-carousel" role="button"
                        data-slide="prev">
                        <span class="fa fa-chevron-left" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a class="right carousel-control" href="#charts-carousel" role="button"
                        data-slide="next">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </a>
                      <ol class="carousel-indicators">
                        <li data-target="#charts-carousel" data-slide-to="0" class="active"></li>
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
