var User = require("./user.js");
var Connection = require('./connection');
var conn = new Connection();

var user1;
var user2;
var user3;
var user4;
var user5;
var user6;
var user7;
var user8;
var user9;
var user10;

conn.createTable().then(async function() {
	await conn.createUser("msd220@lehigh.edu", "chicken", "Matt", "Dolce");
	await conn.createUser("nab320@lehigh.edu", "duck", "Nicole", "Bruno");
	await conn.createUser("tab123@lehigh.edu", "cow", "Matt", "Smith");
	await conn.createUser("abc123@lehigh.edu", "dog", "Kevin", "Boy");
	await conn.createUser("xyz789@lehigh.edu", "horse", "Darwin", "Smith");
	await conn.createUser("keven42@lehigh.edu", "DeloitteDigital", "Frank", "Man");
	await conn.createUser("loewMan42@lehigh.edu", "earth", "Steven", "Dolce");
	await conn.createUser("rbx123@lehigh.edu", "ihob", "Arnold", "Arnold");
	await conn.createUser("rgbLights@lehigh.edu", "futility", "Hampster", "Dan");
	await conn.createUser("appleTreeYard@lehigh.edu", "password", "Bojack", "Horseman");
	}).then(async function() {
	var temp1 = await conn.getUser("msd220@lehigh.edu", "chicken");
	user1 = new User(temp1[0].dataValues.user_id, temp1[0].dataValues.email, temp1[0].dataValues.name, 
		temp1[0].dataValues.surname, temp1[0].dataValues.xp, null, temp1[0].dataValues.uType, conn);

	var temp2 = await conn.getUser("nab320@lehigh.edu", "duck");
	user2 = new User(temp2[0].dataValues.user_id, temp2[0].dataValues.email, temp2[0].dataValues.name, 
		temp2[0].dataValues.surname, temp2[0].dataValues.xp, null, temp2[0].dataValues.uType, conn);
	
	var temp3 = await conn.getUser("tab123@lehigh.edu", "cow");
	user3 = new User(temp3[0].dataValues.user_id, temp3[0].dataValues.email, temp3[0].dataValues.name, 
		temp3[0].dataValues.surname, temp3[0].dataValues.xp, null, temp3[0].dataValues.uType, conn);
	
	var temp4 = await conn.getUser("abc123@lehigh.edu", "dog");
	user4 = new User(temp4[0].dataValues.user_id, temp4[0].dataValues.email, temp4[0].dataValues.name, 
		temp4[0].dataValues.surname, temp4[0].dataValues.xp, null, temp4[0].dataValues.uType, conn);
	
	var temp5 = await conn.getUser("xyz789@lehigh.edu", "horse");
	user5 = new User(temp5[0].dataValues.user_id, temp5[0].dataValues.email, temp5[0].dataValues.name, 
		temp5[0].dataValues.surname, temp5[0].dataValues.xp, null, temp5[0].dataValues.uType, conn);
	
	var temp6 = await conn.getUser("keven42@lehigh.edu", "DeloitteDigital");
	user6 = new User(temp6[0].dataValues.user_id, temp6[0].dataValues.email, temp6[0].dataValues.name, 
		temp6[0].dataValues.surname, temp6[0].dataValues.xp, null, temp6[0].dataValues.uType, conn);
	
	var temp7 = await conn.getUser("loewMan42@lehigh.edu", "earth");
	user7 = new User(temp7[0].dataValues.user_id, temp7[0].dataValues.email, temp7[0].dataValues.name, 
		temp7[0].dataValues.surname, temp7[0].dataValues.xp, null, temp7[0].dataValues.uType, conn);
	
	var temp8 = await conn.getUser("rbx123@lehigh.edu", "ihob");
	user8 = new User(temp8[0].dataValues.user_id, temp8[0].dataValues.email, temp8[0].dataValues.name, 
		temp8[0].dataValues.surname, temp8[0].dataValues.xp, null, temp8[0].dataValues.uType, conn);
	
	var temp9 = await conn.getUser("rgbLights@lehigh.edu", "futility");
	user9 = new User(temp9[0].dataValues.user_id, temp9[0].dataValues.email, temp9[0].dataValues.name, 
		temp9[0].dataValues.surname, temp9[0].dataValues.xp, null, temp9[0].dataValues.uType, conn);
	
	var temp10 = await conn.getUser("appleTreeYard@lehigh.edu", "password");
	user10 = new User(temp10[0].dataValues.user_id, temp10[0].dataValues.email, temp10[0].dataValues.name, 
		temp10[0].dataValues.surname, temp10[0].dataValues.xp, null, temp10[0].dataValues.uType, conn);
	}).then(async function() {

	await conn.insertSkills("Java", "Software");
	await conn.insertSkills("Python", "Software");
	await conn.insertSkills("SQL", "Software");
	await conn.insertSkills("Javascript", "Software");
	await conn.insertSkills("Golf", "Interest");
	await conn.insertSkills("Tennis", "Interest");
	await conn.insertSkills("Dancing", "Interest");
	await conn.insertSkills("Business", "Skill");
	await conn.insertSkills("Transactions", "Skill");
	await conn.insertSkills("Research", "Skill");

	}).then(async function() {

	await user1.addSkill("Java", 3);
	await user2.addSkill("Java", 5);
	await user2.addSkill("Golf", 0);
	await user3.addSkill("Python", 3);
	await user3.addSkill("SQL", 4);
	await user3.addSkill("Research", 5);
	await user4.addSkill("Java", 3);
	await user4.addSkill("Javascript", 2);
	await user4.addSkill("Dancing", 0);
	await user4.addSkill("Business", 2);
	await user5.addSkill("Java", 3);
	await user5.addSkill("Python", 4);
	await user5.addSkill("SQL", 2);
	await user5.addSkill("Research", 5);
	await user5.addSkill("Dancing", 2);
	await user6.addSkill("SQL", 3);
	await user6.addSkill("Python", 3);
	await user6.addSkill("Dancing", 0);
	await user6.addSkill("Golf", 0);
	await user6.addSkill("Transactions", 2);
})