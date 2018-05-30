
import React, { Component } from 'react';
import './TextBox.css'
class TextBox extends Component {

constructor(props) {
    super(props);
}
render() {
   return (
	<p id = {this.props.size}>  {this.props.message} </p>

    );
  }
}

export default TextBox;

