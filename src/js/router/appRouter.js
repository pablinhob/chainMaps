var AppRouter = Backbone.Router.extend({
  routes: {
    "account/:idName": "account",
    "account/:idName/map": "map",
    "account/:idName/map/id/:idPlace": "map",
    "account/:idName/adminAccount": "adminAccount",
    "account/:idName/adminPlaces": "adminPlaces",
    "account/:idName/adminPlaces/id/:idPlace": "adminPlaces",
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

    app.views.map.render();
    if(idPlace) {
      app.views.map.showPlace(idPlace);
    }
  },
  mapShowPlace: function( idName ) {
    app.accountIdName = idName;
    alert('map: '+ idName);
  },
  adminAccount: function( idName ) {
    app.accountIdName = idName;
    alert('adminAccount: '+ idName);
  },
  adminPlaces: function( idName, idPlace ) {
    app.accountIdName = idName;
    alert('adminPlaces: '+ idName);
    if(idPlace) {
      alert("place "+ idPlace)
    }
  }
});
