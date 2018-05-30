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

	var User = null;
	var Skills = null;
	var HS = null;
	var Project = null;
	var NS = null;

	this.createTable = function() {
		try{
		//Define table User table
		User = sequelize.define('user', {
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
Skills = sequelize.define('skills',{
	skill: {
		type: Sequelize.STRING,
		primaryKey: true
	}
});


//Define hasSkills table
HS = sequelize.define('hasSkills', {
	user_id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	skill: Sequelize.STRING
});
		//define project table
		Project = sequelize.define('project', {
			project_id: {
			    type: Sequelize.INTEGER,
			    autoIncrement: true,
			    primaryKey: true
			},
			project_name: Sequelize.STRING,
			deadline: {
			    type: Sequelize.DATE,
			    allowNull: false
			},
			xp: Sequelize.INTEGER,
			min_diff: Sequelize.INTEGER,
			max_diff: Sequelize.INTEGER,
			people: Sequelize.INTEGER
		    });

		const NS = sequelize.define('needSkills', {
			project_id: {
			    type: Sequelize.INTEGER,
			    primaryKey: true
			},
			skill: {
			    type: Sequelize.STRING,
			    primaryKey: true
			}
		    });

//removed force:true  (forces defined architecture)
		User.sync({}).then(Skills.sync({})).then(HS.sync({})).then(Project.sync({force: true})).then(NS.sync({force: true}));//then(this.closeConnection());
}
catch(err) {
	console.log(err);
}
}

this.createUser = function(e, n, s) {
	//createUser adds a new User to the database
//A nonapproved user (no interview) will have NULL password until approved
    return User.create({
        email: e,
        password: null,
        name: n,
        surname: s,
        xp: 0,
        type: 'Developer'
    })
}
}

module.exports = Connection;