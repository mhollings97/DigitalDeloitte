function Connection() {

    //Declaration of global table variables
	var sequelize = null;
	const Sequelize = require ('sequelize'); //this is good
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
				},
				skill_type: {
					type: Sequelize.STRING,
					allowNull: false
				}
			});

			//Define hasSkills table
			HS = sequelize.define('hasSkills', {
				user_id:{type: Sequelize.INTEGER, primaryKey: true},
				skill: {type: Sequelize.STRING, primaryKey: true},
				proficiency: {
					type: Sequelize.INTEGER
				}
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
				status: Sequelize.STRING,
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
					autoIncrement: true,
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
				project_id: {
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
			Project.hasMany(Assets, {foreignKey: 'project_id'});
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

	this.createUser = function(e, p, n, s) {
		//createUser adds a new User to the database
		//A nonapproved user (no interview) will have NULL password until approved
	    return User.create({
	        email: e,
	        password: p,
	        name: n,
	        surname: s,
	        xp: 0,
	        type: 'Developer'
	    }).catch(function(err) {return null})
	}

	//getUser returns array of strings of User tuple
	this.getUser = function(emailaddr, pass) {
		return User.findAll({
			where: {
			    email: emailaddr,
				password: pass
			}
		}).catch(function(err) {return null})
	}

	this.getUserById = function(id) {
		return User.findAll({
			where: {
			    user_id: id
			}
		}).catch(function(err) {return null})
	}

	const Op = Sequelize.Op;

    this.getUserSkills = function(id) {
        return HS.findAll({
	    attributes: ['skill'],
	    where: { user_id: {[Op.eq]: id}}
            }).catch(function(err) {return null});

    }

    //Returns the users skills based on t.
    //t can be interest, skills, or software.
    this.getUserSkillsByType = function(id, t) {
    	return Skills.findAll({
    		attributes: ['skill'],
    		where: {skill_type: t},
    		include: [{
				model: HS,
				required: true,
				where: {
					user_id: id
				}
			}]
    	})
    }

	//Update user fields
	this.updateUser = function(id, e, p, n, s, x) {
		try{
		    var i = [];
            if(e != null) {
		    	i.push(User.update({email: e}, 
				    {where: {user_id: {[Op.eq]:id}}}))
			}

            if(p != null) {
		    	i.push(User.update({password: p}, 
				    {where: {user_id: {[Op.eq]:id}}}))
			}

            if(n != null) {
		    	i.push(User.update({name: n}, 
	                {where: {user_id: {[Op.eq]:id}}}))
			}

            if(s != null) {
		    	i.push(User.update({surname: s}, 
	                {where: {user_id: {[Op.eq]:id}}}))
			}

            if(x != null) {
		    	i.push(User.update({xp: x}, 
	                {where: {user_id: {[Op.eq]:id}}}))
			}

		    return Promise.all(i);
       } catch (err) {return null};
    }

    //Sets the type of the user.
    //Must be one of the types in typeSet.
    this.setType = function(id, t) {
    	var typeSet = ["Developer", "Ambassador", "Admin"];

    	try{
        	if(typeSet.indexOf(t) >= 0) {
        		return User.update({uType: t}, {where: {user_id: {[Op.eq]: id}}});
        	}
        	else {
        		return Promise.resolve(null);
        	}

        	return null;
    	} catch (err) {
    		return null;
    	}	
    }

    //Clears the email of a user so that it can be used again.
    this.deleteUser = function(id) {
    	try {
    		return User.update({email: null}, 
    			{where: {user_id: id}})
    	} catch (err) {
    		return null;
    	}
    }














	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//Skills table related functions begin here

	//Adds a skill to list of tags used by Projects and users
	this.insertSkills = function(s) {
	    return Skills.create({
		    skill: s
		}).catch(function(err) {return null});
	}

	//Returns the promise of all skills
	this.getSkills = function() {
	    return Skills.findAll({
                    attributes: ['skill'],
                }).catch(function(err) {return null});

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
		}).catch(function(err) {return null})
	}

	//Adds that a user is working on a project.
	this.addProject = function(uid, pid, r) {
		return Works.create({
			user_id: uid,
			project_id: pid,
			role: r
		}).catch(function(err) {return null})
	}

	//Removes that a user is working on a project.
	this.removeProject = function(uid, pid) {
		return Works.destroy({
			where: {
				user_id: uid,
				project_id: pid
			}}).catch(function(err) {return null})
	}

	//Returns whose working on a project based on their role
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
		}).catch(function(err) {return null});
	}










	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//hasSkills related table functions begin here

	//Adds skill for specific user
	this.addHS = function(inId, s) {
	    return HS.create({
		    user_id: inId,
		    skill: s
                }).catch(function(err) {return null})
	}

	//Removes user/skill tuple from hasSkill table
	this.deleteHS = function(user, skillset)
	{
	    return HS.destroy({
		    where: {
			user_id: user,
		        skill: skillset
		    }}).catch(function(err) {return null});
	}











    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                           
    //needSkills related table functions begin here                                                                 

    //Adds skill for specific project
    this.addNS = function(pid, s) {
        return NS.create({
                project_id: pid,
                skill: s
            }).catch(function(err) {return null})
    }

    //Removes project/skill tuple from needSkill table                                                    
    this.deleteNS = function(pid, s)
    {
        return NS.destroy({
                where: {
                    project_id: pid,
                    skill: s
                }}).catch(function(err) {return null});
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
	    }).catch(function(err) {return null})
	}

	//Returns a tuple given the user id.
	this.getApp = function(id) {
		return App.findAll({
			where: {
				user_id: id
			}
		}).catch(function(err) {return null})
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
            }).catch(function(err) {return null});
    }



	//Update project fields        
    this.updateProject = function(id, name, complete, desc, rec, join, rev, sub, min, max, p, xp, bonus) {
    	try{
	        var i = [];
	        if(name != null) {
	            i.push(Project.update({project_name: name},
	                {where: {project_id: {[Op.eq]:id}}
				    }));
			}

		    if(complete != null) {
		        i.push(Project.update({completion_time: complete},
		            {where: {project_id: {[Op.eq]:id}}
				    }));
			}

		    if(desc != null) {
		        i.push(Project.update({description: desc},
		            {where: {project_id: {[Op.eq]:id}}
				    }));
		    }

		    if(rec != null) {
		        i.push(Project.update({rec_desc: rec},
		            {where: {project_id: {[Op.eq]:id}}
					}));
		    }

		    if(join != null) {
                i.push(Project.update({join_deadline: join},
                    {where: {project_id: {[Op.eq]:id}}
				    }));
		    }

	        if(rev != null) {
                i.push(Project.update({rev_deadline: rev},
                	{where: {project_id: {[Op.eq]:id}}
			  		}));
		    }

		    if(sub != null) {
                i.push(Project.update({sub_deadline: sub},
                   {where: {project_id: {[Op.eq]:id}}
				   }));
	        }

	        if(p != null) {
	            i.push(Project.update({people: p},
	               {where: {project_id: {[Op.eq]:id}}
			       }));
            }

		    if(min != null) {
                i.push(Project.update({min_diff: min},
                  {where: {project_id: {[Op.eq]:id}}
				  }));
		    }


		    if(max != null) {
                i.push(Project.update({max_diff: max},
                  {where: {project_id: {[Op.eq]:id}}
				  }));
		    }

		    if(xp != null) {
                i.push(Project.update({xp_gain: xp},
                 {where: {project_id: {[Op.eq]:id}}
				 }));
		    }

		    if(bonus != null) {
                i.push(Project.update({xp_bonus: bonus},
                  {where: {project_id: {[Op.eq]:id}}
		  		}));
            }

		    return Promise.all(i);
		} catch (err) {return null}
	}

	//Find a specific Project
	this.getProject = function(pid)
	{
	    return Project.findAll({
                        where: {
			project_id: pid
                        }
		    }).catch(function(err) {return null})
	}















	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//Tags table related functions begin here

	//Adds a tag to list of tags used by Projects                                       
    this.insertTags = function(t) {
        return Tags.create({
                tag: t
            }).catch(function(err) {return null});
    }

    //Returns the promise of all skills                                                                 
    this.getTags = function() {
        return Tags.findAll({
                attributes: ['tag'],
		}).catch(function(err) {return null});
	}









	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//hasTags table related functions begin here
	
	//Adds tag for specific project                                                                  
    this.addHT = function(pid, t) {
        return HT.create({
                project_id: pid,
                tag: t
            }).catch(function(err) {return null})
    }

    //Removes project/tag tuple from hasTag table                                                      
    this.deleteHT = function(pid, t)
    {
        return HT.destroy({
                where: {
                    project_id: pid,
                    tag: t
                }}).catch(function(err) {return null});
    }
	




	


	

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//submissions table related functions begin here
	
	//Adds submission for specific project  
    this.addSub = function(loc, date, uid, pid) {
        return Sub.create({
		    sub_loc: loc,
		    sub_date: date,
		    user_id: uid,
		    project_id: pid
            }).catch(function(err) {return null})
    }


	//gets information on submissions for a project
	this.getSub = function(uid, pid)
	{   
	    if(uid != null && pid != null)
		{
		    return Sub.findAll({
				where: {user_id: uid,
					project_id: pid}
			}).catch(function(err) {return null});
		}

	    
	    if(uid != null)
		{
		    return (Sub.findAll({where: {user_id: uid}}).catch(function(err) {return null}));
		}

	    if(pid != null)
		{ 
			return Sub.findAll({where: {project_id: pid}}).catch(function(err) {return null}); 
		}
    }
















 	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//asset table related functions begin here
    
    //Adds an asset to the asset table
    this.addAsset = function(pid, type, loc, desc, date) {
    	return Assets.create({
    		project_id: pid,
    		asset_type: type,
    		asset_loc: loc,
    		asset_desc: desc,
    		asset_update: date
    	}).catch(function(err) {return null})
    }

    //Gets an asset by a type if specified, or gets all assets if null
    this.getAsset = function(pid, type) {
    	if(type != null) {
    		return Assets.findAll({
    			where: {project_id: pid,
    					asset_type: type}
    		}).catch(function(err) {return null})
    	}
    	else {
    		return Assets.findAll({
    			where: {project_id: pid}
    		}).catch(function(err) {return null})
    	}
    }

    //Deletes an asset from the table
    this.deleteAsset = function(pid, loc) {
    	return Assets.destroy({
    		where: {project_id: pid,
    				asset_loc: loc}
    	}).catch(function(err) {return null})
    }
}
module.exports = Connection;