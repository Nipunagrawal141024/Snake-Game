export default class Snake {
  constructor(scene) {
    this.scene = scene;
    this.lastMoveTime = 0;
    this.moveInterval = 40;
    this.tileSize = 16;
    this.direction = Phaser.Math.Vector2.DOWN;
    this.body = [];
    this.body.push(
      this.scene.add
        .rectangle(
          this.scene.game.config.width / 2,
          this.scene.game.config.height / 2,
          this.tileSize,
          this.tileSize,
          0x0000ff
        )
        .setOrigin(0)
    ); //10,10 is for l and b  16,16 is pixles and last parmater is for colour
    this.apple = this.scene.add
      .rectangle(0, 0, this.tileSize, this.tileSize, 0xff0000)
      .setOrigin(0);
    this.positionApple();
    scene.input.keyboard.on("keydown", (e) => {
      this.keydown(e);
    });
  }
  positionApple() {
    this.apple.x =
      Math.floor(
        (Math.random() * this.scene.game.config.width) / this.tileSize
      ) * this.tileSize;
    this.apple.y =
      Math.floor(
        (Math.random() * this.scene.game.config.height) / this.tileSize
      ) * this.tileSize;
  }
  keydown(event) {
    console.log(event);
    switch (event.keyCode) {
      case 37:
        if (this.direction != Phaser.Math.Vector2.RIGHT)
          this.direction = Phaser.Math.Vector2.LEFT; //left
        break;
      case 38:
        if (this.direction != Phaser.Math.Vector2.DOWN)
          this.direction = Phaser.Math.Vector2.UP; //up
        break;
      case 39:
        if (this.direction != Phaser.Math.Vector2.LEFT)
          this.direction = Phaser.Math.Vector2.RIGHT; //Right
        break;
      case 40:
        if (this.direction != Phaser.Math.Vector2.UP)
          this.direction = Phaser.Math.Vector2.DOWN; //down
        break;
    }
  }
  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }
  move() {
    let x = this.body[0].x + this.direction.x * this.tileSize;
    let y = this.body[0].y + this.direction.y * this.tileSize;
    if (this.apple.x === x && this.apple.y === y) {
      //apple eaten by snake
      this.body.push(
        this.scene.add
          .rectangle(0, 0, this.tileSize, this.tileSize, 0xffffff)
          .setOrigin(0)
      );
      this.positionApple();
    }
    for (let index = this.body.length - 1; index > 0; index--) {
      this.body[index].x = this.body[index - 1].x;
      this.body[index].y = this.body[index - 1].y;
    }
    this.body[0].x = x;
    this.body[0].y = y;

    //Dead The Snake by going off screen
    if (
      this.body[0].x < 0 || // .x<0 is for left of the screen for snake died
      this.body[0].x >= this.scene.game.config.width || // .x> is for right of the screen for snake died
      this.body[0].y < 0 || // .y<0 is for top of the screen for snake died
      this.body[0].y >= this.scene.game.config.height // .y>0 is for bottom of the screen for snake died
    ) {
      this.scene.scene.restart();
    }

    // Dead by eating own body i.e own tail - headpos == any of our tail positions
    let tail = this.body.slice(1);
    if (tail.some((s) => s.x === this.body[0].x && s.y === this.body[0].y)) {
      this.scene.scene.restart();
    }
  }
}
