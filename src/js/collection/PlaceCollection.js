var PlaceCollection = Backbone.Collection.extend({
  model: PlaceModel,
  checkout: function( eachPlaceFunction ) {
    var that = this;
    contract.listPlaceIndex(
      {
        accountIdName: app.accountIdName
      },
      function(res){
        $.each(res, function(i,ttIndex){

          that.getPlace(ttIndex, eachPlaceFunction);
        });
      });
  },
  getPlace: function(ttIndex, eachPlaceFunction){
    var that = this;

    var place = new PlaceModel({ttIndex: ttIndex});
    place.loadFromContract();
    place.on('change', function(){
      eachPlaceFunction(place);
      that.add(place);
    });
  }
});
