import React, {Component} from 'react';
import TextBox from '../../.././TextBox/TextBox'
import Image from '../../.././Image/Image'
import './AboutUsHeader.css'

class AboutUsHeader extends Component {

    constructor(props) {
        super(props);
    }

render() {

    return (
        <div id = "Heading">
        <TextBox size = "small" message = "We are"/>
        <Image size = "small"/>
        </div>
    );

}

}

export default AboutUsHeader;
