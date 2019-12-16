'use strict';
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

const cljs = require('../../js/cljs.js');
import RGL from "react-grid-layout";

function CheckBox(props){
  return <div className="checkbox" >
    <ReactTooltip id={props.id} type='info' effect='solid'>
    <span>{props.title}</span>
    </ReactTooltip>
    <label data-tip data-for={props.id}>
      <input type="checkbox" id={props.id} onChange={props.onChange(props.id)}/>
      {props.name} ({props.count.counter[props.id] ? props.count.counter[props.id] : 0})
    </label>
  </div>;
}

class ThematicFocus extends Component {
  constructor(props) {
    super(props);
    this.state = { reports:[], counter: {} };
    this.check = this.check.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.reports !== state.reports 
    ) {
      return {reports: props.reports, 
              counter: cljs.countThematicFocus(props.reports, props.thematicsFocus)};
    }
    return state;
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
      <div className="col-xs-10">
        <RGL className="layout" cols={12}  rowHeight={30} width={1200}>
          {this.props.thematicsFocus && this.props.thematicsFocus.map((o) => {
            return (<div key={`ks-${o.kw}`} data-grid={{x: (o.col * 3) , y: o.row, w: 3, h: 1, static: true}}  >
                      <CheckBox id={o.kw} name={o.name} onChange={this.check} count={this.state} title={o.description} />
                    </div>)})}
        </RGL>
        </div>
      </div>
    </div>);
  }
}

export default ThematicFocus;
