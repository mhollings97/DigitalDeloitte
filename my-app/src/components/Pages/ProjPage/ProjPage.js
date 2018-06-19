import React, {Component} from 'react';
import ProjDescription from '../.././ProjDescription/ProjDescription'
import './ProjPage.css'

class ProjPage extends Component {
constructor(props) {
  super(props);
}

render () {

    return (
	<div>
	  <div id = "bigwrap">
	      <div id = "projinfo">
		<p><h2>We compete for the best graphic design poster for the movie "Futuristic Vision"</h2></p>
		<p>Your task will be to design one or at most three variants of a 100x70 cm film poster. The poster will be dedicated to the film exhibition and will be used to present an unprecedented film called "Next Future". The film deals with a vision of the future where there will be a disproportionate development of new technologies that will fundamentally transform our whole world as we know it.</p>
		<p>This is a medium project, so it will be necessary to submit at least one revision and the incorporation of the changes, before the submission of the contest, where from the maximum of five participants we will select the winner who will get the maximum reward. Those who fail will not come and receive a reward if they successfully fulfill the conditions and submit their project.</p>
		<p>The project has a reject date of 31.01.2018 that can not be moved.</p>
		<p>The uploaded file may be in any acceptable format, see the submission section.</p>
		<p>If you are interested in the project, please log in below.</p>
	      </div>
	      <div id = "descbar">
	        <ProjDescription/>
	      </div>
	      <div id = "startwork">
		<button id = "startworking"><b>Start working</b></button>
	      </div>
	  </div>
	</div>
    );

}

}

export default ProjPage;
