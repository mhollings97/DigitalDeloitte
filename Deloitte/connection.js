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
				project_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				skill: {
					type: Sequelize.STRING,
					primaryKey: true
				}

			});
			Project.hasMany(NS, {foreignKey: 'project_id'});
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
				project_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				tag: {
					type: Sequelize.STRING,
					primaryKey: true
				}
			});
			Project.hasMany(HT, {foreignKey: 'project_id'});
			Tags.hasMany(HT, {foreignKey: 'tag'});

			Works = sequelize.define('worksOn', {
				user_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				project_id: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				role: {
					type: Sequelize.STRING
				}
			});
			Project.hasMany(Works, {foreignKey: 'project_id'});
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
				},
				user_id: {
					type: Sequelize.INTEGER
				},
				project_id : {
					type: Sequelize.INTEGER
				}
			});
			User.hasMany(Sub, {foreignKey: 'user_id'});
			Project.hasMany(Sub, {foreignKey: 'project_id'});

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
	//worksOn related table function
	//Returns a list of every project that a given user_id is apart of.
	this.getProjectsbyUser = function(id) {
		return Project.findAll({
			include: [{
				model: User,
				required: true,
				where: {user_id: id}
			}]
		})
	}

	//Adds that a user is working on a project.
	this.addProject = function(uid, pid, r) {
		return Works.create({
			user_id: uid,
			project_id: pid,
			role: r
		})
	}

	//Removes that a user is working on a project.
	this.removeProject = function(uid, pid) {
		return Works.destroy({
			where: {
				user_id: uid,
				project_id: pid
			}})
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




        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                           
        //needSkills related table functions begin here                                                                 

        //Adds skill for specific project
        this.addNS = function(pid, s) {
            return NS.create({
                    project_id: pid,
                    skill: s
                })
        }

        //Removes project/skill tuple from needSkill table                                                    
        this.deleteNS = function(pid, s)
        {
            return NS.destroy({
                    where: {
                        project_id: pid,
                        skill: s
                    }});
        }








	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//Application related table functions begin here

	//Creates an application tuple in the table, coresponding to a user id.
	this.createApp = function(id, s, i, a, l, p, c) {
		//createUser adds a new User to the database
		//A nonapproved user (no interview) will have NULL password until approved
	    return App.create({
	  		user_id: id,
			schooling: s,
			interest: i,
			apply_Text: a,
			link_In: l,
			per_Ln: p,
			CV_Loc: c 
	    })
	}

	//Returns a tuple given the user id.
	this.getApp = function(id) {
		return App.findAll({
			where: {
				user_id: id
			}
		})
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



	//Update project fields        
        this.updateProject = function(id, name, complete, desc, rec, join, rev, sub, min, max, p, xp, bonus) {
            var i = [];
            if(name != null)
                {
                    i.push(Project.update({project_name: name},
                                       {where: {project_id: {[Op.eq]:id}}
                    
				       }));
		}

	    if(complete != null)
                {
                    i.push(Project.update({completion_time: complete},
	                  {where: {project_id: {[Op.eq]:id}}

			  }));
		}

	    if(desc != null)
                {
                    i.push(Project.update({description: desc},
	                  {where: {project_id: {[Op.eq]:id}}

			  }));
                }

	    if(rec != null)
                {
                    i.push(Project.update({rec_desc: rec},
	                {where: {project_id: {[Op.eq]:id}}

			}));
                }

	    if(join != null)
                {
                    i.push(Project.update({join_deadline: join},
	                  {where: {project_id: {[Op.eq]:id}}

			  }));
                }

            if(rev != null)
                {
                    i.push(Project.update({rev_deadline: rev},
	                  {where: {project_id: {[Op.eq]:id}}

			  }));
                }

	    if(sub != null)
                {
                    i.push(Project.update({sub_deadline: sub},
	                   {where: {project_id: {[Op.eq]:id}}

			   }));
                }

            if(p != null)
                {
                    i.push(Project.update({people: p},
	               {where: {project_id: {[Op.eq]:id}}

		       }));
                }

	    if(min != null)
                {
                    i.push(Project.update({min_diff: min},
	                  {where: {project_id: {[Op.eq]:id}}

			  }));
                }


	    if(max != null)
                {
                    i.push(Project.update({max_diff: max},
	                  {where: {project_id: {[Op.eq]:id}}

			  }));
                }

	    if(xp != null)
                {
                    i.push(Project.update({xp_gain: xp},
	                 {where: {project_id: {[Op.eq]:id}}

			 }));
                }

	    if(bonus != null)
                {
                    i.push(Project.update({xp_bonus: bonus},
	                  {where: {project_id: {[Op.eq]:id}}

			  }));
                }

	    return Promise.all(i);
	}

	//Find a specific Project
	this.getProject = function(pid)
	{
	    return Project.findAll({
                        where: {
			project_id: pid
                        }
		    })
	}

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//Tags table related functions begin here

	//Adds a tag to list of tags used by Projects                                       
        this.insertTags = function(t) {
            return Tags.create({
                    tag: t
                });
        }

        //Returns the promise of all skills                                                                 
        this.getTags = function() {
            return Tags.findAll({
                    attributes: ['tag'],
		});

	}









	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//hasTags table related functions begin here
	
	//Adds tag for specific project                                                                  
        this.addHT = function(pid, t) {
            return HT.create({
                    project_id: pid,
                    tag: t
                })
        }

        //Removes project/tag tuple from hasTag table                                                      
        this.deleteHT = function(pid, t)
        {
            return HT.destroy({
                    where: {
                        project_id: pid,
                        tag: t
                    }});
        }
	




	


	

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//submissions table related functions begin here
	
	//Adds submission for specific project  
        this.addSub = function(id, loc, date, uid, pid) {
            return Sub.create({
                    sub_id: id,
		    sub_loc: loc,
		    sub_date: date,
		    user_id: uid,
		    project_id: pid
                })
        }


	//gets information on submissions for a project
	this.getSub = function(uid, pid)
	{   
	    if(uid != null && pid != null)
		{
		    return Sub.findAll({
				where: {user_id: uid,
					project_id: pid}
			});
		}

	    
	    if(uid != null)
		{
		    return (Sub.findAll({where: {user_id: uid}}));
		}

	    if(pid != null)
		{ return Sub.findAll({where: {project_id: pid}}); }

        }
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//worksOn table related functions begin here

	this.getWorkers = function(pid, r) {
		return User.findAll({
			include: [{
				model: Works,
				required: true,
				where: {
					project_id: pid,
					role: r
				}
			}]
		});
	}
}
module.exports = Connection;