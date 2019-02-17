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
        uint32 category;
        geoLatLng position;
    }

    struct account {
        bool exist;
        address owner;
        string ownerIdname;
        string desc;
        string extraData;
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


    constructor() public { owner = msg.sender; }
    address payable owner;

    // This contract only defines a modifier but does not use
    // it: it will be used in derived contracts.
    // The function body is inserted where the special symbol
    // `_;` in the definition of a modifier appears.
    // This means that if the owner calls this function, the
    // function is executed and otherwise, an exception is
    // thrown.
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }


    function setAccount( string memory accountIdName, string memory desc, string memory extraData, bool clusterize, uint32 lat, uint32 lng, uint8 zoom ) public payable {

        if( accountExist(accountIdName) ) {

          if( isOwner(accountIdName) ) {
            accounts[accountHash(accountIdName)].ownerIdname = accountIdName;
            accounts[accountHash(accountIdName)].desc = desc;
            accounts[accountHash(accountIdName)].extraData = extraData;
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
            acc.extraData = extraData;
            acc.clusterize = clusterize;

            accounts[accountHash(accountIdName)] = acc;
            emit AccountSubmit( msg.sender , accountIdName, 'ACCOUNT_CREATED');
        }
    }


    function getAccount(string memory accountIdName) public
        returns (
            string memory owner,
            string memory desc,
            string memory extraData,
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
                ac.extraData,
                ac.clusterize,
                ac.position.lat,
                ac.position.lng,
                ac.position.zoom,
                ac.placesIndex.length
            );
        }
    }

    function setPlace( string memory accountIdName, uint256 ttIndex, string memory title, string memory desc, string memory imageLink, uint32 category, uint32 lat, uint32 lng, uint8 zoom  ) public payable returns (uint256) {
        uint256 ret;



        if( accountExist(accountIdName) ) {

            if( isOwner(accountIdName) ) {
                bytes32 accountIdNameHash;
                accountIdNameHash = accountHash(accountIdName);

                place memory pl;
                pl.title = title;
                pl.desc = desc;
                pl.imageLink = imageLink;
                pl.category = category;
                pl.position = geoLatLng({
                        lat: lat,
                        lng: lng,
                        zoom: zoom
                    });

                uint256 n;

                n = now;
                if( ttIndex == 0 ) { // Create

                    accounts[ accountIdNameHash ].places[n] = pl;
                    accounts[ accountIdNameHash ].placesIndex.push(n);

                    ret = n;
                    emit PlaceSubmit( msg.sender, accountIdName, ttIndex, 'PLACE_CREATED');
                }
                else { // update

                    replacePlaceTtindex(accountIdName,ttIndex, n);
                    accounts[ accountIdNameHash ].places[ n ] = pl;
                    ret = n;
                    emit PlaceSubmit( msg.sender, accountIdName , n, 'PLACE_UPDATED');
                }


            }
            else {
              emit PlaceSubmit( msg.sender, accountIdName, ttIndex, 'ACCOUNT_NOT_OWNER');
            }

            return ret;
        }


    }

    function replacePlaceTtindex(string memory accountIdName ,uint256 ttIndex, uint256 newTtIndex) private {
        if( accountExist(accountIdName) ) {

            for (uint i=0; i<accounts[ accountHash(accountIdName) ].placesIndex.length; i++) {
                if( accounts[ accountHash(accountIdName) ].placesIndex[i] == ttIndex ) {
                    accounts[ accountHash(accountIdName) ].placesIndex[i] = newTtIndex;
                    break;
                }

            }


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

    function deletePlace( string memory accountIdName, uint256 ttIndex ) public payable {
        if( accountExist(accountIdName) ) {
            if( isOwner(accountIdName) ) {
                for (uint i=0; i<accounts[ accountHash(accountIdName) ].placesIndex.length; i++) {
                    if( accounts[ accountHash(accountIdName) ].placesIndex[i] == ttIndex ) {
                        delete accounts[ accountHash(accountIdName) ].placesIndex[i];
                    }

                }
            }

        }
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

    function addressIsOwner( address owner,  string memory accountIdName ) public returns (bool){
      bytes32 accountIdNameHash;
      accountIdNameHash = accountHash(accountIdName);

      return (owner == accounts[accountHash(accountIdName)].owner);
    }



    function withdraw() external onlyOwner {
        owner.transfer(address(this).balance);
    }



}
