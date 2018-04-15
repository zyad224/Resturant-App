function sendUserInfo() {
    console.log("in");
    alert("asdasd");
    var btn = document.getElementById("btn");
    var username = document.getElementById("user");
    var psw = document.getElementById("psw");
    var credential = [username.value, psw.value];


    var socket = io.connect('http://localhost:3003');
    socket.on('connect', function (data) {
        //console.log(username.value);
        socket.emit('join', "hi");
    });

    socket.on('messages', function (data) {
        alert(data);
    });
}

