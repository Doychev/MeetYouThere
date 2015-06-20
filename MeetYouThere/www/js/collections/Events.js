define(function(require) {

	var Backbone = require("backbone");
	var Event = require("models/Event");

	var Events = Backbone.Collection.extend({
		constructorName: "Events",
		model: Event
	});

	return Events;
});