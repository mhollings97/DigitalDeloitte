import React, { Component } from 'react';
import Link from '.././Buttons/Link/Link'
import './ProjCard.css'
import {Redirect} from 'react-router-dom'

class ProjCard extends Component {

constructor (props) {
    super(props);

        this.state = {
        		id: this.props.id,
        		name: "",
        		category: "",
        		comp: "",
        		description: "",
        		applyDL: "",
        		submitDL: "",
        		reward: "",
                redirect: false,
        };

        this.handleRedirect = this.handleRedirect.bind(this);
}

componentDidMount() {

	fetch('http://localhost:3050/api/v1/project/get/' + this.state.id,
        {
        method:"GET",
        headers: {
                "Content-Type": "application/json"
         }})

	.then((res) => res.json())
        .then(responseData => {
                console.log(responseData);
				this.setState({
					name: responseData.data.project_name,
					category: responseData.data.skills[0].name,
					comp: responseData.data.tags[0].name,
					description: responseData.data.description,
					applyDL: responseData.data.join_deadline,
					submitDL: responseData.data.sub_deadline,
					reward: responseData.data.xp_gain,
				})
        })
}

handleRedirect(){

        this.setState({
                redirect: !this.state.redirect,
        });
}

    render () {

        if(this.state.redirect){
                return(
                        <Redirect to = "/projectdescription"/>
                )

        }
	return (
	
	    <div>
		<form>
		<div id = "ProjectCard">
		    <h2>{this.state.name}</h2>
		    <h3>Category</h3>
		    <div id = "ProjSize">
			<p>{this.state.category}</p>
		    </div>
		    <div id = "ProjComp">
			<p>{this.state.comp}</p>
		    </div>
		    <div id = "Description">
			<p><b>{this.state.description}</b></p>
		    </div>
		    <div id = "ApplyDL">
			<p><b>Deadline for application: </b>{this.state.applyDL}</p>
		    </div>
		    <div id = "SubmitDL">
			<p><b>Deadline for submission: </b>{this.state.submitDL}</p>
		    </div>
		    <div id = "Reward">
			<p><b>Reward: </b>{this.state.reward}<b> XP</b></p>
		    </div>
		    <div id = "ShowMore">
			<button id = "showmore" onClick = {this.handleRedirect}>Show More</button>
		    </div>
		
		</div>
		</form>
	    </div>

	);

    }
}

export default ProjCard;
