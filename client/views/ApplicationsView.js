var ApplicationsView = Backbone.View.extend({

  tagName: "li",

  className: "applications-container",

  // events: {
  //   // "click .icon":          "open",
  //   // "click .button.edit":   "openEditDialog",
  //   // "click .button.delete": "destroy"
  // },

  // initialize: function() {
  //   this.listenTo(this.model, "change", this.render);
  // },

  render: function() {
    this.$el.html("<div>hello?</div>");
    return this;
  }

});