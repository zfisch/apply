var LoginFormView = Backbone.View.extend({

  el: 'div',

  template: Handlebars.templates.loginForm,

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
    $.ajax({
      type: "POST",
      url: "api/user/login",
      data: JSON.stringify(user.attributes),
      dataType: "json",
      contentType: "application/json",
      success: function(res){
        var user = new UserModel(res);
        router.navigate('dashboard', {trigger: true});
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert('Please check your username and/or password!');
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
