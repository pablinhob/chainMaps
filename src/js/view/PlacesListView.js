var PlacesListView = Backbone.View.extend({
  tpl: _.template( $("#placesListTemplate").html(), {} ),
  tplListElement: _.template( $("#placesListElementTemplate").html(), {} ),
  placeCollection: new PlaceCollection(),
  events: {
    'click .addPlace': 'addPlace',
    'click .edit': 'editPlace',
    'click .delete': 'deletePlace'
  },
  initialize: function(){

  },
  render: function(){
    var that = this;

    contract.addressIsOwner(
      {
        accountIdName: app.accountIdName
      },
      function(isOwner){
        if( isOwner !== true) {
          alert('You don`t have permissions: Your address must be owner of the map "'+app.accountIdName+'"');
          app.views.popup.renderEthAccountConf(function(){
            location.reload();
          });
        }
      }
    );


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
  },

  deletePlace: function(ev) {
    app.views.popup.renderConfirm();
  }

});
