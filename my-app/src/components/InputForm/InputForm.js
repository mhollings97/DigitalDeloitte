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

	this.setState({redirect: !this.state.redirect});
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
	    <div id = "buttonS">
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
