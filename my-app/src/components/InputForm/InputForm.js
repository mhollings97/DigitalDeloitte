import React, { Component } from 'react';

import './InputForm.css';
class InputForm extends Component {
constructor(props) {
    super(props);
    this.state = {
      fname: '',
      sname: '',
      email: ''
    };

    this.handleFChange = this.handleFChange.bind(this);
    this.handleSChange = this.handleSChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFChange(event) {
    this.setState({fname: event.target.value});
  }
  handleSChange(event) {
    this.setState({sname: event.target.value});
  }
  handleEChange(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    alert('First Name: ' + this.state.fname + ' Surname: ' + this.state.sname + ' Email: ' + this.state.email);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div id ="fname"> 
              <p> First Name </p>
              <input type = "text" fname = {this.state.fname} onChange= {this.handleFChange}/>  
            </div>
            <div id ="sname"> 
              <p> Surname </p>
              <input type = "text" sname = {this.state.sname} onChange= {this.handleSChange}/> 
            </div>
            <div id ="email"> 
              <p> Email </p>
              <input type = "text" email = {this.state.email} onChange= {this.handleEChange}/> 
            </div >
	    <div id = "buttonS">
            	<input type="submit" value ="Submit"/>
	    </div>
	    <div id = "SignUp">
		    <button>Need an account? Apply for Virtual Interview</button>
	    </div>
	    </div>
        </form>

      </div>

    );
  }
}
export default InputForm;
