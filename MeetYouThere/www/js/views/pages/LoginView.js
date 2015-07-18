define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var LoginView = Utils.Page.extend({

    constructorName: "LoginView",

    model: MyModel,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.loginview;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "loginview",
    className: "i-g page",
	

    events: {
      "tap #goToMap": "goToMap",
	  "tap #loginButton": "showLoginForm",
	  "tap #loginForm": "executeLogin",
	  "tap #signupButton": "showSignupForm",
	  "tap #signupForm": "executeSignup"
    },
	
    showLoginForm: function() {
		$("#loginForm").show();
		$("#signupForm").hide();
		$("#loginInitial").hide();
    },
	
	executeLogin: function() {
		$("#structureHeader").show();
		$("#structureNav").show();
		//login
		Backbone.history.navigate("dashboard", {
			trigger: true
		});		
	},

    showSignupForm: function() {
		$("#signupForm").show();
		$("#loginForm").hide();
		$("#loginInitial").hide();
    },
	
	executeSignup: function() {
		$("#structureHeader").show();
		$("#structureNav").show();
		//signup and login
		Backbone.history.navigate("dashboard", {
			trigger: true
		});		
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
  });

  return LoginView;

});