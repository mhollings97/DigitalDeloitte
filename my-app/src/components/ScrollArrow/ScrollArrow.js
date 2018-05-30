import React, { Component } from 'react';
import './ScrollArrow.css';

class ScrollArrow extends Component {

render() {
    return (
	<div id = "Arrow">
	<p>Scroll Down</p>
	   <img src = {require("./DownArrow.png")} height= "35" width= "35" />
	</div>
    )
}

}

export default ScrollArrow;
