var NavbarView = Backbone.View.extend({

  tagName: 'nav',

  className: "navbar navbar-default",

  template: Handlebars.templates.navbar,

  render: function() {
    this.$el.append(this.template());
    $('.dashboard-container').prepend(this.$el)
    return this;
  }

});
