import React, { Component } from 'react';
import Image from '../.././Image/Image'
import './WelcComp.css'



class WelcComp extends Component {

constructor(props) {
    super(props);

}

render() {
    return (
        <div id = "WCWrapper">
                <div id = "par">
        	        <p>This is our new project where we created a place for students and digital technologies enthusiasts to be able to work with us remotely on real projects and get experience, feedback and reward in return </p>

                <div id = "pic">
                	<Image/>
                </div>
	        </div>
        </div>

    );
  }
}

export default WelcComp;












