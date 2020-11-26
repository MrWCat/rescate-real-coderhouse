let Player = function(hp = 3, swords = 1, shields = 0, accessories = 0) {
    // Player contiene la información del personaje jugador.
    this.hp = hp;
    this.maxhp = hp; // La vida máxima es igual a la vida inicial, en principio.
    this.swords = swords;
    this.shields = shields;
    this.accessories = accessories;

    let position = { x: 0, y: 0 };

    this.setPosition = function(x, y) {
        position.x = x;
        position.y = y;
    }

    this.getPosition = function() {
        return [position.x, position.y];
    }

    this.loseHP = (value) => {
        // Restamos (o sumamos, si es negativo) el valor al HP.
        this.hp -= value;
        // Nos aseguramos de que la vida actual no supere la vida máxima, en caso de curación.
        this.hp = Math.min(this.hp, this.maxhp);
    }   

    this.changeItem = (item, amount) => {
        // Función para modificar la cantidad de objetos que lleva el jugador.
        switch (item) {
            // Usamos un switch para ver el tipo de objeto a modificar.
            case SWORD:
                this.swords += amount;
                break;

            case SHIELD:
                this.shields += amount;
                break;

            case ACC:
                this.accessories += amount;
                break;

            case HP:
                // Consideramos la vida como un item a efectos prácticos.
                this.maxhp += amount;
                this.hp += amount;
                break;
        }
    }
}