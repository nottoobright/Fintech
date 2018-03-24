// Initialize Firebase
var config = {
    apiKey: "AIzaSyCFvdyOMOYbfr5qNrcZDtMAQ6LrZwV3nXs",
    authDomain: "dj-hack.firebaseapp.com",
    databaseURL: "https://dj-hack.firebaseio.com",
    projectId: "dj-hack",
    storageBucket: "dj-hack.appspot.com",
    messagingSenderId: "61128737185"
};

firebase.initializeApp(config);
const db = firebase.database();
dbRef = db.ref('/requests');

function send(result) {
    const id = result.address;
    db.ref('requests/' + id).set({
        data: result.data,
        type: result.type
    });
};
let fb = {};




function verify(type = 'success', data) {

    swal({
            title: "Fetching data",
            text: "Recieving encrypted data..",
            imageUrl: '../img/loading.gif',
            timer: 1500,
            showConfirmButton: false,
        },
        function() {
            swal({
                    title: "Fetching public key",
                    text: "Fetching public key from sender..",
                    imageUrl: '../img/loading.gif',
                    timer: 1500,
                    showConfirmButton: false,
                },
                function() {
                    swal({
                            title: "Decrypting data",
                            text: "Decrypting data using key...",
                            imageUrl: '../img/loading.gif',
                            timer: 1500,
                            showConfirmButton: false,
                        },
                        function() {
                            if (type == 'success') {
                                swal({
                                        title: "Success!",
                                        text: "Successfully verified user data...",
                                        type: "success",
                                    },
                                    function() {
                                        $('#info_holder').removeClass("hidden");
                                        $('#info_holder').addClass("animated bounceInRight");
                                    }
                                );
                            } else {
                                swal({
                                    title: "Warning!",
                                    text: "Data was not verified...",
                                    type: "error",
                                });
                            }
                        }
                    );
                }
            );
        }
    );


    // console.log(data_to_be_shown);
    for (key in data) {
        if(key!="Public_Key"){
        let html = `<h4 class="card-title">${key}</h4>
        <p class="card-content wrap">
            ${data[key]}
        </p>
        <br>`;
        $('#verifyinsert').append(html);
 }
    }

}

function verify_run(){


 EthCrypto.decryptWithPrivateKey(privateKey,fb['data']).then((data) => {data_to_be_shown=JSON.parse(data);verify('success',data_to_be_shown)}  )

}


function addRow() {

    html = `

    <div id="sample" class="row">
    <div class="col-md-4">
    <div class="form-group label-floating">
    <label class="control-label">Key </label>
    <input type="text" class="form-control ">
    </div>
    </div>
    <div class="col-md-4">
    <div class="form-group label-floating">
    <label class="control-label">Value </label>
    <input type="text" class="form-control">
    </div>
    </div>
    </div>


    `;
    $('#container-rows').append(html);
}

function submit(id) {
    var index = -1;
    var data = {};
    var doc = "";
    var doc_add = "";
    if (id == 'aadhar') {
        index = 0;
    }

    if (id == 'pan') {
        index = 1;
    }

    if (id == 'certificate') {
        index = 2;
    }
    address = $('#' + id).val();
    type = id;
    result = {
        'address': address,
        'type': type,
        'data': data,
    }


    Crypto.documents(index, function(e, doc_add) {
        DocumentContract.at(doc_add).encrypted_data(function(e, doc) {
            EthCrypto.decryptWithPrivateKey(privateKey, JSON.parse(doc)).then(d => (EthCrypto.encryptWithPublicKey(address, d).then(
                (data) => {send({ 'address': address, 'type': type, 'data': data })
                    swal({
                        title: "Data Sent!",
                        text: "Successfully sent document...",
                        type: "success",
                    });
                }
            )));

        })


    })


    // send(result);
}

function getTransactions() {
    result = [];

    try{
    txid = localStorage.getItem('transactions').split(",");
    datetime = localStorage.getItem('datetime').split(",");
    }catch(e){
        txid = [];
        datetime =[];

    }
    for(i=txid.length-1; i>=0; i--){
        let html = `<tr>
        <td><a target="_blank" href="https://rinkeby.etherscan.io/tx/${txid[i]}">${txid[i].slice(0,50)+"..."}</a></td>
            <td>${new Date(parseInt((datetime[i]))).toLocaleString()}</td></tr>`;
        $('#tableinsert').append(html);

    }



} //getTransaction end



seed = bip39.mnemonicToSeed(localStorage.getItem('mnemonic'));
first_acc_path = "m/44'/60'/0'/0/0";
instance = hdkey.fromMasterSeed(seed);
firstAccount = instance.derivePath(first_acc_path);

privateKey = firstAccount.getWallet().getPrivateKeyString();
publicKey = EthCrypto.publicKeyByPrivateKey(privateKey);
address = EthCrypto.addressByPublicKey(publicKey);

privateKey2 = "0x1068e1d200d2bd3140445afec1ac7829f0012b87ff6c646f6b01023c95db13c8";
publicKey2 = "19095de907dde35066bfb780f520cc5a026463f6dc0e8acde90bebf6691d5bf0ed503338414631fc5b6ccc8cad7487ad2c76ee1813a370ae14803912f43d8fd7";


function createData() {
    var transactions = localStorage.getItem("transactions").split(",")
    var datetime = localStorage.getItem("datetime").split(",")
    result = {}
    let rows = $('#container-rows').children();
    for (let row of rows) {
        let key = row.children[0].children[0].children[1].value;
        let value = row.children[1].children[0].children[1].value;
        result[key] = value;
    }


    var hash = sha256(JSON.stringify(result))
    var owner_public_key = result["Public_Key"]

    EthCrypto.encryptWithPublicKey(result["Public_Key"], JSON.stringify(result)).then(
        data => {
            Crypto.createDocument(owner_public_key, JSON.stringify(data), hash, function(e, d) {
                transactions.push(d);
                datetime.push(String(Date.now()));
                localStorage.setItem("datetime", String(datetime))
                localStorage.setItem("transactions", String(transactions))
                swal({
                    title: "Success!",
                    text: "Successfully created document...",
                    type: "success",
                },
                    );
            })
            console.log(data)
        }
    )
    console.log(result);
}
/* global $ */
