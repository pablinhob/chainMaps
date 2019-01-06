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
  },
  goAccount: function() {
    var that = this;

    var accIdName = $('.accountForm .accountInput').val();


    contract.accountExist({accountIdName:accIdName}, function(err,res){
      if(res == true) {
        app.router.navigate('account/'+accIdName+'/map',true);
      }
      else {
        alert(accIdName + ' Non existe')
      }
    });
  }

});
