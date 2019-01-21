var AccountChooserView = Backbone.View.extend({
  tpl: _.template( $("#accountChooserTemplate").html(), {} ),
  events: {
    //"click input[type=button]": "goAccount"
    'submit .accountForm': 'goAccount'
  },
  initialize: function(){

  },
  render: function(){
    var that = this;
    that.$el.html( that.tpl() );


    app.data.account = false;
    app.data.locations = false;
  },
  goAccount: function() {
    var that = this;

    var accIdName = $('.accountForm .accountInput').val();

    contract.accountExist({accountIdName:accIdName}, function(res){
      if(res == true) {
        app.router.navigate('account/'+accIdName+'/map',true);
      }
      else {
        app.router.navigate('account/false/adminAccount',true);
      }
    });
  }

});
