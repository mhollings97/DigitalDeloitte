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

        return (

	<div>
	<div id = "AllCards">

	    <div id = "PC1">
		<ProjCard id = {this.state.id[0]}/>
	    </div>

	    <div id = "PC2">
		<ProjCard id = {this.state.id[1]}/>
	    </div>

	    <div id = "PC3">
		<ProjCard id = {this.state.id[2]}/>
	    </div>

	    <div id = "PC4">
		<ProjCard id = {this.state.id[3]}/>
	    </div>

	</div>
	</div>

	);

}
}
export default ProjectCards;
