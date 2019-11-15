'use strict';
import React, { Component } from 'react';
import Select from 'react-select';
import {options} from './data';


class Childo extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: null,  };
    this.onChange = this.onChange.bind(this);
  }


  onChange (selectedOption) {
    console.log("arghh");
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render() {
    return <div>
      <Select
        value={this.state.selectedOption}
        onChange={this.onChange}
        options={options}
        isMulti={true}
      />
    </div>
    ;
  }
}

export default Childo;


