var AccountFormView = Backbone.View.extend({
  tpl: _.template( $("#accountFormTemplate").html(), {} ),

  map: false,
  marker: false,

  events: {
    'submit #signupForm': 'submitAccount',
    'keypress #accountLat': 'updateInputLatlng',
    'keypress #accountLng': 'updateInputLatlng'
  },
  initialize: function(){

  },
  render: function(){
    var that = this;

    var formData = {
      newAccount: true,
      accountIdName: '',
      desc: '',
      clusterize: false,
      lat: '',
      lng: '',
      zoom: ''
    };
    //that.$el.html( that.tpl(formData) );

    if( app.accountIdName != 'false' ) {
      contract.accountExist({ accountIdName:app.accountIdName }, function(err,res){
        if(res == true) {
          var acc = new AccountModel({
            accountIdName: app.accountIdName
          });
          acc.loadFromContract();
          acc.on('change', function(){
            that.$el.html( that.tpl( $.extend({}, formData, acc.toJSON()) ) );
            that.setForm();
          });
        }
        else {
          formData.newAccount = true;
          formData.accountIdName = app.accountIdName;
          that.$el.html( that.tpl( formData ) );
          that.setForm();
        }
      });
    }
    else {
      that.$el.html( that.tpl( formData ) );
      that.setForm();
    }
  },



  setForm: function(){
    var that = this;

    that.setFormMap();

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
          maxlength: 256
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
  },

  submitAccount: function() {
    var that = this;

    var acc = new AccountModel({
      accountIdName: $('#accountIdName').val(),
      desc: $('#accountDesc').val(),
      clusterize: $('#clusterize').val(),
      lat: $('#accountLat').val(),
      lng: $('#accountLng').val(),
      zoom: $('#accountZoom').val(),
    });
    acc.saveOnContract(
      2000000,
      function(err, res) {
        //console.log(err, res);
        app.router.navigate('account/'+$('#accountIdName').val()+'/map',true);
      }
    );

  }
});
