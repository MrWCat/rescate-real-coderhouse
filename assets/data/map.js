let Map = function(width, height) {
    // Objeto mapa, contiene métodos para inicializar el mapa al principio del juego.
    // El mapa contiene dos matrices: la primera representa las fichas, y la segunda indica si están reveladas u ocultas.
    let mapGrid = createEmptyGrid(width, height);
    let revealGrid = createEmptyGrid(width, height);

    function createEmptyGrid(width, height) { // Una pequeña función para crear matrices vacías.
        let newGrid = [];

        for (var y = 0; y < height; y++) {
            newGrid.push([])
            for (var x = 0; x < width; x++) {
                newGrid[y].push("");
            }
        }

        return newGrid;
    }

    this.populateMap = (deck) => {
        // Llenar el mapa de fichas.

        // Primero iteramos en Y...
        mapGrid.forEach((itemY, posY) => {
            // ...y en X...
            itemY.forEach((itemX, posX) => {
                // ...y según la posición, asignamos una ficha.
                if ((posX + 1 == 1) && (posY + 1 == 1)) {
                    // En la esquina superior izquierda va el Campamento.
                    mapGrid[posY][posX] = new Tile(CAMP, "Campamento", -1);
                    revealGrid[posY][posX] = true;
                } else if ((posX + 1 == 3) && (posY + 1 == 3)) {
                    // El Dragón siempre está en el medio del mapa, en 3, 3.
                    mapGrid[posY][posX] = new Tile(DRAGON, "Dragón", 1);
                    revealGrid[posY][posX] = true;
                } else if ((posX + 1 == 6) && (posY + 1 == 6)) {
                    // El Príncipe está en la esquina opuesta al Campamento.
                    mapGrid[posY][posX] = new Tile(PRINCE, "Príncipe", -1);
                    revealGrid[posY][posX] = true;
                } else {
                    // Llenamos el resto de fichas aleatorias ocultas.
                    let newTile = deck.pop();
                    mapGrid[posY][posX] = new Tile(newTile.type, newTile.name, newTile.dmg, newTile.special);
                    revealGrid[posY][posX] = false;
                }
            })
        })
    }

    this.checkMapPos = (x, y) => {
        // Revisar qué hay en una ubicación X,Y del mapa.
        return mapGrid[y - 1][x - 1];
    }

    this.isRevealed = (x, y) => {
        // Revisar si la ficha en la ubicación X,Y está revelada o no.
        return revealGrid[y - 1][x - 1];
    }

    this.revealTile = (x, y) => {
        // Revelar la ficha en la posición X,Y.
        revealGrid[y - 1][x - 1] = true;
    }

    this.getMapGrid = () => {
        return mapGrid;
    }

    this.setMapGrid = (newMapGrid) => {
        mapGrid = newMapGrid;
    }

    this.getRevealGrid = () => {
        return revealGrid;
    }

    this.setRevealGrid = (newRevealGrid) => {
        revealGrid = newRevealGrid;
    }
}