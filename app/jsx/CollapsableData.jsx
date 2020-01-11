import React, { Component } from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';


class CollapsableData extends Component {
  constructor(props) {
    super(props);
    this.state = { closed: true };
    this.check = this.check.bind(this);
  }


  check(){
    this.setState({closed: !this.state.closed});  
  }

  render() {
    const data = this.state.closed ? this.props.collapsed : this.props.expanded;
    const icon = this.state.closed ? 'plus' : 'minus';
    const button = this.props.collapsed === this.props.expanded ? '' : (<Button color='blue' style={{fontSize: '.48571429rem'}} circular basic size='mini' icon={icon} onClick={this.check}/>); 
  return (<div>{data} {button}</div>);
  }
}

export default CollapsableData;
