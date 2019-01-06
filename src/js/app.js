

$(document).ready(function() {
  //contract.init();
  app.init();
});

var app = {
  accountName: false,

  router: false,
  accountChooser: false,
  mapViewInstance: false,
  adminAccountViewInstance: false,
  adminLocationsViewInstance: false,

  init: function() {
    var that = this;

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
