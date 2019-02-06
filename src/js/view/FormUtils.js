
var FormUtils = {

  map: false,
  marker: false,

  inputLat: false,
  inputLng: false,
  inputZoom: false,

  setFormMap: function(inputLat, inputLng, inputZoom) {
    var that = this;

    that.inputLat = inputLat;
    that.inputLng = inputLng;
    that.inputZoom = inputZoom;

    var latLngExist = false;

    var initData = {};

    if( $(that.inputLat).val() == '') {
      initData.center = [0, 0];
    }
    else {
      latLngExist = true;
    }

    if( $(that.inputZoom).val() == '' ){
      initData.zoom = 2;
    }

    initData.layers = [
      new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
      })
    ];

    that.map = new L.Map('divMap', initData);
    that.map.on('zoomend', function() {
      if( !isNaN(that.map.getZoom()) ) {
        $(that.inputZoom).val( that.map.getZoom() );
      }

    });
    that.map.on('dragend', function(e) {
       //that.updateLatlng();
    });

    if( latLngExist == true ) {
      that.addMarker();
      //that.updateInputLatlng();
    }

    that.map.on('click', function (e) {
    	if( that.marker == false ) {
    		that.addMarker();
    	}
    	that.marker.setLatLng(e.latlng);
    	that.updateLatLng( that.marker.getLatLng().lat,  that.marker.getLatLng().lng);
    });

  },

  addMarker: function(){
    var that = this;

    that.marker = L.marker([0,0],{
      draggable: true
    }).addTo(that.map);
    /*that.marker.on('dragend', function (e) {
      that.updateLatLng(that.marker.getLatLng().lat, that.marker.getLatLng().lng);
    });*/
  },

  updateLatLng: function(lat,lng,reverse) {
    var that = this;
    if( that.marker == false ) {
      that.addMarker();
    }

    if(reverse) {
      that.marker.setLatLng([lat,lng]);
      that.map.panTo([lat,lng]);
      if( $(that.inputZoom).val() !='' ){ that.map.setZoom( $(that.inputZoom).val() );  }
    } else {
      $(that.inputLat).val( that.marker.getLatLng().lat );
      $(that.inputLng).val( that.marker.getLatLng().lng );
      $(that.inputZoom).val( that.map.getZoom() );

    }
  },

  updateInputLatlng: function() {
    var that = this;
    that.updateLatLng($(that.inputLat).val(),$(that.inputLng).val(),true);
  }
}
