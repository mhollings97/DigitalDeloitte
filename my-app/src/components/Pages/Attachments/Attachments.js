import React, {Component} from 'react';
import Upload from '../.././Buttons/Upload/Upload'
import './Attachments.css'

class Attachments extends Component {

    constructor(props) {
	super(props);

    this.state = {
      linkedinurl: '',
      webpageurl: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    }


  handleSubmit(event) {
    alert('LinkedIn URL: ' + this.state.linkedinurl + 'Personal Webpage URL: ' + this.state.webpageurl);
    event.preventDefault();
  }

    render () {

    return(
	<div>
	    <form onSubmit={this.handleSubmit}>
	    <div>
		<div id = "Heading">
		    <h2>Please upload your CV.</h2>
		</div>
		<div id = "CVUpload">
		    <Upload/>
		</div>
		<div id = "Instructions">
		    <p>You can add link to your LinkedIn Profile or even your website if you have one.</p>
		</div>
		<div id = "LinkedIn">
		    <p>LinkedIn- optional</p>
		    <input type = "text" linkedinurl = {this.state.linkedinurl}/>
		</div>
		<div id = "Personal">
		    <p>Personal webpage- optional</p>
		    <input type = "text" webpageurl = {this.state.webpageurl}/>
		</div>
		<div id = "buttonS">
                    <input type="submit" value ="Submit"/>
                </div>
	    </div>
	    </form>
	
	</div>

    );

    }

}

export default Attachments;
