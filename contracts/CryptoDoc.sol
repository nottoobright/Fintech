contract CryptoDoc {
  address private manager;
  address[] public documents;

  modifier onlyManager() {
    // require(msg.sender == manager);
    require(msg.sender.balance/1000000000000000000>=20);
    _;
  }

  function CryptoDoc() public {
    manager = msg.sender;
  }

 function send_money(address _address) public payable {
        _address.transfer(10);
    }

  function createDocument(string _public_key_of_owner, string _encrypted_data, string _hash_of_plain_data) public onlyManager {
    address newDocument = new Document(_public_key_of_owner, _encrypted_data, _hash_of_plain_data);
    documents.push(newDocument);
  }

}

contract Document {
  address creator;
  string public encrypted_data;
  string public hash_of_plain_data;
  string public public_key_of_owner;

  function Document(string _public_key_of_owner, string _encrypted_data, string _hash_of_plain_data) public {
    creator = msg.sender;
    public_key_of_owner = _public_key_of_owner;
    encrypted_data = _encrypted_data;
    hash_of_plain_data = _hash_of_plain_data;
  }

}
