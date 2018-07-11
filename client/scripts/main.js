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
      background: '#334'
    };
  }

  start () {

    // Initialize the game

    // Initialize the canvas
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');

    //this.animator = new Animator();

    window.onresize = this.resizeCanvas.bind(this);
    this.resizeCanvas();

    // Connect via socket.io
    this.socket = io.connect();
    this.socket.on('connected', data => {
      console.log(data);
    });

    // Setup handlers
    window.onmousedown = e => {this.handleUserInput(e, 'mousedown')}
    window.onmouseup = e => {this.handleUserInput(e, 'mouseup')}
    window.onkeydown = e => {this.handleUserInput(e.key || e.which, 'keydown')}
    window.onkeyup = e => {this.handleUserInput(e.key || e.which, 'keyup')}

    console.log('app initialized');

    window.requestAnimationFrame(this.update.bind(this));
  }

  handleUserInput (e, msg) {
    this.socket.emit('user-input', {e: e, msg: msg});
  }

  update () {
    window.requestAnimationFrame(this.update.bind(this));

    this.draw(this.ctx);
  }

  resizeCanvas () {
    this.canvas.width = window.innerWidth-4;
    this.canvas.height = window.innerHeight-4;
  }

  draw (ctx){
    ctx.fillStyle = this.color.background;
    ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
  }
};

const app = new App();

app.start();