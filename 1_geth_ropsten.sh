#!/bin/bash
geth --testnet --syncmode "light" console --rpc --rpcport 8545 --rpccorsdomain '*' --rpcaddr 127.0.0.1 --rpcapi db,eth,net,web3,personal
