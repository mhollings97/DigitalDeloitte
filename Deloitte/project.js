//Create Project Object
//Getters and Setters
//Get Ambassadors and Developers
//View and Add Submissions for a project.
//View, Add, and Remove Skills.
//View, Add, and Remove Tags.
//View, Get, Add, and Remove Assets.
function Project(pid, pn, s, t, inConn) {
	var proj_id = pid;
	var p_name = pn;
	var skills;
	var tags;
	this.conn = inConn;

	if(s == null) {
		skills = [];
	}
	else {
		skills = s;
	}

	if(t == null) {
		tags = [];
	}
	else {
		tags = t;
	}

	this.getProj_id = function() {
		return proj_id;
	}
	this.getP_name = function() {
		return p_name;
	}
	this.getSkills = function() {
		if(skills == null) {
			skills = [];
		}
		return skills;
	}
	this.getTags = function() {
		if(tags == null) {
			tags = [];
		}
		return tags;
	}

	this.setP_name = function(n) {
		p_name = n;
	}
	this.setSkills = function(s) {
		if(s == null) {
			skills = [];
		}
		else {
			skills = s;
		}
	}
	this.setTags = function(t) {
		if(t == null) {
			tags = [];
		}
		else {
			tags = t;
		}
	}
}

//Returns all of the Ambassadors for the project.
Project.prototype.getAmbas = function() {
	return this.conn.getWorkers(this.getProj_id(), "Ambassador");
}

//Returns all of the Developers for the project.
Project.prototype.getDevs = function() {
	return this.conn.getWorkers(this.getProj_id(), "Developer");
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

//Adds a tag to the list.
Project.prototype.addTag = function(t) {

}

//Removes a tag from the list.
Project.prototype.removeTag = function(t) {

}

//toString function for testing.
Project.prototype.toString = function() {
	return "" + this.getProj_id() + " " + this.getP_name() + " " + this.getSkills() + " " + this.getTags();
}
