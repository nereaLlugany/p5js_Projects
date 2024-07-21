var dades_load; // Variable a on carregarem el JSON
var filtered_data = []; //variable per les dades filtrades amb detecció de violència masclista
var desired_filtered_data = []; // Variable per les dades filtrades per l'àmbit que es vol mostrar

var bubblePositions = []; // Variable per guardar les posicions fixes de les bombolles

let chartWidth; // Variable per limitar l'amplada de mostratge de la part gràfica del diagrama

var filterModeSelected; // Variable per guardar el mode de filtratge seleccionat
var chartModeSelected; // Variable per guardar el tipus de gràfica seleccionada
var selectedChartButton = true; // Variable per saber quin dels butons del tipus de diagrama s'ha seleccionat
var selectedFilterButton = true; // Variable per saber quin dels butons del tipus de filtre s'ha seleccionat

//funció que s'executa abans del setup()
function preload() {
  let url =
    "https://analisi.transparenciacatalunya.cat/resource/imk8-b6zj.json?$limit=30000&any=2023"; // URL per accedir al JSON

  dades_load = loadJSON(url); // Carregar el JSON
}

function setup() {
  createCanvas(800, 400);

  // Determinar quan ocupa la part gràfica del diagrama
  chartWidth = (3 / 4) * width;

  // Variable per saber la llargària de larray de les dades JSON
  let data_loaded_length = Object.keys(dades_load).length;

  // Filtrar les dades per les que si han patit violència masclista
  for (let i = 0; i < data_loaded_length; i++) {
    if (dades_load[i].deteccioviolenciamasclista == "Sí") {
      filtered_data.push(dades_load[i]);
    }
  }
  
  //Selecciona els modes de mostreig per defecrte que en aquest cas és l'1 que és de barres i separats per edats
  // Mode del filtre per defecte
  filterModeSelected = "edat"; 
  changeFilter("edat");
  // Mode del diagrama per defecte
  chartModeSelected = 1; 

  // Creació i establiment del estil dels botons per seleccionar el tipus de diagrama
  createP();
  diagramS = createSpan("Tria el tipus del diagrama:");
  diagramS.style("font-size", "18px");

  createP();

  buttonBars = createButton("Diagrama de Barres");
  buttonChangeStyle(buttonBars);

  buttonPie = createButton("Diagrama de Pastís");
  buttonChangeStyle(buttonPie);

  buttonLineal = createButton("Diagrama de Lineal");
  buttonChangeStyle(buttonLineal);

  buttonBubble = createButton("Diagrama de Bombolla");
  buttonChangeStyle(buttonBubble);

  // Assignació de la funció al premer el butó corresponent encarregada de canviar el tipus de gràfica i poder dibuixar-la correctament. També establir un color diferent al premer el butó
  buttonBars.mouseClicked(function () {
    buttonChangeColor(buttonBars, "skyblue", true);
    changeChartMode(1);
  });

  buttonPie.mouseClicked(function () {
    buttonChangeColor(buttonPie, "skyblue", true);
    changeChartMode(2);
  });

  buttonLineal.mouseClicked(function () {
    buttonChangeColor(buttonLineal, "skyblue", true);
    changeChartMode(3);
  });

  buttonBubble.mouseClicked(function () {
    buttonChangeColor(buttonBubble, "skyblue", true);
    changeChartMode(4);
  });

  // Creació i establiment del estil dels botons per seleccionar el tipus de filtre
  createP();
  filterS = createSpan("Tria el tipus de filtre:");
  filterS.style("font-size", "18px");
  createP();

  buttonAge = createButton("Edat");
  buttonChangeStyle(buttonAge);

  buttonScoupe = createButton("Àmbit");
  buttonChangeStyle(buttonScoupe);

  buttonFormation = createButton("Nivell de formació");
  buttonChangeStyle(buttonFormation);

  buttonEntry = createButton("Canal d’entrada");
  buttonChangeStyle(buttonEntry);

  // Assignació de la funció al premer el butó corresponent encarregada de canviar el tipus de gràfica i poder dibuixar-la correctament. També establir un color diferent al premer el butó
  buttonAge.mouseClicked(function () {
    filterModeSelected = "edat";
    changeFilter("edat");
    buttonChangeColor(buttonAge, "turquoise", false);
  });

  buttonScoupe.mouseClicked(function () {
    filterModeSelected = "ambit";
    changeFilter("ambit");
    buttonChangeColor(buttonScoupe, "turquoise", false);
  });

  buttonFormation.mouseClicked(function () {
    filterModeSelected = "nivelldeformacio";
    changeFilter("nivelldeformacio");
    buttonChangeColor(buttonFormation, "turquoise", false);
  });

  buttonEntry.mouseClicked(function () {
    filterModeSelected = "canaldentrada";
    changeFilter("canaldentrada");
    buttonChangeColor(buttonEntry, "turquoise", false);
  });
  
  //Selecciona els butons de mostreig per defecrte que en aquest cas és el diagrama de barres separats per edats
  // Tipus de diagrama per defecte
  buttonChangeColor(buttonBars, "skyblue", true); 
  // Filtre per defecre
  buttonChangeColor(buttonAge, "turquoise", false); 

}

function draw() {
  background(220);

  // Dibuix del gràfic segons el tipus de diagrama i filtre
  drawChart();
}

// Funció per poder agafar només els valors de l'array filtered_data segons el tipus de filtre seleccionat prèviament.
function changeFilter(filterMode) {
  desired_filtered_data = [];

  // Recòrrer l'rray i mirar si coincideix la clau del array amb el de l'array desitjat
  for (let i = 0; i < filtered_data.length; i++) {
    if (filtered_data[i][filterMode]) {
      let found = false;
      for (let j = 0; j < desired_filtered_data.length; j++) {
        // Si coincideix hi suma una al valor count que ens diu la quantitat que hi ha
        if (
          desired_filtered_data[j][filterMode] === filtered_data[i][filterMode]
        ) {
          desired_filtered_data[j].count++;
          found = true;
        }
      }

      // Si no ha trobat un valor, afageix a l'array desired_filtered_data un nou objecte com a clau amb el valor de la clau de l'array anterior i com a valor 1 per ser la primera vegada
      if (!found) {
        let newObj = {};
        newObj[filterMode] = filtered_data[i][filterMode];
        newObj.count = 1;
        desired_filtered_data.push(newObj);
      }
    }
  }

  // Calcular les posicions de les bombolles depenent de quants valors hi ha en l'array
  calculateBubblePositions();
}

// Funció per canviar el tipus de diagrama
function changeChartMode(chartMode) {
  chartModeSelected = chartMode;
}

// Funció per dibuixar una gràfica o una altre depenent del botó seleccionat
function drawChart() {
  switch (chartModeSelected) {
    case 1:
      drawBarChart();
      break;
    case 2:
      drawPieChart();
      break;
    case 3:
      drawLinearChart();
      break;
    case 4:
      drawBubbleChart();
      break;
  }
}

// Funció per poder canviar només el color del botó seleccionat
function buttonChangeColor(button, colorButton, isChartButton) {
  if (isChartButton) {
    // Resetejar el color quan es selecciona un altre botó del tipus de diagrama si no és el sleccionat
    if (selectedChartButton !== true) {
      selectedChartButton.style("background-color", "");
    }
    selectedChartButton = button;

    // Resetejar el color quan es selecciona un altre botó del tipus de filtre si no és el sleccionat
  } else {
    if (selectedFilterButton !== true) {
      selectedFilterButton.style("background-color", "");
    }
    selectedFilterButton = button;
  }

  // Sí és el seleccionat el posa del color passat com a paràmetre
  button.style("background-color", colorButton);
}

// Funció per canviar l'estètica dels botons
function buttonChangeStyle(button) {
  button.style("padding", "10px");
  button.style("margin", "5px");
  button.style("font-size", "16px");
}
