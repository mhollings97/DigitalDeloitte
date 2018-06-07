var Router = require('koa-router');
var router = Router({
	prefix: '/createUser'
    });  //Prefixed all routes with /movies                                                                                           
var Connection = require('../connection');
var conn = new Connection();
conn.createTable();

router.post('/:email/:first/:last', create);

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

module.exports = router;