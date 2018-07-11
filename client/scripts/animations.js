class Animator {

  constructor () {
    this.counter = 0;
    this.oscillator = 0;
    this.update = () => {
      this.counter++;
      this.counter %= 100;

      this.oscillator = Math.sin(this.counter) + 1;

    };
    this.timer = setInterval(this.update, 100);
  }

}