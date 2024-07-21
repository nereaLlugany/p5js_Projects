let planets = []; // Array per emmagatzemar els planetes
let numPlanets = 11; // Nombre de planetes
let planetColors = [];
// Colors per a les hores entre les 0 i les 11 (inclusives)
let morningColors = ['#DAB9FF', '#B776FF', '#B004FF', '#7C42FD', '#1476DC', '#429DFD', '#68F9E8', '#B9FFF7', '#B9FFD6', '#A1FF73', '#5FE21D', '#39A404'];
planetColors = planetColors.concat(morningColors);

// Colors per a les hores entre les 12 i les 23 (inclusives)
let eveningColors = ['#FFFF00', '#FEFE88', '#FFF174', '#FFF9C4', '#FFE189', '#FFC57E', '#FF9D00', '#E97D04', '#FF6565', '#FF0000', '#DC143C'];
planetColors = planetColors.concat(eveningColors);

let centralOrbitRadius = 60;
let planetSpacing = 20; // Espaiat entre els planetes

let currentMinute = -1;
let previousMovingPlanetIndex = -1;
let movingPlanetIndex = -1;
let lastMovingMinute = -1;

let stars = []; // Array per emmagatzemar les estrelles estàtiques

function setup() {
  createCanvas(620, 620);
  angleMode(DEGREES);
  
  for (let i = 0; i < 200; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    stars.push({ x: x, y: y });
  }

}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  
  // Obtenir l'hora
  let h = hour();
  let m = minute();
  let s = second();
  drawStaticStars();
  drawConstellations(h);
  
  // Crear cada planeta amb les seves propietats
  let previousRadius = centralOrbitRadius;
  for (let i = 0; i < numPlanets; i++) {
    let radius = previousRadius + planetSpacing; // Radi del planeta actual
    let startAngle = random(360); // Angle inicial aleatori
    let colorIndex = i; // Utilitza l'índex del planeta com a índex del color
    if (h >= 12) {
      colorIndex += 12; // Desplaça l'índex del color per a les hores del vespre
    }
    let color = planetColors[colorIndex];
    let planet = new Planet(radius, startAngle, color);
    planets.push(planet);
    previousRadius = radius;
  }

  // Dibuixar i actualitzar cada planeta
  for (let i = 0; i < numPlanets; i++) {
    planets[i].update();
    planets[i].display();
  }

  // Comprovar si el minut actual ha canviat
  if (m !== currentMinute && m>=5) {
    currentMinute = m;
    // Trobar l'índex del planeta que s'ha de moure
    movingPlanetIndex = floor(m /5.5) % numPlanets;
    if (movingPlanetIndex !== previousMovingPlanetIndex) {

      previousMovingPlanetIndex = movingPlanetIndex;
      // Iniciar el moviment dels planetes segons el temps actual
      for (let i = 0; i <= movingPlanetIndex; i++) {
        planets[i].startMovement();
      }
      // Assegurar que els altres planetes es quedin sense moure's i que el seu rastre es mostri
      for (let i = movingPlanetIndex + 1; i < numPlanets; i++) {
        planets[i].stopMovement();
      }
    }
  }
}
