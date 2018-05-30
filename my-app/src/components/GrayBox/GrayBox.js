import React, { Component } from 'react';

import './GrayBox.css';
class GrayBox extends Component {
    render() {
	return (
	<table id = "OuterContainer">
		<tc>
			<button id = "col"> Apply for Virtual Internship </button>
		</tc>
		<tc>
		 	<button id = "col"> Become A Member </button>
		</tc>
		<tc>
			<button id = "col"> Choose Project </button>
		</tc>
 		<tc>
			<button id = "col"> Submit Your Work </button>
		</tc>
		<tc>
			<button id = "col"> Get Rewarded </button>
		</tc>
	</table>
	)
    }

}

export default GrayBox;
