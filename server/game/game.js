class Game {

	constructor (io) {
		this.io = io;
		this.rooms = {};
		this.players = {};
	}

	start () {
		// Set up socket.io connection handler
		this.io.on('connection', socket => {
			socket.emit('connected', {data: socket});
		});
	}

	addRoom (id) {
		const id = id || Object.keys(this.rooms).length;
		this.rooms[id] = new Room();
	}
}


class Room {

	constructor (id) {
		this.id = id;
	}


}

class Player {

	constructor(socket) {
		this.socket = socket;
	}

	handleInput(data){
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
	}
}

module.exports.Game = Game;