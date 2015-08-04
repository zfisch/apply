var ApplicationsTableView = Backbone.View.extend({

  tagName: 'div',

  className: 'applications',

  template: Handlebars.templates.applicationsTable,

  events: {
    "submit": "submitNewApplication",
  },

  submitNewApplication: function(e) {
    e.preventDefault();
    var application = new ApplicationModel({
      "companyName": e.target['company-name'].value,
      "jobTitle": e.target['job-title'].value,
      "jobLocation": e.target['job-location'].value,
      "jobPosting": e.target['job-posting'].value,
      "contactName": e.target['contact-name'].value,
      "contactEmail": e.target['contact-email'].value,
      "contactPhone": e.target['contact-phone'].value,
      "statusId": e.target.status.value,
      "note": e.target.notes.value
    });
    application.save();
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
