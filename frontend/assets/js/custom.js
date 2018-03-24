function verify(type='success'){
    swal({
        title: "Fetching data",
        text: "Recieving encrypted data..",
        imageUrl: '../assets/img/loading.gif',
        timer: 3000,
        showConfirmButton: false,
        },
        function(){
            swal({
                title: "Fetching public key",
                text: "Fetching public key from sender..",
                imageUrl: '../assets/img/loading.gif',
                timer: 3000,
                showConfirmButton: false,
            },
            function(){
                swal({
                title: "Decrypting data",
                text: "Decrypting data using key...",
                imageUrl: '../assets/img/loading.gif',
                timer: 3000,
                showConfirmButton: false,
                },
                function(){
                    if(type == 'success'){
                        swal({
                            title: "Success!",
                            text: "Successfully verified user data...",
                            type: "success",
                        },
                        function(){
                            $('#info_holder').removeClass("hidden");
                            $('#info_holder').addClass("animated bounceInRight");
                        }
                    );
                    }else{
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

}


function addRow(){
    var test = $('#sample-row');
    
    test = test.html();

    $('#container-rows').append(test);
}