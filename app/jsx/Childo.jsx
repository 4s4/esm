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
    const dot = (color = '#ccc') => ({
      alignItems: 'center',
      display: 'flex',
    
      ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
      },
    });
    
    const colourStyles = {
      control: styles => ({ ...styles, backgroundColor: 'white' }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    //    const color = data.color ? '#ff69b4' : "#EFEFEF";
        if(data.level === 1){
          //console.log(data);
          return { ...styles, backgroundColor:'pink', marginLeft: '20px'};
        }else{
          return styles;
        }
/*        return {
          ...styles,
          backgroundColor: isDisabled
            ? null
            : isSelected
            ? data.color
            : isFocused
            ? color.alpha(0.1).css()
            : null,
          color: isDisabled
            ? '#ccc'
            : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : data.color,
          cursor: isDisabled ? 'not-allowed' : 'default',
    
          ':active': {
            ...styles[':active'],
            backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
          },
        }; */
      },
      input: styles => ({ ...styles, ...dot() }),
      placeholder: styles => ({ ...styles, ...dot() }),
      singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    const options = this.props.options;
    return <div>
      <Select
        value={this.props.value}
        onChange={this.onChange}
        options={options}
        defaultMenuIsOpen={this.props.defaultMenuIsOpen}
        placeholder={this.props.placeholder}
        styles={colourStyles}
        isMulti={this.props.isMulti}
      />
    </div>
    ;
  }
}

export default Childo;


