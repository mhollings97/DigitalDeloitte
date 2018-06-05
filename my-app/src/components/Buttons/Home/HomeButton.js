import React, { Component } from 'react';

import './HomeButton.css';
class HomeButton extends Component {

  render() {
    return (
      <div id = "ButtonWrapper">
	<button onClick = {this.props.func} id = "Button"> Deloitte Digital </button>
    </div>

    );
  }
}
export default HomeButton;
