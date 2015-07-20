define(function(require) {

	var Backbone = require("backbone");

	var ProfileModel = Backbone.Model.extend({
		constructorName: "ProfileModel",
		defaults: {
			name: "N/A",
			mobile: "N/A", 
			dateBirth: "N/A",
			placeBirth: "N/A",
			placeLiving: "N/A",
			interests: "N/A"
		},
		    parse: function(response) {
        //unwrap the response from the server....
        if (response.data) return response.data;
        return response;
    }
	});
	
	

	return ProfileModel;
});