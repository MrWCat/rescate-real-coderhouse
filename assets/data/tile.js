let Tile = function(type, name, damage = 0, specialSkill = false) {
    // En los Tiles guardamos todos los datos de las fichas.
    // Inicializamos el objeto.
    this.type = type;
    this.name = name;
    this.damage = damage; // El Campamento y el Príncipe tienen "daño negativo", o sea curan.
    this.specialSkill = specialSkill; // La única habilidad especial es la de la Baba ácida, así que usamos un simple booleano para confirmarlo.
    let isAlive = true; // Si el enemigo está muerto o el item ya ha sido recogido, no queremos que haga acciones.

    this.takeAction = (chosenStance = NO_STANCE) => {
        let newText = ""
        switch (this.type) {
            case ENEMY:
                doDamage(chosenStance, this.damage);

                if (chosenStance == DEFENSIVE) {
                    // Si el jugador está usando la posición defensiva, no puede sufrir efectos adicionales, así que salimos del case.
                    break;
                }

                if (player.accessories > 0) {
                    // Si lleva un compás, se rompe.
                    player.changeItem(ACC, -1);
                }

                break;

            case CAMP:
                newText = returnText(STRINGS.camp.land);
                if (player.hp < player.maxhp) {
                    // El jugador recupera un punto de vida, hasta el máximo.
                    player.loseHP(this.damage);
                    newText = newText.concat("<br>", returnText(STRINGS.camp.heal));
                }

                if (player.swords == 0) {
                    // El jugador recupera un arma, si no tiene.
                    player.changeItem(SWORD, 1);
                    newText = newText.concat("<br>", returnText(STRINGS.camp.item));
                }

                // Mostramos el panel de dados y cambiamos el texto.
                $descText.html(newText);
                showPanel("#dice-roller");
                break;

            case DRAGON:
                if (player.shields > 0) {
                    // Si el jugador lleva al menos un escudo, el Dragón lo daña.
                    doDamage(chosenStance, this.damage);
                    // Y también le destruye un escudo.
                    player.changeItem(SHIELD, -1);
                } else {
                    // Sin escudos, perder ante el Dragón es un game over instantáneo.
                    player.hp = -1;
                }
                break;

            case PRINCE:
                newText = returnText(STRINGS.prince.land);
                let dragon = map.checkMapPos(3, 3);
                if (dragon.isAlive()) {
                    newText = newText.concat("<br>", returnText(STRINGS.prince.dragonAlive));

                    if (player.hp < player.maxhp) {
                        // El jugador recupera un punto de vida, hasta el máximo.
                        player.loseHP(this.damage);
                        newText = newText.concat(" ", returnText(STRINGS.prince.heal));
                    }

                    if (player.shields == 0) {
                        // El jugador consigue un escudo, si no tiene.
                        player.changeItem(SHIELD, 1);
                        newText = newText.concat(" ", returnText(STRINGS.prince.item));
                    } else {
                        newText = newText.concat(" ", returnText(STRINGS.prince.noItem));
                    }

                    showPanel("#dice-roller");
                } else {
                    newText = newText.concat("<br>", returnText(STRINGS.prince.win));
                    // Cambiamos el estado para representar que el juego terminó.
                    gameState = GAME_OVER;
                }

                // Cambiamos el texto.
                $descText.html(newText);
                break;

            case SWORD:
                // El jugador consigue un arma.
                player.changeItem(SWORD, 1);
                // "Recogemos" el arma.
                this.die();
                // Mostramos el panel de dados y cambiamos el texto.
                $descText.text(returnText(STRINGS.sword.land));
                showPanel("#dice-roller");
                break;

            case SHIELD:
                // El jugador consigue un escudo.
                player.changeItem(SHIELD, 1);
                // "Recogemos" el escudo.
                this.die();
                // Mostramos el panel de dados y cambiamos el texto.
                $descText.text(returnText(STRINGS.shield.land));
                showPanel("#dice-roller");
                break;

            case ACC:
                // El jugador consigue un compás.
                player.changeItem(ACC, 1);
                // "Recogemos" el compás.
                this.die();
                // Mostramos el panel de dados y cambiamos el texto.
                $descText.text(returnText(STRINGS.acc.land));
                showPanel("#dice-roller");
                break;

            case HP:
                // El jugador consigue una poción.
                player.changeItem(HP, 1);
                // "Recogemos" la poción.
                this.die();
                // Mostramos el panel de dados y cambiamos el texto.
                $descText.text(returnText(STRINGS.hp.land));
                showPanel("#dice-roller");
                break;
        }
    }

    this.die = () => {
        // Matamos el enemigo o recogemos el objeto.
        isAlive = false;
    }

    this.isAlive = () => {
        return isAlive;
    }
}