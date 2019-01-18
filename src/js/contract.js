var contract = {
  web3: false,
  contract: false,
  contractInstance: false,
  currentEthAccount: false,
  init: function() {
    var that = this;

    that.web3 = new Web3(new Web3.providers.HttpProvider( conf.httpProvider ));
  	that.contract = that.web3.eth.contract( conf.abi );
  	that.contractInstance = that.contract.at( conf.contractAddress );

    that.currentEthAccount = '0xc655c4812584BF855d53584e553c22C8D714D9ca';
    that.currentEthAccountPrivateKey = '15d7f910f479c3e2f0d2eee48a71ab4f017cc786ca31122f37b3518f44b27bfb';
  },

  /*
    Contract functions call
  */
  setAccount: function(  data, onComplete, gasLimit ) {
    var that = this;

    $.when(ethereum.enable() ).then( function( ee ){

      that.contractInstance.setAccount(
        data.accountIdName,
        data.desc,
        data.clusterize,
        data.lat,
        data.lng,
        data.zoom,
        {
          from: ee[0],
          gas:'195253'
          //value: web3.toWei( web3.toBigNumber(0.1),'ether')
        },
        function(err, res){  onComplete(err,res)}
      );
    });


    //that.contractInstance.setAccount.sendTransaction('lal', 'lolazo Descripción', true, 10,10,4, {from:conf.account, gas:200000})
  },

  /*
    Contract functions call
  */
  setAccountRaw: function(  data, onComplete, gasLimit ) {
    var that = this;

    that.rawTransaction(
      contract.contractInstance.setAccount.getData(
        data.accountIdName,
        data.desc,
        data.clusterize,
        data.lat,
        data.lng,
        data.zoom,
        {
          from: that.currentEthAccount,
          gas: gasLimit
        }
      ),
      gasLimit,
      function(err, res){  onComplete(err,res); }
    );

  },


  getAccount: function( data, onComplete  ) {
    var that = this;
    that.contractInstance.getAccount.call(
      data.accountIdName,
      function(err, res) {  onComplete( err, res ) }
    );
  },

  accountExist: function( data, onComplete  ) {
    var that = this;
    that.contractInstance.accountExist.call(
      data.accountIdName,
      function(err, res) { console.log(res);onComplete( err, res ) }
    );
  },

  setPlace: function( data, onComplete, gasLimit ) {
    var that = this;

    that.contractInstance.setPlace.sendTransaction(
      data.accountIdName,
      data.ttIndex,
      data.title,
      data.desc,
      data.imageLink,
      data.lat,
      data.lng,
      data.zoom,
      {
        from: that.contract.eth.accounts[0],
        gas:gasLimit
      },
      function( err, res ){
        onComplete( err, res );
      }
    );
  },

  getPlace: function( data, onComplete ) {
    var that = this;

    that.contractInstance.getPlace.call(
      data.accountIdName,
      data. ttIndex,
      function( r ){
        onComplete( err, res );
      }
    );
  },

  listPlaceIndex: function(data, onComplete) {
    var that = this;

    that.contractInstance.listPlaceIndex.call(
      data.accountIdName,
      function( err, res ){
        onComplete( err, res );
      }
    );
  },



  rawTransaction: function( data, gasLimit, onComplete) {
    var that = this;
    web3.eth.getTransactionCount( that.currentEthAccount , function(error, result) {
      var nonce = result;

      var rawTransaction = {
        "from": that.currentEthAccount,
        "nonce": web3.toHex( nonce ),
        "gasPrice": web3.toHex( 0.8 ^1000000000),
        "gasLimit": web3.toHex(gasLimit),
        "to": conf.contractAddress,
        "value": "0x00",
        "data": data,
        "chainId": conf.currentNetworkId //change the chainID accordingly
      };

      var privKey = new ethereumjs.Buffer.Buffer( that.currentEthAccountPrivateKey , 'hex');
      var tx = new ethereumjs.Tx(rawTransaction);

      tx.sign(privKey);
      var serializedTx = tx.serialize();
      web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, res) {
        onComplete(err, res);
      });
    });
  }

};
