import React, { Component } from 'react';
import './UserData.css';
class UserData extends Component {

 constructor() {
                super();
                this.state = {
			firstName: "",
			lastName: "",
			role: ""

                };

}
componentDidMount() {


fetch('https://private-ae364-vdwregistration.apiary-mock.com/api/v1/people/1', 
	{
	method:"GET",
	headers: {
 		"Content-Type": "application/json"
 	 }})

	.then(results => {
                return results.json();
        })

	.then(responseData => {
		console.log(responseData.data);

			this.setState({
			firstName: responseData.data.firstName,
			role: responseData.data.role,
			lastName: responseData.data.lastName,
		});

        })



}


  render() {
    return (

	<div>
		<p>{this.state.firstName}</p>
		<p>{this.state.lastName} </p>
		<p>{this.state.role} </p>
	</div>

    );
  }
}
export default UserData;







