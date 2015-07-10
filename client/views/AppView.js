var AppView = Backbone.View.extend({

  tagName: "li",

  className: "app-container",

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html("<div>This div is rendered in the AppView and should be inside the app container</div>");
    return this;
  }

});

var appView = new AppView({ el: $(".app-container") });
