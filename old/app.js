var express = require("express");
var app = express();
var http = require("http").Server(app);
var Jimp = require("jimp");

var puerto = 3030;

var hbs = require("express-handlebars");

var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())


app.engine("hbs", hbs({extname: 'hbs', /*defaultLayout:'main',*/ layoutsDir: __dirname + "/views/layouts/", 
                        helpers: require("./util/helpers.js").helpers }))


app.set("view engine",'hbs');




app.get("/",function(req, res){


    res.render("layouts/uploadImage",{});

})


app.get("/map/:where", function(req, res){


    var where = req.params.where; 
    //var where=parametro.substr(0,parametro.length-1);
    //var level=parametro.substr(parametro.length-1,1);

    //console.log("level",level);

    var fs = require("fs");

	fs.readFile('img/'+where+'/level.txt', function read(err, data) {
		if (err) {
		    throw err;
		}
		level = data;    
		res.render('layouts/map',{where: where, level: level});   	

	});

    
})


app.use(require('./modules/routes')); 




http.listen(puerto,function(){

	console.log("App running and listenning on port "+puerto);

})

app.use('/img',express.static('img'));