import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './components/Pages/Landing/Landing'
import Welcome from './components/Pages/Welcome/Welcome'
import Who from './components/Pages/Who/Who'
class App extends Component {
  render() {
    return (
	<div className = "App">
		<div id = "LandingContainer">
			<Landing/>
    		</div>
		<div id = "WelcomeContainer">
			<Welcome/>
		</div>
		<div id = "WhoContainer">
			<Who/>
		</div>
	</div>
    );
  }
}

export default App;
