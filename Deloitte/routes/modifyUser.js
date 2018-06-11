var Router = require('koa-router');
var router = Router({
	prefix: '/modifyuser'
    });                                                                                          
var Connection = require('../connection');
var conn = new Connection();
conn.createTable();

router.post('/change/:id/:email/:pass/:name/:sur', changeAtts)

async function changeAtts(ctx, next) {

	await conn.updateUser(ctx.params.id, ctx.params.email, ctx.params.pass, ctx.params.name, ctx.params.sur, null).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
			ctx.body = "User failed to update.";
		}
		else {
			ctx.body = "User successfully updated.";
		}
	})

	await next();
}

router.post('/earnxp/:id/:currxp/:newxp', earnXP);

async function earnXP(ctx, next) {

	await conn.updateUser(ctx.params.id, null, null, null, null, +ctx.params.currxp + +ctx.params.newxp).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
			ctx.body = "XP failed to update.";
		}
		else {
			ctx.body = "XP successfully updated.";
		}
	})

	await next();
}

router.post('/addskill/:id/:skill', addSkill);

async function addSkill(ctx, next) {

	await conn.addHS(ctx.params.id, ctx.params.skill).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
			ctx.body = "Skill failed to be added.";
		}
		else {
			ctx.body = "Skill successfully added.";
		}
	})

	await next();
}

router.post('/removeskill/:id/:skill', removeSkill);

async function removeSkill(ctx, next) {

	await conn.deleteHS(ctx.params.id, ctx.params.skill).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
			ctx.body = "Skill failed to be removed.";
		}
		else {
			ctx.body = "Skill successfully removed.";
		}
	})

	await next();
}

module.exports = router;