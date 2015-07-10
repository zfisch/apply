var ApplicationView = Backbone.View.extend({

  tagName: 'tr',

  className: 'application-view',

  template: _.template('<tr><td>row1</td><td>row2</td></tr>'),

  initialize: function(){
    this.render();
  },

  render: function() {
    $('.applications-container').append(this.template());
    return this;
  }

});
