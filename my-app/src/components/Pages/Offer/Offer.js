import React, {Component} from 'react';
import TextBox from '../.././TextBox/TextBox';
import './Offer.css';

class Offer extends Component {

constructor(props) {
    super(props);
}

render () { 

    return (

	<div id = "OfferWrap">

	<div id = "OfferHeading">
	  <p><b>What do we offer?</b></p>
	  <TextBox size = "small" message = "With pain there's gain."/>
	</div>

	<div id = "YouGet">
	  <p><b>YOU WILL GET:</b></p>
	  <p>...opportunity to contribute to real projects.</p>
	  <p>...possibility to work from anywhere anytime it's convenient for you.</p>
	  <p>...feedback and evaluation for your work.</p>
	  <p>...money for some longer projects.</p>
	  <p>...a chance to meet our Partner at party.</p>
	  <p>...a chance to be offered part-time or full-time job opportunity to work at our firm.</p>
	</div>

	</div>

    );

}


}

export default Offer;
