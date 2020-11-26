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


function newGame(event) {
    // Colocamos un mensaje de cargando, en caso de que haya una llamada AJAX que demore demasiado.
    $descText.text(returnText(STRINGS.system.loading));
    // Ocultamos todos los paneles.
    hidePanel("#combat-roller");
    hidePanel("#combat-results");
    hidePanel("#dice-results");
    hidePanel("#inventory-panel");
    hidePanel("#dice-roller");
    // Ubicamos desde qué botón viene el llamado.
    let buttonId = "new-game";
    if (event != null) {
        buttonId = event.target.id;
    }
    // Creamos un nuevo personaje jugador.
    player = new Player();

    if (buttonId == "new-game") {
        $.get("./assets/data/decks/standard.json", createMap);
    } else {
        $.get("./assets/data/decks/daily.json", createMap);
    }
}

function createMap(deckData) {
    // Creamos un nuevo mazo para poblar el mapa y lo barajamos.
    tileDeck = createDeck(deckData);
    // Creamos un nuevo mapa vacío.
    map = new Map(6, 6);
    // Poblamos el mapa.
    map.populateMap(tileDeck);
    // Cambiamos el estado del juego a "jugando".
    gameState = PLAYING;
    // Actualizamos la parte gráfica.
    update();
    // Movemos el selector.
    removeBorder();
    removeAllSelectable();
    addBorder(1, 1);
    // Mostramos el botón de dados de movimiento y el inventario.
    showPanel("#inventory-panel");
    showPanel("#dice-roller");
    // Por último, un lindo mensaje descriptivo.
    $descText.text(returnText(STRINGS.system.start));
}

function saveGame() {
    // Creamos nuevas variables para guardar los datos "stringifiados".
    let stringPlayer = JSON.stringify(player);
    let stringPlayerPos = JSON.stringify(player.getPosition());
    let stringRevealGrid = JSON.stringify(map.getRevealGrid());
    let stringDesc = $descText.text();
    let mapObjArray = [];

    // Recuperamos la mapGrid y la guardamos en una variable local.
    let currentMapGrid = map.getMapGrid();
    // Iteramos en el mapGrid.
    currentMapGrid.forEach((itemY, posY) => {
        mapObjArray.push([]);
        itemY.forEach((itemX) => {
            // Guardamos el tipo del objeto en el array de objetos.
            mapObjArray[posY].push(itemX.name);
        });
    });
    let stringMapObjArray = JSON.stringify(mapObjArray);

    // Guardamos los datos en el storage.
    localStorage.setItem("player", stringPlayer);
    localStorage.setItem("playerPos", stringPlayerPos);
    localStorage.setItem("mapObjArray", stringMapObjArray);
    localStorage.setItem("revealGrid", stringRevealGrid);
    localStorage.setItem("desc", stringDesc);
}

function loadGame() {
    let stringPlayer = localStorage.getItem("player");
    let stringPlayerPos = localStorage.getItem("playerPos");
    let stringMapObjArray = localStorage.getItem("mapObjArray");
    let stringRevealGrid = localStorage.getItem("revealGrid");
    let stringDesc = localStorage.getItem("desc");
    let newPlayer = "";
    let newMapGrid = [];
    let newObj = "";

    if (stringPlayer == "") {
        // Si no hay datos guardados en el storage, no hacemos nada.
        return;
    } else {
        // Si los hay, primero procesamos los datos para generar nuevos player y mapGrid.
        let newPlayerData = JSON.parse(stringPlayer);
        let newPlayerPos = JSON.parse(stringPlayerPos);
        newPlayer = new Player(newPlayerData.hp, newPlayerData.swords, newPlayerData.shields, newPlayerData.accessories);
        newPlayer.setPosition(newPlayerPos[0], newPlayerPos[1]);

        let mapObjArray = JSON.parse(stringMapObjArray);
        mapObjArray.forEach((itemY, posY) => {
            newMapGrid.push([]);
            mapObjArray[posY].forEach((itemX) => {
                switch (itemX) {
                    case "Campamento":
                        newObj = new Tile(CAMP, "Campamento", -1);;
                        break;

                    case "Dragón":
                        newObj = new Tile(DRAGON, "Dragón", 1);
                        break;

                    case "Príncipe":
                        newObj = new Tile(PRINCE, "Príncipe", -1);
                        break;

                    case "Kobold":
                        newObj = new Tile(BASE_KOBOLD.type, BASE_KOBOLD.name, BASE_KOBOLD.dmg, BASE_KOBOLD.special);
                        break;

                    case "Baba Ácida":
                        newObj = new Tile(BASE_SLIME.type, BASE_SLIME.name, BASE_SLIME.dmg, BASE_SLIME.special);
                        break;

                    case "Espada":
                        newObj = new Tile(BASE_SWORD.type, BASE_SWORD.name, BASE_SWORD.dmg, BASE_SWORD.special);
                        break;

                    case "Escudo":
                        newObj = new Tile(BASE_SHIELD.type, BASE_SHIELD.name, BASE_SHIELD.dmg, BASE_SHIELD.special);
                        break;

                    case "Brújula":
                        newObj = new Tile(BASE_ACC.type, BASE_ACC.name, BASE_ACC.dmg, BASE_ACC.special);
                        break;

                    case "Poción de Vida":
                        newObj = new Tile(BASE_HP.type, BASE_HP.name, BASE_HP.dmg, BASE_HP.special);
                        break;
                }
                newMapGrid[posY].push(newObj);
            });
        });

        //Luego, reemplazamos player y map por los valores procesados.
        player = newPlayer;
        map = new Map(6, 6);
        map.setMapGrid(newMapGrid);
        map.setRevealGrid(JSON.parse(stringRevealGrid));
        $descText.text(stringDesc);
        console.log(player);

        // Actualizamos el mapa y el inventario.
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
        let newDice = rollDie();
        //El segundo dado recibe el mismo valor que el primero.
        movementDice = [newDice, newDice];
    }

    // Luego, cambiamos la imagen de los dados en el panel de control.
    changeDiceImg($dice1, movementDice[0]);
    changeDiceImg($dice2, movementDice[1]);

    // Le agregamos un borde a los botones seleccionables.
    addSelectable(movementDice[0], movementDice[1]);
    addSelectable(movementDice[1], movementDice[0]); // No importa si los dos dados son iguales, el borde sólo se agrega una vez.

    // Cambiamos el texto descriptivo.
    $descText.text(returnText(STRINGS.system.move));

    // Finalmente, mostramos el panel de control y ocultamos el de los dados y el de combate, si llegase a estar.
    hidePanel("#dice-roller");
    hidePanel("#combat-results");
    showPanel("#dice-results");
}

function processMovement(event) {
    // Primero, guardamos el ID del botón pulsado.
    let buttonId = event.target.id;
    // Luego, sacamos las coordenadas del ID.
    let newY = buttonId[4];
    let newX = buttonId[6];

    if ((newX == movementDice[0] && newY == movementDice[1]) || (newY == movementDice[0] && newX == movementDice[1])) {
        // Si el botón presionado se corresponde a alguna combinación de los dados, primero reseteamos los dados.
        movementDice = [-1, -1];
        // Luego, reseteamos los bordes.
        removeSelectable(newX, newY);
        removeSelectable(newY, newX);
        // También ocultamos el panel de movimiento.
        hidePanel("dice-results");

        // Cambiamos la posiciòn del jugador a la nueva casilla.
        player.setPosition(newX, newY);
        // Y cambiamos los bordes para representarlo.
        removeBorder();
        addBorder(newX, newY);

        // Finalmente, procesamos el tile correspondiente al espacio clickeado y guardamos el valor de la posición actual.
        processTile(newX, newY);
    }
}

function processTile(x, y) {
    // Obtenemos el objeto en la posición X, Y.
    let tile = map.checkMapPos(x, y);

    // Primero confirmamos si el objeto está vivo.
    if (tile.isAlive()) {
        // Si no está revelado, lo revelamos.
        if (!map.isRevealed(x, y)) {
            map.revealTile(x, y);
        }

        // Luego, chequeamos el tipo.
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
        $descText.text(returnText(STRINGS.system.empty));
        // Y activamos el panel para volver a movernos.
        showPanel("#dice-roller");
    }

    // Al finalizar, actualizamos la pantalla.
    update();
}

function preProcessCombat(tile) {
    // Modificamos el texto descriptivo para que anuncie combate.
    let newText = returnText(STRINGS.system.combat);

    switch (tile.type) {
        case DRAGON:
            newText = newText.concat(" ", returnText(STRINGS.dragon.land));
            if (player.shields == 0) {
                newText = newText.concat(" ", returnText(STRINGS.dragon.unshielded));
            } else {
                newText = newText.concat(" ", returnText(STRINGS.dragon.shielded));
            }
            break;

        case ENEMY:
            if (tile.specialSkill) {
                newText = newText.concat(" ", returnText(STRINGS.slime.land));
            } else {
                newText = newText.concat(" ", returnText(STRINGS.kobold.land));
            }
            break;
    }

    if (player.swords == 0) {
        newText = newText.concat(" ", returnText(STRINGS.system.noSword));
    }

    $descText.text(newText);
    // Mostramos el panel de combate.
    showPanel("#combat-roller");
}

function rollCombat(event) {
    // Ocultamos el panel de combate.
    hidePanel("#combat-roller");

    // Identificamos al enemigo.
    let currentPos = player.getPosition();
    let nextEnemy = map.checkMapPos(currentPos[0], currentPos[1]);

    // Procesamos el combate.
    processCombat(nextEnemy);
}

function processCombat(enemy) {
    // Primero, tiramos un dado de 6 caras.
    let die = rollDie();
    let currentSwords = player.swords // Esto lo usamos para actualizar correctamente el texto si la Baba se come una Espada.

    // Mostramos el panel de resultado del combate.
    changeDiceImg($combatDice, die);
    showPanel("#combat-results");

    // Si usamos alguna posición especial, le sumamos 1 al dado.
    if (chosenStance != NO_STANCE) {
        die += 1;
    }

    // Revisamos el tipo de enemigo al que nos enfrentamos, y comparamos el resultado.
    if ((enemy.type == DRAGON && die >= 5) || (enemy.type == ENEMY && die >= 4)) {
        // Más de 4 (o 5, para el Dragón), matamos al enemigo, siempre que no hayamos usado la posición defensiva y tengamos escudos frente al Dragón.
        if (!((chosenStance == DEFENSIVE) || (player.swords == 0) || (enemy.type == DRAGON && player.shields == 0))) {
            enemy.die();

            if (enemy.specialSkill && player.swords > 0) {
                // Si es una Baba ácida, destruye una Espada.
                player.changeItem(SWORD, -1);
            }
        }

        // Cambiamos la imagen.
        let currentPos = player.getPosition();
        changeImage(enemy, currentPos[0], currentPos[1]);

        // Actualizamos el texto.
        switch (enemy.type) {
            case ENEMY:
                if (enemy.specialSkill) {
                    if ((chosenStance == DEFENSIVE) || (currentSwords == 0)) {
                        $descText.text(returnText(STRINGS.slime.defVictory));
                    } else {
                        $descText.text(returnText(STRINGS.slime.offVictory));
                    }
                } else {
                    if ((chosenStance == DEFENSIVE) || (player.swords == 0)) {
                        $descText.text(returnText(STRINGS.kobold.defVictory));
                    } else {
                        $descText.text(returnText(STRINGS.kobold.offVictory));
                    }
                }
                break;

            case DRAGON:
                if (player.shields == 0) {
                    $descText.text(returnText(STRINGS.dragon.victory1));
                } else {
                    if ((chosenStance == DEFENSIVE) || (player.swords == 0)) {
                        $descText.text(returnText(STRINGS.dragon.defVictory2));
                    } else {
                        $descText.text(returnText(STRINGS.dragon.offVictory2));
                    }
                }
                break;
        }

        // Y volvemos a mostrar el botón de movimiento.
        showPanel("#dice-roller");
    } else {
        // Menos de eso, el enemigo nos daña a nosotros, con modificadores según la posición que hayamos tomado.
        enemy.takeAction(chosenStance);

        // Chequeamos que no hayamos tenido un game over.
        if (player.hp < 0) {
            processGameOver();
        } else {
            // Caso contrario, mostramos otros mensajes.
            switch (enemy.type) {
                case ENEMY:
                    if (enemy.specialSkill) {
                        $descText.text(returnText(STRINGS.slime.defeat));
                    } else {
                        $descText.text(returnText(STRINGS.kobold.defeat));
                    }
                    break;

                case DRAGON:
                    if (player.shields > 0) {
                        $descText.text(returnText(STRINGS.dragon.defeat1));
                    } else {
                        $descText.text(returnText(STRINGS.dragon.defeat2));
                    }
                    break;
            }
            // Y luego el panel de movimiento.
            showPanel("#dice-roller");
        }
    }

    // Al finalizar, actualizamos la pantalla.
    update();
}

function changeStance(event) {
    // Guardamos la ID del botón presionado.
    buttonId = event.target.id;
    if (buttonId == "") {
        // Si se presiona la imagen, no se guarda ID, así que llamamos al nodo padre (el botón).
        buttonId = event.target.parentNode.id;
    }

    // Cambiamos la clase de los botones de posición.
    $(`#${chosenStance}`).removeClass("active");
    $(`#${buttonId}`).addClass("active");

    // Cambiamos la posición al ID del botón. Las constantes de posición usan estas mismas IDs.
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
        $descText.text(returnText(STRINGS.system.gameover));
        // Por último, cambiamos el gameState.
        gameState = GAME_OVER;
    }
}

function hidePanel(oldPanel) {
    $($controlPanels.filter(oldPanel)).hide();
}

function showPanel(newPanel) {
    $controlPanels.filter(newPanel).show();
}

function addSelectable(x, y) {
    let buttonId = "#btn-" + String(y) + "-" + String(x);
    $(buttonId).addClass("selectable-square");
}

function removeSelectable(x, y) {
    let buttonId = "#btn-" + String(y) + "-" + String(x);
    $(buttonId).removeClass("selectable-square");
}

function removeAllSelectable() {
    // Primero, obtenemos el mapGrid.
    let mapGrid = map.getMapGrid();

    // Iteramos en la grilla...
    mapGrid.forEach((itemY, posY) => {
        itemY.forEach((itemX, posX) => {
            removeSelectable(posX, posY);
        })
    })
}

function addBorder(x, y) {
    let buttonId = "#btn-" + String(y) + "-" + String(x);
    $(buttonId).addClass("current-square");
}

function removeBorder() {
    $(".current-square").removeClass("current-square");
}

function update() {
    updateBoard();
    updateInventory();
}

function updateBoard() {
    // Actualizar todos los gráficos del mapa.
    // Primero, obtenemos el mapGrid.
    let mapGrid = map.getMapGrid();

    // Iteramos en la grilla...
    mapGrid.forEach((itemY, posY) => {
        itemY.forEach((itemX, posX) => {
            // Obtenemos el tile en esa posición.
            let tile = map.checkMapPos(posX + 1, posY + 1);

            // Actualizamos la imagen de cada ficha.
            changeImage(tile, posX + 1, posY + 1);
        })
    })
}

function updateInventory() {
    $hpText.text(`PVs actuales: ${player.hp}`);
    $maxHPText.text(`/${player.maxhp}`);
    $swordsText.text(`Espadas: ${player.swords}`);
    $shieldsText.text(`Escudos: ${player.shields}`);
    $accsText.text(`Brújulas: ${player.accessories}`);
}

function changeImage(tile, x, y) {
    let newImage = ""; // Acá guardamos la imagen que vamos a usar.
    let imgId = "#img"; // Acá guardamos el ID del objeto <img> que vamos a modificar. Todos empiezan con img, así que le ponemos eso.

    // Primero, confirmamos si el tile está oculto.
    if (map.isRevealed(x, y)) {
        // Luego confirmamos si el tile está vivo o no.
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
        }
    } else {
        // Si no está revelado, ponemos la carta misteriosa.
        newImage = IMG_CARD;
    }

    // Concatenamos la posición al ID del <img>. Primero la Y...
    imgId = imgId.concat("-", y);
    // ...y luego la X.
    imgId = imgId.concat("-", x);

    // Ahora obtenemos el elemento del DOM usando la variable anterior.
    let img = $(imgId);
    // Y finalmente lo cambiamos.
    img.attr("src", newImage);
}

function changeDiceImg(dice, value) {
    let newImg = "";

    // Hacemos un switch con el valor del dado.
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
    }

    // Cambiamos la imagen.
    dice.attr("src", newImg);
}

function rollDie() { // Función descaradamente copiada de la MDN.
    return Math.floor(Math.random() * 6) + 1;
}

function createDeck(deckData) {
    let deck = []; // Por si acaso quedaron tiles sueltas, lo vaciamos.

    for (let i = 0; i < deckData.kobolds; i++) {
        // 12 kobolds.
        deck.push(BASE_KOBOLD);
    }

    for (let i = 0; i < deckData.acidSlimes; i++) {
        // 6 babas ácidas.
        deck.push(BASE_SLIME);
    }

    for (let i = 0; i < deckData.swords; i++) {
        // 3 espadas.
        deck.push(BASE_SWORD);
    }

    for (let i = 0; i < deckData.shields; i++) {
        // 3 escudos.
        deck.push(BASE_SHIELD);
    }

    for (let i = 0; i < deckData.accs; i++) {
        // 3 brújulas.
        deck.push(BASE_ACC);
    }

    for (let i = 0; i < deckData.hps; i++) {
        // 6 PVs.
        deck.push(BASE_HP);
    }

    shuffleDeck(deck);
    return deck;
}

function shuffleDeck(deck) {
    arrayRandomizer(deck);
}

function returnText(textArray) {
    arrayRandomizer(textArray);
    return textArray[0];
}

function arrayRandomizer(arrayToRandomize) { // Función descaradamente copiada de W3Schools.
    for (i = arrayToRandomize.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i)
        k = arrayToRandomize[i]
        arrayToRandomize[i] = arrayToRandomize[j]
        arrayToRandomize[j] = k
    }
}

/* MAIN LOOP */

// Iniciamos un juego nuevo apenas el jugador entra a la página.
newGame(null);