var ApplicationsTableView = Backbone.View.extend({

  template: Handlebars.templates.applicationsTable,

  render: function() {
    $('.applications-table').html(this.template());
    return this;
  }

});

var applicationsTableView = new ApplicationsTableView();
