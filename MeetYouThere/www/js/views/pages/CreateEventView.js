define(function(require) {

  var Backbone = require("backbone");
  var Event = require("models/Event");
  var Utils = require("utils");

  var CreateEventView = Utils.Page.extend({

    constructorName: "CreateEventView",

    model: Event,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.createeventview;
      // here we can register to inTheDOM or removing events
//      this.listenTo(this, "inTheDOM", this.loadData);
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "createeventview",
    className: "i-g page",

    events: {
	  "tap #submitEventButton": "createEvent"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
	
	createEvent: function() {		
		var form = document.getElementById("createEventForm");
		var event = new Event();
        var i;
        for (i = 0; i < form.length - 2; i++) {
          event.set(form.elements[i].name, form.elements[i].value);
        }
		  console.log(event);
		BaasBox.save(event, "events").done(function(res) {
			console.log("res ", res);
		}).fail(function(error) {
			console.log("error ", error);
		});
	}
  });

  return CreateEventView;

});