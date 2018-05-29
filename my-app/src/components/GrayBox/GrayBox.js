import React, { Component } from 'react';

import './GrayBox.css';
class GrayBox extends Component {
    render() {
	return (
	<table id = "OuterContainer">
		<tc id = "col">
		    <button> Apply for Virtual Internship </button>
		</tc>
		<tc id = "col">
			<button> Become A Member </button>
		</tc>
		<tc id = "col">
			<button> Choose Project </button>
		</tc>
 		<tc id = "col">
			<button> Submit Your Work </button>
		</tc>
		<tc id = "col">
			<button> Get Rewarded </button>
		</tc>
	</table>
	)
    }

}

export default GrayBox;
