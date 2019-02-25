var AccountChooserView = Backbone.View.extend({
  tpl: _.template( $("#accountChooserTemplate").html(), {} ),
  events: {
    //"click input[type=button]": "goAccount"
    'submit .accountForm': 'goAccount',
    'click .createNewOne': 'createNewOne'
  },
  initialize: function(){

  },
  render: function(){
    var that = this;
    that.$el.html( that.tpl() );

    app.data.account = false;
    app.data.locations = false;

    $('.accountForm .accountInput').keypress(function( e ) {
      if(e.which === 32){
        return false;
      }
    });
  },
  goAccount: function() {
    var that = this;

    var accIdName = $('.accountForm .accountInput').val();

    contract.accountExist({accountIdName:accIdName}, function(res){
      if(res == true) {
        app.router.navigate('account/'+accIdName+'/map',true);
      }
      else {
        var r = confirm("The Map does not exist, do you want to create it?");
        if (r == true) {

            app.views.popup.renderEthAccountConf(function(){
              app.router.navigate('account/'+accIdName+'/adminAccount',true);
            });



        }
      }
    });
  },

  createNewOne: function() {
    var that = this;

    app.views.popup.renderEthAccountConf(function(){
      app.router.navigate('account/false/adminAccount',true);
    });

  }

});
