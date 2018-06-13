import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import HomeScreen from './components/Pages/HomeScreen/HomeScreen'
import AboutUs from './components/Pages/AboutUs/AboutUs'
import AboutProj from './components/Pages/AboutProj/AboutProj'
import InputForm from './components/InputForm/InputForm'
import UserData from './components/UserData/UserData'
import Header from './components/Buttons/Header/Header'
import HomeButton from './components/Buttons/Home/HomeButton'
import TopHeader from './components/Header/TopHeader'
import SignUp from './components/Pages/SignUp/SignUp'
import AfterSignUp from './components/Pages/AfterSignUp/AfterSignUp'
import UserProfile from './components/Pages/UserProfile/UserProfile'
import ProjectCards from './components/Pages/Projects/ProjectCards/ProjectCards'


class App extends Component {
constructor(props) {
    super(props);
    this.state = {
		showLogOn: false
	};
	this.toggleLog = this.toggleLog.bind(this);
	this.handleSubmit = this.toggleLog.bind(this);
}


        toggleLog(showLogOn) {
            this.setState(prevState => ({
                showLogOn: !this.state.showLogOn
          }));
        }





render() {
    return (
<Router>
      <div>
		{this.state.showLogOn
                	&&
		<div id = "signIn"> <InputForm linkButton = {
			<Link to = {'/signup'} >
				<button onClick ={this.toggleLog}>Need and Account? Click here to sign up!</button>
			</Link>
		}/> </div>}

		{this.state.showLogOn
                	&&
		<div id = 'catcher' onClick = {this.toggleLog}/>}


                <div id = "AU">
                        <Link to = {'/aboutus'} >
                                <Header title = "About Us" ></Header>
                        </Link>
                </div>
                <div id = "AP">
                        <Link to = { '/abouttheproject'}>
                                <Header title = "About the Project"></Header>
			</Link>
                </div>
                <div id = "CU">
                        <Link to = { '/contactus'}>
                                <Header title = "Contact Us"></Header>
                        </Link>
                </div>
                <div id = "SI">
                                <Header func = {this.toggleLog} title = "Sign In"></Header>
                </div>
                <div id = "home">
                        <Link to = {'/'}>
                        <HomeButton >Deloitte Digital</HomeButton>
                        </Link>
    		</div>
        <Route exact = 'true' path = "/" component= {HomeScreen}/>
        <Route path = "/aboutus" component= {AboutUs}/>
	<Route path = '/abouttheproject' component = {AboutProj}/>
        <Route path = "/signup" component = {SignUp}/>
	<Route path = "/signupcomplete" component = {AfterSignUp}/>
        <Route exact = 'true' path = "/userprofile" component = {UserProfile}/>
        <Route path = "/contactus" component = {UserData}/>
        <Route path = "/projectsavailable" component = {ProjectCards}/>
      </div>
</Router>
  	);
  }
}

export default App;
