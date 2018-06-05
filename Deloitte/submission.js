function Submission(sid, loc, date, uid, pid, inConn) {
	var sub_id = sid;
	var sub_loc = loc;
	var sub_date = date;
	var user_id = uid;
	var proj_id = pid;
	this.conn = inConn;

	this.getSub_id = function() {
		return sub_id;
	}
	this.getSub_loc = function() {
		return sub_loc;
	}
	this.getSub_date = function() {
		return sub_date;
	}
	this.getUser_id = function() {
		return user_id;
	}
	this.getProj_id = function() {
		return proj_id;
	}
}

module.exports = Submission;