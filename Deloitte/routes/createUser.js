var Router = require('koa-router');
var router = Router({
	prefix: '/createuser'
    });                                                                                          
var Connection = require('../connection');
var conn = new Connection();
conn.createTable();

router.post('/initial/:email/:first/:last', create);

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

module.exports = router;