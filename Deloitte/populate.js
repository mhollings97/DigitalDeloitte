var User = require("./user.js");
var Proj = require("./project.js");
var Connection = require('./connection');
var conn = new Connection();

var user1; //Ambassador
var user2;
var user3;
var user4;
var user5; //Ambassador
var user6;
var user7;
var user8;
var user9;
var user10;

var proj = [];
var check;

var skills = ["Java", "Javascript", "SQL", "Python", "Business", "Research"];

var tags1 = ["Small", "Medium", "Large"];
var tags2 = ["Cooperative", "Competitive"];
var tags3 = ["Code-Light", "Code-Heavy"];
var tags4 = ["Business-Light", "Business-Heavy"];

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
		if(user1.getXP() == 0) {
			await user1.gainXP(100);
			await user2.gainXP(300);
			await user3.gainXP(500);
			await user4.gainXP(700);
			await user5.gainXP(1000);
			await user6.gainXP(1500);
			await user7.gainXP(900);
			await user8.gainXP(700);
			await user9.gainXP(650);
			await user10.gainXP(700);
		}
	}).then(async function() {
		if(user1.getType() != "Ambassador") {
			await user1.setType("Ambassador");
			await user5.setType("Ambassador");
		}
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
	}).then(async function() {
		await user1.createApp("School", "Interesting Things", "My Reasons", "LinkedIn.com", "Personal.net", "My Cover Letter");
		await user2.createApp("Middle School", "Uninteresting Things", "No Reasons", "LinkedIn.net", "Personal.org", "My Cover Letter");
		await user5.createApp("High School", "Business", "I have no choice", "LinkedIn.org", "Personal.edu", "My Cover Letter");
		await user6.createApp("Graduate", "Programming", "My landlord needs money", "LinkedIn.edu", "Personal.cz", "My Cover Letter");
		await user7.createApp("Nothing", "Databases", "I would be a good fit", "LinkedIn.cz", "Personal.eu", "My Cover Letter");
		await user8.createApp("Grade School", "Digital Deloitte", "My mother", "LinkedIn.eu", "Personal.us", "My Cover Letter");
		await user9.createApp("Professor", "Anything but this", "The fear of death", "LinkedIn.us", "Personal.com", "My Cover Letter");
	}).then(async function() {
		check = await conn.getAllProject();

		if(check.length == 0) {
			await conn.createProject("Digital Deloitte", 16, "Make a website", "Here are the recources you have to work with", 
				new Date(2018, 5, 28), new Date(2018, 6, 13), new Date(2018, 6, 23), 0, 1000, 6, 100, 50);
			await conn.createProject("Virtual Deloitte", 16, "Make a website, but virtual", "Here are the recources you have to work with, but virtual", 
				new Date(2018, 5, 23), new Date(2018, 6, 21), new Date(2018, 6, 23), 0, 500, 72, 10, 500);
			await conn.createProject("Lehigh In Prague", 16, "Enjoy your stay", "Here is the tram schedule", 
				new Date(2018, 5, 23), new Date(2018, 6, 14), new Date(2018, 6, 23), 500, 10000, 2, 1000, 5);
			await conn.createProject("Machine Learning", 16, "They shall destroy us all", "What recourses?", 
				new Date(2018, 3, 12), new Date(2019, 6, 13), new Date(2020, 6, 23), 100, 10000, 24, 1000, 5);
			await conn.createProject("Not Killing Eachother", 16, "Specifically Jake", "Whatever you can find to survive", 
				new Date(2018, 1, 1), new Date(2018, 7, 13), new Date(2099, 12, 31), 0, 1000, 6, 10, 50);

			check = await conn.getAllProject();
		}
	}).then(async function() {	
		for(var i = 0; i < check.length; i++) {
			proj.push(await new Proj(check[i].dataValues.project_id, check[i].dataValues.project_name, check[i].dataValues.completion_time, 
				check[i].dataValues.description, check[i].dataValues.status, check[i].dataValues.join_deadline, check[i].dataValues.rev_deadline, 
				check[i].dataValues.sub_deadline, check[i].dataValues.min_diff, check[i].dataValues.max_diff, check[i].dataValues.people, 
				check[i].dataValues.xp_gain, check[i].dataValues.xp_bonus, null, null, conn));
		}
	}).then(async function() {
		await conn.insertTags("Small", "Size");
		await conn.insertTags("Medium", "Size");
		await conn.insertTags("Large", "Size");
		await conn.insertTags("Competitive", "Organization");
		await conn.insertTags("Cooperative", "Organization");
		await conn.insertTags("Code-Heavy", "Coding");
		await conn.insertTags("Code-Light", "Coding");
		await conn.insertTags("Business-Heavy", "Business");
		await conn.insertTags("Business-Light", "Business");
	}).then(async function() {

		for(var i = 0; i < proj.length; i++) {
			await proj[i].addSkill(skills[i % 6]);
			await proj[i].addSkill(skills[(i + 1) % 6]);
		}

		for(var i = 0; i < proj.length; i++) {
			await proj[i].addTag(tags1[i % 3]);
			await proj[i].addTag(tags2[i % 2]);
			await proj[i].addTag(tags3[i % 2]);
		}		
	}).then(async function() {
		for(var i = 0; i < proj.length; i++) {
			if((i % 2) == 0) {
				await conn.addProject(user1.getUser_id(), proj[i].getProj_id(), user1.getType());
			}
			else {
				await conn.addProject(user5.getUser_id(), proj[i].getProj_id(), user5.getType());
			}
		}

		for(var i = 0; i < 3; i++) {
			await conn.addProject(user2.getUser_id(), proj[i % proj.length].getProj_id(), user2.getType());
			await conn.addProject(user3.getUser_id(), proj[(i + 1) % proj.length].getProj_id(), user3.getType());
			await conn.addProject(user4.getUser_id(), proj[(i + 2) % proj.length].getProj_id(), user4.getType());
			await conn.addProject(user6.getUser_id(), proj[(i + 3) % proj.length].getProj_id(), user6.getType());
			await conn.addProject(user7.getUser_id(), proj[(i + 4) % proj.length].getProj_id(), user7.getType());
			await conn.addProject(user8.getUser_id(), proj[(i + 5) % proj.length].getProj_id(), user8.getType());
			await conn.addProject(user9.getUser_id(), proj[(i + 6) % proj.length].getProj_id(), user9.getType());
			await conn.addProject(user10.getUser_id(), proj[(i + 7) % proj.length].getProj_id(), user10.getType());
		}
	}).then(async function() {
		await conn.closeConnection();
})