import React, {Component} from 'react';
import TextBox from '../../.././TextBox/TextBox'
import './AboutProjHistory.css'

class AboutProjHistory extends Component {

    constructor(props) {
	super(props);
    }

    render () {

	return (
	    <div id = "HistoryWrap">
		<div id = "HistoryHeader">
		  <TextBox size = "small" message = "A bit about our history"/>
		</div>
	
		<div id = "HistoryText">
			<p>Pls work !!!!</p>
			<p>Pls pls pls pls</p>
		</div>

		<div id = "Timeline">
		  	<h2>2010</h2>
			<p>Digital Deloitte in the Czech Republic</p>
			<h2>2015</h2>
			<p>First release of virtual Deloitte</p>
			<h2>2020</h2>
			<p>Our vision of...</p>
		</div>

	    </div>
	);

    }

}

export default AboutProjHistory;
