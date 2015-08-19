var ApplicationView = Backbone.View.extend({

  tagName: 'tr',

  className: 'application-view',

  template: Handlebars.templates.applicationRow,

  initialize: function(model){
    this.model = model;
    this.render();
  },

  render: function() {
    $('.applications-container').append(this.template());
    return this;
  }

});
