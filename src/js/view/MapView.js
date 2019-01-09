var MapView = Backbone.View.extend({
  tpl: _.template( $("#mapTemplate").html(), {} ),
  map: false,
  events: {

  },
  initialize: function(){

  },
  render: function(){
    var that = this;

    contract.accountExist({accountIdName:app.accountIdName}, function(err,res){
      if(res == true) {

        app.data.account = new AccountModel({
          accountIdName: app.accountIdName
        });


        that.setMap();
      }
      else {
        app.router.navigate('',true);
      }
    });

  },

  showPlace: function(idPlace) {
    alert("Show in map "+ idPlace)
  },

  setMap: function() {
    var that = this;

    that.$el.html( that.tpl() );

    that.map = L.map('mapContainer').setView([0, 0], 4);
    L.tileLayer(
      'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(that.map);

    app.data.account.loadFromContract();
    app.data.account.on('change', function(){
      that.map.flyTo([app.data.account.get('lat'), app.data.account.get('lng')], app.data.account.get('zoom'));
    })

  }


});
