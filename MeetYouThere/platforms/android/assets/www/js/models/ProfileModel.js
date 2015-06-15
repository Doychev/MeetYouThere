define(function(require) {

	var Backbone = require("backbone");

	var ProfileModel = Backbone.Model.extend({
		constructorName: "ProfileModel",
		defaults: {
			name: "No Name",
			tel: "No Telephone", 
			email: "No Email"
		},
		    parse: function(response) {
        //unwrap the response from the server....
        if (response.data) return response.data;
        return response;
    }
	});
	
	

	return ProfileModel;
});