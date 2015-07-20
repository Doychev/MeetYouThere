define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var MessageView = Utils.Page.extend({

    constructorName: "MessageView",

    model: MyModel,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.messageview;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "messageview",
    className: "i-g page",

    events: {
	  "tap #profile-view": "profileView",
	  "tap #submitMessage": "submitMessage",
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
	
	profileView: function(e) {
      Backbone.history.navigate("profileview", {
        trigger: true
      });
    },
	
	submitMessage: function() {
		//submit the message
	}
	
  });

  return MessageView;

});