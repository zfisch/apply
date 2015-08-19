var ApplicationView = Backbone.View.extend({

  tagName: 'tr',

  className: 'application-view',

  template: Handlebars.templates.applicationRow,

  initialize: function(){
    this.render();
  },

  render: function() {
    $('.applications-container').append(this.template({ application: this.model.toJSON() }));
    console.log(this.model.toJSON());
    return this;
  }

});
