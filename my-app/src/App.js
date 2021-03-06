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
import SignOut from './components/Pages/SignOut/SignOut'
import ProjPage from './components/Pages/ProjPage/ProjPage'
import EditProf from './components/Pages/EditProf/EditProf'
import UpdatedInfo from './components/Pages/UpdatedInfo/UpdatedInfo'

class App extends Component {
constructor(props) {
    super(props);
    this.state = {
		showLogOn: false,
		redirectUP: false,
		loggedIn: false,
	};
	this.toggleLog = this.toggleLog.bind(this);
	this.toggleLog2 = this.toggleLog2.bind(this);
	this.handleSubmit = this.toggleLog.bind(this);
	this.handleSignOut = this.handleSignOut.bind(this);
	this.handleSignIn = this.handleSignIn.bind(this);
}
toggleLog(showLogOn) {
	  this.setState(prevState => ({
                showLogOn: !this.state.showLogOn
          }));
}
handleSignOut(loggedIn){
	this.setState(prevState =>({
		loggedIn: false,
	}));
}
handleSignIn(loggedIn){
	console.log("handle sign in");
	this.setState(prevState =>({
		loggedIn: true,
	}));
}
toggleLog2(showLogOn) {
     if(sessionStorage.getItem('user_id') !== '-1'){
	  this.setState(prevState => ({
                showLogOn: !this.state.showLogOn,
		redirectUP: true,
		loggedIn: true,
          }));
     }
}





render() {
    return (
<Router>
      <div>
		{this.state.showLogOn
                	&&
		<div id = "signIn"> 
		<InputForm
		linkButton = {
			<Link to = {'/signup'} >
				<button onClick ={this.toggleLog}>Need and Account? Click here to sign up!</button>
			</Link>
		}
		toggleLog = {this.toggleLog2}
		/> </div>}
		{this.state.redirectUP && <Redirect to = '/userprofile'/>}

		{this.state.showLogOn
                	&&
		<div id = 'catcher' onClick = {this.toggleLog}/>}
      <div id = "head">

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
               {
		this.state.loggedIn
		?
		<div id = "UP">
			<Link to = {'/userprofile'}>
                                <Header title = "Profile"></Header>
			</Link>
                </div>
		:
		<div id = "SI">
                                <Header func = {this.toggleLog} title = "Sign In"></Header>
                </div>
                }
		<div id = "home">
                        <Link to = {'/'}>
                        <HomeButton >Deloitte Digital</HomeButton>
                        </Link>
    		</div>
        </div>
        <div id = "cont">
        <div id = "bord">
        <Route exact = 'true' path = "/" component= {HomeScreen}/>
        <Route path = "/aboutus" component= {AboutUs}/>
	<Route path = '/abouttheproject' component = {AboutProj}/>
	<Route path = "/signupcomplete" component = {AfterSignUp}/>
	<Route path = "/contactus" component = {UserData}/>
        <Route path = "/projectsavailable" component = {ProjectCards}/>
	<Route path = "/signedout" component = {SignOut}/>
	<Route path = "/projectdescription" component = {ProjPage}/>
	<Route path = "/editprofile" component = {EditProf}/>
	<Route path = "/updatedinfo" component = {UpdatedInfo}/>

	<Route path = "/signup" render = { () =>
	<SignUp signIn = {this.handleSignIn}/>} />

	<Route exact = 'true' path = "/userprofile" render = { () =>
	<UserProfile handleSignOut = {this.handleSignOut}/>} />

  </div>
        </div>
      </div>
</Router>
  	);
  }
}

export default App;
