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

    that.map = L.map('mapContainer').setView([51.505, -0.09], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(that.map);
  }


});
