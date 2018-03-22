// © Tanguy Cavagna 22.03.2018

// Variables globales
let svgns = "http://www.w3.org/2000/svg"; // Site pour récuperer le code XML de W4School pour editer du SVG en WEB
let droite = null, gauche = null;
let newX;
let previousKey;
let spawnEnnemis;
let play = false;
let numberOfEnnemis = 0;

// Contantes globales
const WIDTH = 700;
const MOVE_SPEED = 10;
const TIMER_INTERVAL = 50;
const RECT_WIDTH = 20;
const MAX_ENNEMIS = 12;

// Fonction pour commencer le spawn des ennemis
function Play() {
    if (!play) {
        spawnEnnemis = setInterval(CreateEnnemis, 1000);
        buttonPlay.innerHTML = "Restart";
    } else {
        location.reload();
    }

    play = !play;
}

// Fonction pour creer des ennemis dynamiquement
function CreateEnnemis() {
    let x = Math.floor(Math.random() * WIDTH - RECT_WIDTH),
        y = Math.floor((Math.random() * ((-10) - 5 + 1)) + (-5));

    // Création de l'ennemi
    let rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'height', RECT_WIDTH);
    rect.setAttributeNS(null, 'width', RECT_WIDTH);
    rect.setAttributeNS(null, 'fill', '#' + Math.round(0xffffff * Math.random()).toString(16));
    rect.goDown = setInterval(() => EnnemisDown(rect), TIMER_INTERVAL);
    document.getElementById('noPlayerObjects').appendChild(rect);

    numberOfEnnemis++;
}

// Fonction pour deplacer les ennemis
function EnnemisDown(rect) {
    let y = parseInt(rect.getAttribute("y"));
    let x = Math.floor(Math.random() * WIDTH - RECT_WIDTH);

    y += MOVE_SPEED / 2;

    rect.setAttributeNS(null, "y", y);

    if (y > 280) {
        rect.setAttributeNS(null, "y", -5);
        rect.setAttributeNS(null, "x", x);
    }

    // Test le nombre maximum d'ennemis
    if (numberOfEnnemis >= MAX_ENNEMIS) {
        clearInterval(spawnEnnemis);
    }

    let rects = document.getElementById('svg').querySelectorAll('.ennemis > rect'); // Récupère le nombre d'ennemis présents dans la page

    // Pour chaque ennemis, test si il entre en collision avec le joueur
    for (let i = 0; i < rects.length; i++) {
        if (intersectRect(document.getElementById('player'), rects[i])) {
            location.reload();
        }
    }
}

// Fonction prise du site http://www.inkfood.com/collision-detection-with-svg/
function intersectRect(r1, r2) {
    let rr1 = r1.getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT
    let rr2 = r2.getBoundingClientRect();    //BOUNDING BOX OF THE SECOND OBJECT

    //CHECK IF THE TWO BOUNDING BOXES OVERLAP
    return !(rr2.left > rr1.right ||
        rr2.right < rr1.left ||
        rr2.top > rr1.bottom ||
        rr2.bottom < rr1.top);
}

// Fonction de deplacement du joueur
function moveRect(event) {
    let rect = document.getElementById("player");
    let x = rect.getAttribute("x");
    newX = parseInt(x);

    if (event.which == 97 && previousKey != event.which) { // a
        gauche = setInterval(() => aGauche(rect), TIMER_INTERVAL);
        clearOtherInterval(gauche);
        previousKey = event.which;
    } else if (event.which == 100 && previousKey != event.which) { // d
        droite = setInterval(() => aDroite(rect), TIMER_INTERVAL);
        clearOtherInterval(droite);
        previousKey = event.which;
    }

    rect.setAttribute("x", newX);
}

// Fonction pour aller à droite
function aDroite(rect) {
    if (newX < WIDTH - RECT_WIDTH)
        newX += MOVE_SPEED;
    else
        newX = WIDTH - RECT_WIDTH;
    clearOtherInterval(droite);
    rect.setAttribute("x", newX);
}

// Fonction pour aller à gauche
function aGauche(rect) {
    if (newX > 0)
        newX -= MOVE_SPEED;
    else
        newX = 0;

    clearOtherInterval(gauche);
    rect.setAttribute("x", newX);
}

// Fonction pour arreter le timer de déplacement de la direction opposé
function clearOtherInterval(ex) {
    let dir = [gauche, droite];

    for (let d of dir) {
        if (d != ex)
            clearInterval(d);
    }
}
