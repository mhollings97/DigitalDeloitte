import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './components/Pages/Landing/Landing'
import DropDown from './components/Pages/DropDown/DropDown'
import Welcome from './components/Pages/Welcome/Welcome'
import Who from './components/Pages/Who/Who'
import What from './components/Pages/What/What'
import WhatDrop from './components/Pages/WhatDrop/WhatDrop'
import Expect from './components/Pages/Expect/Expect'
import Offer from './components/Pages/Offer/Offer'
import LandingFooter from './components/Pages/LandingFooter/LandingFooter'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import HomeScreen from './components/Pages/HomeScreen/HomeScreen'

class App extends Component {
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
	<HomeScreen/>
    </Router>
    );
  }
}

export default App;
