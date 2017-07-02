var express = require("express");
var app = express();
var http = require("http").Server(app);

var Jimp = require("jimp");

var puerto = 3030;


var angel = require("./modules/angel");
var patricio = require("./modules/patricio");


	
app.get("/",function(req, res){

	angel.test();

	res.json({ok_chaval:true, hello: angel.hello() });

})




http.listen(puerto,function(){

	console.log("App running and listenning on port "+puerto);

})