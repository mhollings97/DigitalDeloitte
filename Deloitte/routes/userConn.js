var Router = require('koa-router');
var router = Router({
	prefix: '/api/v1'
    });                                                                                          
var Connection = require('../connection');
var conn = new Connection();
var apiVersion = 1;

conn.createTable();

router.post('/auth', verify);

//Checks if the username matches the password on record.
//If it does, returns the user information
//If it does not, return an error message.
async function verify(ctx, next){
    console.log(ctx.request.body.username);
    var a = ctx.session.views || 0;
    ctx.session.views = ++a;
    await conn.getUser(ctx.request.body.username, ctx.request.body.password).then(result => {
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

router.post('/user', createUser);

//Creates a user tuple
async function createUser(ctx, next) {
	await conn.createUser(ctx.request.body.email, ctx.request.body.password, ctx.request.body.firstName, ctx.request.body.lastName).then(async function(retval) { 
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
		    await conn.getUser(ctx.request.body.email, ctx.request.body.password).then(function(result) {
					ctx.status = 200;
					var ret = {
						"status": "success",
			            "code": ctx.status,
			            "message": "New user created",
			            "apiVersion": apiVersion,
			            "requestUrl": ctx.request.host + ctx.request.url,
			            "data": {
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

router.get('/user/:id', getUserData);

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
					ctx.status = 401;
			   	 	var ret = {
				    	"status": "not-authorized",
		            	"code": ctx.status,
		            	"message": "Application retrieval unsuccessful",
		            	"apiVersion": apiVersion,
		            	"requestUrl": ctx.request.host + ctx.request.url,
		            	"data": {
		                	"error": "Id has no application."
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

router.get('/user/:id/interest', getUserInterest);

//Returns a list of user interest
async function getUserInterest(ctx, next) {

	await conn.getUserSkillsByType(ctx.params.id, "Interest").then(function(retval) {
		if(retval == null || retval.length == 0) {
			ctx.status = 404;
			var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User interest failed to be retrieved",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User has no interest."
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

router.get('/user/:id/skills', getUserSkills);

//Returns a list of user skills
async function getUserSkills(ctx, next) {
	
	await conn.getUserSkillsByType(ctx.params.id, "Skill").then(function(retval) {
		if(retval == null || retval.length == 0) {
			ctx.status = 404;
			var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User skill failed to be retrieved",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User has no skill."
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

router.get('/user/:id/software', getUserSoftware);

//returns a list of user software.
async function getUserSoftware(ctx, next) {

	await conn.getUserSkillsByType(ctx.params.id, "Software").then(function(retval) {
		if(retval == null || retval.length == 0) {
			ctx.status = 404;
			var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User software failed to be retrieved",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "User has no software."
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

router.delete('/user/:id', removeUser);

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

router.get('/user/:id/project', getAllUserProj);

async function getAllUserProj(ctx, next) {
	await conn.getProjectsbyUser(ctx.params.id).then(async function(retval) {
		if(retval == null || retval.length == 0) {
			ctx.status = 404;
			var ret = {
				"status": "failure",
	            "code": ctx.status,
	            "message": "User has no projects",
	            "apiVersion": apiVersion,
	            "requestUrl": ctx.request.host + ctx.request.url,
	            "data": {}
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

router.get('/user/:uid/project/:pid', getUserProj);

async function getUserProj(ctx, next) {
	await conn.getSpecificProjectbyUser(ctx.params.uid, ctx.params.pid).then(async function(retval) {
		if(retval == null || retval.length == 0) {
			ctx.status = 404;
			var ret = {
				"status": "failure",
	            "code": ctx.status,
	            "message": "User does not have that project",
	            "apiVersion": apiVersion,
	            "requestUrl": ctx.request.host + ctx.request.url,
	            "data": {}
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

module.exports = router;