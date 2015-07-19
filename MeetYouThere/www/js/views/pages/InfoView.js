define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var spinner = require("spinner");

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
      "tap #info-contact-link": "infoView",
	  "tap #submitTicket": "submitTicket"
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
    }, 
	
    submitTicket: function(event) {
		spinner.spin(document.body);
		var ticket = new Object();
		ticket.name = document.getElementById("ticketName").value;
		ticket.email = document.getElementById("ticketEmail").value;     
		ticket.comments = document.getElementById("ticketComments").value;
		var contactForm = document.getElementById("contact-form");
		var ticketSuccess = document.getElementById("ticketSuccess");
		BaasBox.save(ticket, "tickets")
			.done(function(res) {
				console.log("res ", res);
				spinner.stop();
				ticketSuccess.style.visibility = "visible";
				contactForm.style.visibility = "hidden";
				//$("#contactForm").hide();
				//$("#ticketSuccess").show();
				//show success
			})
			.fail(function(error) {
				console.log("error ", error);
			})
    }, 
  });

  return InfoView;

});