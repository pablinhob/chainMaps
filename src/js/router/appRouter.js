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
    //$('body .header').html('');
    if(conf.testNetAdvice) {
      app.views.popup.renderInfo('<span class="glyphicon glyphicon-warning-sign"></span> WARNING!', conf.testNetAdvice );
    }
    app.views.header.render(false);
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
    app.views.header.render(true);
    app.views.map.render();
    if(idPlace) {
      app.views.map.showPlace(idPlace);
    }
  },

  adminAccount: function( idName ) {
    canvasEnable = true;
    app.accountIdName = idName;
    app.views.header.render(true);
    app.views.adminAccount.render();
  },
  adminPlaces: function( idName, idPlace ) {
    canvasEnable = true;
    app.accountIdName = idName;
    app.views.header.render(true);

    if(idPlace) {
      app.views.adminPlaceForm.render(idPlace);
    }
    else {
    app.views.header.render(true);
    }
  }
});
