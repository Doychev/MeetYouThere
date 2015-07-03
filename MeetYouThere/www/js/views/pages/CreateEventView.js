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
      this.listenTo(this, "inTheDOM", this.loadData);
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "createeventview",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
  });

  return CreateEventView;

});