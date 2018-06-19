var Router = require('koa-router');
var router = Router({
	prefix: '/api/v1'
    });                                                                                          
var Connection = require('../connection');
var conn = new Connection();
var apiVersion = 1;

conn.createTable();

//User Related Functions
//Handles logging in
router.post('/auth', verify);
//Creates a new user
router.post('/user', createUser);
//Gives a user an application
router.post('/user/:id/apply', createApplication);
//Updates a users profile
router.post('/user/:id/update', updateUser);
//Adds a user skill
router.post('/user/:id/addskill', addUserSkill)
//Removes a user skill
router.post('/user/:id/removeskill', removeUserSkill)
//Updates a user skill with a new proficiency
router.post('/user/:id/updateskill', updateUserSkill)
//Returns a users data. 200 status if application is there, 201 otherwise
router.get('/user/:id', getUserData);
//Returns a users interest
router.get('/user/:id/interest', getUserInterest);
//Returns a users skills
router.get('/user/:id/skills', getUserSkills);
//Returns a users software
router.get('/user/:id/software', getUserSoftware);
//Removes a user, setting their email to null in the database
//This allows their email to be used again but saves their information
router.delete('/user/:id', removeUser);
//Returns all projects that a user is working on.
router.get('/user/:id/project', getAllUserProj);
//Returns a specific project that a user is working on
router.get('/user/:uid/project/:pid', getUserProj);
//Adds xp to the user based on the value send in
router.post('/user/:id/addxp', updateXP);
//Adds a given project to a user
router.post('/user/:uid/addproject/:pid', addProject);

//General list related functions.
//Returns all interest in the database
router.get('/interest', viewInterest);
//Returns all skills in the database
router.get('/skills', viewSkills);
//Returns all software in the database
router.get('/software', viewSoftware);


//Checks if the username matches the password on record.
//If it does, returns the user information
//If it does not, return an error message.
async function verify(ctx, next){
	var theBody = JSON.parse(ctx.request.body);
    var a = ctx.session.views || 0;
    ctx.session.views = ++a;
    await conn.getUser(theBody.username, theBody.password).then(result => {
	    if(result == null || result.length == 0)
		{
		    ctx.status = 401;
		    var retval = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User login unsuccessful",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Email or Password Incorrect."
            	}
		    }

		    ctx.body = retval;
		}

	    else {
	  		ctx.app.key = "['" + result[0].dataValues.email + "']";

	    	ctx.status = 200;
			var retval = {
					"status": "success",
					"code": ctx.status,
					"message": null,
					"apiVersion": apiVersion,
					"requestUrl": ctx.request.host + ctx.request.url,
					"data": {
						"authorized": true,
						"userData": {
							"user_id": result[0].user_id,
							"email": result[0].dataValues.email,
						    "name": result[0].dataValues.name,
						    "surname": result[0].dataValues.surname,
						    "xp": result[0].dataValues.xp,
						    "uType": result[0].dataValues.uType
						}
					}
				};
			ctx.body = retval;
		}
	});
    await next;
}

//Creates a user tuple
async function createUser(ctx, next) {
	var theBody = JSON.parse(ctx.request.body);
	await conn.createUser(theBody.email, theBody.password, theBody.firstName, theBody.lastName).then(async function(retval) { 
	    if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User creation unsuccessful",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Email already registered."
      		  	}
			}
			ctx.body = ret;
	    }
	    else {
		    await conn.getUser(theBody.email, theBody.password).then(function(result) {
					ctx.status = 200;
					var ret = {
						"status": "success",
			            "code": ctx.status,
			            "message": "New user created",
			            "apiVersion": apiVersion,
			            "requestUrl": ctx.request.host + ctx.request.url,
			            "data": {
			            	"user_id": result[0].dataValues.user_id,
			                "firstName": result[0].dataValues.name,
			                "lastName": result[0].dataValues.surname,
			                "email": result[0].dataValues.email
		            	}
					}
					ctx.body = ret;
			});
		}
	});


	await next();
}

//Creates a users application
async function createApplication(ctx, next) {
	var theBody = JSON.parse(ctx.request.body);
	await conn.createApp(ctx.params.id, theBody.schooling, theBody.interest, 
		theBody.text, theBody.linkedIn, theBody.perLn, theBody.cv).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "Adding application failed",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User failed to add an application"
      		  	}
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
		    	"status": "successful",
            	"code": ctx.status,
            	"message": "Application successfully added",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
      		  	}
			}
			ctx.body = ret;
		}
	})
	await next();
}

async function updateUser(ctx, next) {
	var theBody = JSON.parse(ctx.request.body);
	await conn.updateUser(ctx.params.id, theBody.email, theBody.password, theBody.firstName, theBody.lastName, null).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User update failed",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User failed to update"
      		  	}
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
		    	"status": "successful",
            	"code": ctx.status,
            	"message": "User update successful",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
      		  	}
			}
			ctx.body = ret;
		}
	});

	await next();
}

async function addUserSkill(ctx, next) {
	var theBody = JSON.parse(ctx.request.body);

	await conn.addHS(ctx.params.id, theBody.skill, theBody.proficiency).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "Adding skill failed",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User failed to add skill"
      		  	}
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
		    	"status": "successful",
            	"code": ctx.status,
            	"message": "Skill successful added",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
      		  	}
			}
			ctx.body = ret;
		}
	})
	await next();
}

async function removeUserSkill(ctx, next) {
	var theBody = JSON.parse(ctx.request.body);

	await conn.deleteHS(ctx.params.id, theBody.skill).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "Removing skill failed",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User failed to remove skill"
      		  	}
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
		    	"status": "successful",
            	"code": ctx.status,
            	"message": "Skill successful removed",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
      		  	}
			}
			ctx.body = ret;
		}
	})

	await next();
}

async function updateUserSkill(ctx, next) {
	var theBody = JSON.parse(ctx.request.body);

	await conn.deleteHS(ctx.params.id, theBody.skill).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "Updating skill failed",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User failed to update skill"
      		  	}
			}
			ctx.body = ret;
		}
	})

	await conn.addHS(ctx.params.id, theBody.skill, theBody.proficiency).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "Updating skill failed",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User failed to update skill"
      		  	}
      		}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
		    	"status": "successful",
            	"code": ctx.status,
            	"message": "Skill successfully updated",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
      		  	}
			}
			ctx.body = ret;
		}
	})
	await next();
}

//Returns the users data based on the id.
async function getUserData(ctx, next) {
	await conn.getUserById(ctx.params.id).then(async function(retval) {
		if(retval == null || retval.length == 0) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User retrieval unsuccessful",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Id not recognized."
      		  	}
			}
			ctx.body = ret;	
		}
		else {
			await conn.getApp(ctx.params.id).then(async function(application) {
				if(application == null || application.length == 0) {
					ctx.status = 201;
			   	 	var ret = {
				    	"status": "successful",
		            	"code": ctx.status,
		            	"message": "Id has no application",
		            	"apiVersion": apiVersion,
		            	"requestUrl": ctx.request.host + ctx.request.url,
		            	"data": {
		            		"user_id": retval[0].dataValues.user_id,
		                	"firstName": retval[0].dataValues.name,
							"lastName": retval[0].dataValues.surname,
							"email": retval[0].dataValues.email,
							"type": retval[0].dataValues.uType,
							"xp": retval[0].dataValues.xp
		      		  	}
					}
					ctx.body = ret;	
				}
				else {
					ctx.status = 200;
					var ret = {
						"status": "success",
						"code": ctx.status,
						"message": null,
						"apiVersion": apiVersion,
						"requestUrl": ctx.request.host + ctx.request.url,
						"data": {
							"user_id": retval[0].dataValues.user_id,
							"firstName": retval[0].dataValues.name,
							"lastName": retval[0].dataValues.surname,
							"email": retval[0].dataValues.email,
							"employmentStatus": application[0].dataValues.schooling,
							"interestArea": application[0].dataValues.interest,
							"LinkedIn": application[0].dataValues.link_In,
							"PersonalWebpage": application[0].dataValues.per_Ln,
							"type": retval[0].dataValues.uType,
							"xp": retval[0].dataValues.xp
						}
					};

					ctx.body = ret;
				}
			});
		}
	});
	await next();
}

//Returns a list of user interest
async function getUserInterest(ctx, next) {

	await conn.getUserSkillsByType(ctx.params.id, "Interest").then(function(retval) {
		if(retval == null) {
			ctx.status = 404;
			var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User interest failed to be retrieved",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Read unsuccessful."
      		  	}
			}
			ctx.body = ret;
		}
		else if(retval.length == 0) {
			ctx.status = 201;
			var ret = {
		    	"status": "success",
            	"code": ctx.status,
            	"message": "User has no interest",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                }
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
				"status": "success",
            	"code": ctx.status,
            	"message": null,
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": [
                ]
            }

      		for(var i = 0; i < retval.length; i++) {
      			ret.data[i] = {
      				"name": retval[i].dataValues.skill,
      			};
      		} 

      		ctx.body = ret;
		}
	})
	await next();
}

//Returns a list of user skills
async function getUserSkills(ctx, next) {
	
	await conn.getUserSkillsByType(ctx.params.id, "Skill").then(function(retval) {
		if(retval == null) {
			ctx.status = 404;
			var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User skill failed to be retrieved",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Read unsuccessful"
      		  	}
			}
			ctx.body = ret;
		}
		else if(retval.length == 0) {
			ctx.status = 201;
			var ret = {
		    	"status": "success",
            	"code": ctx.status,
            	"message": "User has no skills",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                }
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
				"status": "success",
            	"code": ctx.status,
            	"message": null,
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"skillData": [
                	]
                }
            }

      		for(var i = 0; i < retval.length; i++) {
      			ret.data.skillData[i] = {
      				"name": retval[i].dataValues.skill,
      				"proficiency": retval[i].hasSkills[0].dataValues.proficiency
      			};
      		} 

      		ctx.body = ret;
		}
	})
	await next();
}

//returns a list of user software.
async function getUserSoftware(ctx, next) {

	await conn.getUserSkillsByType(ctx.params.id, "Software").then(function(retval) {
		if(retval == null) {
			ctx.status = 404;
			var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User software failed to be retrieved",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Read unsuccessful"
      		  	}
			}
			ctx.body = ret;
		}
		else if(retval.length == 0) {
			ctx.status = 201;
			var ret = {
		    	"status": "success",
            	"code": ctx.status,
            	"message": "User has no software",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                }
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
				"status": "success",
            	"code": ctx.status,
            	"message": null,
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"softwareData": [
                	]
                }
            }

      		for(var i = 0; i < retval.length; i++) {
      			ret.data.softwareData[i] = {
      				"name": retval[i].dataValues.skill,
      				"proficiency": retval[i].hasSkills[0].dataValues.proficiency
      			};
      		} 

      		ctx.body = ret;
		}
	})
	await next();
}

//Sets a users email as null, marking them as removed from the database
//Still keeps the data for memory purposes.
async function removeUser(ctx, next) {

	await conn.deleteUser(ctx.params.id).then(function(retval) {
		if(retval == null) {
			ctx.status = 404;
			var ret = {
	            "status": "Failure",
	            "code": ctx.status,
	            "message": "User failed to deleted",
	            "apiVersion": apiVersion,
	            "requestUrl": ctx.request.host + ctx.request.url,
	            "data": {
	               }
	        }
	        ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
	            "status": "success",
	            "code": ctx.status,
	            "message": "User deleted",
	            "apiVersion": apiVersion,
	            "requestUrl": ctx.request.host + ctx.request.url,
	            "data": {
	               }
	        }
	        ctx.body = ret;
		}
	})

	await next();
} 

async function getAllUserProj(ctx, next) {
	await conn.getProjectsbyUser(ctx.params.id).then(async function(retval) {
		if(retval == null) {
			ctx.status = 404;
			var ret = {
				"status": "failure",
	            "code": ctx.status,
	            "message": "User project failed to be retrieved",
	            "apiVersion": apiVersion,
	            "requestUrl": ctx.request.host + ctx.request.url,
	            "data": {}
	        }
	        ctx.body = ret;
		}
		else if(retval.length == 0) {
			ctx.status = 201;
			var ret = {
		    	"status": "success",
            	"code": ctx.status,
            	"message": "User has no projects",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                }
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
				"status": "success",
	            "code": ctx.status,
	            "message": "Project retrieval successful",
	            "apiVersion": 1,
	            "requestUrl": ctx.request.host + ctx.request.url,
	            "data": {
	                "projectData": []
	            }
	        }

	        for(var i = 0; i < retval.length; i++) {
	        	ret.data.projectData[i] = {
	        		"project_id": retval[i].dataValues.project_id,
                    "project_name": retval[i].dataValues.project_name,
                    "completion_time": retval[i].dataValues.completion_time + " Days",
                    "description": retval[i].dataValues.description,
                    "status": retval[i].dataValues.status,
                    "join_deadline": retval[i].dataValues.join_deadline.toISOString().split('T')[0],
                    "rev_deadline": retval[i].dataValues.rev_deadline.toISOString().split('T')[0],
                    "sub_deadline": retval[i].dataValues.sub_deadline.toISOString().split('T')[0],
                    "min_diff": retval[i].dataValues.min_diff,
                    "max_diff": retval[i].dataValues.max_diff,
                    "people": retval[i].dataValues.people,
                    "xp_gain": retval[i].dataValues.xp_gain,
                    "xp_bonus": retval[i].dataValues.xp_bonus,
                    "skills": [],
                    "tags": []
	        	}

	        	await conn.getProjectSkills(retval[i].dataValues.project_id).then(function(retSkills) {
	        		if(retSkills == null || retSkills.length == 0) {
	        			ret.data.projectData[i].skills = "Project has no skills"
	        		}
	        		else{
	        			for(var j = 0; j < retSkills.length; j++) {
	        				ret.data.projectData[i].skills[j] = {
	        					"name": retSkills[j].dataValues.skill
	        				};
	        			}	
	        		}
	        	})

	        	await conn.getProjectTags(retval[i].dataValues.project_id).then(function(retTags) {
	        		if(retTags == null || retTags.length == 0) {
	        			ret.data.projectData[i].tags = "Project has no tags"
	        		}
	        		else{
	        			for(var k = 0; k < retTags.length; k++) {
	        				ret.data.projectData[i].tags[k] = {
	        					"name": retTags[k].dataValues.tag
	        				};
	        			}	
	        		}
	        	})
	        }

	        ctx.body = ret;
		}
	})

	await next();
}

async function getUserProj(ctx, next) {
	await conn.getSpecificProjectbyUser(ctx.params.uid, ctx.params.pid).then(async function(retval) {
		if(retval == null) {
			ctx.status = 404;
			var ret = {
				"status": "failure",
	            "code": ctx.status,
	            "message": "User project failed to be retrieved",
	            "apiVersion": apiVersion,
	            "requestUrl": ctx.request.host + ctx.request.url,
	            "data": {}
	        }
	        ctx.body = ret;
		}
		else if(retval.length == 0) {
			ctx.status = 201;
			var ret = {
		    	"status": "success",
            	"code": ctx.status,
            	"message": "User does not have that project",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                }
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
				"status": "success",
	            "code": ctx.status,
	            "message": "Project retrieval successful",
	            "apiVersion": 1,
	            "requestUrl": ctx.request.host + ctx.request.url,
	            "data": {
	            	"project_id": retval[0].dataValues.project_id,
                    "project_name": retval[0].dataValues.project_name,
                    "completion_time": retval[0].dataValues.completion_time + " Days",
                    "description": retval[0].dataValues.description,
                    "status": retval[0].dataValues.status,
                    "join_deadline": retval[0].dataValues.join_deadline.toISOString().split('T')[0],
                    "rev_deadline": retval[0].dataValues.rev_deadline.toISOString().split('T')[0],
                    "sub_deadline": retval[0].dataValues.sub_deadline.toISOString().split('T')[0],
                    "min_diff": retval[0].dataValues.min_diff,
                    "max_diff": retval[0].dataValues.max_diff,
                    "people": retval[0].dataValues.people,
                    "xp_gain": retval[0].dataValues.xp_gain,
                    "xp_bonus": retval[0].dataValues.xp_bonus,
                    "skills": [],
                    "tags": []
	            }
	        }

        	await conn.getProjectSkills(retval[0].dataValues.project_id).then(function(retSkills) {
        		if(retSkills == null || retSkills.length == 0) {
        			ret.data.skills = "Project has no skills"
        		}
        		else{
        			for(var j = 0; j < retSkills.length; j++) {
        				ret.data.skills[j] = {
        					"name": retSkills[j].dataValues.skill
        				};
        			}	
        		}
        	})

        	await conn.getProjectTags(retval[0].dataValues.project_id).then(function(retTags) {
        		if(retTags == null || retTags.length == 0) {
        			ret.data.tags = "Project has no tags"
        		}
        		else{
        			for(var k = 0; k < retTags.length; k++) {
        				ret.data.tags[k] = {
        					"name": retTags[k].dataValues.tag
        				};
        			}	
        		}
        	})

	        ctx.body = ret;
		}
	})

	await next();
}

async function updateXP(ctx, next) {
	var theBody = JSON.parse(ctx.request.body);
	await conn.addXP(ctx.params.id, theBody.xp).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "Adding xp failed",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User failed to gain xp"
      		  	}
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
		    	"status": "successful",
            	"code": ctx.status,
            	"message": "XP successfully added",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
      		  	}
			}
			ctx.body = ret;
		}
	})
	await next();
}

async function addProject(ctx, next) {
	var theBody = JSON.parse(ctx.request.body);
	await conn.addProject(ctx.params.uid, ctx.params.pid, theBody.role).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "Adding project failed",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User failed to add a project"
      		  	}
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
			var ret = {
		    	"status": "successful",
            	"code": ctx.status,
            	"message": "Project successfully added",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
      		  	}
			}
			ctx.body = ret;
		}
	})
	await next();
}

async function viewInterest(ctx, next) {
	await conn.getSkillsByType("Interest").then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "Failed to retrieve interests",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Failed to retrieve interests"
      		  	}
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
	   	 	var ret = {
		    	"status": "success",
            	"code": ctx.status,
            	"message": "Successfully retrieved interests",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": [
            	]
			}

			for(var i = 0; i < retval.length; i++) {
				ret.data[i] = {"name": retval[i].dataValues.skill,}
			}
			ctx.body = ret;	
		}
	})
}

async function viewSkills(ctx, next) {
	await conn.getSkillsByType("Skill").then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "Failed to retrieve skills",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Failed to retrieve skills"
      		  	}
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
	   	 	var ret = {
		    	"status": "success",
            	"code": ctx.status,
            	"message": "Successfully retrieved skills",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": [
            	]
			}

			for(var i = 0; i < retval.length; i++) {
				ret.data[i] = {"name": retval[i].dataValues.skill,}
			}
			ctx.body = ret;	
		}
	})
}

async function viewSoftware(ctx, next) {
	await conn.getSkillsByType("Software").then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "Failed to retrieve softwares",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Failed to retrieve softwares"
      		  	}
			}
			ctx.body = ret;
		}
		else {
			ctx.status = 200;
	   	 	var ret = {
		    	"status": "success",
            	"code": ctx.status,
            	"message": "Successfully retrieved softwares",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": [
            	]
			}

			for(var i = 0; i < retval.length; i++) {
				ret.data[i] = {"name": retval[i].dataValues.skill,}
			}
			ctx.body = ret;	
		}
	})
}

module.exports = router;