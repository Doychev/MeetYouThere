define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var spinner = require("spinner");

  var ProfileView = Utils.Page.extend({

    constructorName: "ProfileView",

    model: MyModel,

	initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.profileview;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "profileview",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",
	  "tap #message-view": "messageView"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    },
	
	loadData: function() {
		spinner.spin(document.body);
		var thisCopy = this;
		var profileInfo = document.getElementsByClassName("profileInfo");
		BaasBox.fetchCurrentUser()
			.done(function(res) {
				console.log("res ", res['data']);
				spinner.stop();
			})
			.fail(function(error) {
				console.log("error ", error);
			})
	},
	
	messageView: function(e) {
      Backbone.history.navigate("messageview", {
        trigger: true
      });
    }	
	
  });

  return ProfileView;

});