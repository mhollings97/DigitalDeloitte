import React, {Component} from 'react';
import './GreyFooter.css'

class GreyFooter extends Component {

constructor (props) {
    super(props);
}


render() {
    return (
	<div id = "Footer">
	  <div id = "FooterText">
	    <p>Deloitte Digital &emsp;&emsp;  © &emsp;&emsp;  2018</p>
	  </div>
	</div>
    );
}

}

export default GreyFooter;
