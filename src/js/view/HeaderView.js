var HeaderView = Backbone.View.extend({
  tpl: _.template( $("#headerTemplate").html(), {} ),
  events: {

  },
  initialize: function(){

  },
  render: function(){
    var that = this;

    var tplData = {
      accountIdName: false
    }

    if( app.accountIdName != 'false' && app.accountIdName != false ) {
      tplData.accountIdName = app.accountIdName;
    }

    that.$el.html( that.tpl(tplData) );


  },
  goAccount: function() {

  }

});
