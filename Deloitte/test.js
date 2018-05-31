//console.log("hello world");
//import mysql;
var User = require("./user");
var Connection = require("./connection");
var conn = new Connection();

function createUser(email, first, last){
	conn.createTable()
	.then(() => conn.createUser(email, first, last)
		.then(() => conn.getUser(email)
			.then(users => console.log(users))//this is where we print selected user
		      .then(() => conn.updateUser(1, null, null, null, null, 69))
			.then(() => conn.closeConnection())));
}
/*
conn.updateUser(1, "egc320@lehigh.edu","password", "Evan", "Choy", 9000); 
*/

createUser(Math.random().toString(36).substring(7) + "@gmail.com", Math.random().toString(36).substring(7), Math.random().toString(36).substring(7));