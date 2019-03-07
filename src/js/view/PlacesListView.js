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
    that.placeCollection.pull(
      function(place) {
        that.renderPlace(place);
      },
      function(indice) {
        $(that.$el).find('.loading').html('Add places to your map');
      }
    );

  },

  renderPlacesOffline: function() {
    var that = this;
      $(that.$el).find('.listContainer').html('')
    that.placeCollection.each( function(e) {

      that.renderPlace(e);
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
      'account/'+app.accountIdName+'/adminPlaces/id/'+$(ev.target).parent().parent().attr('dataid'),
      true
    );
  },

  deletePlace: function(ev) {
    var that = this;
    var deleteId = $(ev.target).parent().parent().attr('dataid');

    var place = that.placeCollection.get(deleteId);



    app.views.popup.renderTransaction( function(d){
      app.views.popup.renderTransactionWaiting();
      place.deleteOnContract(
        d.gasLimit,
        function( txH ) {
          if(typeof txH != 'undefined') {
            console.log('Esperando confirmación...',txH);
            var evInt = setInterval(function(){
              contract.web3Wss.eth.getTransactionReceipt(txH).then(
                function(txObj){
                  if( txObj != null) {
                    //console.log(txObj)
                    clearInterval(evInt);
                    //app.router.navigate('account/'+app.accountIdName+'/adminPlaces',true);
                    that.placeCollection.remove(place);
                    that.renderPlacesOffline();
                    app.views.popup.close();
                  }
                }).catch( function(err) {
                  app.views.popup.renderTransactionError('Unknown error');
                });
            }, 1000);
          }
          else {
            app.views.popup.renderTransactionError('Transaction failed. Try again changing "gas limit" value');
          }
        },
        d.donationValue
      );
    });

  }

});
