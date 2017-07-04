var express = require("express");
var app = express();
var http = require("http").Server(app);

var Jimp = require("jimp");

var puerto = 3030;

app.get("/",function(req, res){

    let width=0;
    let height=0;
    let size=256;
    let array = [];
    let i = 0;

    Jimp.read("img/image.jpg", function (err, image) {
        if (err) throw err;
        width = this.bitmap.width; 
        height = this.bitmap.height; 
		console.log(width);
		console.log(height);
            while (size < width || size < height){
            size = size * 2;
			console.log(size);
        }
        this.contain(size, size, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
      array.push("t");
      this.write("img/t.jpg");
      element=array[i];
      procesarMosaicos (element);
    });

    function procesarMosaicos (element) {

        console.log (array.toString());
        
        Jimp.read('img/'+element+'.jpg', function(err, foto){
            if(err) throw err;
                
            size = this.bitmap.width; 
            if (size>256) {

                var copia1 = foto.clone();
                var copia2 = foto.clone();
                var copia3 = foto.clone();
                var copia4 = foto.clone();

                size = size/2;

                copia1.crop(0,0,size,size);
                copia2.crop(size,0,size,size);
                copia3.crop(0,size,size,size);
                copia4.crop(size,size,size,size);

                copia1.write("img/"+element+"q.jpg");
                array.push(element+"q");
                copia2.write("img/"+element+"r.jpg");
                array.push(element+"r");
                copia3.write("img/"+element+"t.jpg");
                array.push(element+"t");
                copia4.write("img/"+element+"s.jpg");
                array.push(element+"s");

                i++;
                element=array[i];
                procesarMosaicos (element);
            }else{
                procesarAzulejos(array);
            }
        })        
    }

    function procesarAzulejos (array) {

        console.log(array.toString());
        element = array.shift();

        Jimp.read("img/" + element + ".jpg", function (err, img) {
            if (err) throw err;
            size = this.bitmap.width; 
            if (size>256) {
                img.resize(256, 256) 
                    .write("img/" + element  +".jpg"); 
                procesarAzulejos(array);
            }
        });
    }
})


http.listen(puerto,function(){

	console.log("App running and listenning on port "+puerto);

})
