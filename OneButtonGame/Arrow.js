class Arrow {
  constructor() {
    this.x = width / 2;
    this.y = height - 90;
    this.speed = 18;
    this.isShot = false;
    this.hasHit = false;
    this.width = 10;
    this.height = 80;
    this.arrowImage = loadImage('arrow.png');
  }
  
  // Actualitza la posició de la fletxa quan es dispara
  updateArrow() {
    if (this.isShot && !this.hasHit) {
      this.y -= this.speed;
      // Mira que la fletxa torni a la posició inicial només quan ha sortit completament de la pantalla
      if (this.y < -this.height) {
        this.resetArrow(); 
        bow.startBow();
      }
    }
  }

  // Mostra la imatge de la fletxa
  displayArrow() {
    if (!this.isShot) {
      this.x = bow.x + (bow.width / 2 - this.width / 2);
    
    }
    
    image(this.arrowImage, this.x, this.y, this.width, this.height);

  }

  // Dispara la fletxa
  shootArrow() {
    this.isShot = true;
  }
  
  // Torna la fletxa al seu estat inicial
  resetArrow() {
    this.isShot = false;
    this.hasHit = false;
    this.y = height - 90;
  }

  // Mira si la fletxa ha tingut alguna col·lisió amb algun altre objecte 
  hitsObject(objectX, objectY, objectRadiusX, objectRadiusY) {
    let distance = dist(this.x, this.y, objectX, objectY);
    let sumOfRadi = this.width / 2 + objectRadiusX;
    return distance < sumOfRadi;
  }
}
