//Create Project Object
//Getters and Setters
//Get Ambassadors and Developers
//View and Add Submissions for a project.
//View, Add, and Remove Skills.
//View, Add, and Remove Tags.
//View, Get, Add, and Remove Assets.

Connect = require("./connection");

function Project(pid, pn, s, t) {
	var proj_id = pid;
	var p_name = pn;
	var skills = s;
	var tags = t;

	this.getProj_id = function() {
		return proj_id;
	}
	this.getP_name = function() {
		return p_name;
	}
	this.getSkills = function() {
		return skills;
	}
	this.getTags = function() {
		return tags;
	}

	this.setProj_id = function(id) {
		proj_id = id;
	}
	this.setP_name = function(n) {
		p_name = n;
	}
	this.setSkills = function(s) {
		skills = s;
	}
	this.setTags = function(t) {
		tags = t;
	}
}

//Returns all of the Ambassadors for the project.
Project.prototype.getAmbas = function() {
	var prom = Connect.getWorkers("Ambassador");
}

//Returns all of the Developers for the project.
Project.prototype.getDevs = function() {
	var prom = Connect.getWorkers("Developer");
}

//Returns a list of Submissions that the project has recieved.
//User, file location, and date.
Project.prototype.viewSubs = function() {

}

//Adds a submission to the list, given the user_id and location.
Project.prototype.addSub = function(u, l) {

}

//Adds a skill to the list.
Project.prototype.addSkill = function(s) {

}

//Removes a skill from the list.
Project.prototype.removeSkill = function(s) {

}

//Returns an array of skills for the project.
Project.prototype.viewSkills = function() {

}

//Adds a tag to the list.
Project.prototype.addTag = function(t) {

}

//Removes a tag from the list.
Project.prototype.removeTag = function(t) {

}

//Returns a list of tags for the project.
Project.prototype.viewTags = function() {

}
//toString function for testing.
Project.prototype.toString = function() {
	return "" + this.getProj_id() + " " + this.getP_name() + " " + this.getSkills() + " " + this.getTags();
}
