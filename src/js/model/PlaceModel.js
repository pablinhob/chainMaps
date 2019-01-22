var PlaceModel = Backbone.Model.extend({
  defaults: {
    ttIndex: false,
    title: false,
    desc: false,
    imageLink: false,
    lat: false,
    lng: false,
    zoom: false
  },

  saveOnContract: function( gasLimit, onSubmit ) {
    var that = this;

    var placeData = that.toJSON();

    placeData.accountIdName = app.accountIdName;
    placeData.lat = that.fromLatLngToInt( placeData.lat );
    placeData.lng = that.fromLatLngToInt( placeData.lng );

    contract.setPlaceRaw(
      placeData,
      function( res ) {
        onSubmit( res);
      },
      gasLimit
    );

  },

  loadFromContract: function() {
    var that = this;

    var dataAccount = that.toJSON();
    dataAccount.accountIdName = app.accountIdName;

    contract.getAccount(
      dataAccount,
      function( res ) {
        that.set( {
          //accountIdName: res[0] ,
          title: res[1] ,
          desc: res[2] ,
          imageLink: res[3] ,
          lat: that.fromIntToLatLng( res[4] ) ,
          lng: that.fromIntToLatLng( res[5]) ,
          zoom: res[6]
        });
      }
    );
  },

  fromIntToLatLng: function( val ){
    var that = this;
    //return val;
    return (val/GPS_PRECISSION)-GPS_ADITION;
  },
});
