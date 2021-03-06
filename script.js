 /* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */ 
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
const STARTSCHERM = 3;
const UITLEGSCHERM = 4;
var spelStatus = STARTSCHERM;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_H = 72;
const KEY_ENTER = 13;
const KEY_SPACE = 32;
const KEY_ESC = 27;

var startScore = 0;
var score = 0;

var startSpelerX = 400;
var startSpelerY = 400;
var spelerX = 400; // x-positie van speler
var spelerY = 400; // y-positie van speler
var snelheidSpeler = 2;

var vijandBeweegt = true;
var SnelheidVijand;

var startKogelX = -10;
var startKogelY = 0;
var kogelX = -10; // x-positie van kogel
var kogelY = 0; // y-positie van kogel
var kogelVliegt = false;

var doelwitX = 0;
var doelwitY = 0;
var plaatsAfvurenX = 0;
var plaatsAfvurenY = 0;

var kogelSnelheid = 4; 

var imgGameOver;
var imgUitleg;
var imgMainScreen;
var imgAchtergrond;

var aantalVijand = 3;
var vijandX = []; // array x-posities van vijand
var vijandY = []; // array y-posities van vijand
var richtingVijandX = []; // array richting van x coördinaat van vijand
var richtingVijandY = []; // array richting van y coördinaat van vijand
var correctieSnelheidVijand = []; // array correctie snelheid van vijand
var snelheidVijandY = []; // array snelheid van x coördinaat van vijand
var snelheidVijandX = []; // array snelheid van y coördinaat van vijand

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * functies voor schermen zoals: gameOver, mainScreen, etc
 */

var resetGame = function() {
  spelerX = startSpelerX;
  spelerY = startSpelerY;
  vijandX = [1000, 1100, 1200];
  vijandY = [600, 400, 200];
  kogelX = startKogelX;
  kogelY = startKogelY;
  score = startScore;
}

var mainScreen = function() {
  image(imgMainScreen, 0, 0);
  textStyle(BOLD); // set text style naar bold staat in begint dus geldt voor alle
  textFont("Times New Roman"); // set font staat in het begin geld dus voor alle
  fill(166, 137, 10); // gold
  textSize(100);
  text("THE LOST SOLDIER",125, 200);
  textSize(75);
  text("press space to start game", 200, 550);
  text("press h for help screen", 200, 650);
}

var uitlegscherm = function() {
  image(imgUitleg, 0, 0);
  textSize(50);
  fill("black");
  text("press esc for main screen", 300, 650);
  textSize(75);
  text("try to stay alive",400, 200 );
  textSize(40);
  text("to move", 425, 350);
  text("to shoot", 425, 500);
  text("aim with mouse", 425, 550);
  text("avoid", 900, 400);
}

var gameOverscreen = function() {
  image(imgGameOver, 0, 0);
  textSize(100);
  fill(222, 186, 9); // gold
  text("GAME OVER", 300, 200);
  text("Your score is" ,300, 300);
  text(Math.trunc(score), 550, 400);
  textSize(75);
  text("Press Enter for new game", 225, 500);
  text("press esc for main screen", 225, 600);
}

/**
 * functies voor in de tekenAlles functie
 */

  var vijandKijktRechts = function(vijandX, vijandY) {

    //torso
    fill(3, 6, 84);
    rect(vijandX, vijandY, 30, 50); 
    
    //benen
    //linker been
    fill(255, 255, 255);
    rect(vijandX, vijandY+50, 10, 50); //broek links(voor kijker)
    fill(0, 0, 0);
    rect(vijandX, vijandY+80, 10, 20); //schoen links(voor kijker)
    
    //rechter been
    fill(252, 252, 255);
    rect(vijandX+20, vijandY+50, 10, 50); //broek rechts(voor kijker)
    fill(0, 0, 0);
    rect(vijandX+20, vijandY+80, 10, 20); //schoen rechts(voor kijker)
    
    //rechter arm (schouder achter geweer)
    fill(3, 6, 84);
    rect(vijandX+30, vijandY, 10, 20); //mouw boven stuk (bluaw)
    
    //geweer
    fill(117, 54, 54);
    rect(vijandX, vijandY+10, 85, 8); //houten stuk
    
    fill(105, 101, 101);
    rect(vijandX+25, vijandY+8, 75, 5); //loop
    
    fill(148, 138, 138);
    rect(vijandX+95, vijandY+5, 30, 3);
    
    //arm
    //linker arm (van kijker perspecftief)
    fill(3, 6, 84);
    rect(vijandX-10, vijandY, 10, 25); //mouw boven stuk (bluaw)
    
    fill(3, 6, 84);
    rect(vijandX-10, vijandY+15, 40, 10); //mouw boven stuk onderarm(bluaw)
    
    fill(145, 16, 16);
    rect(vijandX+20, vijandY+15, 10, 10); //mouw onderstuk (rood)
    
    fill(230, 200, 185);
    rect(vijandX+30, vijandY+15, 10, 10); //hand
    
    //hoofd 
    fill(230, 200, 185);
    rect(vijandX+5, vijandY-20, 20, 20); //head
    
    //kraag rood
    fill(145, 16, 16); 
    rect(vijandX+4, vijandY-2, 22, 5); 
    
    //hoed
    fill(0, 0, 0);
    rect(vijandX+3, vijandY-50, 25, 30); //hoed
    fill(201, 168, 0);
    rect(vijandX+10, vijandY-27, 10, 7);// plaat op hoed
    fill(145, 16, 16);
    rect(vijandX+25, vijandY-60, 6, 15); //veer op hoed
  }
  
  
  var vijandKijktLinks = function(vijandX, vijandY) {
    var i=1;
    //torso
    fill(3, 6, 84);
    rect(vijandX, vijandY, 30, 50); 
    
    //benen
    //linker been
    fill(255, 255, 255);
    rect(vijandX, vijandY+50, 10, 50); //broek links(voor kijker)
    fill(0, 0, 0);
    rect(vijandX, vijandY+80, 10, 20); //schoen links(voor kijker)
    
    //rechter been
    fill(252, 252, 255);
    rect(vijandX+20, vijandY+50, 10, 50); //broek rechts(voor kijker)
    fill(0, 0, 0);
    rect(vijandX+20, vijandY+80, 10, 20); //schoen rechts(voor kijker)
    
    //rechter arm (schouder achter geweer)
    fill(3, 6, 84);
    rect(vijandX-10, vijandY, 10, 20); //mouw boven stuk (bluaw)
    
    //geweer
    fill(117, 54, 54);
    rect(vijandX+30, vijandY+10, -85, 8); //houten stuk
    
    fill(105, 101, 101);
    rect(vijandX, vijandY+8, -75, 5); //loop
    
    fill(148, 138, 138);
    rect(vijandX-70, vijandY+5, -30, 3);
    
    //arm
    //linker arm (van kijker perspecftief)
    fill(3, 6, 84);
    rect(vijandX+30, vijandY, 10, 25); //mouw boven stuk (bluaw)
    
    fill(3, 6, 84);
    rect(vijandX+30, vijandY+15, -20, 10); //mouw boven stuk onderarm(bluaw)
    
    fill(145, 16, 16);
    rect(vijandX, vijandY+15, 10, 10); //mouw onderstuk (rood)
    
    fill(230, 200, 185);
    rect(vijandX-10, vijandY+15, 10, 10); //hand
    
    //hoofd 
    fill(230, 200, 185);
    rect(vijandX+5, vijandY-20, 20, 20); //head
    
    //kraag rood
    fill(145, 16, 16); 
    rect(vijandX+4, vijandY-2, 22, 5); 
    
    //hoed
    fill(0, 0, 0);
    rect(vijandX+3, vijandY-50, 25, 30); //hoed
    fill(201, 168, 0);
    rect(vijandX+10, vijandY-27, 10, 7);// plaat op hoed
    fill(145, 16, 16);
    rect(vijandX+25, vijandY-60, 6, 15); //veer op hoed
  }



var spelerKijktRechts = function() {
  //torso
  fill(181, 9, 9);
  rect(spelerX, spelerY, 30, 50); //vest of torso
  
  //riem
  fill(255, 255, 255);
  rect(spelerX, spelerY+35, 30, 5 );
  fill(201, 168, 0);
  rect(spelerX+13, spelerY+35, 5, 5); //gesp
  
  //benen
  //linker been
  fill(12, 15, 138);
  rect(spelerX, spelerY+50, 10, 50); //broek
  fill(0, 0, 0);
  rect(spelerX, spelerY+90, 10, 10); //schoen
  
  //rechter been
  fill(12, 15, 138);
  rect(spelerX+20, spelerY+50, 10, 50); //broek
  fill(0, 0, 0);
  rect(spelerX+20, spelerY+90, 10, 10); //schoen
  
  //rechter arm (schouder achter geweer)
  fill(181, 9, 9);
  rect(spelerX+30, spelerY, 10, 20); //mouw boven stuk (rood)
  
  //geweer
  fill(117, 54, 54);
  rect(spelerX, spelerY+10, 85, 8); //houten stuk
  
  fill(105, 101, 101);
  rect(spelerX+25, spelerY+8, 75, 5); //loop
  
  fill(148, 138, 138);
  rect(spelerX+95, spelerY+5, 30, 3);
  
  //arm
  //linker arm (van user perspecftief)
  fill(181, 9, 9);
  rect(spelerX-10, spelerY, 10, 25); //mouw boven stuk (rood)
  
  fill(181, 9, 9);
  rect(spelerX-10, spelerY+15, 40, 10); //mouw boven stuk onderarm(rood)
  
  fill(12, 15, 138);
  rect(spelerX+20, spelerY+15, 10, 10); //mouw onderstuk (blauw)
  
  fill(230, 200, 185);
  rect(spelerX+30, spelerY+15, 10, 10); //hand
  
  //hoofd
  fill(230, 200, 185);
  rect(spelerX +5, spelerY-20, 20, 20); //head
  
  //kraag blauw
  fill(12, 15, 138);
  rect(spelerX+4, spelerY-2, 22, 5);
  
  //hoed
  fill(0, 0, 0);
  rect(spelerX+3, spelerY-50, 25, 30); //hoed
  fill(192, 192, 192);
  rect(spelerX+10, spelerY-27, 10, 7);// plaat op hoed
}


var spelerKijktLinks = function() {
  //torso
  fill(181, 9, 9);
  rect(spelerX, spelerY, 30, 50); //vest of torso
  
  //riem
  fill(255, 255, 255);
  rect(spelerX, spelerY+35, 30, 5 );
  fill(201, 168, 0);
  rect(spelerX+13, spelerY+35, 5, 5); //gesp
  
  //benen
  //linker been
  fill(12, 15, 138);
  rect(spelerX, spelerY+50, 10, 50); //broek
  fill(0, 0, 0);
  rect(spelerX, spelerY+90, 10, 10); //schoen
  
  //rechter been
  fill(12, 15, 138);
  rect(spelerX+20, spelerY+50, 10, 50); //broek
  fill(0, 0, 0);
  rect(spelerX+20, spelerY+90, 10, 10); //schoen
  
  //rechter arm (schouder achter geweer)
  fill(181, 9, 9);
  rect(spelerX-10, spelerY, 10, 20); //mouw boven stuk (rood)
  
  //geweer
  fill(117, 54, 54);
  rect(spelerX+30, spelerY+10, -85, 8); //houten stuk
  
  fill(105, 101, 101);
  rect(spelerX, spelerY+8, -75, 5); //loop
  
  fill(148, 138, 138);
  rect(spelerX-70, spelerY+5, -30, 3);
  
  //arm
  //linker arm (van user perspecftief)
  fill(181, 9, 9);
  rect(spelerX+30, spelerY, 10, 25); //mouw boven stuk (rood)
  
  fill(181, 9, 9);
  rect(spelerX+30, spelerY+15, -20, 10); //mouw boven stuk onderarm(rood)
  
  fill(12, 15, 138);
  rect(spelerX, spelerY+15, 10, 10); //mouw onderstuk (blauw)
  
  fill(230, 200, 185);
  rect(spelerX-10, spelerY+15, 10, 10); //hand
  
  //hoofd
  fill(230, 200, 185);
  rect(spelerX +5, spelerY-20, 20, 20); //head
  
  //kraag blauw
  fill(12, 15, 138);
  rect(spelerX+4, spelerY-2, 22, 5);
  
  //hoed
  fill(0, 0, 0);
  rect(spelerX+3, spelerY-50, 25, 30); //hoed
  fill(192, 192, 192);
  rect(spelerX+10, spelerY-27, 10, 7);// plaat op hoed
}

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
  if (keyIsDown(KEY_W) && spelerY - 50 > 0) {
    spelerY = spelerY - snelheidSpeler;
  }

  if (keyIsDown(KEY_S) && spelerY + 100 < 720) {
    spelerY = spelerY + snelheidSpeler;
  }

  if (keyIsDown(KEY_A) && spelerX - 10 > 0) {
    spelerX = spelerX - snelheidSpeler;
  }

  if (keyIsDown(KEY_D) && spelerX + 45 < 1280) {
    spelerX = spelerX + snelheidSpeler;
  }

  // vijand
  SnelheidVijand = 1 + (score / 15)
  for (var i = 0; i < aantalVijand; i ++) {
    //afstand van vijand tot speler berekenen
    richtingVijandY[i] = spelerY - vijandY[i];
    richtingVijandX[i] = spelerX - vijandX[i];

    // met pythagoras correctie berekenen voor de goede snelheid
    correctieSnelheidVijand[i] = Math.sqrt(((richtingVijandX[i] * richtingVijandX[i]) + (richtingVijandY[i] * richtingVijandY[i]))) / Math.sqrt(2)

    //snelheid van vijand berekenen
    snelheidVijandY[i] = richtingVijandY[i] / correctieSnelheidVijand[i];
    snelheidVijandX[i] = richtingVijandX[i] / correctieSnelheidVijand[i];

    //vijand bewegen
    if (vijandBeweegt === true) { // vijand beweegt
      vijandY[i] = vijandY[i] + SnelheidVijand * snelheidVijandY[i];
    }
  
    if (vijandBeweegt === true) { // vijand beweegt
      vijandX[i] = vijandX[i] + SnelheidVijand * snelheidVijandX[i];
    }
  }
  
  // kogel
  // opslaan locatie van afvuren en locatie doelwit in een var
  if (mouseIsPressed && kogelVliegt === false) {
    doelwitX = mouseX;
    doelwitY = mouseY;
    plaatsAfvurenX = spelerX;
    plaatsAfvurenY = spelerY;
  }

  // kogel op start locatie zetten en activeren afvuren
  if (kogelVliegt === false && mouseIsPressed) {//schiet
    kogelVliegt = true;
    kogelX = plaatsAfvurenX;
    kogelY = plaatsAfvurenY;
  }

  // richting kogel berekenen
  var richtingY = doelwitY - plaatsAfvurenY;
  var richtingX = doelwitX - plaatsAfvurenX;

  // correctie snelheid berekenen met pythagoras
  var correctieSnelheid = Math.sqrt(((richtingX * richtingX) + (richtingY * richtingY))) / Math.sqrt(2)

  //snelheid berekenen
  var snelheidY = richtingY / correctieSnelheid;
  var snelheidX = richtingX / correctieSnelheid;

  //kogel afvuren
  if (kogelVliegt === true) { // kogel vliegt
    kogelY = kogelY + kogelSnelheid * snelheidY;
  }

  if (kogelVliegt === true) { // kogel vliegt
    kogelX = kogelX + kogelSnelheid * snelheidX;
  }

  // kogel stopt buiten beeld
  if (kogelVliegt === true && kogelY < -8 || 
      kogelVliegt === true && kogelY > 728 ||
      kogelVliegt === true && kogelX < -8 ||
      kogelVliegt === true && kogelX > 1288) { // kogel verdwijnt
    kogelVliegt = false;
  }
    
};

/** 
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  for (var i = 0; i < aantalVijand; i ++) {
    // botsing speler tegen vijand
    if (spelerX - vijandX[i] < 50 &&
        spelerX - vijandX[i] > -50 &&
        spelerY - vijandY[i] < 130 &&
        spelerY - vijandY[i] > -120) {
        console.log("Botsing");
        spelStatus = GAMEOVER;
       }
    
    // botsing kogel tegen vijand
    if (kogelX - vijandX[i] < 50 &&
        kogelX - vijandX[i] > -50 &&
        kogelY - vijandY[i] < 130 &&
        kogelY - vijandY[i] > -120) {
        console.log("kogel raak");
        vijandY[i] = random(-300, 1000);
        vijandX[i] = 1350;
        kogelVliegt = false;
        kogelX = startKogelX;
        kogelY = startKogelY;
    }
  }
  // update punten en health
  score = score + (1 / 60);
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  image(imgAchtergrond, 0, 0);
  
  // vijand
  for (var i = 0; i < aantalVijand; i ++) {
    if (spelerX < vijandX[i]) {
      vijandKijktLinks(vijandX[i], vijandY[i]);
    }
    else {
      vijandKijktRechts(vijandX[i], vijandY[i]);
    }
  }
    
  // kogel
  fill("silver");
  ellipse(kogelX, kogelY, 20, 20);
  
  // speler
  if (mouseX < spelerX) {
    spelerKijktLinks();
  }
  else {
    spelerKijktRechts();
  }
  
  // punten en health
  textSize(40);
  fill(222, 186, 9);
  text(Math.trunc(score), 15, 700);
};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * preload
 * de code in deze functie wordt één keer uitgevoerd 
 *  en laad de foto's
 */

function preload() {
  imgGameOver = loadImage('foto/GameOver.PNG');
  imgUitleg = loadImage('foto/Uitleg.PNG');
  imgMainScreen = loadImage('foto/MainScreen.PNG');
  imgAchtergrond = loadImage('foto/achtergrond.PNG');
}


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');

  vijandX=[1000, 1100, 1200];
  vijandY=[600, 400, 200];
  
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === STARTSCHERM) {
    mainScreen();
    if (keyIsDown(KEY_SPACE)) {
      spelStatus = SPELEN;
    }
    if (keyIsDown(KEY_H)) {
      spelStatus = UITLEGSCHERM;
    }
  }

  if (spelStatus === UITLEGSCHERM) {
    uitlegscherm();
    if (keyIsDown(KEY_ESC)) {
      spelStatus = STARTSCHERM;
    }
  }
  
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    gameOverscreen();
    
    if(keyIsDown(KEY_ESC)) {
      spelStatus = STARTSCHERM;
      resetGame();
    }

    if (keyIsDown(KEY_ENTER)) {
      spelStatus = SPELEN;
      resetGame();
    
  }
  }

}
