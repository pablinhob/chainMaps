

$(document).ready(function() {
  //contract.init();
  app.init();
});

var app = {
  accountIdName: false,

  router: false,

  views: {
    accountChooser: false,
    mapViewInstance: false,
    adminAccount: false,
    adminLocations: false
  },

  init: function() {
    var that = this;

    that.views.accountChooser = new AccountChooserView({ el: $('.content') });

    that.router = new AppRouter();
    Backbone.history.start()
  }
  /*,

  showAccountChooser: function(){

  },

  showMap: function() {

  },

  showAdminAccount: function {

  },

  showAdminLocations: function {

  }*/
};
