# Animation SVG avec Javascript par Tanguy Cavagna

Dans ce post, je vais présenter comment creer une animation avec du SVG dans une page WEB.<br>
Pour pouvoir creer une animation avec du SVG, nous aurons besoin du language Javascript.

## Techniques utilisées
* SVG
* Javascript
* HTML

## Sites utils visités
> :link: https://www.w3schools.com/graphics/svg_intro.asp<br>
> :link: https://www.w3.org/2000/svg ← site utiliser pour la fonction de création d'ennemis en SVG.<br>

## Marche à suivre
* Creer un dossier avec un fichier `index.html` et un auter en `sketch.js`.
  * monDossier
  * ├── index.html
  * └── script.js
  
* Le fichier `index.html` contiendra le code suivant :<br>
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Animation</title>
    <script src="script.js"></script>
  </head>
  <body onkeypress="moveRect(event)">
   <svg id="svg" width="700" height="300" style="background-color: aliceblue">
      <rect id="player" x="350" y="280" width="20" height="20" style="stroke: none; fill: blue;opacity: 0.5"/>
      <g id="noPlayerObjects" class="ennemis"></g>
    </svg>
    <button id="buttonPlay" onclick="Play()">Play</button>
  </body>
  </html>
  ```
  
* Dans le fichier `script.js`, la première ligne à implémenter est
  ```javascript 
  let svgns = "http://www.w3.org/2000/svg"; 
  ```
  
* Ensuite, il vous faudra une methode pour commencer et finir la partie qui se nommera `Play()`.
  ```javascript
  function Play() {}
  ```
  Celle-ci sera appeller par la l'attribut `onclick` 
  ```html 
  <button id="buttonPlay" onclick="Play()">Play</button>
  ``` 
  Au lancement, la fonction devra lancer le timer de création d'ennemis et au deuxième clique, la fonction devra recharger la page.
  
* Puis, il y aura une fonction pour creer chaque ennemis dynamiquement. Cette fonction ce nomme `CreateEnnemis`.
  ```javascript
  function CreateEnnemis() {}
  ```
  Cette fonction pourra creer un ennemi en position 
  ``` javascript
  let x = Math.floor(Math.random() * WIDTH - RECT_WIDTH);
  let y = Math.floor((Math.random() * ((-10) - 5 + 1)) + (-5));
  ```
  Leur taille sera costante. 20 par 20. <br>
  Pour pouvoir creer l'objet SVG, il faudra voir la documentation lié à `document.createElementNS`.<br>
  Pour éditer les attributs, il faudra voir la doc. sur `element.setAttributeNS`;<br>
  > /!\ Le namespace du la fonction mise ci-dessus sera `null` pour notre projet.<br>
  
  Enfin, il auront un timer propre à eux même qui les fera descendre la fenêtre.<br>
  Cette fonction ressemble à ceci :
  ```javascript
  function EnnemisDown(rect) {}
  ```
  > /!\ premièrement, cette methode doit pouvoir gerer le fait que si les ennemis se trouve plus bas que le bas de la page, il doivent    remonter tout en haut avec une position `x` aléatoire.
  
  > /!\ Deuxièmement, cette fonction doit gere le fait que seulement 12 ennemis doivent être presents sur la page.
  Pour modifier les attributs du `rect` donner par le parametre de la fonction, il faudra utiliser `elements.setAttribueNS`.
  
  Après avoir fait cela, il faut ajouter le SVG à la balise `<g id="noPlayerObjects" class="ennemis"></g>` de notre page `index.html` et ajouter 1 au nombre d'ennemis.<br>
  
* Ensuite, la fonction de déplacement du "personnage" ressemble à ceci :
  ```javascript
  function moveRect(event) {}
  ```
  > /!\ L'attribut `onkeypress="MoveRect(event)"` doit être présent sur le body.
  
* Enfin, j'ai utilié une fonction de detection de collision entre SVG déjà creée par une tierse personne.<br>
  Voici le lien vers ce bout de script
  > :link:  http://www.inkfood.com/collision-detection-with-svg/
  Cette fonction est appellé lors d'un `for` parcourant tout les ennemis présents dans la page. Ce `for` ce trouve dans la fonction 
  ```javascript
  function EnnemisDown() {}
  ```
  Pour pouvoir récupérer le nombre d'ennemis dans la balise `<g class="ennmis">`, il faut utiliser
  ```javascript
  let rects = document.getElementById('svg').querySelectorAll('.ennemis > rect');
  ```
  
Le rest du script de mon projet, je vous le fourni dans les fichiers présents dans ce dépôt Github.
