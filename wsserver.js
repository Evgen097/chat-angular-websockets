

let WS = require('ws');

var express = require('express');
var app = express();

app.use(express.static('chat'));

app.get('*', function (req, res) {
    res.send('Wrong path!');
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});


let wsserver = new WS.Server({port: 8081}, ()=> console.log('Web socket server listening...'));
let clients = [];

let handleMessage = (message, id)=>{
    message = JSON.parse(JSON.parse(message));
    clients.forEach((client, num) => {
        if(num != id) client.send(JSON.stringify( {type: 'text', msg: message.msg, user: id+1} ));
    })
};

wsserver.on('connection', (ws)=>{
    console.log('connection')
    let id = clients.length;
    clients[id] = ws;
    let obj = {type: 'info', msg: 'Hello in chat!', user: 'server'}
    let msg = JSON.stringify(obj)
    ws.send(msg);
    ws.on('message', (message)=> handleMessage(message, id));
});


process.on('uncaughtException', err => console.log(err))








































