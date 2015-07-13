var NewApplicationFormView = Backbone.View.extend({

  template: Handlebars.templates.applicationForm,

  render: function() {
    $('.application-form').html(this.template());
    return this;
  }

});

var newApplicationFormView = new NewApplicationFormView();
