function Connection() {

    //Declaration of global table variables
	var sequelize = null;
	const Sequelize = require ('sequelize');
	var User = null;
	var Skills = null;
	var HS = null;
	var Project = null;
	var NS = null;
	var App = null;
	var Tags = null;
	var HT = null;
	var Works = null;
	var Sub = null;
	var SubFrom = null;
	var SubFor = null;
	var Assets = null;

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//Establish connection with Sequelize
	try{
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


	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//Syncs and/or creates table defintions of database
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
				completion_time: Sequelize.INTEGER,
				description: Sequelize.STRING,
				rec_desc: Sequelize.STRING,
				join_deadline: {
				    type: Sequelize.DATE,
				    allowNull: false
				},
				rev_deadline: {
				    type: Sequelize.DATE,
				    allowNull: false
				},
				sub_deadline: {
				    type: Sequelize.DATE,
				    allowNull: false
				},
				min_diff: Sequelize.INTEGER,
				max_diff: Sequelize.INTEGER,
				people: Sequelize.INTEGER,
				xp_gain: Sequelize.INTEGER,
				xp_bonus: Sequelize.INTEGER
			});

			NS = sequelize.define('needsSkills', {
				proj_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				skill: {
					type: Sequelize.STRING,
					primaryKey: true
				}

			});
			Project.hasMany(NS, {foreignKey: 'proj_id'});
			Skills.hasMany(NS, {foreignKey: 'skill'});

			App = sequelize.define('application', {
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

			Tags = sequelize.define('Tags', {
				tag: {
					type: Sequelize.STRING,
					primaryKey: true
				},
				tag_type: {
					type: Sequelize.STRING
				}
			});

			HT = sequelize.define('hasTags', {
				proj_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				tag: {
					type: Sequelize.STRING,
					primaryKey: true
				}
			});
			Project.hasMany(HT, {foreignKey: 'proj_id'});
			Tags.hasMany(HT, {foreignKey: 'tag'});

			Works = sequelize.define('worksOn', {
				user_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				proj_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				role: {
					type: Sequelize.STRING
				}
			});
			Project.hasMany(Works, {foreignKey: 'proj_id'});
			User.hasMany(Works, {foreignKey: 'user_id'});

			Sub = sequelize.define('submissions', {
				sub_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				sub_loc: {
					type: Sequelize.STRING
				},
				sub_date: {
					type: Sequelize.DATE
				}
			});

			SubFrom = sequelize.define('subFrom', {
				user_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				sub_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				}
			});
			Sub.hasMany(SubFrom, {foreignKey: 'sub_id'});
			User.hasMany(SubFrom, {foreignKey: 'user_id'});

			SubFor = sequelize.define('subFor', {
				proj_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				sub_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				}
			});
			Sub.hasMany(SubFor, {foreignKey: 'sub_id'});
			Project.hasMany(SubFor, {foreignKey: 'proj_id'});

			Assets = sequelize.define('assets', {
				user_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				asset_type: {
					type: Sequelize.STRING
				},
				asset_loc: {
					type: Sequelize.STRING
				},
				asset_desc: {
					type: Sequelize.STRING
				},
				asset_update: {
					type: Sequelize.DATE
				}
			});
			User.hasMany(Assets, {foreignKey: 'user_id'});
			//removed force:true  (forces defined architecture)
			return sequelize.sync({});
		}
		catch(err) {
			console.log("ERROR" + err);
			return null;
		}

	}




	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//User table related functions begin here

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






	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//Skills table related functions begin here

	//Adds a skill to list of tags used by Projects and users
	this.insertSkills = function(s) {
	    return Skills.create({
		    skill: s
		});
	}

	//Returns the promise of all skills
	this.getSkills = function() {
	    return Skills.findAll({
                    attributes: ['skill'],
                });

	}







	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//hasSkills related table functions begin here

	//Adds skill for specific user
	this.addHS = function(inId, s) {
	    return HS.create({
		    user_id: inId,
		    skill: s
                })
	}

	//Removes user/skill tuple from hasSkill table
	this.deleteHS = function(user, skillset)
	{
	    return HS.destroy({
		    where: {
			user_id: user,
		        skill: skillset
		    }});
	}






	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//Project related table functions begin here

	//createProject adds a new Project to the database                                     
        this.createProject = function(name, complete, desc, rec, join, rev, sub, min, max, p,
				      xp, bonus) {
            return Project.create({
                    project_name: name,
                    completion_time: complete,
                    description: desc,
                    rec_desc: rec,
                    join_deadline: join,
                    rev_deadline: rev,
                    sub_deadline: sub,
                    min_diff: min,
                    max_diff: max,
                    people: p,
                    xp_gain: xp,
                    xp_bonus: bonus
                });
        }
}

module.exports = Connection;