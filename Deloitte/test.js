//console.log("hello world");
//import mysql;
var User = require("./user");
var Connection = require("./connection");
var conn = new Connection();
var currentUser = null;

function createUser(email, first, last){
	conn.createTable()
	.then(() => conn.createUser(email, first, last)
		.then(() => conn.getUser(email)
			.then(users => console.log(users))//this is where we print selected user
		      .then(() => conn.updateUser(1, "egc320@lehigh.edu","password", "Evan", "Choy", 9000))
			.then(() => conn.closeConnection())));
}

function login(email, password) {
	return conn.createTable()
		.then(() => conn.getUser(email)
			.then(users => verifyUser(users, password))//this is where we print selected user
			);
}

function verifyUser(inUser, password) {
	//console.log(inUser[0].dataValues.xp);
	var theUser = inUser[0].dataValues;
	if(password == theUser.password) {
		currentUser = new User(theUser.user_id, theUser.email, theUser.name, theUser.surname, theUser.xp, null, theUser.uType);
		//console.log(currentUser.toString()); //The User is now logged in
		getUserSkills();
	}
	else {
		console.log("incorrect password");
		currentUser = null;
	}
}

function doSomething(func, ...inArg){
	conn.createTable().then(() =>
	func(...inArg)).then(() =>
	conn.closeConnection());
}

function getUserSkills() {
	conn.getUserSkills(currentUser.getUser_id()).then(tuples => pullSkills(tuples));
}

function pullSkills(results) {
    var skills = [];
    for(var i = 0; i < results.length; i++)
        {console.log(results[i].dataValues.skill);
            skills[i] = results[i].dataValues.skill;
    }
    currentUser.setSkills(skills);
    console.log(currentUser.toString());
}
/*
conn.updateUser(1, "egc320@lehigh.edu","password", "Evan", "Choy", 9000); 
*/
login("egc320@lehigh.edu", "password").then(() => doSomething(currentUser.addSkill, "JavaScript"));
//createUser(Math.random().toString(36).substring(7) + "@gmail.com", Math.random().toString(36).substring(7), Math.random().toString(36).substring(7));

setTimeout(conn.closeConnection, 3000);