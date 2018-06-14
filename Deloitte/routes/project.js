var Router = require('koa-router');
var router = Router({prefix: '/project' });

var Connection = require("../connection");
var conn = new Connection();

conn.createTable();

//Routes will go here  
router.post('/', newProject);
router.get('/', listProject);

async function newProject(ctx, next) {
    await conn.createProject(ctx.body.project_name,
			     ctx.body.completion_time,
			     ctx.body.description,
			     ctx.body.status,
			     ctx.body.join_deadline,
			     ctx.body.rev_deadline,
			     ctx.body.sub_deadline,
			     ctx.body.min_diff,
			     ctx.body.max_diff,
			     ctx.body.people,
			     ctx.body.xp_gain,
			     ctx.body.xp_bonus);

    var id = connect.getProjectId(ctx.body.project_name);
    
    var retval = {
	"status": "success",
	"code": 200,
	"message": "Hi, Mike. This is a project.",
	"apiVersion": 1,
	"requestUrl": "localhost: 3000/project/",
	"data": {
	    "project_id": id,
	    "project_name": ctx.body.project_name,
	    "completion_time": ctx.body.completion_time,
	    "description": ctx.body.description,
	    "status": ctx.body.status,
	    "join_deadline": ctx.body.join_deadline,
	    "rev_deadline": ctx.body.rev_deadline,
	    "sub_deadline": ctx.body.sub_deadline,
	    "min_diff": ctx.body.min_diff,
	    "max_diff": ctx.body.max_diff,
	    "skills": [],
	    "tags" []
	}
    };

    for(var i = 0; i < ctx.body.skills.length; i++)
        {
	    retval.data.skills.push(ctx.body.skills[i]);
	    await conn.addNS(id, ctx.body.skills[i]);
	}

    for(var j = 0; j < ctx.body.tags.length; j++)
       {
	   retval.data.tags.push(ctx.body.tags[j]);
	   await conn.addHT(id, ctx.body.tags[j]);
       }
    
    ctx.res = retval;
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

