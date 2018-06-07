var Router = require('koa-router');
var router = Router({
	prefix: '/login'
    });  //Prefixed all routes with /movies                                                                                           
var Connection = require("../connection");
var conn = new Connection();

conn.createTable();

/*var movies = [
	      {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
	      {id: 102, name: "Inception", year: 2010, rating: 8.7},
	      {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
	      {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
	      ];
*/
//Routes will go here                                                                                                             

router.get('/:id/:password', verify);


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

module.exports = router;