var Jimp = require("jimp");

var micodigo = {

    //primero debo leer la imagen a procesar y determinar su tamanio optimo.

    //llevarla al tamanio optimo
        
    //cortarla en 4 nivel a nivel

    //cambiar el tamanio de todas a 256*256

    //almacenar todos los datos en base de datos


    procesarImagen: function(options){


    	

		    let width=0;
		    let height=0;
		    let size=256;
		    let array = [];
			let i = 0;
			let level=0;
		    var folderName = options.folderName;


		    Jimp.read("uploads/"+options.image, function (err, image) {
		        if (err) throw err;
		        width = this.bitmap.width; 
		        height = this.bitmap.height; 
				//console.log(width);
				//console.log(height);
		            while (size < width || size < height){
					size = size * 2;
					level++;
					//console.log(size);
		        }
		      this.contain(size, size, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
		      array.push("t");
		      this.write("img/"+folderName+"/t.jpg");
		      element=array[i];



		      lastNumber = 0;

		      cosa = function(n){
		      	console.log("cosa", n, "    ", lastNumber);

		      	if(n == lastNumber){
		      		console.log("ultimo");

				    if(typeof options.success != "undefined"){
				    	console.log("success");

				    	var fs = require("fs");

				    	fs.writeFile("img/"+folderName+"/level.txt", ""+level+"",  function(err){

				    		if(err) throw err;

				    		options.success(folderName,level);
				    	})


				    	
				    }

		      	}

		      }

		      procesarMosaicos(element, 1,	cosa );



		    });

		    var that = this;

		 

		    function procesarMosaicos (element, number, callback){

		    	lastNumber = number;
		    		

		        Jimp.read('img/'+folderName+'/'+element+'.jpg', function(err, foto){
		            if(err) throw err;
		                
		            size = this.bitmap.width; 
		            if (size>256) {

		            	var copias = [];
		                copias[0] = foto.clone();
		                copias[1] = foto.clone();
		                copias[2] = foto.clone();
		                copias[3] = foto.clone();

		                size = size/2;

		                copias[0].crop(0,0,size,size);
		                copias[1].crop(size,0,size,size);
		                copias[2].crop(0,size,size,size);
		                copias[3].crop(size,size,size,size);


		                var letras = ['q','r','t','s'];

		                	
		                var j = 0; 

		                that.escribir(copias[j], "img/"+folderName+"/"+element+letras[j]+".jpg", function(){

		                	array.push(element+letras[j]);
		                
		            		j++;
		            		that.escribir(copias[j], "img/"+folderName+"/"+element+letras[j]+".jpg", function(){
		            			array.push(element+letras[j]);
		            			j++;
			            		that.escribir(copias[j], "img/"+folderName+"/"+element+letras[j]+".jpg", function(){
			            			array.push(element+letras[j]);
			            			j++;
				            		that.escribir(copias[j], "img/"+folderName+"/"+element+letras[j]+".jpg", function(){
				            			array.push(element+letras[j]);

						                i++;
						                element=array[i];
						                procesarMosaicos (element, number+1, cosa);		 
							                if(typeof callback != "undefined"){
							                	//console.log("calling callback "+number);
							                	callback(number);
							                }


				            		})	            			
			            		})

		            		})
		                	

		                })

		           

		           


		            }else{
		                procesarAzulejos(array);
		                if(typeof callback != "undefined"){
		                	//console.log("calling callback "+number);
		                	callback(number);
		                }
		            }
		        })       	

		    }

		    function procesarAzulejos (array) {

		        //console.log(array.toString());
		        element = array.shift();

		        Jimp.read("img/"+folderName+"/" + element + ".jpg", function (err, img) {
		            if (err) throw err;
		            size = this.bitmap.width; 
		            if (size>256) {
		                img.resize(256, 256) 
		                    .write("img/"+folderName+"/" + element  +".jpg", function(){
		                		procesarAzulejos(array);    	
		                    }); 
		                
		            }
		        });
		    }

		

    }, 

    escribir: function(imagenJimp, path, callback){

    	imagenJimp.write(path, function(){

    		if(typeof callback !="undefined"){
    			callback();
    		}

    	})

    }



}


module.exports = micodigo;