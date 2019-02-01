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
    canvasEnable = true;
    app.views.accountChooser.render();
  },

  account: function(idName) {
    canvasEnable = true;
    app.accountIdName = idName;
    app.router.navigate('account/'+app.accountIdName+'/map', true);
  },

  map: function( idName, idPlace ) {
    var that = this;
    canvasEnable = true;

    if( app.accountIdName ) {
      that.mapMap( idName, idPlace );
    }
    else {
      setTimeout(function(){
        that.mapMap( idName, idPlace );
      }, 1200);
    }

  },

  mapMap: function( idName, idPlace ) {
    app.accountIdName = idName;
    app.views.header.render();
    app.views.map.render();
    if(idPlace) {
      app.views.map.showPlace(idPlace);
    }
  },

  adminAccount: function( idName ) {
    canvasEnable = true;
    app.accountIdName = idName;
    app.views.header.render();
    app.views.adminAccount.render();
  },
  adminPlaces: function( idName, idPlace ) {
    canvasEnable = true;
    app.accountIdName = idName;
    app.views.header.render();

    if(idPlace) {
      app.views.adminPlaceForm.render(idPlace);
    }
    else {
      app.views.adminPlaceList.render();
    }
  }
});
