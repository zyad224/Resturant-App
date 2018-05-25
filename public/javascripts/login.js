
/*
This is the AJAX responsible to communicate with the user.checkCredential function in the
controller. it sends the user credential data to eb checked. if its correct it redirect
the user to add a restaurant page. if not it asks the user to register.
 */
function sendCredentials(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var content = "";
            console.log(dataR);
            if(dataR.length>0){
                alert(dataR[0].user_name);
                window.location.href = '/insert';
            }

            else{
                alert("please register");
            }
            //document.getElementById('results').innerHTML = JSON.stringify(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

/*
This method recieves the data from the /login url.
It sends the url and data to the sendCredentials function for
AJAX communication.
 */
function onSubmitCredential(url) {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    // const data = JSON.stringify($(this).serializeArray());
    sendCredentials(url, data);
    event.preventDefault();
}

