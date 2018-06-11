import React, { Component } from 'react';
import './UserProfile.css'
import Image from '../.././Image/Image'

class UserProfile extends Component {

constructor(props) {
    super(props);
}

    render () {
	
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
			<p><b>Email: </b>example@email.com</p>
			<p><u>Change your email</u></p>
			<p><b>Password: </b>******</p>
			<p><u>Change your password</u></p>
		    </div>
		    <div id = "Interests">
			<p><b>Interested in: </b></p>
			<p>Design, business architecture</p>
			<p><u>Edit</u></p>
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
		    <div id = "Completed">
			<p>You have no completed projects.</p>
		    </div>
		</div>
	    </div>

	);

    }

}

export default UserProfile;
