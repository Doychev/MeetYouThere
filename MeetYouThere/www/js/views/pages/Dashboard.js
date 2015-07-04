define(function(require) {
	
  var Backbone = require("backbone");
  var Event = require("models/Event");
  var Events = require("collections/Events");
  var EventView = require("views/pages/EventView");
  var Utils = require("utils");
  var spinner = require("spinner");

  var Dashboard = Utils.Page.extend({

    constructorName: "Dashboard",

    model: Event,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.dashboard;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "dashboard",
    className: "i-g page",

    events: {
		"tap .eventrow": "eventRow",
		"tap #searchEventButton": "searchEvent",
		"tap #createEventButton": "createEvent"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    searchEvent: function() {
      Backbone.history.navigate("eventsview", {
        trigger: true
      });
    },

    createEvent: function() {
      Backbone.history.navigate("createeventview", {
        trigger: true
      });
    },

    eventRow: function(event) {
		Backbone.history.navigate("singleeventview" + event.currentTarget.getAttribute('data-id'), {
			trigger: true
		});
	},

    loadData: function() {
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

  return Dashboard;

});