import React, { Component } from 'react';
import TextBox from '../.././TextBox/TextBox'
import Image from '../.././Image/Image'
import WhatComp from '.././PageComps/WhatComp/WhatComp'
import './WhatDrop.css'

class WhatDrop extends Component {

constructor (props) {
    super(props);
}

render () {
    return(
	<div id = "WhatWrapper">
	    <TextBox size = "large" message = "You simply choose a project you want."/>
	    <WhatComp/>
	</div>
    );
}


}

export default WhatDrop;
