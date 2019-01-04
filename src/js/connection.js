var connection = {
  web3: false,
  contract: false,
  contractInstance: false,

  start: function() {
    var that = this;

    that.web3 = new Web3(new Web3.providers.HttpProvider( conf.httpProvider ));
  	that.contract = web3.eth.contract( conf.abi );
  	that.contractInstance = gGisContract.at( conf.contractAddress );
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
          from: conf.account,
          gas:gasLimit
        },
        function( r ){
          onComplete( r );
        }
      );
    },

    getAccount: function( data, onComplete  ) {
      var that = this;

      that.contractInstance.getAccount.call(
        data.accountIdName,
        function( r ){
          onComplete( r );
        }
      );
    }

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
          from: conf.account,
          gas:gasLimit
        },
        function( r ){
          onComplete( r );
        }
      );
    },

    getPlace: function( data, onComplete ) {
      var that = this;

      that.contractInstance.getPlace.call(
        data.accountIdName,
        data. ttIndex,
        function( r ){
          onComplete( r );
        }
      );
    },

    listPlaceIndex: function() {
        var that = this;

        that.contractInstance.getPlace.call(
          data.accountIdName,
          function( r ){
            onComplete( r );
          }
        );
    }


};
