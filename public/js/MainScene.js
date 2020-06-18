import Snake from "./Snake.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }
  create() {
    this.snake = new Snake(this);
  } //create method which is handy for getting things started when the scene first opens

  update(time) {
    this.snake.update(time);
    //update method which is essentially where we want to do all our gameplay stuff because this gets called over and over again.

    console.log(time);
  }
}
