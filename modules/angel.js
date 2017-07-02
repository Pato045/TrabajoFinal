

var micodigo = {

    hello: function(){

        return "Hello";

    },

    test: function(){

        console.log("This is a test");

    },

    stuff: function(){

        //LEE FOTO Y CAMBIA EL TAMAÑO A 256 256 
        /*Jimp.read("foto.jpg", function (err, lenna) {
            if (err) throw err;
            lenna.resize(256, 256)            // resize 
                .quality(60)                 // set JPEG quality 
                .write("smaller-foto.jpg"); // save 
        });*/

        //PRUEBA DEL MARCO
        /*var image = new Jimp(8192, 8192, function (err, image) {
            // this image is 256 x 256, every pixel is set to 0x00000000 

            Jimp.read('foto.jpg',function(err, img){
                if(err) throw err;
                image.composite(img , 1216, 2176 );		
                    
                image.write("foto_con_marco.jpg");
            })

        
        });*/


        //PARTE FOTO EN PEDAZOS
        Jimp.read("img/foto_con_marco.jpg", function(err, foto){
            if(err) throw err;
            
            var copia1 = foto.clone();
            var copia2 = foto.clone();
            var copia3 = foto.clone();
            var copia4 = foto.clone();

            copia1.crop(0,0,4096,4096);
            copia2.crop(4095,0,4096,4096);
            copia3.crop(0,4095,4096,4096);
            copia4.crop(4095,4095,4096,4096);

            copia1.write("img/parte a.jpg");
            copia2.write("img/parte b.jpg");
            copia3.write("img/parte c.jpg");
            copia4.write("img/parte d.jpg");


        })


    }





}


module.exports = micodigo;