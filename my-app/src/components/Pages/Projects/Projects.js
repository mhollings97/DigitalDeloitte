import React, { Component } from 'react';
import SignedHeader from '../.././SignedHeader/SignedHeader'
import GreyBarProjects from '../.././GreyBarProjects/GreyBarProjects'
import ProjectCards from './ProjectCards/ProjectCards'
import './Projects.css'

class Projects extends Component {

constructor(props) {
    super(props);
}

    render () {

	return (

	<div>
	    <div id = "FloatHeader">
	        <SignedHeader/>
	    </div>

	    <div id = "Cards">
		<ProjectCards/>
	    </div>

	</div>
	);
    }


}

export default Projects;
