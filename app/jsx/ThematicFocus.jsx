import React, { Component } from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';


function CheckBox(props){
  return <Popup key={props.id}  content={props.title} trigger={<Segment vertical size='mini'><Checkbox checked={props.checked} onChange={props.onChange(props.id)} label={props.name} /></Segment>} />;
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
      props.reports !== state.reports || props.selections !== state.selections
    ) {
//      console.log('them', cljs.countThematicFocus(props.reports, props.thematicsFocus));
      return {reports: props.reports, selections: props.selections};
    }
    return state;
  }


  check(kw){
    return (event, o) => this.props.onCheck(kw, o);
  }

  r(o){
      return <CheckBox checked={Boolean(this.state.selections[o.kw])} key={o.kw} id={o.kw} name={o.name} onChange={this.check} count={this.state} title={o.description} />;
  }
  render() {
    return (<div>{this.props.thematicsFocus && this.props.thematicsFocus.map(this.r)}</div>);
  }
}

export default ThematicFocus;
