var Router = require('koa-router');
var router = Router({
	prefix: '/user'
    });                                                                                          
var Connection = require('../connection');
var conn = new Connection();
conn.createTable();

router.get('/login/:id/:password', verify);

async function verify(ctx, next){
    console.log(ctx.params.id + " password:" + ctx.params.password);
    await conn.getUser(ctx.params.id, ctx.params.password).then(result => {
    if(result.length == 0)
	{
	    ctx.status = 404;
	    ctx.body = "Your username/password were incorrect";
	}

    else{
	var retval =  [
	{"user_id": result[0].user_id,
		       "email": result[0].dataValues.email,
		       "name": result[0].dataValues.name,
		       "surname": result[0].dataValues.surname,
		       "xp": result[0].dataValues.xp,
		       "uType": result[0].dataValues.uType}
		       ];
	ctx.body = retval;
    }
    });
    await next;
}

router.post('/create/:email/:first/:last', create);

async function create(ctx, next) {
	
	await conn.createUser(ctx.params.email, ctx.params.first, ctx.params.last).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
			ctx.body = "User failed to create.";
		}
		else {
			ctx.body = "User successfully created.";
		}
	})
	await next();
}

router.post('/approve/:id', approve);

async function approve(ctx, next) {

	await conn.updateUser(ctx.params.id, null, "DeloitteDigital", null, null, null).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
			ctx.body = "Password failed to set.";
		}
		else {
			ctx.body = "Password successfully set.";

		}
	})

	await next();
}

router.post('/application/:id/:school/:int/:apply/:linked/:pers/:cv', application);

async function application(ctx, next) {
	await conn.createApp(ctx.params.id, ctx.params.school, ctx.params.int, ctx.params.apply, ctx.params.linked, ctx.params.pers, ctx.params.cv).then(function(retval) {
		if(retval == null) {
			ctx.status = 401;
			ctx.body = "Application failed to create.";
		}
		else {
			ctx.body = "Application successfully created.";

		}
	})

	await next();
}

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