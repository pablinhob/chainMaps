var contract = {
  web3: false,
  contractInstance: false,
  web3Wss:false,
  contractInstanceWss: false,

  currentEthAccount: false,
  init: function() {
    var that = this;
/*
    // web3 0.20
    that.web3 = new Web3(new Web3.providers.HttpProvider( conf.httpProvider ));
  	that.contract = that.web3.eth.contract( conf.abi );
  	that.contractInstance = that.contract.at( conf.contractAddress );
*/

    // web3 1.0.0
    that.web3 = new Web3(new Web3.providers.HttpProvider( conf.httpProvider ));
    that.contractInstance = new that.web3.eth.Contract(conf.abi);
    that.contractInstance.options.address = conf.contractAddress;

    that.web3Wss = new Web3(new Web3.providers.WebsocketProvider(conf.wssProvider) );
    that.contractInstanceWss = new that.web3.eth.Contract(conf.abi);
    that.contractInstanceWss.options.address = conf.contractAddress;


    /*that.contractInstance.methods.getAccount('merda').call().then(
       function(a,b){
         console.log(a,b);
       }
    );*/


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
      contract.contractInstance.methods.setAccount(
        data.accountIdName,
        data.desc,
        data.clusterize,
        data.lat,
        data.lng,
        data.zoom

      ).encodeABI(),
      gasLimit,
      function(res){  onComplete(res); }
    );

  },


  getAccount: function( data, onComplete  ) {
    var that = this;
    /*that.contractInstance.getAccount.call(
      data.accountIdName,
      function(err, res) {  onComplete( err, res ) }
    );*/
    that.contractInstance.methods.getAccount(
      data.accountIdName
    ).call().then(
      function(res) { onComplete( res ); }
    );

  },

  accountExist: function( data, onComplete  ) {
    var that = this;
    /*that.contractInstance.accountExist.call(
      data.accountIdName,
      function(err, res) { console.log(res);onComplete( err, res ) }
    );*/
    that.contractInstance.methods.accountExist(
      data.accountIdName
    ).call().then(
      function(res) { console.log(res);onComplete( res) }
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
      function( res ){
        onComplete( res );
      }
    );
  },

  getPlace: function( data, onComplete ) {
    var that = this;

    that.contractInstance.methods.getPlace(
      data.accountIdName,
      data.ttIndex
    ).call().then(
      function( r ){
        onComplete( res );
      }
    );
  },

  addressIsOwner: function( data, onComplete ) {
    var that = this;

    that.contractInstance.methods.addressIsOwner(
      that.currentEthAccount,
      data.accountIdName
    ).call().then(function(res){
        onComplete( res );
    });
  },


  listPlaceIndex: function(data, onComplete) {
    var that = this;

    that.contractInstance.listPlaceIndex.call(
      data.accountIdName,
      function( res ){
        onComplete( res );
      }
    );
  },



  rawTransaction: function( data, gasLimit, onComplete) {
    var that = this;

    that.web3.eth.getTransactionCount( that.currentEthAccount , function(error, result) {
      var nonce = result;
      var rawTransaction = {
        "from": that.currentEthAccount,
        "nonce": that.web3.utils.toHex( nonce ),
        "gasPrice": that.web3.utils.toHex( 0.8 ^1000000000),
        "gasLimit": that.web3.utils.toHex(gasLimit),
        "to": conf.contractAddress,
        "value": "0x00",
        "data": data,
        "chainId": conf.currentNetworkId //change the chainID accordingly
      };

      var privKey = new ethereumjs.Buffer.Buffer( that.currentEthAccountPrivateKey , 'hex');
      var tx = new ethereumjs.Tx(rawTransaction);

      tx.sign(privKey);
      var serializedTx = tx.serialize();
      that.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, res) {
          onComplete(res);
      });
    });
  }

};
