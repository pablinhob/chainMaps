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

  renderTransactionWaiting: function(){
    var that = this;
    that.$el.find('.working').hide();
    that.$el.find('.error').hide();
    that.$el.find('.waiting').show();
  },

  renderTransactionError: function(err) {
    var that = this;
    that.$el.find('.working').show();
    that.$el.find('.error').show();
    that.$el.find('.waiting').hide();

    that.$el.find('.error').html(err);
  },

  renderEthAccountConf: function() {
    var that = this;
    var ethAccountData = {privateAddress:'', publicAddress:'', accountBalance:''};

    if( ethAccount.privateKey != false ){
      ethAccountData = {
        privateAddress:ethAccount.privateKey
      }
    }

    that.$el.html(that.tplEthAccountConf(ethAccountData) );
    $('#popup').modal();
    $('#popup #privateKeyAddress').on('keypress', function(){
      if($('#privateKeyAddress').val() != '') {
        that.renderEthAccountConfUpdateInfo($('#privateKeyAddress').val());
      }
    });
    $('#popup #privateKeyAddress').bind("paste", function(e){
      var pasteVal = e.originalEvent.clipboardData.getData('text');
      if(pasteVal != '') {
        that.renderEthAccountConfUpdateInfo(pasteVal);
      }
    });
    $('#popup #saveAccountConf').on('click', function() {
      ethAccount.privateKey=$('#privateKeyAddress').val();
      ethAccount.saveLocalStorage();
      that.close();
    });

    if( $('#privateKeyAddress').val() != '' ) {
      that.renderEthAccountConfUpdateInfo($('#privateKeyAddress').val());
    }

  },

  renderEthAccountConfUpdateInfo: function(privateKey) {
    var that = this;

    $('#popup .accountInfo').html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i> Checking account data...');

    try { // statements to try
      ethAccount.getBalance(
        ethAccount.getPublicKeyFromPRivate(privateKey),
        function(b){
          $('#popup .accountInfo').html(
            '<div style="color:green;">Address: ' +
            '<a target="_blank" href="https://etherscan.io/address/' + ethAccount.getPublicKeyFromPRivate(privateKey) + '">'+ethAccount.getPublicKeyFromPRivate(privateKey) +'</a> '+
            '<br>Balance: '+ (b/1000000000000000000)+ ' ETH</div>'
          );
        }
      );
    }
    catch (e) {
      $('#popup .accountInfo').html(
        '<div style="color:red;"> Invalid ETH private key</div>'
      );
    }


    //publicAddress: ethAccount.getPublicKey()
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
