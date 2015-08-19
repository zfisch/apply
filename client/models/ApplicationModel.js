var ApplicationModel = Backbone.Model.extend({

  initialize: function(){
    this.url = 'api/user/' + router.user.id + '/application';
  }

});
