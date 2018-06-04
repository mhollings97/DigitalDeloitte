import React, {Component} from 'react';
import TextBox from '../.././TextBox/TextBox'
import Apply from '../.././Buttons/Apply/Apply'
import './LandingFooter.css'

class LandingFooter extends Component {

constructor(props) {
    super(props);
}

render () {

    return (

	<div id = "LFooterWrap">
	  <TextBox size = "small" message = "Ready to show us your skills and work with Deloitte Digital?"/>
	  <Apply/>
	</div>

    );

}

}

export default LandingFooter;
