define(function(require) {

  var Backbone = require("backbone");
  var Event = require("models/Event");
  var Utils = require("utils");
  var spinner = require("spinner");

  var SingleEventView = Utils.Page.extend({

    constructorName: "SingleEventView",

    model: Event,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.singleeventview;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
      // this.listenTo(this, "removing", functionName);
      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "singleeventview",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap"
    },

	loadData: function() {
		spinner.spin(document.body);
		var thisCopy = this;
		BaasBox.loadObject("events", this.model.id)
			.done(function(res) {
				thisCopy.model = new Event(res.data);
				console.log(thisCopy.model);
				spinner.stop();
				thisCopy.render();
			})
			.fail(function(error) {
				console.log("error ", error);
			})
	},
	
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
  });

  return SingleEventView;

});