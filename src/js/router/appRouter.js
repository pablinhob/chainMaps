var AppRouter = Backbone.Router.extend({
  routes: {
    "account/:idName": "account",
    "account/:idName/map": "map",
    "account/:idName/map/id/:idPlace": "map",
    "account/:idName/adminAccount": "adminAccount",
    "account/:idName/adminLocations": "adminLocations",
    "account/:idName/adminLocations/id/:idPlace": "adminLocations",
    "*path": "default"
  },
  default: function() {
    app.views.accountChooser.render();
  },

  account: function(idName) {
    app.accountIdName = idName;
    app.router.navigate('account/'+app.accountIdName+'/map', true);
  },
  map: function( idName, idPlace ) {
    app.accountIdName = idName;

    app.views.header.render();
    app.views.map.render();
    if(idPlace) {
      app.views.map.showPlace(idPlace);
    }
  },
  adminAccount: function( idName ) {
    app.accountIdName = idName;
    app.views.header.render();
    app.views.adminAccount.render();
  },
  adminLocations: function( idName, idPlace ) {
    app.accountIdName = idName;
    app.views.header.render();
    if(idPlace) {
      app.views.adminLocationForm.render();
    }
    else {
      app.views.adminLocationsList.render();
    }
  }
});
