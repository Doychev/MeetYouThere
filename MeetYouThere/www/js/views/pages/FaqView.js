define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var FaqView = Utils.Page.extend({

    constructorName: "FaqView",

    model: MyModel,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.faqview;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "faqview",
    className: "i-g page",

    events: {
      "tap #info-faq-link": "faqView",
      "tap #info-contact-link": "infoView",
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

	faqView: function(event) {
      Backbone.history.navigate("faqview", {
        trigger: true
      });
    },

    infoView: function(event) {
      Backbone.history.navigate("infoview", {
        trigger: true
      });
    }
  });

  return FaqView;

});