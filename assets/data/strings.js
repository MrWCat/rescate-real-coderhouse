const STRINGS = {
    "camp": {
        "land": [
            "Regresas a tu Campamento, convenientemente ubicado a la entrada de las Cuevas del Peligro."
        ],
        "heal": [
            "Un breve descanso te recupera la salud.",
            "Te sientes mucho mejor tras un breve descanso."
        ],
        "item": [
            "Aprovechas también para llevarte un arma nueva.",
            "¡Menos mal que trajiste todas esas Espadas de respaldo!"
        ]
    },
    "dragon": {
        "land": [
            "El Dragón se planta frente a ti, listo para achicharrarte."
        ],
        "unshielded": [
            "Si tuvieras un escudo, podrías aguantar al menos unos segundos, pero como está la cosa, tu mejor (y única) opción es intentar huir."
        ],
        "shielded": [
            "Gracias a tu escudo, puedes resistir por unos segundos las terribles llamaradas. ¡Es tu oportunidad para mostrarle quién manda!"
        ],
        "victory1": [
            "El Dragón se cansa de que le esquives todos los resoplidos incandescentes, y decide marcharse a otro sector de las Cuevas. ¿Victoria?",
            "Tras esquivar varias llamaradas, huyes a otro sector de las Cuevas, lejos del Dragón."
        ],
        "offVictory2": [
            "El Dragón tropieza con una piedra, y su colosal cabeza aterriza directamente sobre tu Espada. Supongo que esa es una manera de matarlo.",
            "Tras un épico combate, decapitas al Dragón de certero espadazo. ¡Ahora, a rescatar al Príncipe!"
        ],
        "defVictory2": [
            "Combates con el Dragón por varias horas, sin que ninguno de los dos lleguen a una victoria definitiva. Cansados, acuerdan un empate, y se van cada uno por su lado."
        ],
        "defeat1": [
            "El fuego del Dragón te consume. Quedas completamente achicharrado.",
            "El Dragón resopla una vez en tu dirección. No quedan más que cenizas."
        ],
        "defeat2": [
            "Bloqueas las letales llamas del Dragón con tu Escudo. Mientras festejas el haber sobrevivido más de un par de segundos, el Dragón aprovecha para golpearte con sus letales garras."
        ]
    },
    "prince": {
        "land": [
            "Has llegado a la Torre donde está capturado el Príncipe."
        ],
        "dragonAlive": [
            '"No pienso marcharme mientras esta bestia esté ahí fuera", te dice.',
            '"Veo que aún no has matado al Dragón. No puedo irme hasta que lo hayas hecho", te dice.'
        ],
        "heal": [
            '"Aunque al menos puedo tratar tus heridas".',
            '"Antes que te vayas, deja que cure tus heridas".',
            '"Ah, sí, y déjame curar tus heridas."'
        ],
        "item": [
            'Acto seguido, te enchufa un Escudo en las manos y te larga para afuera. "Vamos, a continuar la aventura."',
            'Tras esto, te larga para afuera de la torre. "Ah, sí, y llevate esto", dice, y te arroja un Escudo antes de cerrar la puerta de un portazo.'
        ],
        "noItem": [
            'Acto seguido, te mira con una cara que dice "cuando quieras ir a matar a la bestia, yo no tengo drama, viste."',
            '"Y ahora, a matar al dragoncillo. Chop-chop."',
            '"¿Sigues aquí? No es como que tengas un Dragón que matar urgentemente ni nada..."'
        ],
        "win": [
            'El Príncipe salta de alegría al verte. "¡Has acabado con esa bestia inmunda! Ahora puedo volver a mi reino. Ven conmigo, y mi padre te llenará de riquezas." ¡HAS GANADO!'
        ]
    },
    "kobold": {
        "land": [
            "Un Kobold, vil siervo del Dragón, te ataca sin piedad. ¡Muelelo a golpes!",
            "Un Kobold, una lagartija humanoide y agresiva, se planta frente a ti. ¡Demuéstrale quién manda!"
        ],
        "offVictory": [
            "Tras un tenso combate, el Kobold yace muerto a tus pies."
        ],
        "defVictory": [
            "Decides perdonarle la vida al Kobold esta vez; eso es lo que te dices mientras corres desesperadamente."
        ],
        "defeat": [
            "Decides perdonarle la vida al Kobold esta vez. Lamentablemente, el Kobold decide no perdonarte la tuya, y te araña varias veces antes de que puedas sacártelo de encima y escapar.",
            "El Kobold te da una paliza tal que pierdes el conocimiento. Cuando finalmente despiertas, la criatura ya no está; debe haberte dado por muerto."
        ]
    },
    "slime": {
        "land": [
            "Una Baba Ácida se cruza en tu camino. Puedes intentar matarla, pero sus propiedades corrosivas se llevaran tu espada consigo.",
            "Una amorfa Baba Ácida sale de entre un recodo en las piedras y se planta frente a ti. Ten cuidado, es tan corrosiva que podría derretir hasta tu espada."
        ],
        "offVictory": [
            "Aplastas a la Baba contra el suelo, desparramado ácido para todos lados. Por suerte, ninguna gota cae encima tuyo. Por desgracia, un montón de ácido cae sobre tu espada, dejándola inutilizable.",
            "La Baba envuelve tu espada. En la desesperación, sacudes tu arma con fuerza para tratar de desprender el monstruo. Las buenas noticias: tienes éxito, y la Baba sale despedida con tanta fuerza que explota al impacto. Las malas noticias: la desgraciada se lleva tu espada consigo."
        ],
        "defVictory": [
            "Esquivas los chorros de ácido que la Baba te escupe por unos diez a quince minutos. Eventualmente, la criatura se aburre y se va. ¿Victoria?",
            "Corres como un cobarde y eventualmente dejas atrás a la Baba.",
            "Tomas una ramita que encuentras tirada cerca tuyo. La sacudes un par de veces frente a la Baba y, cuando sientes que ya tienes su atención, la arrojas lo más lejos posible. La criatura no responde en absoluto (en serio, ¿qué esperabas lograr con eso?), así que procedes a correr por tu vida con total éxito."
        ],
        "defeat": [
            "La Baba te impacta con varios gorgojos ácidos mientras intentas huir. No sabes qué arde más, si las heridas o tu orgullo.",
            "Decides tener un combate honesto con la Baba, sin armas, usando solamente tus puños. La idea de golpear lo que básicamente es un montón de ácido gelatinoso sale tan bien como era de esperarse, es decir, para nada bien.",
            "La Baba se pega a tu pierna y comienza a digerirte. Intentas sacártela de encima, pero es demasiado resbaladiza, así que te resignas a dejarla donde está. Eventualmente te encariñas con ella y ella contigo. Tras pensarlo mucho, decides llamarla Baby. Baby y tú recorren las Cuevas por varios días, vivendo miles de aventuras, hasta que durante una pelea con un Kobold, Baby se sacrifica para interceptar un golpe que te habría matado. Sufres 100 puntos de daño emocional por la pérdida, lo que equivale a aproximadamente 1 PV."
        ]
    },
    "sword": {
        "land": [
            "¡Encontraste una Espada!",
            "¡Había una Espada en este cofre!",
            "¡Hallaste una Espada!",
            "¡Espada, encontrada!"
        ]
    },
    "shield": {
        "land": [
            "¡Encontraste un Escudo!",
            "¡Había un Escudo en este cofre!",
            "¡Hallaste un Escudo!",
            "¡Escudo, encontrado!"
        ]
    },
    "acc": {
        "land": [
            "¡Encontraste una Brújula!",
            "¡Había una Brújula en este cofre!",
            "¡Hallaste una Brújula!",
            "¡Brújula, encontrada!"
        ],

        "break": [
            "Parece que tu pobre Brújula no sobrevivió a ese combate.",
            "Cuando vas a sacar tu Brújula para proseguir viaje, te encuentras con que se ha partido en miles de pedacitos."
        ]
    },
    "hp": {
        "land": [
            "¡Encontraste una Poción de Vida!",
            "¡Había una Poción de Vida en este cofre!",
            "¡Hallaste una Poción de Vida!",
            "¡Poción de Vida, encontrada!"
        ]
    },
    "system": {
        "start": [
            "¡Bienvenido a Rescate Real! Para comenzar, tira los dados pulsando el botón que figura debajo.",
            "¡Bienvenido a las Cuevas de Peligro! Pulsa el botón que figura debajo para tirar los dados y comenzar la exploración."
        ],
        "move": [
            "Elige en el tablero la casilla a la que deseas moverte."
        ],
        "empty": [
            "Vuelves a un espacio que ya habías recorrido antes. ¿Cómo sabes que ya lo habías recorrido, si no puedes orientarte? Fácil, por el rastro de cadáveres y/o cofres vacíos.",
            "El rastro de cofres vacíos y monstruos muertos te da la pauta de que ya habías estado antes en este lugar.",
            "Ya has estado antes en este lugar. Lo sabes porque has dejado tu sello característico: bichos muertos y cofres vaciados.",
            '"Por este lugar ha pasado un político", piensas al verlo tan vacío. Acto seguido, recordás que el que pasó por ahí eras vos.'
        ],
        "noSword": [
            "...Por cierto, ¿has notado que no llevas ninguna espada? Porque no llevas ninguna espada.",
            "...Ahora, cómo esperas matar al bicho sin una espada, eso lo desconozco.",
            "...Es en momentos como estos, en que no llevas un arma, que te gustaría haber tomado las clases de karate que te ofreció ese viejito simpaticón."
        ],
        "gameover": [
            "¡Has muerto! Para jugar otra vez, pulsa Nueva partida en el menú principal.",
            "¡Estás muerto! Si quieres jugar otra vez, pulsa Nueva partida en el menú principal.",
            "¿Eres la economía? ¡Porque estás muerto! Para intentarlo otra vez, pulsa Nueva partida en el menú principal"
        ],
        "combat": [
            "¡Combate!"
        ],
        "ajaxError": [
            "Error al recibir los datos del servidor. Por favor comience una partida normal."
        ],
        "loading": [
            "Cargando, por favor espere..."
        ]
    }
};