import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

const domContainer = document.querySelector('#search_container');
const e = React.createElement(Home);
ReactDOM.render(e, domContainer);

