const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let counter = 0;

wss.on('connection', (ws) => {
  console.log('A client connected');

  ws.send(JSON.stringify({ count: counter }));

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    counter = parseInt(message);

    // Instead of updating the counter in the database, we're storing it in memory
    console.log(`Counter updated to: ${counter}`);
  });
});

app.use(express.static('public')); // Serve static files from 'public' directory

app.get('/increment', (req, res) => {
  // Instead of updating the counter in the database, we'll increment it in memory
  counter++;
  console.log('Counter incremented');
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ count: counter }));
  });
  res.sendStatus(200);
});

app.get('/counter', (req, res) => {
  // Instead of fetching the counter from the database, we'll return the in-memory counter
  res.json({ count: counter });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
