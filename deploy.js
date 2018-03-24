const Preferences = require("preferences");
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.js');
const provider = new HDWalletProvider(
    //Mnemonic
    "onion over warrior aware lava crisp hope purpose easy sense purse morning",
    //Infura Rinkeby API Key
    'https://rinkeby.infura.io/ED9vOUpLhJwFOiFGcBRM'
);

const web3 = new Web3(provider);

const deploy = (async() => {
    //Get a list of all accounts
    const accounts = await web3.eth.getAccounts();
    var result = await new web3.eth.Contract (JSON.parse(interface))
    result = await result.deploy({ data: bytecode, arguments: [] })
    result = await result.send({ from: accounts[0], gas: '3000000' });

    console.log("Contract deployed at ", result.options.address);
    console.log("ABI: ",result.options.jsonInterface);
    var prefs = new Preferences('cryptodoc');
    prefs.address = result.options.address;
    prefs.abi = JSON.stringify(result.options.jsonInterface);
})();
