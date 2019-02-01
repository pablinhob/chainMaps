var PopupView = Backbone.View.extend({
  tplInfo: _.template( $("#popupInfoTemplate").html(), {} ),
  tplTransaction: _.template( $("#popupTransactionTemplate").html(), {} ),
  tplEthAccountConf: _.template( $("#popupEthAccountConfTemplate").html(), {} ),
  tplConfirm: _.template( $("#popupConfirmTemplate").html(), {} ),

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

  renderTransaction: function(onSuccessFunction){
    var that = this;
    that.$el.html(that.tplTransaction() );
    $('#popup').modal();
    that.$el.find('.confirmTransaction').on('click', function(){

      onSuccessFunction({
        gasLimit: parseInt( that.$el.find('#gaslimit').val() ),
        donation: parseInt( that.$el.find('#donate').val() )
      });
    });

  },

  renderEthAccountConf: function() {
    var that = this;
    that.$el.html(that.tplEthAccountConf() );
    $('#popup').modal();
  },
  renderConfirm: function() {
    var that = this;
    that.$el.html(that.tplConfirm() );
    $('#popup').modal();
  },

  close: function(){
    $('#popup').modal('hide');
  }
});
