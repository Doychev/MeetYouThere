define(function(require) {

  var Backbone = require("backbone");
  var Event = require("models/Event");
  var Events = require("collections/Events");
  var EventView = require("views/pages/EventView");
  var Utils = require("utils");
  var spinner = require("spinner");

  var EventsView = Utils.Page.extend({

    constructorName: "EventsView",

    model: Event,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.eventsview;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "eventsview",
    className: "i-g page",

    events: {
		"tap .eventrow": "eventRow",
		"tap #mapButton": "mapView",
		"tap #filterButton": "filterEvents"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    eventRow: function(event) {
		Backbone.history.navigate("singleeventview/" + event.currentTarget.getAttribute('data-id'), {
			trigger: true
		});
	},

	mapView: function() {
		Backbone.history.navigate("map", {
			trigger: true
		});
	},

	mapView: function() {
		//take the params
		//load the data
		//show the data
	},

    loadData: function() {
      //load the data
      //load the data
	spinner.spin(document.body);
	BaasBox.loadCollectionWithParams("events", {page: 0, recordsPerPage: BaasBox.pagelength})
      .done(function(res) {
      // create a model with an arbitrary attribute for testing the template engine
	  var model = new Events(res);
      // create the view
      var page = new EventView({
        model: model
      });
		var pageHtml = page.render();
		var bodyEl = $(".events");
		bodyEl.append(pageHtml.el);

		for (var i = 0; i < res.length; i++){
			//put the id of the user as data for the div
			var row = $(".eventrow")[i];
			row.setAttribute('data-id',res[i].id);	  
		}
		
		spinner.stop();
      })
      .fail(function(error) {
        console.log("error ", error);
        alert(JSON.stringify(error, null, 4));
      })
    }
  });

  return EventsView;

});