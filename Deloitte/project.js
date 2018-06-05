//Create Project Object
//Getters and Setters
//Get Ambassadors and Developers
//View and Add Submissions for a project.
//View, Add, and Remove Skills.
//View, Add, and Remove Tags.
//View, Get, Add, and Remove Assets.
function Project(pid, pn, c, d, r, j, re, s, min, max, p, xG, xB, s, t, inConn) {
	var proj_id = pid;
	var p_name = pn;
	var comp_time = c;
	var desc = d;
	var rec = r;
	var joinD = j;
	var revD = re;
	var subD = s;
	var minDif = min;
	var maxDif = max;
	var people = p;
	var xp_gain = xG;
	var xp_bonus = xB;
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
	this.getComp = function() {
		return comp_time;
	}
	this.getDesc = function() {
		return desc;
	}
	this.getRec = function() {
		return rec;
	}
	this.getJoin_Dead = function() {
		return joinD;
	}
	this.getRev_Dead = function() {
		return revD;
	}
	this.getSub_Dead = function() {
		return subD;
	}
	this.getMin_Dif = function() {
		return minDif;
	}
	this.getMax_Dif = function() {
		return maxDif;
	}
	this.getPeople = function() {
		return people;
	}
	this.getXP_Gain = function() {
		return xp_gain;
	}
	this.getXP_Bon = function() {
		return xp_bonus;
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
		this.conn.updateProject(this.getProj_id(), n, null, null, null, null, null, null, null, null, null, null, null);
	}
	this.setComp = function(c) {
		comp_time = c;
		this.conn.updateProject(this.getProj_id(), null, c, null, null, null, null, null, null, null, null, null, null);
	}
	this.setDesc = function(d) {
		desc = d;
		this.conn.updateProject(this.getProj_id(), null, null, d, null, null, null, null, null, null, null, null, null);
	}
	this.setRec = function(r) {
		rec = r;
		this.conn.updateProject(this.getProj_id(), null, null, null, r, null, null, null, null, null, null, null, null);
	}
	this.setJoin_Dead = function(j) {
		joinD = j;
		this.conn.updateProject(this.getProj_id(), null, null, null, null, j, null, null, null, null, null, null, null);
	}
	this.setRev_Dead = function(r) {
		revD = r;
		this.conn.updateProject(this.getProj_id(), null, null, null, null, null, r, null, null, null, null, null, null);
	}
	this.setSub_Dead = function(s) {
		subD = s;
		this.conn.updateProject(this.getProj_id(), null, null, null, null, null, null, s, null, null, null, null, null);
	}
	this.setMin_Dif = function(m) {
		minDif = m;
		this.conn.updateProject(this.getProj_id(), null, null, null, null, null, null, null, m, null, null, null, null);
	}
	this.setMax_Dif = function(m) {
		maxDif = m;
		this.conn.updateProject(this.getProj_id(), null, null, null, null, null, null, null, null, m, null, null, null);
	}
	this.setPeople = function(p) {
		people = p;
		this.conn.updateProject(this.getProj_id(), null, null, null, null, null, null, null, null, null, p, null, null);
	}
	this.setXP_Gain = function(x) {
		xp_gain = x;
		this.conn.updateProject(this.getProj_id(), null, null, null, null, null, null, null, null, null, null, x, null);
	}
	this.setXP_Bon = function(x) {
		xp_bonus = x;
		this.conn.updateProject(this.getProj_id(), null, null, null, null, null, null, null, null, null, null, null, x);
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
	return this.conn.getSub(null, this.getProj_id());
}

//Adds a skill to the list.
Project.prototype.addSkill = function(s) {
	var temp = this.getSkills();
	temp.push(s);
	this.setSkills(temp);
	return this.conn.addNS(this.getProj_id(), s);
}

//Removes a skill from the list.
Project.prototype.removeSkill = function(s) {
	var temp = this.getSkills();

	for(var i = 0; i < temp.length; i++) {
		if(s == temp[i]) {
			var ret = temp.splice(i, 1);
			this.setSkills(temp);
			this.conn.deleteNS(this.getProj_id(), s);
			return ret;
		}
	}
	return null;
}

//Adds a tag to the list.
Project.prototype.addTag = function(t) {
	var temp = this.getTags();
	temp.push(t);
	this.setTags(temp);
	return this.conn.addHT(this.getProj_id(), t);
}

//Removes a tag from the list.
Project.prototype.removeTag = function(t) {
	var temp = this.getTags();

	for(var i = 0; i < temp.length; i++) {
		if(t == temp[i]) {
			var ret = temp.splice(i, 1);
			this.setTags(temp);
			this.conn.deleteHT(this.getProj_id(), t);
			return ret;
		}
	}
	return null;
}

//Adds an asset to the project.
Project.prototype.addAsset = function(type, loc, desc, date) {
	return this.conn.addAsset(this.getProj_id(), type, loc, desc, date);
}

//Gets an asset by its type, or all assets if type is null
Project.prototype.getAsset = function(type) {
	return this.conn.getAsset(this.getProj_id(), type);
}

//Removes an asset based on its location
Project.prototype.removeAsset = function(loc) {
	return this.conn.deleteAsset(this.getProj_id(), loc);
}

//toString function for testing.
Project.prototype.toString = function() {
	return "" + this.getProj_id() + " " + this.getP_name() + " " + this.getSkills() + " " + this.getTags();
}

module.exports = Project;