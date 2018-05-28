/*
This is the AJAX responsible to communicate with the insert url.
The controller functions  insert communicate with this
method.
 */
function insert(url, data) {
    $.ajax({
        url: url ,
        data: data,
        // dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var content = "";
            console.log(dataR);

            //document.getElementById('results').innerHTML = JSON.stringify(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

/*
This method recieves the data from the insert url.
It sends the url and data to the Insert function for
AJAX communication.
 */
function onSubmitInsert(url) {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    // const data = JSON.stringify($(this).serializeArray());
    console.log(data);
    insert(url, data);
    event.preventDefault();
}