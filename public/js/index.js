if (typeof window.web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
    console.log("current provider selected");
} else {
    console.log("Install metamask");
}

web3.eth.defaultAccount = web3.eth.accounts[0];
// insert abi here
var abi = abi;
let CryptoContract = web3.eth.contract(abi);
let Crypto = CryptoContract.at(add);

let DocumentContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "hash_of_plain_data",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "encrypted_data",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "public_key_of_owner",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_public_key_of_owner",
				"type": "string"
			},
			{
				"name": "_encrypted_data",
				"type": "string"
			},
			{
				"name": "_hash_of_plain_data",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]);
console.log(Crypto)
