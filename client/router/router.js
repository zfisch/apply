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

  _isLoggedIn: false,

  checkAuth: function(callback) {
    if (this._isLoggedIn) {
      callback();
    } else {
      var that = this;
      $.ajax({
        type: "GET",
        url: "api/session",
        dataType: "text",
        contentType: "text",
        success: function(res){
          that._isLoggedIn = true;
          callback();
        },
        error: function(xhr, ajaxOptions, thrownError){
          that.navigate('login', { trigger: true });
        }
      });
    }
  },

  index: function() {
    var that = this;
    this.checkAuth(function(){
      that.navigate('dashboard', { trigger: true });
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
    this.checkAuth(function(){
      that.closeCurrentView(function(){
        that.loadView(new DashboardView());
      });
    });
  },

  default: function(other) {
    var that = this;
    this.checkAuth(function(){
      that.navigate('dashboard', { trigger: true });
    });
  },

  closeCurrentView: function(loadNextView){
    if (this.view) {
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
