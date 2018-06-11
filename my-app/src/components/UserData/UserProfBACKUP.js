import React, { Component } from 'react';
import './UserProf.css';
class UserProf extends Component {

 constructor() {
                super();
                this.state = {
                        users: [],
                };

}
componentDidMount() {

	fetch('https://private-ae364-vdwregistration.apiary-mock.com/api/v1/people/1')
       .then(results => {
                return results.json();
        }).then(data => {
                let users = data.results.map((usr) => {
                        return(
                                <div key = {usr.results}>
                                        <div id = "fName"> { usr.data.firstName } </div>
                                        <div id = "sName"> { usr.data.lastName } </div>
                                        <div id = "email"> { usr.data.email } </div>
                                </div>
                        )
                })
                this.setState({users: users});
                console.log("Adding user", this.state.users);
        })
}


  render() {
    return (
		<div id = "usrCont">
                        {this.state.users}
                </div>

    );
  }
}
export default UserProf;


