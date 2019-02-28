var MapView = Backbone.View.extend({
  tpl: _.template( $("#mapTemplate").html(), {} ),
  map: false,
  markerCluster: false,
  placeCollection: new PlaceCollection(),
  events: {
    'click .functionButtons .link': 'linkPopup',
    'click .functionButtons .embed': 'embedPopup'
  },
  initialize: function(){

  },

  setMapFullScreen: function() {
    var that = this;

    $('#mapContainer').css('width','100%');
    if(window.frameElement) {
      $('#mapContainer').css('height', ( $(window).height())+'px');
    }
    else {
      $('#mapContainer').css('height', ( $(window).height()-$('.header').height() )+'px');
    }


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

    //L.marker([-20,-20], {icon: L.icon.glyph({ prefix: 'mif', glyph: 'earth' }) }).addTo(that.map);

    that.placeCollection.pull(function(place){

      var contentMarker = '<div style="width:255px;height:350px;overflow-y:auto;overflow-x:hidden;"><h2>'+place.get('title')+'</h2>'+
        '<p>'+place.get('desc')+'</p>' +
        '<img src="'+place.get('imageLink')+'" width="250"/></div>';

      var markerIcon= false;
      if( place.get('category') != 0 ) {
        markerIcon = {icon: L.icon.glyph({ prefix: 'glyphicon', glyph: Category[place.get('category')] }) };
      }


      var marker = L.marker(
        [place.get('lat'), place.get('lng')],
        markerIcon
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

  },

  linkPopup: function() {
    var that = this;

    app.views.popup.renderInfo('<span class="glyphicon glyphicon-share"></span> Share your map', '<input type="text" value="'+window.location.href+'" style="width:100%;" readonly />' );
  },

  embedPopup: function() {
    var that = this;
    app.views.popup.renderInfo(
      '<span>&lt;/&gt;</span> Embed this map in your page or blog',
      '<textarea style="width:100%;height:100px;">'+
        '<iframe name="'+app.accountIdName+'" scrolling="no" frameborder="no" src="'+window.location.protocol +'//'+window.location.host+'/indexEmbed.html" style="width: 400px; height: 400px;">'+
        '</iframe>'+
      '</textarea>'
    );
  }


});
