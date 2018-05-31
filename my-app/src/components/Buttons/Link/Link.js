import React, {Component} from 'react';

class Link extends Component {

    constructor (props) {
	super(props);
    } 

    render () {

	return(
	    <div id = "Hyperlink">
		<a href = {this.props.url}> {this.props.text} </a>
	    </div>
	)

    }


}

export default Link;
