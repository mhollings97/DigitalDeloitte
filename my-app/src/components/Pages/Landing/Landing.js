import React, { Component } from 'react';
import InputForm from '../.././InputForm/InputForm'
import TopHeader  from '../.././Header/TopHeader'
import GrayBox  from '../.././GrayBox/GrayBox'
class Landing extends Component {
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

export default Landing;

