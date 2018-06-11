import React, { Component } from 'react';
import './GreyBarProjects.css'

class GreyBarProjects extends Component {

constructor(props){
    super(props);
}

    render () {

	return(

	    <div>
	      <div id = "Wrapper">

		<div id = "Beginner">
		    <button>Beginner</button>
		</div>

		<div id = "Consultant">
		    <button>Consultant</button>
		</div>

		<div id = "SignOff">
		    <button>Sign Off</button>
		</div>
	      </div>
	    </div>

	);

    }

}

export default GreyBarProjects;
