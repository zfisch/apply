var NewApplicationFormView = Backbone.View.extend({

  el: 'form',

  template: Handlebars.templates.applicationForm,

  events: {
    "submit": "submitForm"
  },

  submitForm: function(e){
    e.preventDefault();
    var application = new ApplicationModel({
      "companyName": e.target['company-name'].value,
      "jobTitle": e.target['job-title'].value,
      "status": e.target.status.value,
      "notes": e.target.notes.value
    });
    application.save();
  },

  render: function() {
    $('#application-form-container').html(this.template());
    return this;
  }

});

var newApplicationFormView = new NewApplicationFormView();
