//Create User Object
//Getters and Setters
//Set Password
////Check if password has been set
//Add a skill
//Remove a skill
//Gain XP
//View Level
//View Current Projects
//Add and Remove a Project
//Getters and Setters for Application

Connect = require("./connection");
//Constructs a User object using data from the Database.
//Checks if password is correct.
function User(u, e, f, s, x, sk, t, inConn) {
	var user_id = u;
	var email = e;
	var fName = f;
	var sName = s;
	var xp = x;
	var skills;
	var type = t;
	this.conn = inConn;

	if(sk == null) {
		skills = [];
	}
	else {
		skills = sk;
	}

	this.getUser_id = function() {
		return user_id;
	}
	this.getEmail = function() {
		return email;
	}
	this.getFName = function() {
		return fName;
	}
	this.getSName = function() {
		return sName;
	}
	this.getXP = function() {
		return xp;
	}
	this.getSkills = function() {
		if(skills == null) {
			skills = [];
		}
		return skills;
	}
	this.getType = function() {
		return type;
	}

	this.setEmail = function(e) {
		email = e;
		Connect.updateUser(this.getUser_id(), e, null, null, null, null);
	}
	this.setFName = function(f) {
		fName = f;
		Connect.updateUser(this.getUser_id(), null, null, f, null, null);
	}
	this.setSName = function(s) {
		sName = s;
		Connect.updateUser(this.getUser_id(), null, null, null, s, null);
	}
	this.setXP = function(x) {
		xp = x;
		Connect.updateUser(this.getUser_id(), null, null, null, null, x);
	}
	this.setSkills = function(sk) {
		if(sk == null) {
			skills = [];
		}
		else {
			skills = sk;
		}	
	}
}

//Sets the users password.
User.prototype.setPassword = function(p) {
	Connect.updateUser(this.getUser_id(), null, p, null, null, null);
}

//Allows a user to add a skill.
User.prototype.addSkill = function(s) {
	var temp = this.getSkills();
	temp.push(s);
	this.setSkills(temp);
	return this.conn.addHS(this.getUser_id(), s);
}

//Allows a User to remove a skill.
User.prototype.removeSkill = function(s) {
	var temp = this.getSkills();

	for(var i = 0; i < temp.length; i++) {
		if(s == temp[i]) {
			var ret = temp.splice(i, 1);
			this.setSkills(temp);
			Connect.removeHS(this.getUser_id(), s);
			return ret;
		}
	}
	return null;
}

//Adds XP to the user.
User.prototype.gainXP = function(gain) {
	this.setXP(this.getXP() + gain);
}

//Returns a string of the users standing.
User.prototype.getLevel = function() {
	var x = this.getXP();

	switch(true) {
		case x >= 0 && x <= 100:
			return "Beginner";
			break;
		case x >= 101 && x <= 1000:
			return "Consultant";
			break;
		case x >= 1001:
			return "Master";
			break;
		default:
			return "ERROR: Negative XP";
			break;
	}

	return "ERROR: Exit never should happen";
}

//View all of the current projects
User.prototype.viewProjects = function() {
	//Access server to get projects.
}

//Add a new project
User.prototype.addProject = function(p) {
	//Access server
}

//Remove a project
User.prototype.removeProject = function(p) {
	//Access server
}

//Getters for application
User.prototype.getSchooling = function() {
	//Connection to server to get required data.
}
User.prototype.getInterest = function() {
	//Connection to server to get required data.
}
User.prototype.getApply_Text = function() {
	//Connection to server to get required data.
}
User.prototype.getLinked_In = function() {
	//Connection to server to get required data.
}
User.prototype.getPersonal_Ln = function() {
	//Connection to server to get required data.
}
User.prototype.getCV = function() {
	//Connection to server to get required data.
}

//Setters for application
User.prototype.setSchooling = function(s) {
	//Connection to the server to update the data.
}
User.prototype.setInterest = function(s) {
	//Connection to the server to update the data.
}
User.prototype.setApply_Text = function(s) {
	//Connection to the server to update the data.
}
User.prototype.setLinked_In = function(s) {
	//Connection to the server to update the data.
}
User.prototype.setPersonal_Ln = function(s) {
	//Connection to the server to update the data.
}
User.prototype.setCV = function(s) {
	//Connection to the server to update the data.
}

//toString function for testing code.
User.prototype.toString = function() {
	return "" + this.getUser_id() + " " + this.getEmail() + " " + this.getFName() + " " + this.getSName() + " " + this.getXP() + " " + this.getType() + " " + this.getSkills();
}

module.exports = User;