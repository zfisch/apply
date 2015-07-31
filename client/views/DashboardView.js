var DashboardView = Backbone.View.extend({
  el: 'div',

  initialize: function(){
    this.render();
  },

  render: function() {
    $('.container').html("<h1>THIS IS AN EXPERIMENT</h1>");
    return this;
  }

});
