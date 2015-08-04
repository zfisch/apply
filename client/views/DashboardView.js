var DashboardView = Backbone.View.extend({

  tagName: 'div',

  className: 'dashboard-container',

  template: Handlebars.templates.dashboard,

  initialize: function(){
    this.subViews = [new NavbarView(), new ApplicationsTableView()];
    this.render();
  },

  render: function() {
    this.$el.append(this.template());
    $('.app-container').append(this.$el);
    _.each(this.subViews, function(view) {
      view.render();
    });
    return this;
  },

  close: function() {
    _.each(this.subViews, function(view) {
      view.remove();
    });
    this.remove();
  }

});
