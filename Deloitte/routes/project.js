var Router = require('koa-router');
var router = Router({prefix: '/project' });

var Connection = require("../connection");
var conn = new Connection();

conn.createTable();

//Routes will go here  
router.post('/', newProject);
router.get('/', listProject);

async function newProject(ctx, next) {
    const project = conn.createProject(ctx.body.project_name,
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
    ctx.res.status(200).json(project);
}

async function listProject(ctx, next) {
    const retval = 
}

