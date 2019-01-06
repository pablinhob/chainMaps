var AppRouter = Backbone.Router.extend({
  routes: {
    "account/:idName": "map",
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
    app.navigate('account/'+app.accountIdName+'/map', true);
  },
  map: function( idName, idPlace ) {
    app.accountIdName = idName;
    alert('map: '+ idName);
    if(idPlace) {
      alert("place "+ idPlace)
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
