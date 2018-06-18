import React, { Component } from 'react';
import Link from '.././Buttons/Link/Link'
import './ProjCard.css'
import {Redirect} from 'react-router-dom'

class ProjCard extends Component {

constructor (props) {
    super(props);

        this.state = {
                redirect: false,
        };

        this.handleRedirect = this.handleRedirect.bind(this);

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
		    <h2>Project Name</h2>
		    <h3>Category</h3>
		    <div id = "ProjSize">
			<p>Small</p>
		    </div>
		    <div id = "ProjComp">
			<p>Competitive</p>
		    </div>
		    <div id = "Description">
			<p>Very short description of the project. Something that will intrigue the user to open the project card and apply for it.</p>
		    </div>
		    <div id = "ApplyDL">
			<p>Deadline for application: 01.01.2018</p>
		    </div>
		    <div id = "SubmitDL">
			<p>Deadline for submission: 01.06.2018</p>
		    </div>
		    <div id = "Reward">
			<p>Reward: 50 ExP</p>
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
