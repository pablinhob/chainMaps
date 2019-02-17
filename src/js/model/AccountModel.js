
var AccountModel = Backbone.Model.extend({
  defaults: {
    accountIdName: false,
    desc: false,
    extraData: false,
    clusterize: false,
    lat: false,
    lng: false,
    zoom: false,
    placesNumber: false
  },

  saveOnContract: function( gasLimit, onSubmit, value ) {
    var that = this;

    var accountData = that.toJSON();
    //accountData.lat = that.fromLatLngToInt( Number(accountData.lat).toFixed(GPS_DIGITS_AFTER_COMMA) );
    //accountData.lng = that.fromLatLngToInt( Number(accountData.lng).toFixed(GPS_DIGITS_AFTER_COMMA));

    accountData.lat = that.fromLatLngToInt( accountData.lat );
    accountData.lng = that.fromLatLngToInt( accountData.lng );

    contract.setAccountRaw(
      accountData,
      function( res ) {
        onSubmit( res);
      },
      gasLimit,
      value
    );

  },

  loadFromContract: function() {
    var that = this;


    contract.getAccount(
      that.toJSON(),
      function( res ) {
        that.set( {
          //accountIdName: res[0] ,
          desc: res[1] ,
          extraData: res[2],
          clusterize: res[3] ,
          lat: that.fromIntToLatLng( res[4] ) ,
          lng: that.fromIntToLatLng( res[5])  ,
          zoom: res[6] ,
          placesNumber: res[7]
        });
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

  /*decodeContractInt: function(val) {

    var that = this;
    var ret = 0;
    if( typeof val.c[0] != 'undefined') {
      ret = val.c[0];
    }

    return ret;
  }*/
});
