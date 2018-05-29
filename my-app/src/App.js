import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputForm/InputForm'
import TopHeader  from './components/Header/TopHeader'
import GrayBox from './components/GrayBox/GrayBox'
class App extends Component {
  render() {
    return (
      <div className="App">
	<TopHeader/>
        <div id = "Input-Form">
          <InputForm ></InputForm>
          <GrayBox/>
	</div>
      </div>

    );
  }
}

export default App;
