import React, { Component } from 'react';
import './Image.css';

class Image extends Component {

    constructor(props){
	super(props);
    }

    render() {
    	var max = 3;
    	var min = 1;
    	var i = Math.floor(Math.random() * (max - min + 1)) + min;
    	var img2 = "./DeloitteLogo.jpg";
    	if(i == 1){
    		return(
	<div>
	<div id = "Image">
	  <div id = {this.props.size + "IMG"}>
		<img src = {require("./Deloitteimg2.png")} height = "100%" width = "100%" />
	  </div>
	</div>
	</div>
	)
    	}
    	else if(i == 2){
    		return(
	<div>
	<div id = "Image">
	  <div id = {this.props.size + "IMG"}>
		<img src = {require("./download.png")} height = "100%" width = "100%" />
	  </div>
	</div>
	</div>
	)
    	}
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
