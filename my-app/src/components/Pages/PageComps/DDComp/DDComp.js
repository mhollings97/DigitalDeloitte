import React, { Component } from 'react';
import Image from '../../.././Image/Image'
import './DDComp.css'



class DDComp extends Component {

constructor(props) {
    super(props);

}

render() {
    return (
        <div id = "DDCWrapper">
	<div id = "LeftPars">
		<p> This is almost like every other job interview. Only it's completely different.</p>
		<p> It's virtual. </p>
		<p> We will need you to tell us a few words about yourself and your motivation to work with us. After you send us application with your CV, our trusty ambassador Jirka will go through it </p>
		<p> Together with all of us, he will decide if you are a good fit and if so, we will contact you on your email and finally you will be able to start choosing interesting projects to work on. </p>
                <div id ="IMG">
                        <Image/>
                </div>

	</div>
        </div>

    );
  }
}

export default DDComp;

