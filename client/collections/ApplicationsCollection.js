var ApplicationsCollection = Backbone.Collection.extend({

  model: ApplicationModel,

  initialize: function(models, options){
    this.url = options.url;
  }

});
