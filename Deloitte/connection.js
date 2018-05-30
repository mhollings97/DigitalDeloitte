function Connection() {
	var sequalize = null;
	const Sequelize = require ('sequelize');
	try{
		//Create connection via Sequelize
		sequelize = new Sequelize('deloitte', 'root', 'root', {
			host: 'localhost',
			dialect: 'mysql',

			pool: {
				max: 5,
				min: 0,
				acquire: 100,
				idle: 20
			},

			operatorsAliases: false
		});
	}
	catch(err){
		sequelize = null;
		console.log(err);
	}

	this.closeConnection = function() {
		try{
			sequelize.close();
		}
		catch(err){
			console.log(err);
		}
	}

	this.createTable = function() {
		try{
		//Define table User table
		const User = sequelize.define('user', {
			user_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			password: Sequelize.STRING,
			name: Sequelize.STRING,
			surname: Sequelize.STRING,
			xp: {
				type: Sequelize.INTEGER,
				min: 0
			},
			uType: {
				type: Sequelize.STRING
			}
		});

//Define Skills table
const Skills = sequelize.define('skills',{
	skill: {
		type: Sequelize.STRING,
		primaryKey: true
	}
});


//Define hasSkills table
const HS = sequelize.define('hasSkills', {
	user_id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	skill: Sequelize.STRING
});


User.sync({force: true}).then(Skills.sync({force: true})).then(HS.sync({force: true}));//then(this.closeConnection());
}
catch(err) {
	console.log(err);
}
}
}

module.exports = Connection;