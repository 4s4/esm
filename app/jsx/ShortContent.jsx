import React, { Component } from 'react';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import {summarise} from './utils';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';

function ShortContent(props) {
  const { v, maxWords, color, basic, size } = props;
  const yup = (x) => (<Label color={color || 'blue'} size={size || 'medium'} basic={basic || false}>{x} {props.children}</Label>);
  const s = summarise(v, maxWords);
  if( s === v ){
    return yup(v);
  } else {
    return (<Popup trigger={yup(s)} content={v} />)
  }
}  
export default ShortContent;


