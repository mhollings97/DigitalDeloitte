function Connection() {
	var sequelize = null;
	const Sequelize = require ('sequelize');
	var User = null;
	var Skills = null;
	var HS = null;
	var Project = null;
	var NS = null;
	var App = null;

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
				user_id:{type: Sequelize.INTEGER, primaryKey: true},
				skill: {type: Sequelize.STRING, primaryKey: true}
			    });
			User.hasMany(HS, {foreignKey: 'user_id'});
			Skills.hasMany(HS, {foreignKey: 'skill'});
		
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

			App = sequelize.define('Application', {
				user_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				schooling: {
					type: Sequelize.STRING
				},
				interest: {
					type: Sequelize.STRING
				},
				apply_Text: {
					type: Sequelize.STRING
				},
				link_In: {
					type: Sequelize.STRING
				},
				per_Ln: {
					type: Sequelize.STRING
				},
				CV_Loc: {
					type: Sequelize.STRING
				}

			});
			User.hasMany(App, {foreignKey: 'user_id'});

			//removed force:true  (forces defined architecture)
			return sequelize.sync({});
		}
		catch(err) {
			console.log("ERROR" + err);
			return null;
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

	//getUser returns array of strings of User tuple
	this.getUser = function(emailaddr) {
		return User.findAll({
			where: {
				email: emailaddr
			}
		})
	}

	const Op = Sequelize.Op;

        this.getUserSkills = function(id) {
            return HS.findAll({
		    attributes: ['skill'],
		    where: { user_id: {[Op.eq]: id}}
                });

        }

	//Update user fields
	this.updateUser = function(id, e, p, n, s, x) {
	    var i = [];
            if(e != null)
                {
		    i.push(User.update({email: e}, 
				       {where: {user_id: {[Op.eq]:id}}
				       }))
		}

            if(p != null)
                {
		    i.push(User.update({password: p}, 
				       {where: {user_id: {[Op.eq]:id}}
				       }))
		}

            if(n != null)
                {
		    i.push(User.update({name: n}, 
	                               {where: {user_id: {[Op.eq]:id}}
				       }))
		}

            if(s != null)
                {
		    i.push(User.update({surname: s}, 
	                               {where: {user_id: {[Op.eq]:id}}}))
		}

            if(x != null)
                {
		    i.push(User.update({xp: x}, 
	                               {where: {user_id: {[Op.eq]:id}}}))
		}
	    console.log(this.getUserSkills(1));
	    return Promise.all(i);
        }

	//Adds a skill to list of tags used by Projects and users
	this.insertSkills = function(s) {
	    return Skills.create({
		    skill: s
		});
	}
}

module.exports = Connection;