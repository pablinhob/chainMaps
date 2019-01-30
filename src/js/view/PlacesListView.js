var PlacesListView = Backbone.View.extend({
  tpl: _.template( $("#placesListTemplate").html(), {} ),
  tplListElement: _.template( $("#placesListElementTemplate").html(), {} ),
  placeCollection: new PlaceCollection(),
  events: {
    'click .addPlace': 'addPlace',
    'click .edit': 'editPlace'
  },
  initialize: function(){

  },
  render: function(){
    var that = this;

    that.$el.html( that.tpl() );
    $(that.$el).find('.loading').show();
    $(that.$el).find('.listContainer').html('')
    that.placeCollection.checkout(function(place){
      that.renderPlace(place);
    });

  },

  renderPlace: function(place) {
    var that = this;
    $(that.$el).find('.loading').hide();
    $(that.$el).find('.listContainer').append(

      that.tplListElement( place.toJSON() )
    );
  },

  addPlace: function(ev) {
    var that = this;
    app.router.navigate('account/'+app.accountIdName+'/adminPlaces/id/false',true);
  },

  editPlace: function(ev) {
    var that = this;

    app.router.navigate(
      'account/'+app.accountIdName+'/adminPlaces/id/'+$(ev.target).parent().attr('dataId'),
      true
    );

  }

});
