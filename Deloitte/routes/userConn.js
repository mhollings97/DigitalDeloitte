var Router = require('koa-router');
var router = Router({
	prefix: '/api/v1'
    });                                                                                          
var Connection = require('../connection');
var conn = new Connection();
var apiVersion = 1;

conn.createTable();

router.post('/auth', verify);

//Checks if the username matches the password on record.
//If it does, returns the user information
//If it does not, return an error message.
async function verify(ctx, next){
    console.log(ctx.request.body.username);
    var a = ctx.session.views || 0;
    ctx.session.views = ++a;
    await conn.getUser(ctx.request.body.username, ctx.request.body.password).then(result => {
	    if(result == null || result.length == 0)
		{
		    ctx.status = 401;
		    var retval = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User login unsuccessful",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Email or Password Incorrect."
            	}
		    }

		    ctx.body = retval;
		}

	    else {
	  		ctx.app.key = "['" + result[0].dataValues.email + "']";

	    	ctx.status = 200;
			var retval = {
					"status": "success",
					"code": ctx.status,
					"message": null,
					"apiVersion": apiVersion,
					"requestUrl": ctx.request.host + ctx.request.url,
					"data": {
						"authorized": true,
						"userData": {
							"user_id": result[0].user_id,
							"email": result[0].dataValues.email,
						    "name": result[0].dataValues.name,
						    "surname": result[0].dataValues.surname,
						    "xp": result[0].dataValues.xp,
						    "uType": result[0].dataValues.uType
						}
					}
				};
			ctx.body = retval;
		}
	});
    await next;
}

router.post('/user', createUser);

async function createUser(ctx, next) {
	await conn.createUser(ctx.request.body.email, ctx.request.body.password, ctx.request.body.firstName, ctx.request.body.lastName).then(async function(retval) { 
	    if(retval == null) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User creation unsuccessful",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Email already registered."
      		  	}
			}
			ctx.body = ret;
	    }
	    else {
		    await conn.getUser(ctx.request.body.email, ctx.request.body.password).then(function(result) {
					ctx.status = 200;
					var ret = {
						"status": "success",
			            "code": ctx.status,
			            "message": "New user created",
			            "apiVersion": apiVersion,
			            "requestUrl": ctx.request.host + ctx.request.url,
			            "data": {
			                "firstName": result[0].dataValues.name,
			                "lastName": result[0].dataValues.surname,
			                "email": result[0].dataValues.email
		            	}
					}
					ctx.body = ret;
			});
		}
	});


	await next();
}

router.get('/user/:id', getUserData);

async function getUserData(ctx, next) {
	await conn.getUserById(ctx.params.id).then(async function(retval) {
		if(retval == null || retval.length == 0) {
			ctx.status = 401;
	   	 	var ret = {
		    	"status": "not-authorized",
            	"code": ctx.status,
            	"message": "User retrieval unsuccessful",
            	"apiVersion": apiVersion,
            	"requestUrl": ctx.request.host + ctx.request.url,
            	"data": {
                	"error": "Id not recognized."
      		  	}
			}
			ctx.body = ret;	
		}
		else {
			await conn.getApp(ctx.params.id).then(async function(application) {
				if(application == null || application.length == 0) {
					ctx.status = 401;
			   	 	var ret = {
				    	"status": "not-authorized",
		            	"code": ctx.status,
		            	"message": "Application retrieval unsuccessful",
		            	"apiVersion": apiVersion,
		            	"requestUrl": ctx.request.host + ctx.request.url,
		            	"data": {
		                	"error": "Id has no application."
		      		  	}
					}
					ctx.body = ret;	
				}
				else {
					ctx.status = 200;
					var ret = {
						"status": "success",
						"code": ctx.status,
						"message": null,
						"apiVersion": apiVersion,
						"requestUrl": ctx.request.host + ctx.request.url,
						"data": {
							"firstName": retval[0].dataValues.name,
							"lastName": retval[0].dataValues.surname,
							"email": retval[0].dataValues.email,
							"employmentStatus": application[0].dataValues.schooling,
							"interestArea": application[0].dataValues.interest,
							"LinkedIn": application[0].dataValues.link_In,
							"PersonalWebpage": application[0].dataValues.per_Ln,
							"type": retval[0].dataValues.uType,
							"xp": retval[0].dataValues.xp
						}
					};

					ctx.body = ret;
				}
			});
		}
	});
	await next();
}

/*
router.get('/user/:id/skills', getUserSkills);

async function getUserSkills(ctx, next) {

	await next();
}
*/

module.exports = router;