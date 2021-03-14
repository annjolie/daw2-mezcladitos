use mezcladitos;
CREATE TABLE if not EXISTS idiomas(
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idioma varchar (3) NOT NULL,
    tiempo varchar (10) not null,
    boton_empezar varchar(20) not null,
    boton_reglas varchar(20) not null,
    boton_top10  varchar (30) not null,
    boton_pausar varchar(20) not null,
    pausado varchar (20) not  null,
    tiempo_restante varchar(50) not null,
    boton_continuar varchar (10) not null,
    titulo_reglas varchar (50) not null,
    titulo_paso1 varchar (10) NOT NULL,
    paso1 varchar(300) not null,
    titulo_paso2 varchar (10) NOT NULL,
    paso2 varchar(300) not null,
    titulo_paso3 varchar (10) NOT NULL,
    paso3 varchar(300) not null,
    titulo_paso4 varchar (10) NOT NULL,
    paso4 varchar(300) not null,
    recordatorio varchar(50) not null,
    boton_salir varchar(10) not null,
    posicion varchar (10) not null,
    nombre_jugador varchar(20) not null,
    puntaje varchar (10) not null,
    fecha varchar (5) not null,
    score_final varchar(20) not null,
    guardar_jugador varchar (15) not null, 
    fin_juego varchar (20) not null,
    indicacion_inicio varchar (50) not null,
    boton_volver_jugar varchar (20) not null,
    no_hay_partidas varchar (30) not null,
    titulo_top_10 varchar (30) not null,
    volver_inicio varchar(50) not null,
    volver varchar(50) not null
    )ENGINE = MyISAM DEFAULT CHARSET = latin1;

    INSERT INTO idiomas (idioma,tiempo,boton_empezar,boton_reglas,boton_top10,boton_pausar,
    pausado,tiempo_restante,boton_continuar,titulo_reglas,titulo_paso1,paso1,titulo_paso2,paso2,
    titulo_paso3,paso3,titulo_paso4,paso4,recordatorio,boton_salir,posicion,nombre_jugador,puntaje,
    fecha,score_final,guardar_jugador,fin_juego,indicacion_inicio,boton_volver_jugar,no_hay_partidas,
    titulo_top_10, volver_inicio, volver)
    VALUES ("EN", "Time", "Start mezcladitos", "Show rules", "Show top 10", "Pause game", "Paused game", "Time left", "Continue", "How to play?",
    "Step 1.", "To start a game click on the New button at the top of the screen.", "Step 2.",
    "To form words you will have to slide the cursor over the board and join letters vertically horizontally diagonally from the right or the other way around. In each of the words you will not be able to go through the same place more than once.",
    "Step 3.", "Look at the words you have formed on the left of the board. The word in green means that it is correct in white it is that it is repeated and red that it does not exist.",
    "Step 4.", "Sum of points.", "And remember, you have to be very fast!", "Exit", "Position", "Player name", "Score" , "Date", "Final score",
    "Save player", "Game over", "Press the button to restart a game", "Play again", "No registered game",
    "Top 10 games", "Press the button to return to the home screen.", "Back");

    INSERT INTO idiomas (idioma,tiempo,boton_empezar,boton_reglas,boton_top10,boton_pausar,
    pausado,tiempo_restante,boton_continuar,titulo_reglas,titulo_paso1,paso1,titulo_paso2,paso2,
    titulo_paso3,paso3,titulo_paso4,paso4,recordatorio,boton_salir,posicion,nombre_jugador,puntaje,
    fecha,score_final,guardar_jugador,fin_juego,indicacion_inicio,boton_volver_jugar,no_hay_partidas,
    titulo_top_10, volver_inicio, volver)
    VALUES ("ES", "Tiempo", "Iniciar mezcladitos", "Mostrar reglas", "Mostrar top 10", "Pausar juego", "Juego pausado", "Tiempo restante", "Continuar", "¿Cómo jugar?",
    "Paso 1.", "Para iniciar una partida, haz clic en el botón Nuevo que encontrarás en la parte superior de la pantalla.", "Paso 2", "Para formar palabras, tendrás que deslizar el cursor sobre el tablero y unir letras de forma vertical, horizontal, diagonal, del derecho o del revés. En cada una de las palabras, no podrás pasar más de una vez por el mismo lugar.",
    "Paso 3", "Observa las palabras que has formado a la izquierda del tablero. La palabra en verde significa que es correcta, en blanca es que está repetida y roja que no existe",
    "Paso 4", "Suma de puntos", "¡Y recuerda, tienes que ser muy rápido! ", "Salir", "Posición", "Nombre del jugador", "Puntuación", "Fecha", "Puntuación final",
    "Guardar jugador", "Fin de juego", "Pulsa el botón para reiniciar un juego ", "Jugar de nuevo", "No hay juegos registrados",
    "Top 10 partidas", "Pulsa el botón para volver a la pantalla de inicio.", "Volver");

    INSERT INTO idiomas (idioma,tiempo,boton_empezar,boton_reglas,boton_top10,boton_pausar,
    pausado,tiempo_restante,boton_continuar,titulo_reglas,titulo_paso1,paso1,titulo_paso2,paso2,
    titulo_paso3,paso3,titulo_paso4,paso4,recordatorio,boton_salir,posicion,nombre_jugador,puntaje,
    fecha,score_final,guardar_jugador,fin_juego,indicacion_inicio,boton_volver_jugar,no_hay_partidas,
    titulo_top_10, volver_inicio, volver)
    VALUES ("GA", "Tempo", "Iniciar mezcladitos", "Mostrar regras", "Mostrar os mellores 10", "Pausa o xogo", "Xogo pausado", "Tempo restante", "Continuar", "Como xogar?",
    "Paso 1.", "Para iniciar un xogo, fai clic no botón Novo que atoparás na parte superior da pantalla.", "Paso 2", "Para formar palabras, terás que desprazar o cursor sobre o taboleiro. e combinar letras verticalmente, horizontalmente, diagonalmente, ao revés ou ao revés. En cada palabra, non podes pasar polo mesmo lugar máis dunha vez. ",
    "Paso 3", "Mire as palabras que formou á esquerda do taboleiro. A palabra en verde significa que é correcta, en branco é que se repite e vermella que non existe",
    "Paso 4", "Suma de puntos", "E recorda, tes que ser moi rápido!", "Saír", "Posición", "Nome do xogador", "Puntuación", "Data", "Puntuación final",
    "Gardar xogador", "Partido finalizado", "Preme o botón para reiniciar un xogo", "Xogar de novo", "Non hai xogos rexistrados",
    "Top 10 xogos", "Preme o botón para volver á pantalla de inicio.", "Regreso");
