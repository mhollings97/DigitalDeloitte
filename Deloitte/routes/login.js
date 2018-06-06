var Router = require('koa-router');
var router = Router({
	prefix: '/login'
    });  //Prefixed all routes with /movies                                                                                           
var Connection = require('connection');
var conn = new Connection();

var movies = [
	      {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
	      {id: 102, name: "Inception", year: 2010, rating: 8.7},
	      {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
	      {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
	      ];

//Routes will go here                                                                                                             

router.get('/:id/:password', verify);


async function verify(ctx, next){
    conn.getUser(this.param.id, this.param.password).then(ret => {});
    
    if(ret[0] == undefined)
	{
	    ctx.body = "Your username/password were incorrect";
	}

    else{
	var retval = [{"email": ret[0].dataValues.email,
		       "password": ret[0].dataValues.password,
		       "name": ret[0].dataValues.name,
		       "surname": ret[0].dataValues.surname,
		       "xp": ret[0].dataValues.xp,
		       "type": ret[0].dataValues.type}];


	ctx.body = retval;
    }
}

module.exports = router;