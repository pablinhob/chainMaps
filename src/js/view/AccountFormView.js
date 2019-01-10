var AccountFormView = Backbone.View.extend({
  tpl: _.template( $("#accountFormTemplate").html(), {} ),

  map: false,
  marker: false,

  events: {
    'keypress #accountLat': 'updateInputLatlng',
    'keypress #accountLng': 'updateInputLatlng'
  },
  initialize: function(){

  },
  render: function(){
    var that = this;
    that.$el.html( that.tpl() );
    that.setFormMap();
    // Fetch all the forms we want to apply custom Bootstrap validation styles to

    $('#accountIdName').keypress(function( e ) {
      if(e.which === 32){
        return false;
      }
    });

    $( "#signupForm" ).validate( {
  		rules: {
  			accountIdName: {
  				required: true,
  				minlength: 0,
          maxlength: 20
  			},
  			accountDesc: {
  				required: false,
  				minlength: 0,
          maxlength: 4
  			},
        accountLat: {
          required: true,
          number: true
  			},
        accountLng: {
          required: true,
          number: true
  			},
        accountZoom: {
          required: true,
          number: true
  			},
  			agree: "required"
  		},
  		messages: {
  			agree: "Check that you understand the nature of application."
  		},
  		errorElement: "em",
  		errorPlacement: function ( error, element ) {
  			// Add the `help-block` class to the error element
  			error.addClass( "help-block" );

  			if ( element.prop( "type" ) === "checkbox" ) {
  				error.insertAfter( element.parent( "label" ) );
  			} else {
  				error.insertAfter( element );
  			}
  		},
  		highlight: function ( element, errorClass, validClass ) {
  			$( element ).parent( ).addClass( "has-error" ).removeClass( "has-success" );
  		},
  		unhighlight: function (element, errorClass, validClass) {
  			$( element ).parent( ).addClass( "has-success" ).removeClass( "has-error" );
  		}
  	});

  },

  setFormMap: function() {
    var that = this;
    var latLngExist = false;


    var initData = {};

    if( $('#accountLat').val() == '') {
      initData.center = [40, 0];
    }
    else {
      latLngExist = true;
    }

    if( $('#accountZoom').val() == '' ){
      initData.zoom = 2;
    }

    initData.layers = [
      new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
      })
    ];

    that.map = new L.Map('accountMap', initData);
    that.map.on('zoomend', function() {
      $('#accountZoom').val( that.map.getZoom() );
    });
    that.map.on('dragend', function(e) {
       that.updateInputLatlng();
    });

    if( latLngExist == true ) {
      that.addMarker();
      that.updateInputLatlng();
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
    that.marker.on('dragend', function (e) {
      that.updateLatLng(that.marker.getLatLng().lat, that.marker.getLatLng().lng);
    });
  },

  updateLatLng: function(lat,lng,reverse) {
    var that = this;
    if( that.marker == false ) {
      that.addMarker();
    }

    if(reverse) {
      that.marker.setLatLng([lat,lng]);
      that.map.panTo([lat,lng]);
      if( $('#accountZoom').val() !='' ){ that.map.setZoom( $('#accountZoom').val() );  }
    } else {
      $('#accountLat').val( that.marker.getLatLng().lat );
      $('#accountLng').val( that.marker.getLatLng().lng );
      $('#accountZoom').val( that.map.getZoom() );
      that.map.panTo([lat,lng]);
    }
  },

  updateInputLatlng: function() {
    var that = this;
    that.updateLatLng($('#accountLat').val(),$('#accountLng').val(),true);
  }
});
