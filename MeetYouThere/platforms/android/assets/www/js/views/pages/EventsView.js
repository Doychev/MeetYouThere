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
      "tap #goToMap": "goToMap"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
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
	  spinner.stop();
	  bodyEl.append(pageHtml.el);
      })
      .fail(function(error) {
        console.log("error ", error);
        alert(error);
      })
    }

  });

  return EventsView;

});