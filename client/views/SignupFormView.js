var SignupFormView = Backbone.View.extend({

  el: 'div',

  template: Handlebars.templates.signupForm,

  events: {
    "submit": "submitForm"
  },

  initialize: function(){
    this.render();
  },

  submitForm: function(e){
    e.preventDefault();
    var user = new UserModel({
      "username": e.target['username'].value,
      "password": e.target['password'].value,
    });
    user.save(null, {
      error: function(model, res, options){
        if (res.status === 409) alert ('User already exists.');
      },
      success: function(model, res, options){
        router.navigate("dashboard", {trigger: true});
      }
    });
  },

  render: function() {
    $('.container').html(this.template());
    return this;
  },

  close: function() {
    _.each(this.subViews, function(view) {
      view.undelegateEvents();
      $(view).empty;
      view.unbind();
    });
    this.undelegateEvents();
    $(this).empty;
    this.unbind();
  }

});
