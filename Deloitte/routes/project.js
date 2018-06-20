var Router = require('koa-router');
var router = Router({prefix: '/api/v1' });

var Connection = require("../connection");
var conn = new Connection();

conn.createTable();

//Project related functions
//Creates a new project and returns the information
router.post('/project', newProject);
//List all projects that are in a database.
router.get('/project', listProject);
//Returns a specific project
router.get('/project/get/:pid', getProject);
//List all projects that a user has matching skills for.
router.get('/project/:uid', myProjects);

//Creates a new project
async function newProject(ctx, next) {
    var j = JSON.parse(ctx.request.body);
    await conn.createProject(j.project_name,
			     j.completion_time,
			     j.description,
			     j.status,
			     j.join_deadline,
			     j.rev_deadline,
			     j.sub_deadline,
			     j.min_diff,
			     j.max_diff,
			     j.people,
			     j.xp_gain,
			     j.xp_bonus).then(async function(retval) {
				     if(retval == null) {
					 ctx.status = 401;
					 var ret = {
					     "status": "not-authorized",
					     "code": ctx.status,
					     "message": "User creation unsuccessful",
					     "apiVersion": 1,
					     "requestUrl": ctx.request.host + ctx.request.url,
					     "data": {
						 "error": "Project failed to create"
					     }
					 }
					 ctx.body = ret;
				     }
				     else {
					 var pid = await conn.getProjectId(j.project_name);
					 await conn.getProject(pid[0].dataValues.project_id).then(async function (r){
						 ctx.status = 200;
						 var ret = {
						     "status": "success",
						     "code": 200,
						     "message": "New project created.",
						     "apiVersion": 1,
						     "requestUrl": ctx.request.host + ctx.request.url,
						     "data": {
							 "project_id": r[0].dataValues.project_id,
							 "project_name": r[0].dataValues.project_name,
							 "completion_time": r[0].dataValues.completion_time,
							 "description": r[0].dataValues.description,
							 "status": r[0].dataValues.status,
							 "join_deadline": r[0].dataValues.join_deadline.toISOString().split('T')[0],
							 "rev_deadline": r[0].dataValues.rev_deadline.toISOString().split('T')[0],
							 "sub_deadline": r[0].dataValues.sub_deadline.toISOString().split('T')[0],
							 "min_diff": r[0].dataValues.min_diff,
							 "max_diff": r[0].dataValues.max_diff,
							 "people": r[0].dataValues.people,
							 "xp_gain": r[0].dataValues.xp_gain,
							 "xp_bonus": r[0].dataValues.xp_bonus,
							 "skills": [],
							 "tags": []
						     }
						 }

						 for(var i = 0; i < j.skills.length; i++)
						     {
							 ret.data.skills.push(j.skills[i]);
							 await conn.addNS(r[0].dataValues.project_id, j.skills[i]);
						     }

						 for(var x = 0; x < j.tags.length; x++)
						     {
							 ret.data.tags.push(j.tags[x]);
							 await conn.addHT(r[0].dataValues.project_id, j.tags[x]);
						     }
    
						 ctx.body = ret;
					     }
					     )}
				 }
				 )
	}

//List all projects
async function listProject(ctx, next) {
    var retPD = [];

    await conn.getAllProject().then(async function(projects) {
    	if(projects == null) {
    		ctx.status = 401;
    		var retval = {
				"status": "not-authorized",
			     "code": ctx.status,
			     "message": "User creation unsuccessful",
			     "apiVersion": 1,
			     "requestUrl": ctx.request.host + ctx.request.url,
			     "data": {
				 	"error": "Project failed to create"
			     }
		    };
	    
		    ctx.body = retval;
    	}
    	else{
		    for(var i = 0; i < projects.length; i++)
			{
			    var temp = {
				"project_id": projects[i].project_id,
				"project_name": projects[i].project_name,
				"completion_time": projects[i].completion_time,
				"status": projects[i].status,
				"join_deadline": projects[i].join_deadline.toISOString().split('T')[0],
				"rev_deadline": projects[i].rev_deadline.toISOString().split('T')[0],
				"sub_deadline": projects[i].sub_deadline.toISOString().split('T')[0],
				"min_diff": projects[i].min_diff,
				"max_diff": projects[i].max_diff,
				"people": projects[i].people,
				"xp_gain": projects[i].xp_gain,
				"xp_bonus": projects[i].xp_bonus,
				"skills": [],
				"tags": []
			    };

			    await conn.getNS(projects[i].project_id).then(function(retS) {
					for(var i = 0; i < retS.length; i++) {
						temp.skills[i] = retS[i].dataValues.skill;		
					}	    	
			    });

			    await conn.getProjectTags(projects[i].project_id).then(function(retT) {
					for(var i = 0; i < retT.length; i++) {
						temp.tags[i] = retT[i].dataValues.tag;		
					}	    	
			    });

			    retPD.push(temp);
			}

			ctx.status = 200;
		    var retval = {
				"status": "success",
				"code": ctx.status,
				"message": "Project retrieval successful",
				"apiVersion": 1,
				"requestUrl": ctx.request.host + ctx.request.url,
				"data": {
				    "projectData": retPD
				}
		    };
	    
		    ctx.body = retval;

		}
	})
}

//List projects with matching skills to a user.
async function myProjects(ctx, next) {
    var pid = await conn.getAppProjects(ctx.params.uid);
    var retPD = [];

    if(pid == null)
	{
	    ctx.status = 401;
	    var ret = {
		"status": "not-authorized",
		"code": ctx.status,
		"message": "Project retrieval unsuccessful",
		"apiVersion": 1,
		"requestUrl": ctx.request.host + ctx.request.url,
		"data": {
		    "error": "Failed to retrieve relevant projects."
		}
	    }
	    ctx.body = ret;
	}
    else {
	ctx.status = 200;
	for(var i = 0; i < pid[0].length; i++) {
	    await conn.getProject(pid[0][i].project_id).then(async function (projects){
		    var temp = {
			"project_id": projects[0].dataValues.project_id,
			"project_name": projects[0].dataValues.project_name,
			"completion_time": projects[0].dataValues.completion_time,
			"status": projects[0].dataValues.status,
			"join_deadline": projects[0].dataValues.join_deadline.toISOString().split('T')[0],
			"rev_deadline": projects[0].dataValues.rev_deadline.toISOString().split('T')[0],
			"sub_deadline": projects[0].dataValues.sub_deadline.toISOString().split('T')[0],
			"min_diff": projects[0].dataValues.min_diff,
			"max_diff": projects[0].dataValues.max_diff,
			"people": projects[0].dataValues.people,
			"xp_gain": projects[0].dataValues.xp_gain,
			"xp_bonus": projects[0].dataValues.xp_bonus,
			"skills": [],
			"tags": []
		    };

		    await conn.getNS(projects[0].dataValues.project_id).then(function(s) {;
		    	for(var j = 0; j < s.length; j++) {
		    		console.log(s[j])
		    		temp.skills.push(s[j].dataValues.skill);
		    	}
			})

		    await conn.getProjectTags(projects[0].dataValues.project_id).then(function(t) {;
		    	for(var j = 0; j < t.length; j++) {
		    		temp.tags.push(t[j].dataValues.tag);
		    	}
			})

		    retPD.push(temp);
		})
		}
	var retval = {
	    "status": "success",
	    "code": 200,
	    "message": "Successfully retrieved relevant projects.",
	    "apiVersion": 1,
	    "requestUrl": ctx.request.host + ctx.request.url,
	    "data": {
	    "projectData": retPD
	    }
	};

	ctx.body = retval;
    }
}

async function getProject(ctx, next) {
	await conn.getProject(ctx.params.pid).then(async function(retval) {
		if(retval == null) {
			ctx.status = 404;
			var ret = {
				"status": "failure",
	            "code": ctx.status,
	            "message": "Project failed to be retrieved",
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