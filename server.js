/**
 *
 */
const fs = require('fs');
const https = require('https');
const express = require('express');
const WebSocketServer = require('ws').Server;

const app = express();

const pkey = fs.readFileSync('./ssl/key.pem'),
      pcert = fs.readFileSync('./ssl/cert.pem'),
      options = {
        key: pkey,
        cert: pcert,
        passphrase: '123456789'
      };

const PORT = process.env.PORT || 443;

var wss = null, sslSrv = null;

// server public folder with
app.use(express.static('public'));

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

// start server
sslSrv = https.createServer(options, app).listen(PORT);
console.log('The HTTPS server is up and running');

// create the WebSocket server
wss = new WebSocketServer({server: sslSrv});

console.log(`WebSocket Secure server listening on port :${PORT}`);

// on connection
wss.on('connection', client => {
  console.log('A new WebSocket client was connected');
  client.on('message', message => {
    // broadcast message to all clients
    wss.broadcast(message, client);
  });
});

// broadcasting the message to all WebSocket clients.
wss.broadcast = function(data, exclude) {
  console.log(`Broadcasting message to ${this.clients.length - 1} WebSocket clients`);

  for (let i = 0; i < this.clients.length; i++) {
    let client = this.clients[i];
    // don't send the message to the sender...
    if (client === exclude) continue;
    if (client.readyState === client.OPEN) client.send(data);
    else console.error(`Error: the client state is ${client.readyState}`);
  }
};
