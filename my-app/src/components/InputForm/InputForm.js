import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './InputForm.css';
class InputForm extends Component {
constructor(props) {
    super(props);
    this.state = {
        email: '',
	password: '',

	redirect: false,
    };

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

  handleSubmit(event) {

console.log("Did I make it here?");
     var object = {
         "username": this.state.email,
         "password": this.state.password
     }

     event.preventDefault();

     fetch('http://localhost:3050/api/v1/auth', {
             method: "POST",
             body: JSON.stringify(object)
         })

         .then((res) => res.json())


         .then(responseData => {

                 console.log(responseData);

                 if(responseData.code === 200)
                     {
			sessionStorage.setItem('user_id' , responseData.data.userData.user_id);
                     }

                 else {
                     //TODO: INSERT ERROR MESSAGE
                     console.log("You forgot to log the error message");
                 }
             })
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div id ="email">
              <p> Email </p>
              <input type = "text" email = {this.state.email} onChange= {this.handleEChange}/> 
            </div >
            <div id ="password">
              <p> Password </p>
              <input type = "text" password = {this.state.password} onChange= {this.handlePWChange}/> 
            </div >
	    <div onClick = {this.handleSubmit} id = "buttonS">
		{this.props.submitButton}
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
