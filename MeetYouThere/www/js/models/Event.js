define(function(require) {

	var Backbone = require("backbone");

	var Event = Backbone.Model.extend({
		constructorName: "Event",
		defaults: {
			name: "No Name",
			time: "No Time", 
			location: "No Location"
		},
		    parse: function(response) {
        //unwrap the response from the server....
        if (response.data) return response.data;
        return response;
    }
	});

	return Event;
});