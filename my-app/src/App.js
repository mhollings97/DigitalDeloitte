import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputForm/InputForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to our Project!</h1>
        </header>
        <div id = "Input-Form">
          <InputForm ></InputForm>
        </div>
      </div>

    );
  }
}

export default App;
