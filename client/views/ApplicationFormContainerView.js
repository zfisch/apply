var ApplicationFormContainer = Backbone.View.extend({

  template: Handlebars.templates.applicationFormContainer,

  initialize: function(){
    this.render();
  },

  render: function() {
    $('.application-form-section').html(this.template());
    return this;
  }

});

var applicationFormContainer = new ApplicationFormContainer();
