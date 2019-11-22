'use strict';
import React, { Component } from 'react';
import Select from 'react-select';

class Childo extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: null,  };
    this.onChange = this.onChange.bind(this);
  }
  onChange (selectedOption) {
    this.props.onChange(this.props.placeholder, selectedOption);
  };

  render() {
    const options = this.props.options;
    return <div>
      <Select
        value={this.props.value}
        onChange={this.onChange}
        options={options}
        placeholder={this.props.placeholder}
        isMulti={true}
      />
    </div>
    ;
  }
}

export default Childo;


