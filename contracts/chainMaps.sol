//pragma solidity ^0.4.17;
pragma solidity ^0.5.0;

//pragma experimental ABIEncoderV2;

contract chainMaps {

    struct geoLatLng {
        uint32 lat;
        uint32 lng;
        uint8 zoom;
    }

    struct place {
        string title;
        string desc;
        string imageLink;
        geoLatLng position;
    }

    struct account {
        bool exist;
        address owner;
        string ownerIdname;
        string desc;
        bool clusterize;
        geoLatLng position;
        uint256[] placesIndex; // array de timestamps (hora de escritura)
        mapping( uint256 => place )  places; // o key vai ser un timestamp (hora de escritura)
    }


    mapping(bytes32 => account)  accounts;

    event AccountSubmit(
      address indexed owner,
      string accountIdName,
      string result
    );

    event PlaceSubmit(
      address owner,
      string accountIdName,
      uint256 placeTtIndex,
      string result
    );

    function setAccount( string memory accountIdName, string memory desc, bool clusterize, uint32 lat, uint32 lng, uint8 zoom ) public {

        if( accountExist(accountIdName) ) {

          if( isOwner(accountIdName) ) {
            accounts[accountHash(accountIdName)].ownerIdname = accountIdName;
            accounts[accountHash(accountIdName)].desc = desc;
            accounts[accountHash(accountIdName)].clusterize = clusterize;
            accounts[accountHash(accountIdName)].position.lat = lat;
            accounts[accountHash(accountIdName)].position.lng = lng;
            accounts[accountHash(accountIdName)].position.zoom = zoom;

            emit AccountSubmit( msg.sender , accountIdName, 'ACCOUNT_UPDATED');
          }
          else{
            emit AccountSubmit( msg.sender , accountIdName, 'ACCOUNT_NOT_OWNER');
          }

        }
        else {
            account memory acc;

            acc.exist = true;
            acc.position = geoLatLng({
                lat: lat,
                lng: lng,
                zoom: zoom
            });
            acc.owner = msg.sender;
            acc.desc = desc;
            acc.clusterize = clusterize;

            accounts[accountHash(accountIdName)] = acc;
            emit AccountSubmit( msg.sender , accountIdName, 'ACCOUNT_CREATED');
        }
    }


    function getAccount(string memory accountIdName) public
        returns (
            string memory owner,
            string memory desc,
            bool,
            uint32 lat,
            uint32 lng,
            uint8 zoom,
            uint placesNumber
        )  {

        if( accountExist(accountIdName) ) {
            account memory ac;
            ac = accounts[accountHash(accountIdName)];
            return (
                ac.ownerIdname,
                ac.desc,
                ac.clusterize,
                ac.position.lat,
                ac.position.lng,
                ac.position.zoom,
                ac.placesIndex.length
            );
        }
    }

    function setPlace( string memory accountIdName, uint256 ttIndex, string memory title, string memory desc, string memory imageLink, uint32 lat, uint32 lng, uint8 zoom  ) public returns (uint256) {
        uint256 ret;



        if( accountExist(accountIdName) ) {

            if( isOwner(accountIdName) ) {

                place memory pl;
                pl.title = title;
                pl.desc = desc;
                pl.imageLink = imageLink;
                pl.position = geoLatLng({
                        lat: lat,
                        lng: lng,
                        zoom: zoom
                    });


                if( ttIndex == 0 ) { // Create
                    uint256 n;
                    n = now;
                    accounts[ accountHash(accountIdName) ].places[n] = pl;
                    accounts[ accountHash(accountIdName) ].placesIndex.push(n);

                    ret = n;
                    emit PlaceSubmit( msg.sender, accountIdName, ttIndex, 'PLACE_CREATED');
                }
                else { // update
                    accounts[ accountHash(accountIdName) ].places[ ttIndex ] = pl;
                    ret = ttIndex;
                    emit PlaceSubmit( msg.sender, accountIdName , ttIndex, 'PLACE_UPDATED');
                }


            }
            else {
              emit PlaceSubmit( msg.sender, accountIdName, ttIndex, 'ACCOUNT_NOT_OWNER');
            }

            return ret;
        }


    }


    function getPlace( string memory accountIdName, uint256 ttIndex ) public
        returns(
            string memory title,
            string memory desc,
            string memory imageLink,
            uint32 lat,
            uint32 lng,
            uint8 zoom
            ) {
        if( accountExist(accountIdName) ) {
            return (
                accounts[ accountHash(accountIdName) ].places[ttIndex].title,
                accounts[ accountHash(accountIdName) ].places[ttIndex].desc,
                accounts[ accountHash(accountIdName) ].places[ttIndex].imageLink,
                accounts[ accountHash(accountIdName) ].places[ttIndex].position.lat,
                accounts[ accountHash(accountIdName) ].places[ttIndex].position.lng,
                accounts[ accountHash(accountIdName) ].places[ttIndex].position.zoom
            );
        }
    }

    function deletePlace( string memory accountIdName, uint256 ttIndex ) public {

    }

    /*
    function listPlaces( string memory accountIdName ) public
        returns(
            string[] memory title,
            string[] memory desc,
            string[] memory imageLink,
            uint32[] memory lat,
            uint32[] memory lng,
            uint8[] memory zoom
            ) {

        string[] memory title_s;
        string[] memory desc_s;
        string[] memory imageLink_s;
        uint32[] memory lat_s;
        uint32[] memory lng_s;
        uint8[] memory zoom_s;

        if( accountExist(accountIdName) ) {

            account memory acc;
            acc = accounts[ accountHash(accountIdName) ];
            place memory pl;

            uint placesIndexLength = acc.placesIndex.length;
            for (uint i=0; i<placesIndexLength; i++) {
                pl = acc.places[i];
                title_s[i] = pl.title ;
                desc_s[i] = pl.desc ;
                imageLink_s[i] = pl.imageLink ;
                lat_s[i] = pl.position.lat ;
                lng_s[i] = pl.position.lng ;
                zoom_s[i] =  pl.position.zoom ;
            }

            return (
                title_s,
                desc_s,
                imageLink_s,
                lat_s,
                lng_s,
                zoom_s
            );

        }

    }*/

    function listPlaceIndex( string memory accountIdName ) public returns( uint256[] memory placesIndex ) {
        if( accountExist(accountIdName) ) {
            return accounts[ accountHash(accountIdName) ].placesIndex;
        }
    }

    function accountHash( string memory accountIdName ) public returns (bytes32) {
        return keccak256( bytes(accountIdName) );
    }

    function accountExist(string memory accountIdName) public returns (bool) {
        bytes32 accountIdNameHash;
        accountIdNameHash = accountHash(accountIdName);

        return (accounts[accountHash(accountIdName)].exist == true );
    }


    function isOwner( string memory accountIdName ) public returns (bool){
        bytes32 accountIdNameHash;
        accountIdNameHash = accountHash(accountIdName);

        return (msg.sender == accounts[accountHash(accountIdName)].owner);
    }

}
