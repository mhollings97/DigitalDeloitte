import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './components/Pages/Landing/Landing'
import DropDown from './components/Pages/DropDown/DropDown'
import Welcome from './components/Pages/Welcome/Welcome'
import Who from './components/Pages/Who/Who'
import {BrowserRouter as Router, Link} from 'react-router-dom'
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
	<div className = "App">
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
	</div>
    	</Router>
    );
  }
}

export default App;
