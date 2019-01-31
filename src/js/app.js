

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
    header: false,
    accountChooser: false,
    map: false,
    adminAccount: false,
    adminPlaceForm: false,
    adminPlaceList: false
  },

  init: function() {
    var that = this;

    that.views.header = new HeaderView({ el: $('.header') });
    that.views.accountChooser = new AccountChooserView({ el: $('.content') });
    that.views.map = new MapView({ el: $('.content') });
    that.views.adminAccount = new AccountFormView({ el: $('.content') });
    that.views.adminPlaceForm = new PlaceFormView({ el: $('.content') });
    that.views.adminPlaceList = new PlacesListView({ el: $('.content') });
    that.views.popup = new PopupView({ el: $('#popup .modal-content') });

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
