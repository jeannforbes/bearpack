class App {

  constructor () {
    this.canvas = undefined;
    this.ctx = undefined;
    this.animator = undefined;
    this.socket = undefined;

    this.game = {
      loading: true
    };

    this.color = {
      accent: '#ff5733',
      brite: '#ffffff',
      lite: '#f0f0f0',
      med: '#b8b8b8',
      dark: '#707070'
    };
  }

  start () {

    // Initialize the game
    this.joinGame();

    // Initialize the canvas
    this.canvas = document.querySelector('#game-canvas');
    this.ctx = this.canvas.getContext('2d');

    //this.animator = new Animator();

    window.onresize = this.resizeCanvas.bind(this);
    this.resizeCanvas();

    this.joinGame();

    // Setup handlers
    window.onmousedown = e => {this.handleUserInput(e, 'mousedown')}
    window.onmouseup = e => {this.handleUserInput(e, 'mouseup')}
    window.onkeydown = e => {this.handleUserInput(e.key || e.which, 'keydown')}
    window.onkeyup = e => {this.handleUserInput(e.key || e.which, 'keyup')}

    console.log('app initialized');

    window.requestAnimationFrame(this.update.bind(this));
  }

  joinGame () {
    // Connect via socket.io
    this.socket = io.connect();
    this.socket.on('connected', data => {
      console.log(data);
    });

  }

  leaveGame () {
    this.socket.emit('disconnect');
  }

  handleUserInput (e, msg) {
    this.socket.emit('user-input', {e: e, msg: msg});
  }

  update () {
    window.requestAnimationFrame(this.update.bind(this));

    this.draw(this.ctx);
  }

  resizeCanvas () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  draw (ctx){
    this.clearCanvas(ctx);

  }

  clearCanvas (ctx) {
    ctx.fillStyle = this.color.med;
    ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
  }

  drawPlayer (ctx, player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.loc.x, player.loc.y, player.width, player.height);
  }
};

const app = new App();

app.start();