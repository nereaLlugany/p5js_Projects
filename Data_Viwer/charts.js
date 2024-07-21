// Funció per dibuixar-la en el format de barres
function drawBarChart() {
  background(220);

  // Determinar el valor màxim de les dades desitjades
  let maxCount = 0;
  for (let i = 0; i < desired_filtered_data.length; i++) {
    if (desired_filtered_data[i].count > maxCount) {
      maxCount = desired_filtered_data[i].count;
    }
  }

  // Dterminar l'eix de la y i el els valors a mostrar depenent del filtratge
  stroke(0);
  fill(255);
  rect(100, 50, chartWidth - 100, height - 100);

  fill(0);
  textAlign(RIGHT, CENTER);

  // Cada yStep ens mostra el número i lineas guia per després poder facilitar la interpretació de la quantitat de cada categoria
  let yStep = 500;
  for (let i = 0; i <= maxCount + yStep; i += yStep) {
    let y = map(i, 0, maxCount + yStep, height - 50, 50);
    text(i, 80, y);
    stroke(150);
    line(100, y, chartWidth, y);
    stroke(0);
  }

  // Dibuixar les barres del diagrama
  let barWidth = (chartWidth - 140) / desired_filtered_data.length;
  textAlign(CENTER, CENTER);

  // Calcula i determina la posició de cada barra depenent de la longitud de desired_filtered_data
  for (let i = 0; i < desired_filtered_data.length; i++) {
    let x = 125 + i * barWidth;
    let barHeight = map(
      desired_filtered_data[i].count,
      0,
      maxCount + yStep,
      0,
      height - 100
    );

    // Determinar el color de les barres depenent de la quantitat de valors en l'array de desired_filtered_data
    colorMode(HSB);
    let y = height - 50 - barHeight;
    let colorValue = i * (360 / desired_filtered_data.length);
    fill(color(colorValue, 100, 100));
    rect(x, y, barWidth - 10, barHeight);

    //Mostratge de la llegenda per saber quin valor representa cada barra
    displayValues(
      color(colorValue, 100, 100),
      desired_filtered_data[i][filterModeSelected],
      chartWidth + 20,
      height - 100,
      i
    );
    colorMode(RGB);
  }
}

// Funció per dibuixar-la en el format de pastís
function drawPieChart() {
  background(220);
  stroke(0);

  // Calcula el nombre total de valors de l'array desired_filtered_data
  let total = 0;
  for (let data of desired_filtered_data) {
    total += data.count;
  }

  // Calcula l'angle inicial per a cada troç del pastís del gràfic basant-se en la proporció de dades per que així sumin 2π radiants
  let angle = 0;
  for (let i = 0; i < desired_filtered_data.length; i++) {
    let data = desired_filtered_data[i];
    let sliceAngle = (data.count / total) * TWO_PI;

    // Determina el color de cada troç de pastís segons la longitud de desired_filtered_data
    colorMode(HSB);
    let colorValue = i * (360 / desired_filtered_data.length);
    fill(color(colorValue, 100, 100));
    arc(
      width / 2 - 100,
      height / 2,
      width / 1.6 - 200,
      height / 1.5,
      angle,
      angle + sliceAngle
    );
    angle += sliceAngle;

    //Mostratge de la llegenda per saber quin valor representa cada torç de pastís
    displayValues(
      color(colorValue, 100, 100),
      desired_filtered_data[i][filterModeSelected],
      chartWidth + 20,
      height - 100,
      i
    );
    colorMode(RGB);
  }
}

// Funció per dibuixar-la en el format lineal
function drawLinearChart() {
  background(220);

  // Determinar el valor màxim de les dades desitjades
  let maxCount = 0;
  for (let i = 0; i < desired_filtered_data.length; i++) {
    if (desired_filtered_data[i].count > maxCount) {
      maxCount = desired_filtered_data[i].count;
    }
  }

  // Dterminar l'eix de la y i el els valors a mostrar depenent del filtratge
  stroke(0);
  fill(255);
  rect(100, 50, chartWidth - 100, height - 100);

  // Cada yStep ens mostra el número i lineas guia per després poder facilitar la interpretació de la quantitat de cada categoria
  fill(0);
  textAlign(RIGHT, CENTER);
  let yStep = 1000;
  for (let i = 0; i <= maxCount + yStep; i += yStep) {
    let y = map(i, 0, maxCount + yStep, height - 50, 50);
    text(i, 80, y);
    stroke(150);
    line(100, y, chartWidth, y);
    stroke(0);
  }

  // Calcula la posició de la x i la y, segons la llargària de l'array i el valor de count respectivament, per poder dibuixar la gràfica lineal
  let xValues = [];
  let yValues = [];
  for (let i = 0; i < desired_filtered_data.length; i++) {
    let x = 125 + (i * (chartWidth - 140)) / (desired_filtered_data.length - 1);
    let y = map(
      desired_filtered_data[i].count,
      0,
      maxCount + yStep,
      height - 100,
      50
    );
    xValues.push(x);
    yValues.push(y);
  }

  // Inicia una forma gràfica sense omplir-la, per poder unir els punts x i y dels valors abans calculats
  beginShape();
  noFill();
  strokeWeight(2);
  for (let i = 0; i < xValues.length; i++) {
    vertex(xValues[i], yValues[i]);
  }
  endShape();

  strokeWeight(1);

  // Dibuix dels punts de la gràfica per cada categoria del filtre
  for (let i = 0; i < desired_filtered_data.length; i++) {
    let x = 125 + (i * (chartWidth - 140)) / (desired_filtered_data.length - 1);
    let y = map(
      desired_filtered_data[i].count,
      0,
      maxCount + yStep,
      height - 100,
      50
    );

    // Determinar el color dels punts depenent de la quantitat de valors en l'array de desired_filtered_data
    colorMode(HSB);
    let colorValue = i * (360 / desired_filtered_data.length);
    fill(color(colorValue, 100, 100));
    ellipse(x, y, 10, 10);

    //Mostratge de la llegenda per saber quin valor representa cada punt/pic de les lineas
    displayValues(
      color(colorValue, 100, 100),
      desired_filtered_data[i][filterModeSelected],
      chartWidth + 20,
      height - 100,
      i
    );
    colorMode(RGB);
  }
}

// Funció per dibuixar-la en el format de bombolles
function drawBubbleChart() {
  background(220);

  // Dibuix de les bombolles depenent de les posicions de l'array bubblePositions
  for (let i = 0; i < desired_filtered_data.length; i++) {
    let { x, y, radius } = bubblePositions[i];

    //Determinar el color de cada bombolla depenent depenent de la quantitat de valors en l'array de desired_filtered_data
    colorMode(HSB);
    let colorValue = i * (360 / desired_filtered_data.length);
    fill(color(colorValue, 100, 100));
    ellipse(x, y, radius * 2, radius * 2);

    //Mostratge de la llegenda per saber quin valor representa cada bombolla
    displayValues(
      color(colorValue, 100, 100),
      desired_filtered_data[i][filterModeSelected],
      chartWidth + 20,
      height - 100,
      i
    );
    colorMode(RGB);
  }
}

// Funció per mostrar el text dels valors de la gràfica al costat dret
function displayValues(colorValue, label, x, heightChart, index) {
  textSize(10);
  let y = (heightChart / desired_filtered_data.length) * index + 1;
  fill(0);
  textAlign(LEFT, CENTER);
  text(label, chartWidth + 35, y + 61);
  fill(colorValue);
  rect(chartWidth + 20, y + 55, 12, 12);
}

// Funció per calcular la posició de les bombolles
function calculateBubblePositions() {
  // Calcula la posició de la bola amb el valor més alt
  let fixedY = height / 5;
  let fixedX = width / 2;
  bubblePositions.push({ x: fixedX, y: fixedY, radius: (fixedY / 4) * 3 });

  // Calcula les posicions per a les altres boles de manera aleatòria
  let numBubbles = desired_filtered_data.length;
  let minRadius = 10;
  let maxRadius = (fixedY / 4) * 3;

  for (let i = 1; i < numBubbles; i++) {
    let x = random(maxRadius, chartWidth - maxRadius); // Random x position
    let y = random(maxRadius, height - maxRadius); // Random y position

    // S'assegura de que les boles no surtin de la pantalla
    let minDistance = maxRadius + minRadius; // Minimum distance between bubbles
    let validPosition = true;

    for (let j = 0; j < i; j++) {
      let distance = dist(x, y, bubblePositions[j].x, bubblePositions[j].y);
      if (
        distance < minDistance ||
        x - maxRadius < 0 ||
        x + maxRadius > width ||
        y - maxRadius < 0 ||
        y + maxRadius > height
      ) {
        validPosition = false;
        break;
      }
    }

    // Afagaix a l'array si la posició és vàlida
    if (validPosition) {
      bubblePositions.push({
        x: x,
        y: y,
        radius: random(minRadius, maxRadius),
      });

      // Si no és vàlida decrementa la i per poder tenir el nombre de bombolles segons la llargària de l'array desired_filtered_data
    } else {
      i--;
    }
  }
}
