
var chainMaps = artifacts.require("./chainMaps.sol");

module.exports = function(deployer) {
    deployer.deploy(chainMaps);
    // Additional contracts can be deployed here
};
