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

    $('.displayAccountConfPopup').on('click', function(){app.views.popup.renderEthAccountConf(function(){} ) });
    $('.displayAboutPopup').on('click', function(){app.views.popup.renderInfo('<span class="glyphicon glyphicon-info-sign"></span> FAQ', $('#FAQContent').html() ) });
  },
  goAccount: function() {

  }

});
