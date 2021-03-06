var HeaderView = Backbone.View.extend({
  tpl: _.template( $("#headerTemplate").html(), {} ),
  events: {

  },
  initialize: function(){

  },
  render: function( fullOptionsRender ){
    var that = this;

    var tplData = {
      accountIdName: false,
      fullOptionsRender: fullOptionsRender
    }

    if( app.accountIdName != 'false' && app.accountIdName != false ) {
      tplData.accountIdName = app.accountIdName;
    }

    that.$el.html( that.tpl(tplData) );

    $('.displayAccountConfPopup').on('click', function(){app.views.popup.renderEthAccountConf(function(){} ) });

    var tplFAQ = _.template( $("#FAQContent").html() );
    $('.displayAboutPopup').on('click', function(){app.views.popup.renderInfo('<span class="glyphicon glyphicon-info-sign"></span> About', tplFAQ() ) });
  },
  goAccount: function() {

  }

});
