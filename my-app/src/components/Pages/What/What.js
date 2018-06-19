import React, {Component} from 'react';
import TextBox from '../.././TextBox/TextBox'
import Image from '../.././Image/Image'
import './What.css'

class What extends Component {

    constructor(props) {
	super(props);
    }

    render() {

	return (
	    <div>
		<div id = "HeadingText">
		<TextBox message = "WHAT ARE WE WORKING ON?"/>
		</div>
		<div id = "MainHeading">
		<TextBox message = "There is a range of interesting projects that you can immedaitely contribute to."/>
		</div>
		<div id = "AllBoxes">
		    
		    <div id = "Small">
		    <div id = "smallwrd">
			<TextBox size = "small" message = "SMALL"/>
			</div>
			<Image size = "small"/>
		    </div>

		    <div id = "Big">
		    <div id = "bigwrd">
			<TextBox size = "small" message = "BIG"/>
			</div>
			<Image size = "medium"/>
		    </div>

		    <div id = "Bigger">
		    <div id = "biggerwrd">
			<TextBox size = "small" message = "BIGGER"/>
			</div>
			<Image size = "large"/>
		    </div>

	 	    <div id = "Biggest">
	 	    <div id = "biggestwrd">
			<TextBox size = "small" message = "BIGGEEEEST"/>
			</div>
			<Image size = "xlarge"/>
		    </div>
		</div>
                <button id = "WhatBut" onClick = {this.props.toggleWhat}> How will you work with us?</button>

	    </div>
        )

    }

}

export default What;
