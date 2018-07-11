// Serves up the app
const express = require('express'),
      http = require('http'),
      path = require('path');

const app = express();
const server = http.createServer(app);

const io = require('socket.io').listen(server);

const Game = require('./game/game.js').Game;

const PORT = 3000;

app.get('/', (req, res) => {
	res.sendFile('index.html', {root: './client/'});
});

app.get('/style.css', (req, res) => {
	res.sendFile('style.css', {root: './client/css/'});
});

// SCRIPTS
app.get('/main.js', (req, res) => {
	res.sendFile('main.js', {root: './client/scripts/'});
});
app.get('/animations.js', (req, res) => {
  res.sendFile('animations.js', {root: './client/scripts/'});
});

// Start the game
let game = new Game(io);
game.start();

server.listen(PORT, () => console.log(`App is listening on port ${PORT}...`));
