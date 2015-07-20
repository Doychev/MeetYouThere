define(function(require) {

  var Backbone = require("backbone");
  var Event = require("models/Event");
  var Utils = require("utils");
  var spinner = require("spinner");
  var currentUser;
  var attendingId;

  var SingleEventView = Utils.Page.extend({

    constructorName: "SingleEventView",

    model: Event,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.singleeventview;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
      // this.listenTo(this, "removing", functionName);
      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "singleeventview",
    className: "i-g page",

    events: {
      "tap #attendEvent": "attendEvent",
      "tap #cancelAttendEvent": "cancelAttendEvent"
    },
	
	attendEvent: function() {
		var attendee = new Object();
		attendee.username = currentUser.name;
		attendee.eventId = this.model.id;     
		BaasBox.save(attendee, "attendings")
			.done(function(res) {
				console.log("res ", res);
			})
			.fail(function(error) {
				console.log("error ", error);
			})
	},
	
	cancelAttendEvent: function() {
		BaasBox.deleteObject(attendingId, "attendings")
			.done(function(res) {
				console.log("res ", res);
			})
			.fail(function(error) {
				console.log("error ", error);
			})
	},

	loadData: function() {
		spinner.spin(document.body);
		var thisCopy = this;
		var attendEvent = document.getElementById("attendEvent");
		var cancelAttendEvent = document.getElementById("cancelAttendEvent");
		BaasBox.loadObject("events", this.model.id)
			.done(function(res) {
				thisCopy.model = new Event(res.data);
				BaasBox.fetchCurrentUser()
					.done(function(res) {
						currentUser = res.data.user;
						var whereClause = "username = \"" + currentUser.name + "\" and eventId = \"" + thisCopy.model.id + "\"";
						BaasBox.loadCollectionWithParams("attendings", {where: whereClause}, {page: 0, recordsPerPage: BaasBox.pagelength})
						.done(function(res) {
							if (res.length > 0) {
								attendEvent.style.visibility = "hidden";
								cancelAttendEvent.style.visibility = "visible";
								attendingId = res[0].id;
							} else {
								attendEvent.style.visibility = "visible";
								cancelAttendEvent.style.visibility = "hidden";
							}
							console.log("cancelAttendEvent: " + cancelAttendEvent.style.visibility);
							console.log("attendEvent: " + attendEvent.style.visibility);
							spinner.stop();
							thisCopy.render();
						})
						.fail(function(error) {
							console.log("error ", error);
							alert(JSON.stringify(error, null, 4));
						});
					})
					.fail(function(error) {
						console.log("error ", error);
					})
			})
			.fail(function(error) {
				console.log("error ", error);
			})
	},
	
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
  });

  return SingleEventView;

});