let svgns = "http://www.w3.org/2000/svg";
let droite = null, gauche = null;
let newX;
let previousKey;
let spawnEnnemis;
let play = false;
let numberOfEnnemis = 0;

const WIDTH = 700;
const MOVE_SPEED = 10;
const TIMER_INTERVAL = 50;
const RECT_WIDTH = 20;

function Play() {
    if (!play) {
        spawnEnnemis = setInterval(CreateEnnemis, 1000);
        buttonPlay.innerHTML = "Restart";
    } else {
        location.reload();
    }

    play = !play;
}

function CreateEnnemis() {
    let x = Math.floor(Math.random() * WIDTH - RECT_WIDTH),
        y = Math.floor((Math.random() * ((-10) - 5 + 1)) + (-5));

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

function EnnemisDown(rect) {
    let y = parseInt(rect.getAttribute("y"));
    let x = Math.floor(Math.random() * WIDTH - RECT_WIDTH);

    y += MOVE_SPEED / 2;

    rect.setAttributeNS(null, "y", y);

    if (y > 280) {
        rect.setAttributeNS(null, "y", -5);
        rect.setAttributeNS(null, "x", x);
    }

    if (numberOfEnnemis >= 12) {
        clearInterval(spawnEnnemis);
    }

    let rects = document.getElementById('svg').querySelectorAll('.ennemis > rect')

    for (let i = 0; i < rects.length; i++) {
        if (intersectRect(document.getElementById('player'), rects[i])) {
            location.reload();
        }
    }
}

function intersectRect(r1, r2) {
    let rr1 = r1.getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT
    let rr2 = r2.getBoundingClientRect();    //BOUNDING BOX OF THE SECOND OBJECT

    //CHECK IF THE TWO BOUNDING BOXES OVERLAP
    return !(rr2.left > rr1.right ||
        rr2.right < rr1.left ||
        rr2.top > rr1.bottom ||
        rr2.bottom < rr1.top);
}

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

function aDroite(rect) {
    if (newX < WIDTH - RECT_WIDTH)
        newX += MOVE_SPEED;
    else
        newX = WIDTH - RECT_WIDTH;
    clearOtherInterval(droite);
    rect.setAttribute("x", newX);
}

function aGauche(rect) {
    if (newX > 0)
        newX -= MOVE_SPEED;
    else
        newX = 0;

    clearOtherInterval(gauche);
    rect.setAttribute("x", newX);
}

function clearOtherInterval(ex) {
    let dir = [gauche, droite];

    for (let d of dir) {
        if (d != ex)
            clearInterval(d);
    }
}