var PopupView = Backbone.View.extend({
  tplInfo: _.template( $("#popupInfoTemplate").html(), {} ),
  tplTransaction: _.template( $("#popupTransactionTemplate").html(), {} ),
  tplEthAccountConf: _.template( $("#popupEthAccountConfTemplate").html(), {} ),
  events: {
  },
  initialize: function(){
    var that = this;
  },
  renderInfo: function(){
    var that = this;
    that.$el.html(that.tplInfo() );
    $('#popup').modal();
  },

  renderTransaction: function(){
    var that = this;
    that.$el.html(that.tplTransaction() );
    $('#popup').modal();
  },
  renderEthAccountConf: function() {
    var that = this;
    that.$el.html(that.tplEthAccountConf() );
    $('#popup').modal();
  }
});
