/* 
 * Obligatory function 
 *
 * function() {
 *
 * }
 *
 */


var bip39 = require('bip39');
var hdkey = require('ethereumjs-wallet/hdkey');
var utils = require('ethereumjs-util');
var eccrypto = require('eccrypto');

var seed = bip39.mnemonicToSeed('onion over warrior aware lava crisp hope purpose easy sense purse morning');

var first_acc_path = "m/44'/60'/0'/0/0";

var instance = hdkey.fromMasterSeed(seed);


var firstAccount = instance.derivePath(first_acc_path);

var privateKey = firstAccount.getWallet().getPrivateKey();
var publicKey = utils.privateToPublic(new Buffer(privateKey));
var address = utils.pubToAddress(new Buffer(publicKey));

console.log('Private: ' + privateKey.toString('hex'))
console.log('Public: ' + publicKey.toString('hex'))
console.log('Address: ' + address.toString('hex'))

console.log('---');

var text = Buffer('Aadhar no 8023842048');
var unCompressedPublicKey = eccrypto.getPublic(privateKey);
eccrypto.encrypt(unCompressedPublicKey, Buffer(text)).then(function(encrypted) { 
  console.log('Cipher Text: ' + encrypted.ciphertext.toString('hex')); 
  eccrypto.decrypt(privateKey, encrypted).then(function(plain) {
    console.log('Decrypted text: ' + plain.toString());
  });
});

