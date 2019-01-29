var PlaceFormView = Backbone.View.extend({
  tpl: _.template( $("#placeFormTemplate").html(), {} ),
  events: {
    'submit #placeForm': 'submitPlace'
    /*'keypress #accountLat': 'updateInputLatlng',
    'keypress #accountLng': 'updateInputLatlng'*/
  },
  initialize: function(){

  },
  render: function( idPlace ){
    var that = this;

    var formData = {
      newPlace: true,
      ttIndex: 0,
      title: '',
      desc: '',
      imageLink: '',
      lat: '',
      lng: '',
      zoom: ''
    };

    //that.$el.html( that.tpl(formData) );
    //FormUtils.setFormMap('#placeLat','#placeLng','#placeZoom');

    if( idPlace == 'false' ) {
      that.$el.html( that.tpl(formData) );
      that.setForm();
    }

  },


  setForm: function(){
    var that = this;

    FormUtils.setFormMap('#placeLat','#placeLng','#placeZoom');


    $( "#placeForm" ).validate( {
  		rules: {
        ttIndex: {
          required: false,
          number: true
        },
        placeTitle: {
          required: false,
          rangelength:[0,100]
        },
        placeDesc: {
          required: false,
          rangelength:[0,200]
        },
        placeLat: {
          required: true,
          number: true
        },
        placeLng: {
          required: true,
          number: true
        },
        placeZoom: {
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

  submitPlace: function() {

    var that = this;

    var acc = new PlaceModel({
      ttIndex: $('#ttIndex').val(),
      title: $('#placeTitle').val(),
      desc: $('#placeDesc').val(),
      imageLink: '',
      lat: parseFloat( $('#placeLat').val() ),
      lng: parseFloat( $('#placeLng').val() ),
      zoom: parseInt($('#placeZoom').val() )
    });



    acc.saveOnContract(
      200000,
      function( txH ) {

        if(typeof txH != 'undefined') {
          console.log('Esperando confirmación...',txH);
          var evInt = setInterval(function(){
            contract.web3Wss.eth.getTransactionReceipt(txH).then(
              function(txObj){
                if( txObj != null) {
                  //console.log(txObj)
                  clearInterval(evInt);
                  app.router.navigate('account/'+$('#accountIdName').val()+'/map',true);
                }
              }).catch( function(err) {
                window.location = window.location;
              });
          }, 1000);
        }
        else {
          alert('Transaction failed. Try changing gas limit value');
        }


      }
    );

  },

  submitAccount: function() {
    var that = this;

    var acc = new PlaceModel({
      accountIdName: $('#accountIdName').val(),
      desc: $('#accountDesc').val(),
      clusterize: false,
      lat: parseFloat( $('#accountLat').val() ),
      lng: parseFloat( $('#accountLng').val() ),
      //lat:40.737,
      //lng:-73.923,
      zoom: parseInt($('#accountZoom').val() )
    });



    acc.saveOnContract(
      200000,
      function( txH ) {

        if(typeof txH != 'undefined') {
          console.log('Esperando confirmación...',txH);
          var evInt = setInterval(function(){
            contract.web3Wss.eth.getTransactionReceipt(txH).then(
              function(txObj){
                if( txObj != null) {
                  //console.log(txObj)
                  clearInterval(evInt);
                  app.router.navigate('account/'+$('#accountIdName').val()+'/map',true);
                }
              }).catch( function(err) {
                window.location = window.location;
              });
          }, 1000);
        }
        else {
          alert('Transaction failed. Try changing gas limit value');
        }


      }
    );

  }

});
