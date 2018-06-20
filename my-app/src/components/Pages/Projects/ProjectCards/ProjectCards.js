import React, { Component } from 'react';
import ProjCard from '../../.././ProjCard/ProjCard'
import './ProjectCards.css'
class ProjectCards extends Component {

    constructor (props) {
	super(props);

	this.state = {
	    id: [],
	    loading: 'initial'
	}
    }

    componentDidMount() {
	this.setState({loading: 'true'})
	    fetch('http://localhost:3050/api/v1/project/' + sessionStorage.getItem('user_id'),
		  {
		      method:"GET",
			  headers: {
			  "Content-Type": "application/json"
			      }})

	    .then((res) => res.json())
	    .then(responseData => {
		    console.log(responseData);
		    var temp = [];
		    for(var i = 0; i < responseData.data.projectData.length; i++) {
                temp[i] = responseData.data.projectData[i].project_id
		    }
		    this.setState({id: temp, loading: 'false'})
		})
	    }
    render () {

        if(this.state.loading === 'initial') {
            return <h2></h2>
		}
        if(this.state.loading === 'true') {
            return <h2></h2>
		}

                var container = document.getElementById("container");
		container.innerHTML += '<div>';
		container.innerHTML += '<div id = "AllCards">';
		for(var i = 0; i < this.state.myProjects.length; i++)
		    {
			container.innerHTML += '<div id = "Project' + i +
			    '"><ProjCard id = {' + this.state.id[i] +
			    '}/></div>';
		    }
		container.innerHTML += '</div';
		container.innerHTML += '</div';
		return container;
	}


}

export default ProjectCards;
