import React, { Component } from 'react';
import './Image.css';

class Image extends Component {

    constructor(props){
	super(props);
    }

    render() {
	return(
	<div>
	<div id = "Image">
	  <div id = {this.props.size + "IMG"}>
		<img src = {require("./DeloitteLogo.jpg")} height = "100%" width = "100%" />
	  </div>
	</div>
	</div>
	)    
    }

}

export default Image;
