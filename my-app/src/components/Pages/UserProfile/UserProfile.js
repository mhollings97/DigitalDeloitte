import React, { Component } from 'react';
import './UserProfile.css'
import Image from '../.././Image/Image'
import {Redirect} from 'react-router-dom'
class UserProfile extends Component {

constructor(props) {
    super(props);

        this.state = {
                firstName: "",
                lastName: "",
		email: "",
		interests: "",
		redirect: false,
	};
	this.handleRedirect = this.handleRedirect.bind(this);
	this.handleSORedirect = this.handleSORedirect.bind(this);
	this.handleERedirect = this.handleERedirect.bind(this);
}

componentDidMount() {


fetch('http://localhost:3069/api/v1/user/' + sessionStorage.getItem('user_id'),
        {
        method:"GET",
        headers: {
                "Content-Type": "application/json"
         }})

	.then((res) => res.json())
        .then(responseData => {
                console.log(responseData);


        })



}

handleRedirect(){

	this.setState({
		redirect: !this.state.redirect,
	});
}

handleSORedirect(){

        this.setState({
                SOredirect: !this.state.SOredirect,
        });
}

handleERedirect(){

        this.setState({
                Eredirect: !this.state.Eredirect,
        });
}

    render () {

	if(this.state.redirect){
		return(
			<Redirect to = "/projectsavailable"/>
		)

	}


        if(this.state.SOredirect){
                return(
                        <Redirect to = "/signedout"/>
                )

        }

        if(this.state.Eredirect){
                return(
                        <Redirect to = "/editprofile"/>
                )

        }
	return (

	    <div>
		<div id = "ProfileWrap">
		    <div id = "UserPhoto">
		        <Image size = "medium"/>
		    </div>
		    <div id = "ExperienceInfo">
			<p><b>Experience Points: </b>0 XP / 100 XP </p>
			<p><b>Level: </b>Beginner</p>
			<p><b>Evaluation Points: </b></p>
			<p><b>Finished Projects: </b></p>
		    </div>
		    <div id = "LogInInfo">
			<p><b>First Name: </b>{this.state.firstName}</p>
			<p><b>Last Name: </b>{this.state.lastName}</p>
			<p><b>Email: </b>{this.state.email}</p>
			<p><b>Password: </b>******</p>
		    </div>
		    <div id = "Interests">
			<p><b>Interested in: </b></p>
			<p>{this.state.interests}</p>
		    </div>
		    <div id = "Skills">
			<p><b>Skills:</b></p>
			<p>drawing</p>
			<p>product design</p>
			<p>coding</p>
		    </div>
		    <div id = "Software">
			<p><b>Software:</b></p>
			<p>Photoshop</p>
			<p>InDesign</p>
		    </div>
		    <div id = "Editing">
			<button id = "editprofile" onClick = {this.handleERedirect}>Edit Information</button>
		    </div>	
		    <div id = "SignOut">
			<button id = "signingout" onClick = {this.handleSORedirect}>Sign Out</button>
		    </div>
		    <div id = "Completed">
			<p>You have no completed projects.</p>
		    </div>
			<div id = "projlink">
				<button id = "availprojs" onClick = {this.handleRedirect}> Click here to see available projects! </button>
			</div>


		</div>
	    </div>

	);

    }

}

export default UserProfile;
