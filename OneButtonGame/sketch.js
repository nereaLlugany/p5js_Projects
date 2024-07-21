 let bow;
let arrow;
let target;
let birds = [];
let score;
let lastTargetTime;
let lastBirdTime;
let targetInterval;
let birdInterval;
let gameState;
let opacity;
let opacityInterval;
let lastOpacityTime;
let highScores = [];

function preload() {
  customFont = loadFont("Deutsch.ttf");
  startScreen = loadImage("StartScreen.png");
  overScreen = loadImage("OverScreen.png");
}

function setup() {
  createCanvas(600, 400);
  textFont(customFont);
  bow = new Bow();
  arrow = new Arrow();
  score = 0;
  lastTargetTime = 0;
  lastBirdTime = 0;
  lastOpacityTime = 0;
  targetInterval = 2000;
  gameState = 0;
  opacity = 0;
  opacityInterval = 5;
  frameRate(30);
}

function draw() {
  background(0, 200, 255);

  switch (gameState) {
    case 0:
      gameStart();
      break;

    case 1:
      gameLevel();
      break;

    case 2:
      gameOver();
      break;
  }
}

function gameStart() {
  image(startScreen, 0, 0, width, height);

  //Fer el text pampalluguejar dins d'un interavl establert i mostra-ho
  opacity += opacityInterval;
  if (opacity <= 0 || opacity >= 255) {
    opacityInterval *= -1;
  }

  //Mostrar el text
  textSize(30);
  fill(255, opacity);
  let textToDisplay = "PRESS ENTER \n TO START";
  text(
    textToDisplay,
    width / 2 - textWidth(textToDisplay) + 40,
    height / 2 + 80
  );
}

function gameLevel() {
  // Ens mostra i actualitza l'arc i la fletxa
  bow.updateBow();
  bow.displayBow();

  arrow.updateArrow();
  arrow.displayArrow();

  // Comprovar si ha passat el temps determinat (2 segons) per canviar de posició de el blanc
  if (millis() - lastTargetTime > targetInterval) {
    target = new Target();
    lastTargetTime = millis();
  }

  // Mira si la fletxa un cop disparada ha col·lisionat o amb un ocell o un objectiu
  if (target) {
    target.displayTarget();
    
    //Si col·lisiona amb un objectiu calcula la puntuació depenent de la posició on ha col·lisionat
    if (
      arrow.hitsObject(target.x, target.y, target.diameter / 2, target.diameter / 2)
    ) {
      let points = target.calculatePoints(arrow);
      score += points;
      arrow.resetArrow();
      bow.startBow();
      target.resetTarget(); 
    }

    // Si col·lisiona amb algun ocell porta a la pantalla de Game Over
    for (let i = birds.length - 1; i >= 0; i--) {
      birds[i].updateBird();
      birds[i].displayBird();

      if (
        arrow.hitsObject(birds[i].x, birds[i].y, birds[i].radiusX, birds[i].radiusY)
      ) {
        gameState = 2; // Set game over
      }
    }

    // Mira si ha passat el temps determiant amb un random per crear ocells
    birdInterval = random(6000, 12000);
    if (millis() - lastBirdTime > birdInterval) {
      birds.push(new Bird());
      lastBirdTime = millis();
    }
  }

  // Mostrar la puntuació al canvas
  textSize(30);
  fill(0);
  text("Score " + score, 20, 40);
}

function gameOver() {
  image(overScreen, 0, 0, width, height);
  
  // Un cop has disparat a un ocell guarda la puntuació a l'array per poder mostrar les tres puntuacions més altes
  highScores.push(score);

  highScores.sort((a, b) => b - a);
  
  if (highScores.length > 3) {
    highScores.pop();
  }
  textSize(30);
  fill(0);
  let textToDisplay = "Top Three Scores";
  text(
    textToDisplay,
    width / 2 - textWidth(textToDisplay) / 2,
    height / 2 - 10
  );
  for (let i = 0; i < highScores.length; i++) {
    text(
      highScores[i],
      width / 2 - textWidth(highScores[i]),
      height / 1.7 + i * 30
    );
  }
  

  // Reinicia el joc al seu estat inicial per poder tornar a jugar
  score = 0;
  birds = [];
  arrow.resetArrow();
  bow.startBow();
  lastTargetTime = 0;
  lastBirdTime = 0;

  //Fer el text pampalluguejar dins d'un interavl establert i mostra-ho
  opacity += opacityInterval;
  if (opacity <= 0 || opacity >= 255) {
    opacityInterval *= -1;
  }
  fill(0, opacity);
  textSize(16);
  textToDisplay = "PRESS ENTER TO PLAY AGAIN";
  text(
    textToDisplay,
    width / 2 - textWidth(textToDisplay) / 2,
    height / 2 + 130
  );
}

function keyPressed() {
  if (key === " ") {
    if (gameState == 0) {
      gameState = 1;
    } else if (gameState == 1) {
      arrow.shootArrow();
      bow.stopBow();
    } else if (gameState == 2) {
      gameState = 1;
    }
  }
}
