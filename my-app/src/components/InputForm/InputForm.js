import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import './InputForm.css';
class InputForm extends Component {
constructor(props) {
    super(props);
    this.state = {
        email: '',
	password: '',
    };
	this.hack = this.hack.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePWChange(event) {
    this.setState({password: event.target.value});
  }
  handleEChange(event) {
    this.setState({email: event.target.value});
  }
  hack(event){
	this.setState({email: this.state.email + ' '});
	this.setState({password: ' '});
	console.log("HACKER MAN");
  }

  handleSubmit(event) {
     var object = {
         "username": this.state.email,
         "password": this.state.password
     }

     event.preventDefault();
	console.log('Before Fetch statement session values');
	console.log(sessionStorage.getItem('user_id'));
	console.log(sessionStorage.getItem('auth'));

     fetch('http://localhost:3050/api/v1/auth', {
             method: "POST",
             body: JSON.stringify(object)
         })

         .then((res) => res.json())


         .then(responseData => {
                 console.log(responseData);

                 if(responseData.code === 200){
			console.log("here");
			sessionStorage.setItem('user_id' , responseData.data.userData.user_id);
			sessionStorage.setItem('auth', 1);
                	this.props.toggleLog;
		}

                 else {
                     //TODO: INSERT ERROR MESSAGE
			sessionStorage.setItem('user_id', -1);
			sessionStorage.setItem('auth', -1);
                 }
             })

//	this.forceUpdate();
}

componentWillMount(){
	console.log('component is setting session values');
	sessionStorage.setItem('user_id', -1);
	sessionStorage.setItem('auth',-1);
	console.log(sessionStorage.getItem('user_id'));
	console.log(sessionStorage.getItem('auth'));
}
  render() {
	console.log('In render statement session values');
	console.log(sessionStorage.getItem('user_id'));
	console.log(sessionStorage.getItem('auth'));

	if(sessionStorage.getItem('auth') === '1'){
		console.log("Redirect sucks man");
		return <Redirect to = '/userprofile'/>;
	}

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div id ="SIemail">
              <p> Email </p>
              <input type = "text" email = {this.state.email} onChange= {this.handleEChange}/> 
            </div >
            <div id ="SIpassword">
              <p> Password </p>
              <input type = "text" password = {this.state.password} onChange= {this.handlePWChange}/> 
            </div >
	    <div onClick = {this.handleSubmit} id = "buttonS">
		<button id = 'innerButton' onClick = {this.props.toggleLog}> Submit </button>
	    </div>
	    <div id = "SignUp">
		{this.props.linkButton}
	    </div>
	    </div>
        </form>

      </div>

    );
  }
}
export default InputForm;
