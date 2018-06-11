var Router = require('koa-router');
var router = Router({
	prefix: '/login'
    });  //Prefixed all routes with /movies                                                                                           
var Connection = require("../connection");
var conn = new Connection();

conn.createTable();

var a = this.session.views || 0;

//Routes will go here                                                                                                             

router.get('/:id/:password', verify);

async function verify(ctx, next){
    console.log(ctx.params.id + " password:" + ctx.params.password);
    ctx.session.views = ++a;
    await conn.getUser(ctx.params.id, ctx.params.password).then(result => {
    if(result.length == 0)
	{
	    ctx.status = 404;
	    ctx.body = "Your username/password were incorrect. This is attempt " + a + ".";
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

module.exports = router;