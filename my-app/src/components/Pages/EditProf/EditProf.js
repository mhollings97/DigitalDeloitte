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
	    <div id = "EPfirstName">
		<p>First name:</p>
		<input id = "FN" type = "text" firstName = {this.state.firstName}/>
	    </div>
	
	    <div id = "EPlastName">
		<p>Last name:</p>
		<input id = "LN" type = "text" lastName = {this.state.lastName}/>
	    </div>

	    <div id = "EPemail">
		<p>Email:</p>
		<input id = "EM" type = "text" email = {this.state.email}/>
	    </div>

	    <div id = "EPpassword">
		<p>Password:</p>
		<input id = "PW" type = "text" password = {this.state.password}/>
	    </div>

	    <div id = "interests">
		<p>Interests:</p>
		<input id = "I1" type = "text" interests = {this.state.interests}/>
                <input id = "I2" type = "text" interests = {this.state.interests}/>
                <input id = "I3" type = "text" interests = {this.state.interests}/>
	    </div>

	    <div id = "skills">
		<p>Skills:</p>
		<input id = "SK1" type = "text" skills = {this.state.skills}/>
                <input id = "SK2" type = "text" skills = {this.state.skills}/>
                <input id = "SK3" type = "text" skills = {this.state.skills}/>
	    </div>

	    <div id = "software">
		<p>Software:</p>
		<input id = "SO1" type = "text" software = {this.state.software}/>
                <input id = "SO2" type = "text" software = {this.state.software}/>
                <input id = "SO3" type = "text" software = {this.state.software}/>
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
