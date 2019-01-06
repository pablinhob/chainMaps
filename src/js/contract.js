var contract = {
  web3: false,
  contract: false,
  contractInstance: false,
  currentAccount: false,
  init: function() {
    var that = this;

    that.web3 = new Web3(new Web3.providers.HttpProvider( conf.httpProvider ));
  	that.contract = that.web3.eth.contract( conf.abi );
  	that.contractInstance = that.contract.at( conf.contractAddress );
    that.currentAccount = that.contract.eth.accounts[0];


    //console.log(that.contractInstance.setAccount.sendTransaction('lol', 'lolazo Descripción', true, 10,10,4, {from:that.contract.eth.accounts[0], gas:200000}));
    //console.log(that.contractInstance.accountExist.call('lal').toString());

  },

  /*
    Contract functions call
  */
  setAccount: function(  data, onComplete, gasLimit ) {
    var that = this;


    that.contractInstance.setAccount.sendTransaction(
      data.accountIdName,
      data.desc,
      data.clusterize,
      data.lat,
      data.lng,
      data.zoom,
      {
        from: that.currentAccount,
        gas: gasLimit
      },
      function(err, res){ onComplete(err,res)}
    );

    //that.contractInstance.setAccount.sendTransaction('lal', 'lolazo Descripción', true, 10,10,4, {from:conf.account, gas:200000})
  },

  getAccount: function( data, onComplete  ) {
    var that = this;
    that.contractInstance.getAccount.call(
      data.accountIdName,
      function(err, res) { onComplete( err, res ) }
    );
  },

  accountExist: function( data, onComplete  ) {
    var that = this;
    that.contractInstance.accountExist.call(
      data.accountIdName,
      function(err, res) { onComplete( err, res ) }
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
        from: that.currentAccount,
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
  }


};
