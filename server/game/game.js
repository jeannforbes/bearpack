class Game {

	constructor (socket, io) {
		this.socket = socket;
		this.io = io;
		this.rooms = {};
		this.players = {};
	}

	start () {

		// Set up socket.io connection handler
		this.io.on('connection', socket => {
			socket.emit('connected', {msg: 'You connected!'});
			socket.on('user-input', data => {
				switch(data.e){
					// Left
					case('a'):
					case('65'):
					case('ArrowLeft'):
					case('37'):
						console.log('left');
						break;
					// Right
					case('d'):
					case('68'):
					case('ArrowRight'):
					case('39'):
						console.log('right');
						break;
					// Up
					case('w'):
					case('87'):
					case('ArrowUp'):
					case('38'):
						console.log('up');
						break;
					// Down
					case('s'):
					case('83'):
					case('ArrowDown'):
					case('40'):
						console.log('down');
						break;
				}
			});
		});
	}
}

module.exports.Game = Game;