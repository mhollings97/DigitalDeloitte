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
	<img src = {require("./DeloitteLogo.jpg")} height= "200" width= "200" />
	</div>
	</div>
	)    
    }

}

export default Image;
