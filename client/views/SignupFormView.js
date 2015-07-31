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
    user.save();
  },

  render: function() {
    $('.container').html(this.template());
    return this;
  }

});

var signupFormView = new SignupFormView();
