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
    alert('default');
  },
  map: function( idName, idPlace ) {
    alert('map: '+ idName);
    if(idPlace) {
      alert("place "+ idPlace)
    }
  },
  mapShowPlace: function( idName ) {
    alert('map: '+ idName);
  },
  adminAccount: function( idName ) {
    alert('adminAccount: '+ idName);
  },
  adminPlaces: function( idName, idPlace ) {
    alert('adminPlaces: '+ idName);
    if(idPlace) {
      alert("place "+ idPlace)
    }
  }
});
