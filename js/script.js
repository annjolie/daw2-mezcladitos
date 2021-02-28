$(document).ready(function() {
    var activo;
    var tiempo_restante;
    var mouse_presionado;
    var palabra_seleccionada;
    var letra_Seleccionada;
    var palabras_juego = [];
    $("#vistaPausa").hide();
    $(".fondoPausa").hide();
    $("#buttonPausa").hide();

    iniciarJuego();

    $("#buttonPausa").click(function() {
        activo = false;
        $("#vistaPausa").show();
        $(".fondoPausa").show();

    });

    $("#buttonContinuar").click(function() {
        activo = true;
        $("#vistaPausa").hide();
        $(".fondoPausa").hide();
    });

    $(".flex_item").each(function() {
        $(this).mousedown(function() {
            mouse_presionado = true;
            $(this).addClass("seleccionado");
            palabra_seleccionada = $(this).html();
            letra_Seleccionada = [$(this).data("value")];
        });
        $(this).mouseenter(function() {
            if (mouse_presionado == true) {
                if (letra_Seleccionada.indexOf($(this).data("value")) < 0) {
                    var i = parseInt(letra_Seleccionada[letra_Seleccionada.length - 1].split("_")[0]);
                    var j = parseInt(letra_Seleccionada[letra_Seleccionada.length - 1].split("_")[1]);
                    if (crear_posibilidades(i, j).indexOf($(this).data("value")) >= 0) {
                        palabra_seleccionada += $(this).html();
                        letra_Seleccionada.push($(this).data("value"));
                        $(this).addClass("seleccionado");

                    }
                }
            }
        });
    });

    $(document).mouseup(function() {
        // Aquí haces la lógica para capturar las letras
        if (activo && palabra_seleccionada.length > 2) {
            //  1.1 Comparar la palabra contra la lista de palabras:
            if ($("#listaPalabras li:contains('" + palabra_seleccionada + "')").length == 0) {
                palabras_juego.push({
                    palabra: palabra_seleccionada,
                    tipo: "valido"
                        //TODO se debe indicar valido o invalido contra lo que devuelva la lista de palabras del servidor
                });
            } else {
                palabras_juego.push({
                    palabra: palabra_seleccionada,
                    tipo: "repetido"
                });
            }
            listaPalabras();
            //TODO 1.1.1 Si la palabra no existe y es válida, almacenar como palabra válida
            //TODO 1.1.2 Si la palabra existe, almacenar como palabra ya existente
            //TODO 1.1.3 Si la palara no existe y no es válida, almacenar como palabra inválida
            //TODO 1.2 Mostrar la palabra, y si es valido, invalido o reutilizado en la vista
            //TODO 1.3 Actualizar el score basado en la puntuación de la palabra conseguida */
        }
        mouse_presionado = false;
        palabra_seleccionada = "";
        letra_Seleccionada = [];
        $(".flex_item").removeClass("seleccionado")
    });

    function crear_posibilidades(i, j) {
        var posibilidades = [];
        if (i - 1 > 0) {
            if (j - 1 > 0) {
                posibilidades.push((i - 1) + "_" + (j - 1));
            }
            posibilidades.push((i - 1) + "_" + (j));
            if (j + 1 < 6) {
                posibilidades.push((i - 1) + "_" + (j + 1));
            }
        }
        if (j - 1 > 0) {
            posibilidades.push((i) + "_" + (j - 1));
        }
        if (j + 1 < 6) {
            posibilidades.push((i) + "_" + (j + 1));
        }
        if (i + 1 < 6) {
            if (j - 1 > 0) {
                posibilidades.push((i + 1) + "_" + (j - 1));
            }
            posibilidades.push((i + 1) + "_" + (j));
            if (j + 1 < 6) {
                posibilidades.push((i + 1) + "_" + (j + 1));
            }
        }
        return posibilidades;
    }

    function actualizarScore(score) {
        $("#score").html("score: " + score);
    }

    function listaPalabras() {
        $("#listaPalabras").html("");
        for (var element of palabras_juego) {
            $("#listaPalabras").append("<li class='" + element.tipo + "'>" + element.palabra + "</li>");
        }
    }

    function iniciarJuego() {
        //TODO ocultar boton o cambiar texto
        //TODO detener el temporizador
        $("#buttonInicio").click(function() {
            actualizarScore(0);
            listaPalabras([]);
            activo = true;
            tiempo_restante = 180;
            tiempoRestante();
            setInterval(tiempoRestante, 1000);
            $("#buttonPausa").show();
            letras_aleatorias();
            palabras_juego = [];
            $("#buttonInicio").hide();
        });
    }

    function tiempoRestante() {
        if (tiempo == "") {
            $("#tiempo").html("-:--");
        } else if (activo) {
            var segundos = tiempo_restante % 60;
            var minutos = Math.floor(tiempo_restante / 60);
            if (segundos <= 9) {
                segundos = "0" + segundos;
            }
            $("#tiempo,#tiempoRestante").html("0" + minutos + ":" + segundos);
            if (tiempo_restante == 0) {
                activo = false;
                $("#buttonInicio").show();
            }
            tiempo_restante -= 1;
        }

    }

    function letras_aleatorias() {
        //TODO solventar error de letras no rellenas
        let letras = [
            ['A', 'B', 'E', 'C', 'D'],
            ['A', 'F', 'I', 'G', 'H'],
            ['J', 'A', 'E', 'U', 'D'],
            ['L', 'M', 'O', 'I', 'N'],
            ['Ñ', 'E', 'O', 'P', 'U'],
            ['V', 'A', 'Q', 'R', 'S'],
            ['E', 'A', 'U', 'W', 'T'],
            ['E', 'A', 'U', 'X', 'Y'],
            ['O', 'G', 'Q', 'I', 'Z'],
            ['A', 'B', 'E', 'C', 'D'],
            ['J', 'A', 'E', 'U', 'K'],
            ['L', 'M', 'O', 'I', 'N'],
            ['Ñ', 'E', 'O', 'P', 'U'],
            ['V', 'A', 'Q', 'R', 'S'],
            ['E', 'S', 'U', 'L', 'M'],
            ['E', 'A', 'U', 'I', 'Y'],
            ['E', 'K', 'I', 'G', 'I']
        ];
        for (var i = 1; i <= 5; i++) {
            var indice = Math.floor(Math.random() * (letras.length));
            var letras_a_usar = letras[indice];
            for (var j = 1; j <= 5; j++) {
                var indice_letras = Math.floor(Math.random() * (letras_a_usar.length - 1));
                $("." + i + "_" + j).html(letras_a_usar[indice_letras]);
                letras_a_usar.splice(indice_letras, 1);
            }
            letras.splice(indice, 1);
        }

    }

    function capturar_letra() {

    }

});