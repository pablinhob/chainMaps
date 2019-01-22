var AccountFormView = Backbone.View.extend({
  tpl: _.template( $("#accountFormTemplate").html(), {} ),

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
      newAccount: false,
      accountIdName: '',
      desc: '',
      clusterize: false,
      lat: '',
      lng: '',
      zoom: ''
    };
    //that.$el.html( that.tpl(formData) );

    if( app.accountIdName != 'false' ) {

      contract.accountExist({ accountIdName:app.accountIdName }, function(res){
        if(res == true) {
          var acc = new AccountModel({
            accountIdName: app.accountIdName
          });
          contract.addressIsOwner(
            acc.toJSON(),
            function(isOwner){
              if( isOwner === true) {
                acc.loadFromContract();
                acc.on('change', function(){
                  console.log(acc.toJSON());
                  that.$el.html( that.tpl( $.extend({}, formData, acc.toJSON()) ) );
                  that.setForm();
                });
              }
              else {
                alert('Your address must be owner of the map called "'+app.accountIdName+'" to edit it.');
                app.router.navigate('',true);
              }
            }
          );


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
      formData.newAccount = true;
      that.$el.html( that.tpl( formData ) );
      that.setForm();
    }
  },



  setForm: function(){
    var that = this;

    FormUtils.setFormMap('#accountLat','#accountLng','#accountZoom');

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

  submitAccount: function() {
    var that = this;

    var acc = new AccountModel({
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
