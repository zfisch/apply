var NavbarView = Backbone.View.extend({

  tagName: 'nav',

  className: "navbar navbar-default",

  template: Handlebars.templates.navbar,

  events: {
    "click .logout": "logout"
  },

  logout: function() {
    $.ajax({
      type: "POST",
      url: "api/user/logout",
      dataType: "text",
      contentType: "text",
      success: function(res){
        router.navigate('login', { trigger: true });
      },
      error: function(xhr, ajaxOptions, thrownError){
        console.error(xhr.statusText);
        console.error(xhr.responseText);
        console.error(xhr.status);
        console.error(thrownError);
      }
    });
  },

  render: function() {
    this.$el.append(this.template());
    $('.dashboard-container').prepend(this.$el)
    return this;
  }

});
