import React, { Component } from 'react';
import ProjCard from '../../.././ProjCard/ProjCard'
import './ProjectCards.css'
class ProjectCards extends Component {

    constructor (props) {
	super(props);

	this.state = { myProjects: [] }
    }


    componentWillMount() {


	fetch('localhost:3050/api/v1/project/' + sessionStorage.getItem('user_id'),
	      {
		  method:"GET",
		      headers: {
		      "Content-Type": "application/json"
			  }})

	    .then(results => {
		    return results.json();
		})

	    .then(ret => {
		    var projects = ret.data.projectData;
		    
		    this.setState({ myProjects: projects });
		})
	    }
    
    render () {
		/*
	<div>
	<div id = "AllCards">

	    <div id = "PC1">
		<ProjCard/>
	    </div>

	    <div id = "PC2">
		<ProjCard/>
	    </div>

	    <div id = "PC3">
		<ProjCard/>
	    </div>

	    <div id = "PC4">
		<ProjCard/>
	    </div>

	</div>
	</div>
		*/
		var container = document.getElementById("container");
		container.innerHTML += '<div class = "wrapper">';
		for(var i = 0; i < this.state.myProjects.length; i++)
		    {
			container.innerHTML += '<div id = "Project' + i + '"><ProjCard/></div>';
		    }
		container.innerHTML += '</div';
		return container;
	}


}

export default ProjectCards;
