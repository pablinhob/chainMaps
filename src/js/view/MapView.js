var MapView = Backbone.View.extend({
  tpl: _.template( $("#mapTemplate").html(), {} ),
  map: false,
  markerCluster: false,
  placeCollection: new PlaceCollection(),
  events: {

  },
  initialize: function(){

  },

  setMapFullScreen: function() {
    var that = this;
    $('#mapContainer').css('width','100%');
    $('#mapContainer').css('height', ( $(window).height()-$('.header').height() )+'px');
  },

  render: function(){
    var that = this;

    contract.accountExist({accountIdName:app.accountIdName}, function(res){
      if(res == true) {

        app.data.account = new AccountModel({
          accountIdName: app.accountIdName
        });

        that.setMap();

        $(window).resize(function(){
          that.setMapFullScreen();
        });
      }
      else {
        app.router.navigate('',true);
      }
    });




  },

  showPlace: function(idPlace) {
    var that = this;

    alert("Show in map "+ idPlace);
  },

  renderPlaces: function() {
    var that = this;

    that.placeCollection.checkout(function(place){

      var contentMarker = '<h2>'+place.get('title')+'</h2><p>'+place.get('desc')+'</p>';
      var marker = L.marker(
        [place.get('lat'), place.get('lng')]
      );
      if( app.data.account.get('clusterize') == true ){
        that.markerCluster.addLayer(marker);
        that.map.addLayer(that.markerCluster);
      }
      else {
        marker.addTo(that.map);
      }
      marker.bindPopup(contentMarker);
      canvasEnable = false;
    });
  },

  renderPlace: function( place ) {
    var that = this;

  },

  setMap: function() {
    var that = this;

    app.data.account.loadFromContract();
    app.data.account.on('change', function(){


      that.$el.html( that.tpl() );
      that.setMapFullScreen();
      that.map = L.map('mapContainer').setView(
        [app.data.account.get('lat'), app.data.account.get('lng')],
        app.data.account.get('zoom')
      );
      L.tileLayer(
        'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        //maxZoom: 18,
        //scrollWheelZoom: true,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(that.map);


      if( app.data.account.get('clusterize') == true ) {
        that.markerCluster = L.markerClusterGroup();
      }


      that.renderPlaces();
    });

  }


});
