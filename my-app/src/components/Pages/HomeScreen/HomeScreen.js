
import React, { Component } from 'react';
import './HomeScreen.css';
import Landing from '.././Landing/Landing'
import DropDown from '.././DropDown/DropDown'
import Welcome from '.././Welcome/Welcome'
import Who from '.././Who/Who'
import What from '.././What/What'
import WhatDrop from '.././WhatDrop/WhatDrop'
import Expect from '.././Expect/Expect'
import Offer from '.././Offer/Offer'
import LandingFooter from '.././LandingFooter/LandingFooter'
import AboutUs from '.././AboutUs/AboutUs'
import AboutProj from '.././AboutProj/AboutProj'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
class HomeScreen extends Component {
constructor(props) {
    super(props);
    this.state = {
        showDD: false
    };

        this.toggleDD = this.toggleDD.bind(this);
}
        toggleDD(showDD) {
            this.setState(prevState => ({
                showDD: !prevState.showDD
          }));
}

  render() {
    return (
    <Router>
        <div className = "App">
            <div>
                <div id = "LandingContainer">
                        <Landing/>
                </div>
                <div id = "WelcomeContainer">
                        <Welcome toggleDD = {this.toggleDD}/>
                </div>
                <div>
                        {this.state.showDD && <DropDown/>}
                </div>

                <div id = "WhoContainer">
                        <Who/>
                </div>
                <div id = "WhatContainer">
                        <What toggleDD = {this.toggleDD}/>
                </div>
                <div>
                        {this.state.showDD && <WhatDrop/>}
                </div>

                <div id = "ExpectContainer">
                        <Expect/>
                </div>

                <div id = "OfferContainer">
                        <Offer/>
                </div>

                <div id = "LandingFooterContainer">
                        <LandingFooter/>
                </div>
		
		<div id = "AboutUsContainer">
			<AboutUs/>
		</div>

		<div id = "AboutProjContainer">
			<AboutProj/>
		</div>

            </div>
        </div>
    </Router>
    );
  }
}

export default HomeScreen;
