'use strict';
import React, { Component } from 'react';
import { Popup, Checkbox, Segment } from 'semantic-ui-react'
const cljs = require('../../js/cljs.js');

function CheckBox(props){
  return <Popup key={props.id}  content={props.title} trigger={<Segment vertical size='mini'><Checkbox onChange={props.onChange(props.id)} label={props.name} /></Segment>} />;
}

class ThematicFocus extends Component {
  constructor(props) {
    super(props);
    this.state = { reports:[] };
    this.check = this.check.bind(this);
    this.r = this.r.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.reports !== state.reports 
    ) {
      console.log('them', cljs.countThematicFocus(props.reports, props.thematicsFocus));
      return {reports: props.reports};
    }
    return state;
  }


  check(kw){
    return event => this.props.onCheck(kw, event.target.checked);
  }

  r(o){
      return <CheckBox key={o.kw} id={o.kw} name={o.name} onChange={this.check} count={this.state} title={o.description} />;
  }
  render() {
    return (<div>{this.props.thematicsFocus && this.props.thematicsFocus.map(this.r)}</div>);
  }
}

export default ThematicFocus;
