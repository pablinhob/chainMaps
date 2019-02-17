var PlaceModel = Backbone.Model.extend({
  defaults: {
    id:false,
    ttIndex: 0,
    title: false,
    desc: false,
    imageLink: false,
    category: false,
    lat: false,
    lng: false,
    zoom: false
  },

  saveOnContract: function( gasLimit, onSubmit, value ) {
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
      gasLimit,
      value
    );

  },

  loadFromContract: function() {
    var that = this;

    var dataAccount = that.toJSON();
    dataAccount.accountIdName = app.accountIdName;

    contract.getPlace(
      dataAccount,
      function( res ) {
        that.set( {
          //accountIdName: res[0] ,
          id: dataAccount.ttIndex,
          ttIndex: dataAccount.ttIndex,
          title: res.title ,
          desc: res.desc ,
          imageLink: res.imageLink,
          category: res.category,
          lat: that.fromIntToLatLng( res.lat ) ,
          lng: that.fromIntToLatLng( res.lng) ,
          zoom: res.zoom
        });
      }
    );
  },

  deleteOnContract: function( gasLimit, onSubmit, value ) {
    var that = this;

    var placeData = that.toJSON();

    placeData.accountIdName = app.accountIdName;

    contract.deletePlaceRaw(
      placeData,
      function( res ) {
        onSubmit( res);
      },
      gasLimit,
      value
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
});
