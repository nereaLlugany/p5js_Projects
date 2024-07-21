class Bird {
  constructor() {
    this.x = -width / 9;
    this.y = random(height / 3);
    this.width = width / 9;
    this.height = 50;
    this.speed = 8;
    this.radiusX = 67;
    this.radiusY = 50;
    this.birdSprites = [
      { x: 590, y: 165, w: 120, h: 167 },
      { x: 455, y: 165, w: 120, h: 127 },
      { x: 330, y: 165, w: 121, h: 127 },
      { x: 175, y: 165, w: 122, h: 127 },
      { x: 25, y: 165, w: 130, h: 127 },
      { x: 590, y: 10, w: 130, h: 127 },
      { x: 455, y: 10, w: 120, h: 127 },
      { x: 325, y: 10, w: 120, h: 127 },
      { x: 175, y: 10, w: 130, h: 127 },
      { x: 25, y: 10, w: 120, h: 127 },
    ];
    this.spriteActual = 0;
    this.birdImage = loadImage("bird.png");
  }

  // Actualiza la posició del ocell
  updateBird() {
    this.x += this.speed;
    if (this.x > width || this.x < -width) {
      this.y = random(height / 2);
    }
  }
  
  // Ens mostra l'animació de l'ocell volant
  displayBird() {
    let birdSprite = this.birdSprites[this.spriteActual];
    image(
      this.birdImage,
      this.x,
      this.y,
      birdSprite.w*0.7,
      birdSprite.h*0.7,
      birdSprite.x,
      birdSprite.y,
      birdSprite.w,
      birdSprite.h
    );

    this.spriteActual = (this.spriteActual + 1) % 9;
  }
}
