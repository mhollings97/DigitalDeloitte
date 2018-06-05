import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import HomeScreen from './components/Pages/HomeScreen/HomeScreen'
import AboutUs from './components/Pages/AboutUs/AboutUs'
import InputForm from './components/InputForm/InputForm'
import TopHeader from './components/Header/TopHeader'
class App extends Component {
constructor(props) {
    super(props);
    this.state = {
        showAU: false,
    	showHome: true,
	showAP: false,
	showCU: false,
	showLogOn: false
	};

        this.redirectAU = this.redirectAU.bind(this);
        this.redirectHome = this.redirectHome.bind(this);
        this.redirectCU = this.redirectCU.bind(this);
        this.redirectAP = this.redirectAP.bind(this);
	this.toggleLog = this.toggleLog.bind(this);
}
	toggleLog(showLogOn) {
            this.setState(prevState => ({
                showLogOn: !prevState.showLogOn
          }));
	}

        redirectAU(showAU) {
            this.setState(prevState => ({
          	        showAU: true,
    			showHome: false,
			showAP: false,
			showCU: false

	    }))
	}
        redirectHome(showHome) {
            this.setState(prevState => ({
          	        showAU: false,
    			showHome: true,
			showAP: false,
			showCU: false

          }));
	}
	redirectAP(showAP) {
            this.setState(prevState => ({
          	        showAU: false,
    			showHome: false,
			showAP: true,
			showCU: false

          }))
        }
	redirectCU(showCU) {
            this.setState(prevState => ({
          	        showAU: false,
    			showHome: false,
			showAP: false,
			showCU: true

          }))
	}

  render() {
    return (
    <div>
	<TopHeader
		redirectAU = {this.redirectAU}
		redirectHome = {this.redirectHome}
		redirectCU = {this.redirectCU}
		redirectAP = {this.redirectAP}
		toggleLog = {this.toggleLog}
	/>
	{this.state.showLogOn
		&& <div id = "signIn"> <InputForm/> </div>
		}
	{this.state.showLogOn && <div id = "catcher" onClick = {this.toggleLog}/>}
    <Router>
	<div>
	 {this.state.showHome && <Redirect from = {this.location} to = "/"/>}
	 <Route exact = {true} path = "/" render={props => <HomeScreen/>} />

	 {this.state.showAU && <Redirect from = {this.location} to = "/aboutus"/>}
	 <Route exact = {true} path = "/aboutus" render={props => <AboutUs/>} />

	 {this.state.showCU && <Redirect from = {this.location} to = "/contactus"/>}
	 <Route exact = {true} path = "/contactus" render={props => <div> CONTACT US </div>} />

	 {this.state.showAP && <Redirect from = {this.location} to = "/abouttheproject"/>}
	 <Route exact = {true} path = "/abouttheproject" render={props => <div> ABOUT THE PROJECT </div>} />

	</div>
    </Router>
    </div>
    );
  }
}

export default App;
