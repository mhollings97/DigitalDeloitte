import React, { Component } from 'react';

import './TextBox.css';

class TextBox extends Component {
  render() {
    return (
      <div >
        
      <form>
          <div>
            {this.props.title} 
          </div>
          <input type = "text" name = "fname">
          </input>
        </form>
       </div>

    );
  }
}

export default TextBox;
