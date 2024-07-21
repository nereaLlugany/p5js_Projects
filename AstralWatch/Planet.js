class Planet {
  constructor(radius, startAngle, color) {
    this.radius = radius; // Radi de l'òrbita
    this.startAngle = startAngle; // Angle inicial
    this.angle = startAngle; // Angle actual
    this.color = color; // Color del planeta
    this.isMoving = false; // Indica si el planeta està en moviment
    this.trail = []; // Array per emmagatzemar els punts del rastre
  }

  update() {
    // Actualitzar l'angle si el planeta està en moviment
    if (this.isMoving) {
      this.angle += 1; // Augmentar l'angle de moviment
      // Afegir el punt a l'array del rastre
      this.trail.push({x: this.x, y: this.y});
      // Esborrar els punts del rastre anteriors per evitar que creixi indefinidament
      if (this.trail.length > 100) {
        this.trail.splice(0, 1);
      }
    }
    // Assegurar que l'angle roman dins del rang 0-360
    this.angle %= 360;
  }

  display() {
    // Calcular les coordenades del planeta
    this.x = this.radius * cos(this.angle);
    this.y = this.radius * sin(this.angle);

    // Dibuixar el rastre
    stroke(this.color);
    noFill();
    beginShape();
    for (let i = 0; i < this.trail.length; i++) {
      vertex(this.trail[i].x, this.trail[i].y);
    }
    endShape();

    // Dibuixar el planeta com una el·lipse
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 20, 20);
  }

  startMovement() {
    // Reiniciar el rastre
    this.trail = [];
    // Activar el moviment
    this.isMoving = true;
  }

  stopMovement() {
    // Desactivar el moviment
    this.isMoving = false;
  }
}