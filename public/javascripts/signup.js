
function sendUserInfo() {
    var socket = io.connect('http://localhost:3003');

    $('#form').submit(function(){
        var credential=[$('#user').val(),$('#psw').val()]
        socket.emit('join', credential);
        //socket.emit('message', "Input");
        //$('#Input').val('');
        alert("user signed up");
        return false;
    });

    socket.on('messages', function (data) {
        alert(data);
    });
}