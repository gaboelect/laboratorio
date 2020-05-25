var Socket = io.connect('http://localhost:6677', {'forceNew':true} );

Socket.on('messages', function (data) {
    console.log(JSON.stringify(data));
    render(data);
    
});

function render(data) {
    var html = data.map(function (message, index) {
        return (`
            <div class="message">
                <strong>${message.nickname}</strong>
                <p>${message.text}</p>
            </div>
        `);
    }).join('   ');
    var div_msg = document.getElementById("messages");
    div_msg.innerHTML = html;
    div_msg.scrollTop - div_msg.scrollHeight;
}

function addMessage(e) {
    var message = {
        nickname: sessionStorage.getItem('nombre'),
        text: document.getElementById('text').value
    };

    Socket.emit('add-message', message);
    return false;
}