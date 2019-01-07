const GPS_PRECISSION = 1000000000;

var AccountModel = Backbone.Model.extend({
  defaults: {
    accountIdName: false,
    desc: false,
    clusterize: false,
    lat: false,
    lng: false,
    zoom: false,
    placesNumber: false
  },

  saveOnContract: function() {
    var that = this;

    var accountData = that.toJSON();
    accountData.lat = that.fromLatLngToInt(ccountData.lat);
    accountData.lng = that.fromLatLngToInt(ccountData.lng);

    contract.setAccount(
      accountData,
      function( err, res ) {
      },
      200000
    );
  },

  loadFromContract: function() {
    var that = this;
    contract.getAccount(
      that.toJSON(),
      function( err, res ) {
        that.set( 'accountIdName',res[0] );
        that.set( 'desc',res[0] );
        that.set( 'clusterize',res[0] );
        that.set( 'lat', that.fromIntToLatLng(res[0]) );
        that.set( 'lng', that.fromIntToLatLng(res[0]) );
        that.set( 'zoom',res[0] );
      }
    );
  },

  fromLatLngToInt: function( val ){
    var that = this;
    return parseInt(val*GPS_PRECISSION);
  },

  fromIntToLatLng: function( val ){
    var that = this;
    return parseFloat(val/GPS_PRECISSION);
  }

});
