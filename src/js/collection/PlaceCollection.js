var PlaceCollection = Backbone.Collection.extend({
  model: PlaceModel,
  pull: function( eachPlaceFunction, indexFunction ) {
    var that = this;
    contract.listPlaceIndex(
      {
        accountIdName: app.accountIdName
      },
      function(res){
        if(indexFunction) {
          indexFunction(res);
        }

        $.each(res, function(i,ttIndex){
          if( ttIndex != 0 ){
            that.getPlace(ttIndex, eachPlaceFunction);
          }
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
