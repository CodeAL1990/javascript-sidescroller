export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.veloY = 0;
    this.weight = 1;
    this.image = player;
    this.speed = 0;
    this.maxSpeed = 10;
  }
  update(input) {
    //horizontal movement
    this.x += this.speed;
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //vertical movement
    if (input.includes("ArrowUp") && this.onGround()) this.veloY -= 20;
    this.y += this.veloY;
    if (!this.onGround()) this.veloY += this.weight;
    else this.veloY = 0;
  }
  draw(context) {
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height;
  }
}
