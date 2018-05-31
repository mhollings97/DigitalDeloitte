import React, { Component } from 'react';
import TextBox from '../.././TextBox/TextBox'
import Image from '../.././Image/Image'
import DDComp from '.././PageComps/DDComp/DDComp'
import './DropDown.css'



class DropDown extends Component {

constructor(props) {
    super(props);

}

render() {
    return (
        <div id = "DropDownWrapper">
		<TextBox size = "large" message = "First you have to tell us something about you"/>
		<DDComp/>

        </div>

    );
  }
}

export default DropDown;

