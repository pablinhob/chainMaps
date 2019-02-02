var ethAccount = {
  privateKey: '15d7f910f479c3e2f0d2eee48a71ab4f017cc786ca31122f37b3518f44b27bfb',
  getPublicKey: function() {
    var that = this;
    var b = ethereumjs.Util.toBuffer('0x'+that.privateKey);
    var wallet = ethereumjs.Wallet.fromPrivateKey( b );
    return ethereumjs.Util.bufferToHex( wallet.getAddress() );
  }
}
