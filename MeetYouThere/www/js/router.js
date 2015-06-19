define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Spinner = require("spin");
  require("baasbox");
  var MyModel = require("models/MyModel");
  var ProfileModel = require("models/ProfileModel");
  var StructureView = require("views/StructureView");
  var Dashboard = require("views/pages/Dashboard");
  var MapView = require("views/pages/MapView");
  var FuckyouView = require("views/pages/FuckyouView");
  
  function initializeSpin() {
	  var opts = {
	  lines: 13 // The number of lines to draw
	, length: 28 // The length of each line
	, width: 14 // The line thickness
	, radius: 42 // The radius of the inner circle
	, scale: 1 // Scales overall size of the spinner
	, corners: 1 // Corner roundness (0..1)
	, color: '#000' // #rgb or #rrggbb or array of colors
	, opacity: 0.25 // Opacity of the lines
	, rotate: 0 // The rotation offset
	, direction: 1 // 1: clockwise, -1: counterclockwise
	, speed: 1 // Rounds per second
	, trail: 60 // Afterglow percentage
	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	, zIndex: 2e9 // The z-index (defaults to 2000000000)
	, className: 'spinner' // The CSS class to assign to the spinner
	, top: '50%' // Top position relative to parent
	, left: '50%' // Left position relative to parent
	, shadow: false // Whether to render a shadow
	, hwaccel: false // Whether to use hardware acceleration
	, position: 'absolute' // Element positioning
	}
	var target = document.body;
	return new Spinner(opts).spin(target);
  }
	
    
  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "dashboard": "dashboard",
      "map": "map",
      "fuckyouview": "fuckyouView"
    },

    firstView: "dashboard",

    initialize: function(options) {
		
		var spinner = initializeSpin();
		BAASBOX_URL = "http://192.168.1.105:9000";
		BAASBOX_APP_CODE = "1234567890";


		BaasBox.setEndPoint(BAASBOX_URL); //the address of your BaasBox server
		BaasBox.appcode = BAASBOX_APP_CODE;               //the application code of your server
		
		//at the moment we log in as admin  
		BaasBox.login("admin", "admin")
			.done(function (user) {
				console.log("Logged in ", user);
				//once we are logged in, let's start backbone
				setTimeout(function (){spinner.stop();}, 100);
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
      var model = new MyModel({
        key: "testValue"
      });
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

    fuckyouView: function() {
	
//	var contacts = new Contacts({});
	//var fetched = contacts.get("e6f8e35b-2c84-42bd-a90a-fbce88df8427");
	//alert(JSON.stringify(fetched, null, 4));

	// Version with pagination
	var routerCopy = this;
	BaasBox.loadCollectionWithParams("contacts", {page: 0, recordsPerPage: BaasBox.pagelength, where:"name='konstantinos'"})
	  .done(function(res) {
	// highlight the nav1 tab bar element as the current one
      routerCopy.structureView.setActiveTabBarElement("nav3");
      // create a model with an arbitrary attribute for testing the template engine
	  var model = new ProfileModel(res[0]);
      // create the view
      var page = new FuckyouView({
        model: model
      });
      // show the view
      routerCopy.changePage(page);
		console.log("res ", res);
	  })
	  .fail(function(error) {
		console.log("error ", error);
	  })
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