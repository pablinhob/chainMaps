var ethAccount = {
  //privateKey: '15d7f910f479c3e2f0d2eee48a71ab4f017cc786ca31122f37b3518f44b27bfb',
  privateKey: false,
  getPublicKey: function() {
    var that = this;
    return that.getPublicKeyFromPRivate(that.privateKey);
  },

  getPublicKeyFromPRivate: function(privateKey) {
    var that = this;
    var b = ethereumjs.Util.toBuffer('0x'+privateKey);
    var wallet = ethereumjs.Wallet.fromPrivateKey( b );
    return ethereumjs.Util.bufferToHex( wallet.getAddress() );
  },

  getBalance: function( address, onResultFunction ) { // balance in wei
    contract.web3.eth.getBalance( address )
      .then(function(d){
        onResultFunction(d);
      });
  },

  saveLocalStorage: function(){
    var that = this;

    if( typeof localStorage != 'undefined' ) {
      localStorage.setItem('privateKey', that.privateKey );
    }
  },

  loadLocalStorage: function() {
    var that = this;

    if( typeof localStorage != 'undefined' ) {
      that.privateKey = localStorage.getItem('privateKey') || false;
    }

  }
}
