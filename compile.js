const path = require('path');
const fs = require('fs');
const solc = require('solc');

const CryptoPath = path.resolve(__dirname, 'contracts', 'CryptoDoc.sol');
const source = fs.readFileSync(CryptoPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':CryptoDoc'];
