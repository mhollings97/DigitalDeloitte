//console.log("hello world");
//import mysql;
var User = require("./user");
var Connection = require("./connection");
var conn = new Connection();

function createUser(email, first, last){
	conn.createTable();
	var temp = function() {
		conn.createUser(email, first, last);
	}
	setTimeout(temp, 500);
	setTimeout(conn.closeConnection, 1000);
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

createUser("pen@dsa","kyle","smith");