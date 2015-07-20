define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var ProfileView = Utils.Page.extend({

    constructorName: "ProfileView",

    model: MyModel,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.profileview;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "profileview",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",
	  "tap #message-view": "goToMessage"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
	
	/*goToMessage: function(e) {
      Backbone.history.navigate("message", {
        trigger: true
      });
    }*/
	
	
  });

  return ProfileView;

});