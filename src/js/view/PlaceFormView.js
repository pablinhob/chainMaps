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
      ttIndex: 0,
      title: '',
      desc: '',
      imageLink: '',
      lat: '',
      lng: '',
      zoom: ''
    };

    app.data.account = new AccountModel({
      accountIdName: app.accountIdName
    });

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




    app.data.account.loadFromContract();
    app.data.account.on('change', function(){


      if( idPlace != 'false' ) {

        var acc = new PlaceModel({ttIndex: idPlace});


        acc.loadFromContract();

        acc.on('change', function(){
          console.log(acc.toJSON())

          that.$el.html( that.tpl( $.extend({}, formData, acc.toJSON())  ) );
          FormUtils.setFormMap('#placeLat','#placeLng','#placeZoom');
          FormUtils.updateInputLatlng();
          that.setForm();
        });

      } else {
        that.$el.html( that.tpl(formData) );


        /*FormUtils.map.panTo(
          new L.LatLng(
            app.data.account.get('lat'),
            app.data.account.get('lng')
          ));*/
        $('#placeLat').val(app.data.account.get('lat'));
        $('#placeLng').val(app.data.account.get('lng'));
        $('#placeZoom').val( app.data.account.get('zoom'));
        FormUtils.setFormMap('#placeLat','#placeLng','#placeZoom');

        FormUtils.updateInputLatlng();
        that.setForm();
      }

    });

  },


  setForm: function(){
    var that = this;


    $( "#placeForm" ).validate( {
  		rules: {
        ttIndex: {
          required: true,
          number: true
        },
        placeTitle: {
          required: true,
          rangelength:[5,100]
        },
        placeDesc: {
          required: true,
          rangelength:[5,200]
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
  		/*messages: {
  			agree: "Check that you understand the nature of application."
  		},*/
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
      category: 1,
      lat: parseFloat( $('#placeLat').val() ),
      lng: parseFloat( $('#placeLng').val() ),
      zoom: parseInt($('#placeZoom').val() )
    });


    app.views.popup.renderTransaction( function(d){
      app.views.popup.renderTransactionWaiting();
      acc.saveOnContract(
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
                    app.router.navigate('account/'+app.accountIdName+'/adminPlaces',true);
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
