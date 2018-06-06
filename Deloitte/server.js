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


var koa = require('koa');
var router = require('koa-router');
var bodyParser = require('koa-body');

var app = new koa();

//Set up body parsing middleware
app.use(bodyParser({
   formidable:{uploadDir: './uploads'},
   multipart: true,
   urlencoded: true
}));

//Require the Router we defined in movies.js
var movies = require('./routes/movies.js');

//Use the Router on the sub route /movies
app.use(movies.routes());
//app.use();

app.listen(3000);



