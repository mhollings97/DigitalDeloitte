import React, { Component } from 'react';
import Image from '../../.././Image/Image'
import TextBox from '../../.././TextBox/TextBox'
import './WhatComp.css'

class WhatComp extends Component {

    constructor (props) {
	super(props);
    }

    render () {

	return (

	    <div id = "WhatProj">
		<div id = "WhatWrap">
	
		<div id = "WhatOne">
			  <Image size = "small"/>
			  <p>Once you're inside you will be able to choose from variety of projects with their own category and description.</p>
		</div>

		<div id = "WhatTwo">
			  <Image size = "small"/>
			  <p>After you choose the project and apply, you will get access to all materials you need to start working.</p>
		</div>

		<div id = "WhatThree">
			  <Image size = "small"/>
			  <p>If you do have questions you can always ask the project lead or our ambassador.</p>
			  <p>After you will finish the project you upload the result.</p>
		</div>
			
		<div id = "WhatFour">
			  <Image size = "small"/>
			  <p>You will get our feedback, evaluation and promised reward.</p>
			  <p>And if you are good and finish a few projects, you can get even a job offer.</p>
		</div>

		</div>
	    </div>
        );
    }

}

export default WhatComp;
