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

  saveOnContract: function() {

  },

  fromIntToLatLng: function( val ){
    var that = this;
    //return val;
    return (val/GPS_PRECISSION)-GPS_ADITION;
  },
});
