//console.log("hello world");
//import mysql;
var User = require("./user");
var Connection = require("./connection");
var user = new User("MAIN");
var conn = new Connection();

function createUser(email, first, last){
	conn.createTable();
	setTimeout(conn.closeConnection, 500);
	/*timer(function() {
	return conn.getDone();
}, function() {
	conn.closeConnection();
}, 0);*/
	//conn.closeConnection();
}

function timer(func, func2, count) {
	console.log(count);
	if(!(func()) && count < 1000){
		setTimeout(timer(func, func2, count + 1), 50);
	}
	else{
		func2();
	}
}

createUser("dsh@dsa","klsdaj","sdfadsfa");