Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'landing': 'landing',
    'signup': 'signup',
    'login': 'login',
    'dashboard': 'dashboard',
    'application/:application': 'application',
    '*other': 'default'
  },

  index: function() {
    var that = this;
    this.closeCurrentView(function(){
      that.loadView(new LoginFormView());
    });
  },

  // landing: function() {
  //   this.loadView(new LandingPageView());
  // },

  signup: function() {
    var that = this;
    this.closeCurrentView(function(){
      that.loadView(new SignupFormView());
    });
  },

  login: function() {
    var that = this;
    this.closeCurrentView(function(){
      that.loadView(new LoginFormView());
    });
  },

  dashboard: function() {
    var that = this;
    console.log(this);
    this.closeCurrentView(function(){
      that.loadView(new DashboardView());
    });
  },

  // application: function(query) {
  //   this.loadView(new ApplicationView(query));
  // },

  default: function(other) {
    var that = this;
    this.closeCurrentView(function(){
      that.loadView(new LoginFormView());
    });
  },

  closeCurrentView: function(loadNextView){
    if (this.view){
      if (this.view.close) {
        this.view.close();
      } else {
        this.view.undelegateEvents();
        $(this.view).empty;
        this.view.unbind();
      }
    }
    loadNextView();
  },

  loadView: function(view) {
    this.view = view;
  }

});

var router = new Router();
Backbone.history.start();
