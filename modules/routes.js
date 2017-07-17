var  express = require('express');
var app = express.Router();

var patricio = require("../modules/patricio");

 
var multer = require("multer");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {


    switch(file.mimetype){

    	case 'image/jpeg':
    		cb(null, file.filename /*+ '-' + Date.now()*/+".jpg");
    	break;
    }


  }
})


var upload = multer({ storage: storage })
//var upload = multer({ dest: 'uploads/' })





app.post("/processImage" , upload.single('newimage'),  function(req, res, next){

		var folderName = req.body.name; 
		
		patricio.procesarImagen({image: req.file.filename, folderName: folderName , success: function(where,level){


			setTimeout(function(){ //para que pueda terminar de crear las imagenes
				res.redirect('map/'+where+level);	
			},2000);
			
		} });

		
})



	







module.exports = app;