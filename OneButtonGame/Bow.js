class Bow {
  constructor() {
    this.width = width / 3; 
    this.height = 150; 
    this.x = width / 2 - this.width / 2;
    this.y = height - 130;
    this.speed = 4;
    this.direction = -1;
    this.isStopped = false; 
    this.stoppedDirection = this.direction;
    this.bowImage = loadImage('bow.png');
  }
  
  //Actualitza la posició de l'arc només si no esta pausat
  updateBow() {
    if (!this.isStopped) {
      this.x += this.speed * this.direction;
      // Mira de que no suti dels extrems de la pantalla
      if (this.x <= 0 || this.x >= width - this.width) {
        this.direction *= -1;
      }
    }
  }

  // Mostra la imatge de l'arc
  displayBow() {
    image(this.bowImage, this.x, this.y, this.width, this.height);
  }

  // Para l'arc i guarda la seva direcció
  stopBow() {
    this.speed = 0;
    this.isStopped = true; // Set the stopped flag to true
    this.stoppedDirection = this.direction; // Store the direction before stopping
  }

  // Comença a moure l'arc un altre cop en la direcció que estava anant i en el cas de que estava parat
  startBow() {
    this.speed = 4;
    this.isStopped = false; 
    this.direction = this.stoppedDirection; 
  }
}
