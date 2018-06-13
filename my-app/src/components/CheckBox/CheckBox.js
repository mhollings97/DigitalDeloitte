import React, {Component} from 'react';
import './CheckBox.css'

class CheckBox extends Component {

constructor(props) {
    super(props);
}

    render() {

	return (

	<div id = "checkbox">
	<label class="container">I agree to the terms and conditions.
  	    <input type="checkbox"/>
  	    <span class="checkmark"></span>
	</label>
	</div>

	);

    }

}

export default CheckBox;
