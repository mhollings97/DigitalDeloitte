//Create User Object
//Getters and Setters
//Set Password
//Check if password has been set
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
function User(e, p) {
	var val = Connect.getUser(e);

	if(p != val[2]) {
		return -1;
	}

	var s = Connect.getUserSkills(var[0]);

	var user_id = val[0];
	var email = val[1];
	var fName; = val[3];
	var sName; = val[4];
	var xp = val[5];
	var skills = s;
	var type = val[6];

	this.getUser_id() {
		return user_id;
	}
	this.getEmail() {
		return email;
	}
	this.getFName() {
		return fName;
	}
	this.getSName() {
		return sName;
	}
	this.getXP() {
		return xp;
	}
	this.getSkills() {
		return skills;
	}
	this.getType() {
		return type;
	}
	this.setFName(f) {
		fName = f;
	}
	this.setSName(s) {
		sName = s;
	}
	this.setXP(x) {
		xp = x;
	}
	this.setSkills(s) {
		skills = s;
	}
	this.setType(t) {
		type = t;
	}
}

//Sets the users password.
User.prototype.setPassword = function(p) {
	Connect.updateUser(/*Some code to update*/);
}

//Checks if the password has ever been set.
User.prototype.checkApprove = function() {
	var val = Connect.getUser(this.getEmail());

	if(val[2] == undefined) {
		return 0;
	}

	return 1;
}

//Allows a user to add a skill.
User.prototype.addSkill = function(s) {
	this.getSkills.push(s);
}

//Allows a User to remove a skill.
User.prototype.removeSkill = function(s) {
	var temp = this.getSkills();

	for(var i = 0; i < temp.length; i++) {
		if(s == temp[i]) {
			var ret = this.getSkills().splice(i, 1);
			return ret;
		}
	}
	return undefined;
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
		case x >= 101 && <= 1000:
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