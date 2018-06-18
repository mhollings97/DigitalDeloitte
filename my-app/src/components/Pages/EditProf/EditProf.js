import React, { Component } from 'react';
import './EditProf.css'

class EditProf extends Component {

constructor(props) {
    super(props);

        this.state = {
                firstName: "",
                lastName: "",
                email: "",
		password: "",
                interests: "",
		skills: "",
		software: "",
	};
}

render () {

    return (
      <div id = "EditProfWrap">
	<form id = "edits">
	    <div id = "firstName">
		<p>First name:</p>
		<input type = "text" firstName = {this.state.firstName}/>
	    </div>
	
	    <div id = "lastName">
		<p>Last name:</p>
		<input type = "text" lastName = {this.state.lastName}/>
	    </div>

	    <div id = "email">
		<p>Email:</p>
		<input type = "text" email = {this.state.email}/>
	    </div>

	    <div id = "password">
		<p>Password:</p>
		<input type = "text" password = {this.state.password}/>
	    </div>

	    <div id = "interests">
		<p>Interests:</p>
		<input type = "text" interests = {this.state.interests}/>
                <input type = "text" interests = {this.state.interests}/>
                <input type = "text" interests = {this.state.interests}/>
	    </div>

	    <div id = "skills">
		<p>Skills:</p>
		<input type = "text" skills = {this.state.skills}/>
                <input type = "text" skills = {this.state.skills}/>
                <input type = "text" skills = {this.state.skills}/>
	    </div>

	    <div id = "software">
		<p>Software:</p>
		<input type = "text" software = {this.state.software}/>
                <input type = "text" software = {this.state.software}/>
                <input type = "text" software = {this.state.software}/>
	    </div>

	    <div id = "submitchanges">
		<button id = "SCbutton">Submit changes</button>
	    </div>
	</form>
      </div>
    );

}

}

export default EditProf;
