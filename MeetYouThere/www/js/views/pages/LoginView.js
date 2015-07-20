define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var spinner = require("spinner");
  var padding;

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
	  "tap #loginButton": "showLoginForm",
	  "tap #executeLoginButton": "executeLogin",
	  "tap #signupButton": "showSignupForm",
	  "tap #signupFormButton": "executeSignup"
    },
	
    showLoginForm: function() {
		$("#loginForm").show();
		$("#signupForm").hide();
		$("#loginInitial").hide();
    },
	
	executeLogin: function() {
		spinner.spin(document.body);		
		BaasBox.login($("#username").val(), $("#password").val())
			.done(function (user) {
				document.getElementById("content").style.padding = padding;
				$("#structureHeader").show();
				$("#structureNav").show();
				Backbone.history.navigate("dashboard", {
					trigger: true
				});		
				console.log("Logged in ", user);
				document.getElementById("profileLink").textContent = user.username;
				spinner.stop();
		})
			.fail(function (err) {
			  console.log("error ", err);
		});
	},

    showSignupForm: function() {
		$("#signupForm").show();
		$("#loginForm").hide();
		$("#loginInitial").hide();
    },
	
	executeSignup: function() {
		spinner.spin(document.body);		
		var username = document.getElementById("name");
//		var password = document.getElementById("password");
		var props = [document.getElementById("placeBirth").value, 
					document.getElementById("placeLiving").value, 
					document.getElementById("mobile").value, 
					document.getElementById("interests").value];
		console.log(props);
		
		BaasBox.signup(username, "password", {}, {}, {}, props)
			.done(function (res) {
				$("#structureHeader").show();
				$("#structureNav").show();
				document.getElementById("content").style.padding = padding;
				console.log(res);
				spinner.stop();
				Backbone.history.navigate("dashboard", {
					trigger: true
				});		
			})
			.fail(function (error) {
				console.log("error ", error);
			})
	},

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
	  padding = document.getElementById("content").style.padding;
	  document.getElementById("content").style.padding = 0;
      return this;
    },
  });

  return LoginView;

});