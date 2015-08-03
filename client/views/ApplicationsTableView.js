var ApplicationsTableView = Backbone.View.extend({

  tagName: 'div',

  className: 'applications',

  template: Handlebars.templates.applicationsTable,

  events: {
    "submit": "submitNewApplication",
  },

  submitNewApplication: function(e) {
    e.preventDefault();
    console.log('INSIDE SUBMIT NEW APP');
    var application = new ApplicationModel({
      "companyName": e.target['company-name'].value,
      "jobTitle": e.target['job-title'].value,
      "status": e.target.status.value,
      "notes": e.target.notes.value
    });
    // application.save();
    console.log(application);
  },

  render: function() {
    this.$el.append(this.template());
    $('.dashboard-container').append(this.el);
    return this;
  },

  close: function() {
    _.each(this.subViews, function(view) {
      view.remove();
    });
    this.remove();
  }

});
