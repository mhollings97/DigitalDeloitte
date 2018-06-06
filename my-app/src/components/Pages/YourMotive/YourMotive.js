import React, { Component } from 'react';
import './YourMotive.css'

class YourMotive extends Component {


constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {

    if (!this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });

    }
  }


  handleSubmit(event) {
    alert('Why you are applying: ' + this.state.applying);
    event.preventDefault();
  }


  render() {
    return (


<div>
      <div>
        <button onClick={this.showMenu}>
          Who are you?
        </button>
	
	{
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <button> Secondary school student </button>
                <button> Bachelor degree student </button>
                <button> Master degree student </button>
                <button> PhD student </button>
                <button> Employee </button>
                <button> Freelancer </button>
                <button> Other </button>
              </div>
            )
            : (
              null
            )
        }
      </div>



	

	<div>
        <button onClick={this.showMenu}>
          What are you interested in the most?
        </button>
	
	{
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <button> Front-end development </button>
                <button> Back-end development </button>
                <button> Business architecture </button>
                <button> Design </button>
                <button> Research and analysis </button>
                <button> Other </button>
              </div>
            )
            : (
              null
            )
        }
      </div>




	<div>
	<div id = "applying">
	    <p>Why are you applying?</p>
	    <input type = "text" applying = {this.state.applying} onChange = {this.handleApplyChange}/> 
	</div>
	</div>
	<div id = "buttonS" onSubmit = {this.onSubmit}>
                <input type="submit" value ="Submit"/>
            </div>


</div>


    );
  }
}

export default YourMotive;

