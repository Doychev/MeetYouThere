define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  require("baasbox");
  var Handlebars = require("handlebars");
  var Event = require("models/Event");
  var Events = require("collections/Events");
  var ProfileModel = require("models/ProfileModel");
  var MyModel = require("models/MyModel");
  var StructureView = require("views/StructureView");
  var Dashboard = require("views/pages/Dashboard");
  var MapView = require("views/pages/MapView");
  var EventsView = require("views/pages/EventsView");
  var CreateEventView = require("views/pages/CreateEventView");
  var SingleEventView = require("views/pages/SingleEventView");
  var FriendsView = require("views/pages/FriendsView");
  var InfoView = require("views/pages/InfoView");
  var FaqView = require("views/pages/FaqView");
  var ProfileView = require("views/pages/ProfileView");
  var LoginView = require("views/pages/LoginView");
  var spinner = require("spinner");
  
   Handlebars.registerHelper("debug", function(optionalValue) {
   // console.log("Current Context");
   // console.log("====================");
    console.log(JSON.stringify(this, null, 4));
   //alert(JSON.stringify(this, null, 4));
   
    // if (optionalValue) {
     // console.log("Value");
     // console.log("====================");
     // console.log(optionalValue);
   // }
 });
    
  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "dashboard": "dashboard",
      "map": "map",
      "eventsview": "eventsView",
      "createeventview": "createEventView",
      "singleeventview": "singleEventView",
      "singleeventview/:id": "singleEventView",
      "friendsview": "friendsView",
      "infoview": "infoView",
      "faqview": "faqView",
      "profileview": "profileView",
      "loginview": "loginView"
    },

    firstView: "dashboard",

    initialize: function(options) {
		
		BAASBOX_URL = "http://192.168.1.105:9000";
		BAASBOX_APP_CODE = "1234567890";


		BaasBox.setEndPoint(BAASBOX_URL); //the address of your BaasBox server
		BaasBox.appcode = BAASBOX_APP_CODE;               //the application code of your server
		
		spinner.spin(document.body);
		//at the moment we log in as admin  
		BaasBox.login("admin", "admin")
			.done(function (user) {
				console.log("Logged in ", user);
				spinner.stop();
		})
			.fail(function (err) {
			  console.log("error ", err);
		});
      this.currentView = undefined;
    },

    dashboard: function() {
		// highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav1");
		// create a model with an arbitrary attribute for testing the template engine
	  var model = new Events();
      // create the view
      var page = new Dashboard({
        model: model
      });
      // show the view
      this.changePage(page);
    },

    map: function() {
      // highlight the nav2 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav2");
      // create the view and show it
      var page = new MapView();
      this.changePage(page);
    },
	
    createEventView: function() {
		// highlight the nav1 tab bar element as the current one
      //this.structureView.setActiveTabBarElement("nav3");
		// create a model with an arbitrary attribute for testing the template engine
	  var model = new Events();
      // create the view
      var page = new CreateEventView({
        model: model
      });
      // show the view
      this.changePage(page);
    },
	
    singleEventView: function(id) {
		// highlight the nav1 tab bar element as the current one
      //this.structureView.setActiveTabBarElement("nav3");
		// create a model with an arbitrary attribute for testing the template engine
	  var model = new Event({
			id: id
	  });
      // create the view
      var page = new SingleEventView({
        model: model
      });
      // show the view
      this.changePage(page);
    },
	
    eventsView: function() {
		// highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav3");
		// create a model with an arbitrary attribute for testing the template engine
	  var model = new Events();
      // create the view
      var page = new EventsView({
        model: model
      });
      // show the view
      this.changePage(page);
    },
	
    friendsView: function() {
	this.structureView.setActiveTabBarElement("nav4");
      // create a model with an arbitrary attribute for testing the template engine
	  var model = new MyModel();
      // create the view
      var page = new FriendsView({
        model: model
      });
      // show the view
      this.changePage(page);
		console.log("res ", res);
    },

    infoView: function() {
	this.structureView.setActiveTabBarElement("nav5");
      // create a model with an arbitrary attribute for testing the template engine
	  var model = new MyModel();
      // create the view
      var page = new InfoView({
        model: model
      });
      // show the view
      this.changePage(page);
    },

    faqView: function() {
	//this.structureView.setActiveTabBarElement("nav5");
      // create a model with an arbitrary attribute for testing the template engine
	  var model = new MyModel();
      // create the view
      var page = new FaqView({
        model: model
      });
      // show the view
      this.changePage(page);
    },

    profileView: function() {
	//this.structureView.setActiveTabBarElement("nav5");
      // create a model with an arbitrary attribute for testing the template engine
	  var model = new MyModel();
      // create the view
      var page = new ProfileView({
        model: model
      });
      // show the view
      this.changePage(page);
		console.log("res ", res);
    },

    loginView: function() {
	//this.structureView.setActiveTabBarElement("nav5");
      // create a model with an arbitrary attribute for testing the template engine
	  var model = new MyModel();
      // create the view
      var page = new LoginView({
        model: model
      });
      // show the view
      this.changePage(page);
    },

    // load the structure view
    showStructure: function() {
      if (!this.structureView) {
        this.structureView = new StructureView();
        // put the el element of the structure view into the DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      this.navigate(this.firstView, {trigger: true});
    },

  });

  return AppRouter;

});