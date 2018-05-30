import React, { Component } from 'react';
import InputForm from '../.././InputForm/InputForm'
import TopHeader  from '../.././Header/TopHeader'
import GrayBox  from '../.././GrayBox/GrayBox'
class Landing extends Component {

constructor(props) {
    super(props);
    this.state = {
	showLogOn: true
    };

	this.toggleLog = this.toggleLog.bind(this);
}
	toggleLog(showLogOn) {
	    this.setState(prevState => ({
		showLogOn: !prevState.showLogOn
	  }));
	}

render() {
    return (
      <div className="App">
        <TopHeader func = {this.toggleLog}/>
        <div id = "Input-Form">
          <button onClick = {this.toggleLog}> TOGGLE </button>
	  {this.state.showLogOn && <InputForm/>}
          <GrayBox/>
        </div>
      </div>

    );
  }
}

export default Landing;

