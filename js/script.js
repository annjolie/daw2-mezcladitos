$(document).ready(function() {
    var activo;
    var tiempo_restante;
    var mouse_presionado;
    var palabra_seleccionada;
    var letra_Seleccionada;
    var palabras_juego = [];
    var intervalo;
    var score;

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

    $("#buttonSalirRegla").click(function() {
        activo = true;
        $("#vistaReglas").hide();
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
                var palabra_aux = palabra_seleccionada;
                $.ajax({
                    type: "POST",
                    url: "servidor/comprobarPalabra.php",
                    data: {palabra: palabra_aux},
                    dataType: "json"
                })
                    .done(function (data) {
                        var tipo_palabra;
                        if (data.puntaje > 0) {
                            tipo_palabra = "valido";
                            score += parseInt(data.puntaje);
                            actualizarScore();
                        }
                        else {
                            tipo_palabra = "invalido";
                        }
                        palabras_juego.push({
                            palabra: palabra_aux,
                            tipo: tipo_palabra
                        });
                        listaPalabras();
                    });
            } else {
                palabras_juego.push({
                    palabra: palabra_seleccionada,
                    tipo: "repetido"
                });
                listaPalabras();
            }
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

    function actualizarScore() {
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
            score = 0;
            actualizarScore();
            listaPalabras([]);
            activo = true;
            tiempo_restante = 180;
            tiempoRestante();
            intervalo = setInterval(tiempoRestante, 1000);
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
                $("#buttonPausa").hide();
                clearInterval(intervalo);
            }
            tiempo_restante -= 1;
        }

    }

    function letras_aleatorias() {
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
                var indice_letras = Math.floor(Math.random() * (letras_a_usar.length));
                $("." + i + "_" + j).html(letras_a_usar[indice_letras]);
                letras_a_usar.splice(indice_letras, 1);
            }
            letras.splice(indice, 1);
        }

    }
});