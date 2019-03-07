const GPS_PRECISSION = 1000000;
const GPS_ADITION = 100;

//
// TRUFFLE LOCAL
//
/*
var conf = {
  httpProvider: 'http://127.0.0.1:9545',
  abi: [{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"}],"name":"getPlace","outputs":[{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"imageLink","type":"string"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"accountExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"},{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"imageLink","type":"string"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"name":"setPlace","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"getAccount","outputs":[{"name":"owner","type":"string"},{"name":"desc","type":"string"},{"name":"","type":"bool"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"},{"name":"placesNumber","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"}],"name":"deletePlace","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"desc","type":"string"},{"name":"clusterize","type":"bool"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"name":"setAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"listPlaceIndex","outputs":[{"name":"placesIndex","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"accountHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"}],
  contractAddress: '0x0846F926C9Afc49E52dC24bBA32f1c41487F643F',
  defaultGasLimit: 2000000
};*/


//
// ROPSTEN testnet on INFURA
//
/*var conf = {
  httpProvider: 'https://ropsten.infura.io/v3/2dad8e8275d24f00ad1f5985b4bf1ba6',
  wssProvider: 'wss://ropsten.infura.io/ws',
  abi: [{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"}],"name":"getPlace","outputs":[{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"imageLink","type":"string"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"accountExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"},{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"imageLink","type":"string"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"name":"setPlace","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"getAccount","outputs":[{"name":"owner","type":"string"},{"name":"desc","type":"string"},{"name":"","type":"bool"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"},{"name":"placesNumber","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"}],"name":"deletePlace","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"accountIdName","type":"string"}],"name":"addressIsOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"desc","type":"string"},{"name":"clusterize","type":"bool"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"name":"setAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"listPlaceIndex","outputs":[{"name":"placesIndex","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"accountHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"accountIdName","type":"string"},{"indexed":false,"name":"result","type":"string"}],"name":"AccountSubmit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"accountIdName","type":"string"},{"indexed":false,"name":"placeTtIndex","type":"uint256"},{"indexed":false,"name":"result","type":"string"}],"name":"PlaceSubmit","type":"event"}],
  contractAddress: '0xB6d3aF42782eABC74C223D6BBB9EdD7dBD27B5Ee',
  defaultGasLimit: 1000000,
  currentNetworkId: 3 // 3:ropsten
};*/

// 17 FEB 2019
var conf = {
  httpProvider: 'https://ropsten.infura.io/v3/2dad8e8275d24f00ad1f5985b4bf1ba6',
  wssProvider: 'wss://ropsten.infura.io/ws',
  abi: [{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"accountExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"accountHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"accountIdName","type":"string"}],"name":"addressIsOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"}],"name":"deletePlace","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"getAccount","outputs":[{"name":"owner","type":"string"},{"name":"desc","type":"string"},{"name":"extraData","type":"string"},{"name":"","type":"bool"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"},{"name":"placesNumber","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"}],"name":"getPlace","outputs":[{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"imageLink","type":"string"},{"name":"category","type":"string"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"listPlaceIndex","outputs":[{"name":"placesIndex","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"accountIdName","type":"string"},{"indexed":false,"name":"result","type":"string"}],"name":"AccountSubmit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"accountIdName","type":"string"},{"indexed":false,"name":"placeTtIndex","type":"uint256"},{"indexed":false,"name":"result","type":"string"}],"name":"PlaceSubmit","type":"event"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"desc","type":"string"},{"name":"extraData","type":"string"},{"name":"clusterize","type":"bool"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"name":"setAccount","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"},{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"imageLink","type":"string"},{"name":"category","type":"string"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"name":"setPlace","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
  //contractAddress: '0xA0CbBBBcC3FD295311CCC699072751c07BE64C97',//'0xa91DE844cEecBE84E89F666404b6e617EE500Da0',
  contractAddress: '0xa91DE844cEecBE84E89F666404b6e617EE500Da0',
  defaultGasLimit: 1500000,
  currentNetworkId: 3, // 3:ropsten
  changeNetworkMenuOption: '<li><a href="http://chainmaps.net"><i class="fa fa-sitemap"></i> Try on main network</a></li>',
  testNetAdvice: '<p>This app is runing now over <a target="_blank" href="https://medium.com/compound-finance/the-beginners-guide-to-using-an-ethereum-test-network-95bbbc85fc1d">Ethereum Ropsten testnet</a>. This blockchain is only for test purposes and is not secure.<br> However, transactions have no cost and is perfect to test and learn.</p><p> If you want to use the app for production purposes, please, use <a href="http://chainmaps.net">the mainnet Chainmaps version</a>.</p>',
  appDownloadLink: 'https://github.com/pablinhob/chainMapsTestNet/archive/master.zip',
  donateAccountETH: '0xblablaETH',
  donateAccountBTC: '0xblablaBTC',
  donateAccountLTC: '0xblablaLTC'
};



//
// GETH ROPSTEN LOCAL
//

/*
var conf = {
  httpProvider: 'http://127.0.0.1:8545',
  abi: [{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"}],"name":"getPlace","outputs":[{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"imageLink","type":"string"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"accountExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"},{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"imageLink","type":"string"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"name":"setPlace","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"getAccount","outputs":[{"name":"owner","type":"string"},{"name":"desc","type":"string"},{"name":"","type":"bool"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"},{"name":"placesNumber","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"ttIndex","type":"uint256"}],"name":"deletePlace","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"},{"name":"desc","type":"string"},{"name":"clusterize","type":"bool"},{"name":"lat","type":"uint32"},{"name":"lng","type":"uint32"},{"name":"zoom","type":"uint8"}],"name":"setAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"listPlaceIndex","outputs":[{"name":"placesIndex","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accountIdName","type":"string"}],"name":"accountHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"}],
  contractAddress: '0x3bB2523a67772A30805bC6C65443Df5Dd61e7355',
  defaultGasLimit: 2000000
};*/
