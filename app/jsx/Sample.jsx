'use strict';
import React, { Component, createElement } from 'react';
import Childo from './Childo';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return <h1>You liked this.</h1>;
    }

    const yuhu = createElement(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
    return <div>
      {yuhu}
      <Childo />
      </div>;
  }
}

export default LikeButton;

global.window.LikeButton=LikeButton;