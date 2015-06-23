define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var InfoView = Utils.Page.extend({

    constructorName: "InfoView",

    model: MyModel,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.infoview;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "infoview",
    className: "i-g page",

    events: {
      "tap #info-faq-link": "faqView",
      "tap #info-contact-link": "contactView",
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

    contactView: function(event) {
      Backbone.history.navigate("contactview", {
        trigger: true
      });
    },


  });

  return InfoView;

});