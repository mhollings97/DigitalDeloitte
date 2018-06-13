import React, {Component} from 'react';
import TextBox from '../../.././TextBox/TextBox'
import Image from '../../.././Image/Image'
import './AboutUsClients.css'

class AboutUsClients extends Component {

    constructor(props) {
        super(props);
    }

render () {

    return (

	<div>
	<div id = "ClientsInfo">
	<div id = "PhotosBox">
		<div id = "header">
		<TextBox size = "small" message = "Who are our clients"/>
		</div>
	<div id = "TopRow">
	    <div id = "Top1">
		<Image size = "small"/>
	    </div>
	    <div id = "Top2">
		<Image size = "small"/>
	    </div>
	    <div id = "Top3">
		<Image size = "small"/>
	    </div>
	    <div id = "Top4">
		<Image size = "small"/>
	    </div>
	</div>
	<div id = "BottomRow">
	    <div id = "Bottom1">
		<Image size = "small"/>
	    </div>
	    <div id = "Bottom2">
		<Image size = "small"/>
	    </div>
	    <div id = "Bottom3">
		<Image size = "small"/>
	    </div>
	    <div id = "Bottom4">
		<Image size = "small"/>
	    </div>
	</div>
	</div>
	</div>
	</div>
    );

}

}

export default AboutUsClients;
