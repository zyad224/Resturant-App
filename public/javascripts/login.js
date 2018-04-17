

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

