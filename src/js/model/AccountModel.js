const GPS_PRECISSION = 1000000;
const GPS_ADITION = 100;

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

  saveOnContract: function( gasLimit ) {
    var that = this;

    var accountData = that.toJSON();
    accountData.lat = that.fromLatLngToInt(accountData.lat);
    accountData.lng = that.fromLatLngToInt(accountData.lng);

    contract.setAccount(
      accountData,
      function( err, res ) {
      },
      gasLimit
    );

  },

  loadFromContract: function() {
    var that = this;
    //console.log(that.toJSON());
    contract.getAccount(
      that.toJSON(),
      function( err, res ) {

        that.set( 'accountIdName',res[0] );
        that.set( 'desc',res[1] );
        that.set( 'clusterize',res[2] );
        that.set( 'lat', that.fromIntToLatLng( that.decodeContractInt(res[3])) );
        that.set( 'lng', that.fromIntToLatLng(  that.decodeContractInt(res[4]))  );
        that.set( 'zoom', that.decodeContractInt(res[5]) );
        that.set( 'placesNumber', that.decodeContractInt(res[6]) );
        console.log(res)
        console.log(that.toJSON());
      }
    );
  },

  fromLatLngToInt: function( val ){
    var that = this;
    //return val;
    return parseInt( (val+GPS_ADITION)*GPS_PRECISSION );
  },

  fromIntToLatLng: function( val ){
    var that = this;
    //return val;
    return (val/GPS_PRECISSION)-GPS_ADITION;
  },

  decodeContractInt: function(val) {
    var that = this;
    var ret = 0;
    if( typeof val.c[0] != 'undefined') {
      ret = val.c[0];
    }

    return ret;
  }
});
