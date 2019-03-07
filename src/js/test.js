
$(document).ready(function() {


  contract.setAccount({
      accountIdName: 'conta1',
      desc: 'A primeira conta ten encanto porque é a primeira',
      clusterize: false,
      lat: 120,
      lng: 10,
      zoom: 5
    },
    function( err, res ) {},
    200000
  );

  contract.getAccount({
      accountIdName: 'conta1'
    },
    function( err, res ) {console.log(res)}
  );

  contract.setPlace({
      accountIdName: 'conta1',
      ttIndex: 0,
      title: 'O monte pindo',
      desc:'O monte pindo mola que te cagas',
      imageLink:'http://lol.com',
      lat:10213,
      lng:234564,
      zoom:3,
    },
    function( err, res ) {
      alert(res);
    },
    2000000
  );

  contract.listPlaceIndex({
      accountIdName: 'conta1'
    },
    function( err, res ) {
      console.log(res);
    }
  );

});
