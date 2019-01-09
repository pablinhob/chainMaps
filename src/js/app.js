

$(document).ready(function() {
  contract.init();
  app.init();
});

var app = {
  accountIdName: false,
  router: false,

  data: {
    account: false,
    locations: false
  },

  views: {
    accountChooser: false,
    map: false,
    adminAccount: false,
    adminLocationForm: false,
    adminLocationsList: false
  },

  init: function() {
    var that = this;

    that.views.accountChooser = new AccountChooserView({ el: $('.content') });
    that.views.map = new MapView({ el: $('.content') });
    that.views.adminAccount = new AccountFormView({ el: $('.content') });
    that.views.adminLocationForm = new LocationFormView({ el: $('.content') });
    that.views.adminLocationsList = new LocationsListView({ el: $('.content') });

    that.router = new AppRouter();
    Backbone.history.start();
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
