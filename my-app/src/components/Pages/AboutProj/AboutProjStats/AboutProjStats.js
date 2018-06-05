import React, {Component} from 'react';
import TextBox from '../../.././TextBox/TextBox'
import './AboutProjStats.css'

class AboutProjStats extends Component {

constructor (props) {
    super(props);
}


render () {

    return (
	<div>
	  <div id = "StatsHeading">
	  <TextBox size = "small" message = "Statistics & Numbers"/>
	  </div>
	<div id = "StatsText">
	  <div id = "Projects">
		<p>12 Projects</p>
	  </div>
	  <div id = "Members">
	  	<p>20+ Members</p>
	  </div>
	  <div id = "Leaders">
	  	<p>6 Project Leaders</p>
	  </div>
	</div>
	</div>
    );

}


}

export default AboutProjStats;
