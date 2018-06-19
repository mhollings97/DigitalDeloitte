import React, {Component} from 'react';
import './ProjDescription.css'
import {Redirect} from 'react-router-dom'

class ProjDescription extends Component {

constructor(props) {
	super(props);
}

render () {

    return (

    <div>
	<div id = "descriptionwrap">
	  <div id = "projtype">
	    <h3>Project Type</h3>
	    <p>Small</p>
	    <p>Competitive</p>
	  </div>
	<hr></hr>
	  <div id = "time">
	    <h3>Estimated time effort</h3>
	    <p>6-8 weeks</p>
	  </div>
	<hr></hr>
	  <div id = "deadlines">
	    <h3>Deadlines</h3>
	    <p>Joining: 06.01.2018</p>
	    <p>Revision: 20.01.2018</p>
	    <p>Submission: 31.01.2018</p>
	  </div>
	<hr></hr>
	  <div id = "requirements">
	    <h3>Requirements</h3>
	    <p>Advanced Miming</p>
	  </div>
	<hr></hr>
	  <div id = "reward">
	    <h3>Reward</h3>
	    <p>Winner: 50 ExP</p>
	    <p>Everyone: 20 ExP</p>
	  </div>
	</div>
    </div>

    );

}

}

export default ProjDescription;
