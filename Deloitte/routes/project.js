var Router = require('koa-router');
var router = Router({prefix: '/project' });

var Connection = require("../connection");
var conn = new Connection();

conn.createTable();

//Routes will go here  
router.post('/', newProject);
//router.get('/', listProject);

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
					 await conn.getProjectId(j.project_name).then(async function (r){
						 ctx.status = 200;
						 var ret = {
						     "status": "success",
						     "code": 200,
						     "message": "Hi, Mike. This is a project.",
						     "apiVersion": 1,
						     "requestUrl": ctx.request.host + ctx.request.url,
						     "data": {
							 "project_id": r[0].dataValues.id,
							 "project_name": r[0].dataValues.project_name,
							 "completion_time": r[0].dataValues.completion_time,
							 "description": r[0].dataValues.description,
							 "status": r[0].dataValues.status,
							 "join_deadline": r[0].dataValues.join_deadline,
							 "rev_deadline": r[0].dataValues.rev_deadline,
							 "sub_deadline": r[0].dataValues.sub_deadline,
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
							 await conn.addNS(r[0].dataValues.id, j.skills[i]);
						     }

						 for(var x = 0; x < j.tags.length; x++)
						     {
							 ret.data.tags.push(j.tags[x]);
							 await conn.addHT(id, ctx.body.tags[j]);
						     }
    
						 ctx.res = retval;
					     }
					     )}
				 }
				 )
	}

async function listProject(ctx, next) {
    var retPD = [];
    await conn.getAllProject();

    var projects = ctx.body;

    for(var i = 0; i < projects.length; i++)
	{
	    var temp = {
		"project_id": projects[i].project_id,
		"project_name": projects[i].project_name,
		"completion_time": projects[i].completion_time,
		"status": projects[i].status,
		"join_deadline": projects[i].join_deadline,
		"rev_deadline": projects[i].rev_deadline,
		"sub_deadline": projects[i].sub_deadline,
		"min_diff": projects[i].min_diff,
		"max_diff": projects[i].max_diff,
		"people": projects[i].people,
		"xp_gain": projects[i].xp_gain,
		"xp_bonus": projects[i].xp_bonus,
		"skills": [],
		"tags": []
	    };

	    await conn.getNS(projects[i].project_id);
	    temp.skills = ctx.body;

	    await conn.getProjectTags(projects[i].project_id);
	    temp.tags = ctx.body;

	    retPD.push(i);
	}

    var retval = {
        "status": "success",
        "code": 200,
        "message": "Hi, Mike. This is all the projects.",
        "apiVersion": 1,
        "requestUrl": "localhost: 3000/project/",
        "data": {
	    "projectData": retPD
	}
    };

    ctx.res = retval;
}

module.exports = router;