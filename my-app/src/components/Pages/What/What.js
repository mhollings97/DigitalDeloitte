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
		<TextBox size = "small" message = "WHAT ARE WE WORKING ON?"/>
		<TextBox size = "large" message = "There is a range of interesting projects that you can immedaitely contribute to."/>
		</div>
		<div id = "AllBoxes">
		    
		    <div id = "Small">
			<TextBox size = "small" message = "SMALL"/>
			<Image size = "small"/>
		    </div>

		    <div id = "Big">
			<TextBox size = "small" message = "BIG"/>
			<Image size = "medium"/>
		    </div>

		    <div id = "Bigger">
			<TextBox size = "small" message = "BIGGER"/>
			<Image size = "large"/>
		    </div>

	 	    <div id = "Biggest">
			<TextBox size = "small" message = "BIGGEEEEST"/>
			<Image size = "xlarge"/>
		    </div>
		</div>
	    </div>
        )

    }

}

export default What;
