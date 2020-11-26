"use strict";

// PROYECTO FINAL

/********
    Para el proyecto final, decidí hacer una versión web de un juego de
    mesa de creación propia, porque pensé que iba a ser entretenido. Spoiler
    alert: tenía razón, pero si tienen una máquina del tiempo me la prestan
    así vuelvo y me pego un tiro antes de pensar eso porque por Dios hacer
    un juego sin usar un canvas o alguna librería gráfica es un quilombo.

    La lógica está prácticamente terminada, y el juego puede jugarse de
    principio a fin, si los bugs lo permiten. Lo principal ahora sería agregar
    o modificar cosas en base a los contenidos que iremos viendo las próximas
    clases (JQuery y eso). Y corregir bugs. Muchos, muchos bugs.

    Si quieren ver las reglas completas, están en un PDF en la carpeta Extras.
    Y si les pinta probarlo, todo comentario es bienvenido. ;-)
*********/

/* VARIABLES Y CONSTANTES */
var HP = "HP";
var SWORD = "Sword";
var SHIELD = "Shield";
var ACC = "Accessory";
var ENEMY = "Enemy";
var CAMP = "Camp";
var DRAGON = "Dragon";
var PRINCE = "Prince";
var PLAYING = "Playing";
var GAME_OVER = "Game Over";
var NO_STANCE = "no-stance"; // las posiciones usan los nombres de los IDs del HTML.

var OFFENSIVE = "off-stance";
var DEFENSIVE = "def-stance";
var IMG_DIE_1 = "assets/images/inverted-dice-1.png";
var IMG_DIE_2 = "assets/images/inverted-dice-2.png";
var IMG_DIE_3 = "assets/images/inverted-dice-3.png";
var IMG_DIE_4 = "assets/images/inverted-dice-4.png";
var IMG_DIE_5 = "assets/images/inverted-dice-5.png";
var IMG_DIE_6 = "assets/images/inverted-dice-6.png";
var IMG_CARD = "assets/images/card-random.png";
var IMG_CAMP = "assets/images/camping-tent.png";
var IMG_DRAGON = "assets/images/spiked-dragon-head.png";
var IMG_PRINCE = "assets/images/heart-tower.png";
var IMG_KOBOLD = "assets/images/triton-head.png";
var IMG_SLIME = "assets/images/vile-fluid.png";
var IMG_SWORD = "assets/images/two-handed-sword.png";
var IMG_SHIELD = "assets/images/checked-shield.png";
var IMG_COMPASS = "assets/images/compass.png";
var IMG_POTION = "assets/images/health-potion.png";
var IMG_DEAD = "assets/images/skull-crossed-bones.png";
var IMG_LOOTED = "assets/images/open-chest.png";
var DESC_TEXT = document.getElementById("desc-text");
var DICE_1 = document.getElementById("dice-1");
var DICE_2 = document.getElementById("dice-2");
var COMBAT_DICE = document.getElementById("combat-dice");
var ROLL_BUTTON = document.getElementById("roll-button");
var ROLL_COMBAT_BUTTON = document.getElementById("roll-combat-button");
var MAP_BUTTON_1_1 = document.getElementById("btn-1-1");
var MAP_BUTTON_1_2 = document.getElementById("btn-1-2");
var MAP_BUTTON_1_3 = document.getElementById("btn-1-3");
var MAP_BUTTON_1_4 = document.getElementById("btn-1-4");
var MAP_BUTTON_1_5 = document.getElementById("btn-1-5");
var MAP_BUTTON_1_6 = document.getElementById("btn-1-6");
var MAP_BUTTON_2_1 = document.getElementById("btn-2-1");
var MAP_BUTTON_2_2 = document.getElementById("btn-2-2");
var MAP_BUTTON_2_3 = document.getElementById("btn-2-3");
var MAP_BUTTON_2_4 = document.getElementById("btn-2-4");
var MAP_BUTTON_2_5 = document.getElementById("btn-2-5");
var MAP_BUTTON_2_6 = document.getElementById("btn-2-6");
var MAP_BUTTON_3_1 = document.getElementById("btn-3-1");
var MAP_BUTTON_3_2 = document.getElementById("btn-3-2");
var MAP_BUTTON_3_3 = document.getElementById("btn-3-3");
var MAP_BUTTON_3_4 = document.getElementById("btn-3-4");
var MAP_BUTTON_3_5 = document.getElementById("btn-3-5");
var MAP_BUTTON_3_6 = document.getElementById("btn-3-6");
var MAP_BUTTON_4_1 = document.getElementById("btn-4-1");
var MAP_BUTTON_4_2 = document.getElementById("btn-4-2");
var MAP_BUTTON_4_3 = document.getElementById("btn-4-3");
var MAP_BUTTON_4_4 = document.getElementById("btn-4-4");
var MAP_BUTTON_4_5 = document.getElementById("btn-4-5");
var MAP_BUTTON_4_6 = document.getElementById("btn-4-6");
var MAP_BUTTON_5_1 = document.getElementById("btn-5-1");
var MAP_BUTTON_5_2 = document.getElementById("btn-5-2");
var MAP_BUTTON_5_3 = document.getElementById("btn-5-3");
var MAP_BUTTON_5_4 = document.getElementById("btn-5-4");
var MAP_BUTTON_5_5 = document.getElementById("btn-5-5");
var MAP_BUTTON_5_6 = document.getElementById("btn-5-6");
var MAP_BUTTON_6_1 = document.getElementById("btn-6-1");
var MAP_BUTTON_6_2 = document.getElementById("btn-6-2");
var MAP_BUTTON_6_3 = document.getElementById("btn-6-3");
var MAP_BUTTON_6_4 = document.getElementById("btn-6-4");
var MAP_BUTTON_6_5 = document.getElementById("btn-6-5");
var MAP_BUTTON_6_6 = document.getElementById("btn-6-6");
var NEW_GAME_BUTTON = document.getElementById("new-game");
var LOAD_GAME_BUTTON = document.getElementById("load-game");
var SAVE_GAME_BUTTON = document.getElementById("save-game");
var CONTINUE = document.getElementById("continue-button"); // Este si al final no lo uso, lo tengo que borrar.

var CONTROL_PANELS = document.getElementsByClassName("control-panel");
var STANCE_BUTTONS = document.getElementsByClassName("stance-button");
var movementDice = [-1, -1];
var currentPos = [1, 1];
var chosenStance = NO_STANCE;
var player = "";
var map = "";
var tileDeck = [];
var gameState = GAME_OVER;
/* OBJETOS */

var Player = function Player() {
  var _this = this;

  var hp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
  var swords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var shields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var accessories = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  // Player contiene la información del personaje jugador.
  this.hp = hp;
  this.maxhp = hp; // La vida máxima es igual a la vida inicial, en principio.

  this.swords = swords;
  this.shields = shields;
  this.accessories = accessories;
  var position = {
    x: 0,
    y: 0
  };

  this.setPosition = function (x, y) {
    position.x = x;
    position.y = y;
  };

  this.getPosition = function () {
    return [position.x, position.y];
  };

  this.loseHP = function (value) {
    // Restamos (o sumamos, si es negativo) el valor al HP.
    _this.hp -= value; // Nos aseguramos de que la vida actual no supere la vida máxima, en caso de curación.

    _this.hp = Math.min(_this.hp, _this.maxhp);
  };

  this.changeItem = function (item, amount) {
    // Función para modificar la cantidad de objetos que lleva el jugador.
    switch (item) {
      // Usamos un switch para ver el tipo de objeto a modificar.
      case SWORD:
        _this.swords += amount;
        break;

      case SHIELD:
        _this.shields += amount;
        break;

      case ACC:
        _this.accessories += amount;
        break;

      case HP:
        // Consideramos la vida como un item a efectos prácticos.
        _this.maxhp += amount;
        _this.hp += amount;
        break;
    }
  };
};

var Tile = function Tile(type, name) {
  var _this2 = this;

  var damage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var specialSkill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // En los Tiles guardamos todos los datos de las fichas.
  // Inicializamos el objeto.
  this.type = type;
  this.name = name;
  this.damage = damage; // El Campamento y el Príncipe tienen "daño negativo", o sea curan.

  this.specialSkill = specialSkill; // La única habilidad especial es la de la Baba ácida, así que usamos un simple booleano para confirmarlo.

  var isAlive = true; // Si el enemigo está muerto o el item ya ha sido recogido, no queremos que haga acciones.

  this.takeAction = function () {
    var chosenStance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NO_STANCE;
    var newText = "";

    switch (_this2.type) {
      case ENEMY:
        doDamage(chosenStance, _this2.damage);

        if (chosenStance == DEFENSIVE) {
          // Si el jugador está usando la posición defensiva, no puede sufrir efectos adicionales, así que salimos del case.
          break;
        }

        if (_this2.specialSkill && player.swords > 0) {
          // Si es una Baba ácida, destruye su arma.
          player.changeItem(SWORD, -1);
        }

        if (player.accessories > 0) {
          // Si lleva un compás, se rompe.
          player.changeItem(ACC, -1);
        }

        break;

      case CAMP:
        newText = "Regresas a tu Campamento, convenientemente ubicado a la entrada de las Cuevas del Peligro.";

        if (player.hp < player.maxhp) {
          // El jugador recupera un punto de vida, hasta el máximo.
          player.loseHP(_this2.damage);
          newText = newText.concat("<br>", "Un breve descanso te recupera la salud.");
        }

        if (player.swords == 0) {
          // El jugador recupera un arma, si no tiene.
          player.changeItem(SWORD, 1);
          newText = newText.concat("<br>", "Aprovechas también para llevarte un arma nueva.");
        } // Mostramos el panel de dados y cambiamos el texto.


        DESC_TEXT.innerHTML = newText;
        showPanel("dice-roller");
        break;

      case DRAGON:
        if (player.shields > 0) {
          // Si el jugador lleva al menos un escudo, el Dragón lo daña.
          doDamage(chosenStance, _this2.damage); // Y también le destruye un escudo.

          player.changeItem(SHIELD, -1);
        } else {
          // Sin escudos, perder ante el Dragón es un game over instantáneo.
          player.hp = -1;
        }

        break;

      case PRINCE:
        newText = "Has llegado a la Torre donde está capturado el Príncipe.";
        var dragon = map.checkMapPos(3, 3);
        console.log(dragon);

        if (dragon.isAlive()) {
          newText = newText.concat("<br>", '"No pienso marcharme mientras esta bestia esté ahí fuera", te dice.');

          if (player.hp < player.maxhp) {
            // El jugador recupera un punto de vida, hasta el máximo.
            player.loseHP(_this2.damage);
            newText = newText.concat(" ", '"Aunque al menos puedo tratar tus heridas".');
          }

          if (player.shields == 0) {
            // El jugador consigue un escudo, si no tiene.
            player.changeItem(SHIELD, 1);
            newText = newText.concat(" ", 'Acto seguido, te enchufa un Escudo en las manos y te larga para afuera. "Vamos, a continuar la aventura."');
          } else {
            newText = newText.concat(" ", 'Acto seguido, te mira con una cara que dice "cuando quieras ir a matar a la bestia, yo no tengo drama, viste."');
          }

          showPanel("dice-roller");
        } else {
          newText = newText.concat("<br>", 'El Príncipe salta de alegría al verte. "¡Has acabado con esa bestia inmuda! Ahora puedo volver a mi reino. Ven conmigo, y mi padre te llenará de riquezas." ¡HAS GANADO!'); // Cambiamos el estado para representar que el juego terminó.

          gameState = GAME_OVER;
        } // Cambiamos el texto.


        DESC_TEXT.innerHTML = newText;
        break;

      case SWORD:
        // El jugador consigue un arma.
        player.changeItem(SWORD, 1); // "Recogemos" el arma.

        _this2.die(); // Mostramos el panel de dados y cambiamos el texto.


        DESC_TEXT.innerText = "¡Encontraste una Espada!";
        showPanel("dice-roller");
        break;

      case SHIELD:
        // El jugador consigue un escudo.
        player.changeItem(SHIELD, 1); // "Recogemos" el escudo.

        _this2.die(); // Mostramos el panel de dados y cambiamos el texto.


        DESC_TEXT.innerText = "¡Encontraste un Escudo!";
        showPanel("dice-roller");
        break;

      case ACC:
        // El jugador consigue un compás.
        player.changeItem(ACC, 1); // "Recogemos" el compás.

        _this2.die(); // Mostramos el panel de dados y cambiamos el texto.


        DESC_TEXT.innerText = "¡Encontraste una Brújula!";
        showPanel("dice-roller");
        break;

      case HP:
        // El jugador consigue una poción.
        player.changeItem(HP, 1); // "Recogemos" la poción.

        _this2.die(); // Mostramos el panel de dados y cambiamos el texto.


        DESC_TEXT.innerText = "¡Encontraste una Poción de Vida!";
        showPanel("dice-roller");
        break;
    }
  };

  this.die = function () {
    // Matamos el enemigo o recogemos el objeto.
    isAlive = false;
  };

  this.isAlive = function () {
    return isAlive;
  };
};

var Map = function Map(width, height) {
  // Objeto mapa, contiene métodos para inicializar el mapa al principio del juego.
  // El mapa contiene dos matrices: la primera representa las fichas, y la segunda indica si están reveladas u ocultas.
  var mapGrid = createEmptyGrid(width, height);
  var revealGrid = createEmptyGrid(width, height);

  function createEmptyGrid(width, height) {
    // Una pequeña función para crear matrices vacías.
    var newGrid = [];

    for (var y = 0; y < height; y++) {
      newGrid.push([]);

      for (var x = 0; x < width; x++) {
        newGrid[y].push("");
      }
    }

    return newGrid;
  }

  this.populateMap = function (deck) {
    // Llenar el mapa de fichas.
    // Primero barajamos el mazo.
    shuffleDeck(deck); // Primero iteramos en Y...

    mapGrid.forEach(function (itemY, posY) {
      // ...y en X...
      itemY.forEach(function (itemX, posX) {
        // ...y según la posición, asignamos una ficha.
        if (posX + 1 == 1 && posY + 1 == 1) {
          // En la esquina superior izquierda va el Campamento.
          mapGrid[posY][posX] = new Tile(CAMP, "Campamento", -1);
          revealGrid[posY][posX] = true;
        } else if (posX + 1 == 3 && posY + 1 == 3) {
          // El Dragón siempre está en el medio del mapa, en 3, 3.
          mapGrid[posY][posX] = new Tile(DRAGON, "Dragón", 1);
          revealGrid[posY][posX] = true;
        } else if (posX + 1 == 6 && posY + 1 == 6) {
          // El Príncipe está en la esquina opuesta al Campamento.
          mapGrid[posY][posX] = new Tile(PRINCE, "Príncipe", -1);
          revealGrid[posY][posX] = true;
        } else {
          // Llenamos el resto de fichas aleatorias ocultas.
          mapGrid[posY][posX] = deck.pop();
          revealGrid[posY][posX] = false;
        }
      });
    });
  };

  this.checkMapPos = function (x, y) {
    // Revisar qué hay en una ubicación X,Y del mapa.
    return mapGrid[y - 1][x - 1];
  };

  this.isRevealed = function (x, y) {
    // Revisar si la ficha en la ubicación X,Y está revelada o no.
    return revealGrid[y - 1][x - 1];
  };

  this.revealTile = function (x, y) {
    // Revelar la ficha en la posición X,Y.
    revealGrid[y - 1][x - 1] = true;
  };

  this.getMapGrid = function () {
    return mapGrid;
  };

  this.setMapGrid = function (newMapGrid) {
    mapGrid = newMapGrid;
  };

  this.getRevealGrid = function () {
    return revealGrid;
  };

  this.setRevealGrid = function (newRevealGrid) {
    revealGrid = newRevealGrid;
  };
};
/* FUNCIONES */


function newGame() {
  // Creamos un nuevo personaje jugador.
  player = new Player(); // Creamos un nuevo mapa vacío.

  map = new Map(6, 6); // Poblamos el mapa.

  map.populateMap(); // Cambiamos el estado del juego a "jugando".

  gameState = PLAYING; // Actualizamos la parte gráfica.

  update(); // Ocultamos los paneles innecesarios.

  hidePanel("combat-roller");
  hidePanel("combat-results");
  hidePanel("dice-results");
  hidePanel("continue-panel"); // Y dejamos el botón de dados de movimiento y el inventario.

  showPanel("inventory-panel");
  showPanel("dice-roller"); // Por último, un lindo mensaje descriptivo.

  DESC_TEXT.innerText = "¡Bienvenido a Rescate Real! Para comenzar, tira los dados pulsando el botón que figura debajo.";
}

function saveGame() {
  // Creamos dos nuevas variables para guardar los datos "stringifiados".
  var stringPlayer = JSON.stringify(player);
  var stringMapGrid = JSON.stringify(map.getMapGrid());
  var stringRevealGrid = JSON.stringify(map.getRevealGrid());
  var stringDesc = DESC_TEXT.innerText; // Guardamos los datos en el storage.

  localStorage.setItem("player", stringPlayer);
  localStorage.setItem("mapGrid", stringMapGrid);
  localStorage.setItem("revealGrid", stringRevealGrid);
  localStorage.setItem("desc", stringDesc);
}

function loadGame() {
  var stringPlayer = localStorage.getItem("player");
  var stringMapGrid = localStorage.getItem("mapGrid");
  var stringRevealGrid = localStorage.getItem("revealGrid");
  var stringDesc = localStorage.getItem("desc");

  if (stringPlayer == "") {
    // Si no hay datos guardados en el storage, no hacemos nada.
    return;
  } else {
    // Si los hay, reemplazamos player y map por los valores guardados.
    player = JSON.parse(stringPlayer);
    map = new Map(6, 6);
    map.setMapGrid(JSON.parse(stringMapGrid));
    map.setRevealGrid(JSON.parse(stringRevealGrid));
    console.log(map);
    DESC_TEXT.innerText = stringDesc; // Actualizamos el mapa y el inventario.

    update();
  }
}

function rollMovement(event) {
  // Primero, revisamos si el jugador tiene una Brújula.
  if (player.accessories == 0) {
    // Si no tiene, tira ambos dados.
    movementDice = [rollDie(), rollDie()];
  } else {
    // Si tiene, tira un solo dado.
    var newDice = rollDie(); //El segundo dado recibe el mismo valor que el primero.

    movementDice = [newDice, newDice];
  } // Luego, cambiamos la imagen de los dados en el panel de control.


  changeDiceImg(DICE_1, movementDice[0]);
  changeDiceImg(DICE_2, movementDice[1]); // Le agregamos un borde a los botones seleccionables.

  addSelectable(movementDice[0], movementDice[1]);
  addSelectable(movementDice[1], movementDice[0]); // No importa si los dos dados son iguales, el borde sólo se agrega una vez.
  // Cambiamos el texto descriptivo.

  DESC_TEXT.innerText = "Elige en el tablero la casilla a la que deseas moverte."; // Finalmente, mostramos el panel de control y ocultamos el de los dados y el de combate, si llegase a estar.

  hidePanel("dice-roller");
  hidePanel("combat-results");
  showPanel("dice-results");
}

function processMovement(event) {
  // Primero, guardamos el ID del botón pulsado.
  var buttonId = event.target.id; // Luego, sacamos las coordenadas del ID.

  var newY = buttonId[4];
  var newX = buttonId[6];

  if (newX == movementDice[0] && newY == movementDice[1] || newY == movementDice[0] && newX == movementDice[1]) {
    // Si el botón presionado se corresponde a alguna combinación de los dados, primero reseteamos los dados.
    movementDice = [-1, -1]; // Luego, reseteamos los bordes.

    removeSelectable(newX, newY);
    removeSelectable(newY, newX); // También ocultamos el panel de movimiento.

    hidePanel("dice-results"); // Cambiamos la posiciòn del jugador a la nueva casilla.

    player.setPosition(newX, newY); // Y cambiamos los bordes para representarlo.

    removeBorder();
    addBorder(newX, newY); // Finalmente, procesamos el tile correspondiente al espacio clickeado y guardamos el valor de la posición actual.

    processTile(newX, newY);
  }
}

function processTile(x, y) {
  // Obtenemos el objeto en la posición X, Y.
  var tile = map.checkMapPos(x, y); // Primero confirmamos si el objeto está vivo.

  if (tile.isAlive()) {
    // Si no está revelado, lo revelamos.
    if (!map.isRevealed(x, y)) {
      map.revealTile(x, y);
      changeImage(tile, x, y);
    } // Luego, chequeamos el tipo.


    switch (tile.type) {
      case ENEMY:
      case DRAGON:
        // Si es un enemigo o el Dragón, preparamos el combate.
        preProcessCombat(tile);
        break;

      default:
        // Si no es un enemigo, procesamos el tile sin combate.
        tile.takeAction();
        break;
    }
  } else {
    // Si ya matamos / looteamos ese espacio, cambiamos el mensaje para que lo indique.
    DESC_TEXT.innerText = "Vuelves a un espacio que ya habías recorrido antes. ¿Cómo sabes que ya lo habías recorrido, si no puedes orientarte? Fácil, por el rastro de cadáveres y/o cofres vacíos."; // Y activamos el panel para volver a movernos.

    showPanel("dice-roller");
  }
}

function preProcessCombat(tile) {
  // Modificamos el texto descriptivo para que anuncie combate.
  var newText = "¡Combate!";

  switch (tile.type) {
    case DRAGON:
      newText = newText.concat(" ", "El Dragón se planta frente a ti, listo para achicharrarte.");

      if (player.shields == 0) {
        newText = newText.concat(" ", "Si tuvieras un escudo, podrías aguantar al menos unos segundos, pero como está la cosa, tu mejor (y única) opción es intentar huir.");
      } else {
        newText = newText.concat(" ", "Gracias a tu escudo, puedes resistir por unos segundos las terribles llamaradas. ¡Es tu oportunidad para mostrarle quién manda!");
      }

      break;

    case ENEMY:
      if (tile.specialSkill) {
        newText = newText.concat(" ", "Una Baba Ácida se cruza en tu camino. Puedes intentar matarla, pero sus propiedades corrosivas se llevaran tu espada consigo.");
      } else {
        newText = newText.concat(" ", "Un Kobold, vil siervo del Dragón, te ataca sin piedad. ¡Muelelo a golpes!");
      }

      break;
  }

  if (player.swords == 0) {
    newText = newText.concat(" ", "...Por cierto, ¿has notado que no llevas ninguna espada? Porque no llevas ninguna espada.");
  }

  DESC_TEXT.innerText = newText; // Mostramos el panel de combate.

  showPanel("combat-roller");
}

function rollCombat(event) {
  // Ocultamos el panel de combate.
  hidePanel("combat-roller"); // Identificamos al enemigo.

  var currentPos = player.getPosition();
  var nextEnemy = map.checkMapPos(currentPos[0], currentPos[1]); // Procesamos el combate.

  processCombat(nextEnemy);
}

function processCombat(enemy) {
  // Primero, tiramos un dado de 6 caras.
  var die = rollDie(); // Mostramos el panel de resultado del combate.

  changeDiceImg(COMBAT_DICE, die);
  showPanel("combat-results"); // Si usamos alguna posición especial, le sumamos 1 al dado.

  if (chosenStance != NO_STANCE) {
    die += 1;
  } // Revisamos el tipo de enemigo al que nos enfrentamos, y comparamos el resultado.


  if (enemy.type == DRAGON && die >= 5 || enemy.type == ENEMY && die >= 4) {
    // Más de 4 (o 5, para el Dragón), matamos al enemigo, siempre que no hayamos usado la posición defensiva.
    enemy.die(); // Cambiamos la imagen.

    var _currentPos = player.getPosition();

    changeImage(enemy, _currentPos[0], _currentPos[1]); // Actualizamos el texto.

    DESC_TEXT.innerText = "Derrotaste al enemigo"; //TODO
    // Y volvemos a mostrar el botón de movimiento.

    showPanel("dice-roller");
  } else {
    // Menos de eso, el enemigo nos daña a nosotros, con modificadores según la posición que hayamos tomado.
    enemy.takeAction(); // Chequeamos que no hayamos tenido un game over.

    if (player.hp < 0) {
      // Mostramos el mensaje correspondiente.
      DESC_TEXT.innerText = "Game over!"; // TODO.
      // Y cambiamos el game state.

      gameState = GAME_OVER;
    } else {
      // Caso contrario, mostramos otros mensajes.
      DESC_TEXT.innerText = "El enemigo te pega duro."; // TODO.
      // Y luego el panel de movimiento.

      showPanel("dice-roller");
    }
  }
}

function changeStance(event) {
  // Guardamos la ID del botón presionado.
  buttonId = event.target.id;

  if (buttonId == "") {
    // Si se presiona la imagen, no se guarda ID, así que llamamos al nodo padre (el botón).
    buttonId = event.target.parentNode.id;
  } // Cambiamos la posición al ID del botón. Las constantes de posición usan estas mismas IDs.


  chosenStance = buttonId;
}

function doDamage(chosenStance, damage) {
  if (chosenStance == OFFENSIVE) {
    damage *= 2;
  }

  player.loseHP(damage);
}

function processGameOver() {
  if (player.hp < 0) {
    // Primero, mostramos un mensaje de game over.
    DESC_TEXT.innerText = "¡Has muerto! Para jugar otra vez, pulsa Nueva partida en el menú principal."; // Acá ocultamos todos los menúes, pero todavía no sé cómo interactuar con el CSS así que será después.
    // Por último, cambiamos el gameState.

    gameState = GAME_OVER;
  }
}

function hidePanel(oldPanel) {
  CONTROL_PANELS.namedItem(oldPanel).classList.add("d-none");
}

function showPanel(newPanel) {
  CONTROL_PANELS.namedItem(newPanel).classList.remove("d-none");
}

function addSelectable(x, y) {
  var buttonId = "btn-" + String(y) + "-" + String(x);
  document.getElementById(buttonId).classList.add("selectable-square");
}

function removeSelectable(x, y) {
  var buttonId = "btn-" + String(y) + "-" + String(x);
  document.getElementById(buttonId).classList.remove("selectable-square");
}

function addBorder(x, y) {
  var buttonId = "btn-" + String(y) + "-" + String(x);
  document.getElementById(buttonId).classList.add("current-square");
}

function removeBorder() {
  document.getElementsByClassName("current-square")[0].classList.remove("current-square");
}

function update() {
  updateBoard();
  updateInventory();
}

function updateBoard() {
  // Actualizar todos los gráficos del mapa.
  // Primero, obtenemos el mapGrid.
  var mapGrid = map.getMapGrid(); // Iteramos en la grilla...

  mapGrid.forEach(function (itemY, posY) {
    itemY.forEach(function (itemX, posX) {
      // Obtenemos el tile en esa posición.
      var tile = map.checkMapPos(posX + 1, posY + 1);
      console.log(tile); // Actualizamos la imagen de cada ficha.

      changeImage(tile, posX + 1, posY + 1);
    });
  });
}

function updateInventory() {
  // TODO.
  return;
}

function changeImage(tile, x, y) {
  var newImage = ""; // Acá guardamos la imagen que vamos a usar.

  var imgId = "img"; // Acá guardamos el ID del objeto <img> que vamos a modificar. Todos empiezan con img, así que le ponemos eso.
  // Primero confirmamos si el tile está vivo o no.

  if (tile.isAlive()) {
    // Si lo está, lo cambiamos por la imagen correspondiente al tipo.
    switch (tile.type) {
      case CAMP:
        newImage = IMG_CAMP;
        break;

      case DRAGON:
        newImage = IMG_DRAGON;
        break;

      case PRINCE:
        newImage = IMG_PRINCE;
        break;

      case ENEMY:
        if (tile.specialSkill) {
          newImage = IMG_SLIME;
        } else {
          newImage = IMG_KOBOLD;
        }

        break;

      case SWORD:
        newImage = IMG_SWORD;
        break;

      case SHIELD:
        newImage = IMG_SHIELD;
        break;

      case ACC:
        newImage = IMG_COMPASS;
        break;

      case HP:
        newImage = IMG_POTION;
        break;
    }
  } else {
    // Si ya murió, lo cambiamos por la calavera o el cofre, según el tipo.
    switch (tile.type) {
      case ENEMY:
      case DRAGON:
        newImage = IMG_DEAD;
        break;

      case SWORD:
      case SHIELD:
      case ACC:
      case HP:
        newImage = IMG_LOOTED;
        break;
    }
  } // Concatenamos la posición al ID del <img>. Primero la Y...


  imgId = imgId.concat("-", y); // ...y luego la X.

  imgId = imgId.concat("-", x); // Ahora obtenemos el elemento del DOM usando la variable anterior.

  var img = document.getElementById(imgId); // Y finalmente lo cambiamos.

  img.src = newImage;
}

function changeDiceImg(dice, value) {
  var newImg = ""; // Hacemos un switch con el valor del dado.

  switch (value) {
    case 1:
      newImg = IMG_DIE_1;
      break;

    case 2:
      newImg = IMG_DIE_2;
      break;

    case 3:
      newImg = IMG_DIE_3;
      break;

    case 4:
      newImg = IMG_DIE_4;
      break;

    case 5:
      newImg = IMG_DIE_5;
      break;

    case 6:
      newImg = IMG_DIE_6;
      break;
  } // Cambiamos la imagen.


  dice.src = newImg;
}

function rollDie() {
  // Función descaradamente copiada de la MDN.
  return Math.floor(Math.random() * 6) + 1;
}

function shuffleDeck(deck) {
  // Función descaradamente copiada de W3Schools.
  deck.sort(function (a, b) {
    return 0.5 - Math.random();
  });
}
/* MAIN LOOP */
// Iniciamos un juego nuevo apenas el jugador entra a la página.


newGame();
ROLL_BUTTON.addEventListener('click', rollMovement);
ROLL_COMBAT_BUTTON.addEventListener('click', rollCombat);

for (i = 0; i < STANCE_BUTTONS.length; i++) {
  STANCE_BUTTONS[i].addEventListener('click', changeStance);
}

NEW_GAME_BUTTON.addEventListener('click', newGame);
LOAD_GAME_BUTTON.addEventListener('click', loadGame);
SAVE_GAME_BUTTON.addEventListener('click', saveGame);
MAP_BUTTON_1_1.addEventListener('click', processMovement);
MAP_BUTTON_1_2.addEventListener('click', processMovement);
MAP_BUTTON_1_3.addEventListener('click', processMovement);
MAP_BUTTON_1_4.addEventListener('click', processMovement);
MAP_BUTTON_1_5.addEventListener('click', processMovement);
MAP_BUTTON_1_6.addEventListener('click', processMovement);
MAP_BUTTON_2_1.addEventListener('click', processMovement);
MAP_BUTTON_2_2.addEventListener('click', processMovement);
MAP_BUTTON_2_3.addEventListener('click', processMovement);
MAP_BUTTON_2_4.addEventListener('click', processMovement);
MAP_BUTTON_2_5.addEventListener('click', processMovement);
MAP_BUTTON_2_6.addEventListener('click', processMovement);
MAP_BUTTON_3_1.addEventListener('click', processMovement);
MAP_BUTTON_3_2.addEventListener('click', processMovement);
MAP_BUTTON_3_3.addEventListener('click', processMovement);
MAP_BUTTON_3_4.addEventListener('click', processMovement);
MAP_BUTTON_3_5.addEventListener('click', processMovement);
MAP_BUTTON_3_6.addEventListener('click', processMovement);
MAP_BUTTON_4_1.addEventListener('click', processMovement);
MAP_BUTTON_4_2.addEventListener('click', processMovement);
MAP_BUTTON_4_3.addEventListener('click', processMovement);
MAP_BUTTON_4_4.addEventListener('click', processMovement);
MAP_BUTTON_4_5.addEventListener('click', processMovement);
MAP_BUTTON_4_6.addEventListener('click', processMovement);
MAP_BUTTON_5_1.addEventListener('click', processMovement);
MAP_BUTTON_5_2.addEventListener('click', processMovement);
MAP_BUTTON_5_3.addEventListener('click', processMovement);
MAP_BUTTON_5_4.addEventListener('click', processMovement);
MAP_BUTTON_5_5.addEventListener('click', processMovement);
MAP_BUTTON_5_6.addEventListener('click', processMovement);
MAP_BUTTON_6_1.addEventListener('click', processMovement);
MAP_BUTTON_6_2.addEventListener('click', processMovement);
MAP_BUTTON_6_3.addEventListener('click', processMovement);
MAP_BUTTON_6_4.addEventListener('click', processMovement);
MAP_BUTTON_6_5.addEventListener('click', processMovement);
MAP_BUTTON_6_6.addEventListener('click', processMovement);