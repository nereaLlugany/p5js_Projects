class Target {
  constructor() {
    this.diameter = 80; // Diameter of the largest circle
    this.colors = ["white", "blue", "red", "yellow"];
    this.resetTarget();
  }

  // Crea i mostra l'objectiu amb quatre cercles  i els colors predeterminats
  displayTarget() {
    for (let i = 0; i < this.colors.length; i++) {
      fill(this.colors[i]);
      let diameter = this.diameter - i * 20;
      ellipse(this.x, this.y, diameter);
    }
  }

  // Crea un altre objectiu en una posició diferent a l'anterior
  resetTarget() {
    this.x = random(width);
    this.y = random(height / 2);
    // Assegura que l'objectiu no surti del canvas
    this.x = constrain(
      this.x,
      0 + this.diameter / 2,
      width - this.diameter / 2
    );
    this.y = constrain(
      this.y,
      0 + this.diameter / 2,
      height / 2 - this.diameter / 2
    );
  }
  
  // Calcula la puntuació que ha de sumar depenent d'on ha col·lisionat en el blanc
  calculatePoints(arrow) {
    let deltaX = abs(arrow.x - this.x);

  
    let partWidth = this.diameter / 7;

    if ((deltaX >= 0 && deltaX <= partWidth / 2) || (deltaX >= this.diameter * 6.5 && deltaX <= this.diameter * 7)) {
        return 3;
    } else if ((deltaX >= partWidth / 2 && deltaX <= this.diameter / 2) || (deltaX >= this.diameter * 5.5 && deltaX <= this.diameter * 6.5 + partWidth / 2)) {
        return 5;
    } else if ((deltaX >= this.diameter / 2 && deltaX <= this.diameter) || (deltaX >= this.diameter * 4.5 && deltaX <= this.diameter * 5.5)) {
        return 7;
    } else if (deltaX >= this.diameter && deltaX <= this.diameter * 4.5) {
        return 10;
    } else {
        return 0;
    }
}

}
