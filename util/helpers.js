var register = function(Handlebars) {
  var helpers = {
    // put all of your helpers inside this object
    foo: function(){
        return "FOO";
    },
    bar: function(){
        return "BAR";
    },

    json: function(context) {

        //console.log("json",context);

    	return JSON.stringify(context);
	},

    toJSON: function(object){

        if(typeof object != "undefined")
            var res = JSON.stringify(object, null, 3);
        else
            var res = false;

        return res;

    },

    selected:function(option, value){
        
         //console.log("op:",option,"val:",value);
       
        if (option == value) {
            return ' selected';
        } else {
            return ''
        }
    },
    show: function(obj){

        console.log("obj",obj);
    },

    notequal: function(a,b){

        console.log("a:",a,"b:",b);

        if(a == b)
            return false;
        else
            return true;

    }

  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    // register helpers
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
      // just return helpers object if we can't register helpers here
      return helpers;
  }

};

module.exports.register = register;
module.exports.helpers = register(null);  


