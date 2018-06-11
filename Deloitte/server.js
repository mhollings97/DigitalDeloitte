/*
var koa = require('koa');
var router = require('koa-router');
var app = new koa();
var _ = router(); //Instantiate the router

_.get('/hello', tern); // Define routes

async function tern(ctx, next) {
  try {
  	ctx.body = "Hello World!"
    console.log(ctx.request.path);
    console.log(ctx.request.query);
    console.log(ctx.response);
    //await next() // next is now a function
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
}

app.use(_.routes()); //Use the routes defined using the router
app.listen(3000);

app.use(async (ctx, next) => {
  try {
  	ctx.body = "Hello World!"
    //await next() // next is now a function
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
});
app.use(_.routes());

app.listen(3000, function(){
   console.log('Server running on http://localhost:3000')
});
*/


var logger = require('koa-logger');
var koa = require('koa');
var router = require('koa-router');
var bodyParser = require('koa-body');

var app = new koa();

app.use(logger());
//Set up body parsing middleware
app.use(bodyParser({
   formidable:{uploadDir: './uploads'},
   multipart: true,
   urlencoded: true
}));

//Require the Router we defined in movies.js
var movies = require('./routes/movies.js');
var createUser = require('./routes/createUser.js');
var login = require('./routes/login.js');
var modifyUser = require('./routes/modifyUser.js');

//Use the Router on the sub route /movies
app.use(movies.routes());
app.use(createUser.routes());
app.use(login.routes());
app.use(modifyUser.routes());
//app.use();


app.listen(3000);