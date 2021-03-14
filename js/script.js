$(document).ready(function() {
    var activo;
    var tiempo_restante;
    var mouse_presionado;
    var palabra_seleccionada;
    var letra_Seleccionada;
    var palabras_juego = [];
    var intervalo;
    var score;
    var textos;

    $("#vistaPausa").hide();
    $("#vistaReglas").hide();
    $(".fondoPausa").hide();
    $("#buttonPausa").hide();
    $("#vistaFinDeJuego").hide();
    $("#vistaTop10").hide();

    iniciarJuego();

    $("#buttonPausa").click(function() {
        activo = false;
        $("#vistaPausa").show();
        $(".fondoPausa").show();
        $("html").addClass('sin-desbordamiento');
    });

    $("#buttonContinuar").click(function() {
        activo = true;
        $("#vistaPausa").hide();
        $(".fondoPausa").hide();
        $("html").removeClass("sin-desbordamiento");
    });

    $("#buttonReglas").click(function () {
        $("#vistaReglas").show();
        $(".fondoPausa").show();
        $("html").addClass('sin-desbordamiento');
    });

    $("#buttonSalirRegla").click(function() {
        activo = true;
        $("#vistaReglas").hide();
        $(".fondoPausa").hide();
        $("html").removeClass("sin-desbordamiento");
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

    $("#buttonVolverAJugar").click(function () {
        $("#vistaFinDeJuego").hide();
        $(".fondoPausa").hide();
        $("html").removeClass("sin-desbordamiento");
    });

    $(document).mouseup(function() {
        // Aquí haces la lógica para capturar las letras
        if (activo && palabra_seleccionada.length > 2) {
            //  1.1 Comparar la palabra contra la lista de palabras:
            if ($("#listaPalabras li").filter(function() {
                return $(this).text() === palabra_seleccionada;
            }).length == 0) {
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
        $("#score").html(textos.puntaje + ": " + (score || ""));
    }

    function listaPalabras() {
        $("#listaPalabras").html("");
        for (var element of palabras_juego) {
            $("#listaPalabras").append("<li class='" + element.tipo + "'>" + element.palabra + "</li>");
        }
        $('#listaPalabras').scrollTop($('#listaPalabras')[0].scrollHeight);
    }

    function iniciarJuego() {
        //TODO ocultar boton o cambiar texto
        //TODO detener el temporizador
        $("#buttonInicio").click(function() {
            score = 0;
            palabras_juego = [];
            actualizarScore();
            listaPalabras();
            activo = true;
            tiempo_restante = 180;
            tiempoRestante();
            if (intervalo) {
                clearInterval(intervalo);
            }
            intervalo = setInterval(tiempoRestante, 1000);
            $("#buttonPausa").show();
            letras_aleatorias();
            $("#buttonReglas").hide();
            $("#buttonTop10").hide();
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
                $("#buttonPausa").hide();
                $("#buttonReglas").show();
                $("#buttonTop10").show();
                clearInterval(intervalo);
                $(".fondoPausa").show();
                $("#vistaFinDeJuego").show();
                $("#vistaFinDeJuego span").hide();
                $("html").addClass("sin-desbordamiento");
                validar_top_10();
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

    function validar_top_10() {
        $.ajax({
            type: "POST",
            url: "servidor/validartopten.php",
            data: {puntaje: score},
            dataType: "json"
        })
            .done(function (data) {
                $("#vistaFinDeJuego > label").html(textos.score_final + ": <span>" + score + "</span>");
                if (data.esvalido) {
                    $("#vistaFinDeJuego > span.topten").show();
                }
                else {
                    $("#vistaFinDeJuego > span.findejuego").show();
                }
            });
    }

    $("#guardarJugador").click(function () {
        if ($("#jugador").val().length > 1) {
            $.ajax({
                type: "POST",
                url: "servidor/agregartopten.php",
                data: {jugador: $("#jugador").val(), puntaje: score},
                dataType: "json"
            })
                .done(function () {
                    $("#vistaFinDeJuego").hide();
                    $(".fondoPausa").hide();
                    $("html").removeClass("sin-desbordamiento");
                    mostrar_top_10();
                });
        }
    });

    function mostrar_top_10() {
        $("#vistaTop10").show();
        $(".fondoPausa").show();
        $("html").addClass("sin-desbordamiento");
        $("#vistaTop10 > div > section").html("");
        $.ajax({
            type: "GET",
            url: "servidor/obtenertopten.php",
            dataType: "json"
        })
            .done(function (data) {
                if (data.partidas.length > 0) {
                    var htmlstring = "<table><tr><th>" + textos.posicion + "</th><th>" + textos.nombre_jugador + "</th><th>" + textos.puntaje + "</th><th>" + textos.fecha + "</th></tr>";
                    var contador = 1;
                    $(data.partidas).each(function () {
                        htmlstring += "<tr><td>" + contador + "</td><td>" + this.nombre_jugador + "</td><td>" + this.puntaje + "</td><td>" + this.fecha_juego + "</td></tr>";
                        contador++;
                    });
                    htmlstring += "</table>";
                    $("#vistaTop10 > div > section").append(htmlstring);
                }
                else {
                    $("#vistaTop10 > div > section").append("<label>" + textos.no_hay_partidas + "</label>");
                }
            });
    }

    $("#buttonTop10").click(mostrar_top_10);

    $("#buttonVolverAInicio").click(() => {
        $("#vistaTop10").hide();
        $(".fondoPausa").hide();
        $("html").removeClass("sin-desbordamiento");
    });

    $("#seleccionarIdioma").change(obtenerIdioma);

    function obtenerIdioma() {
        var idiomaSeleccionado = $("#seleccionarIdioma").val();
        $.ajax({
            type: "POST",
            url: "servidor/obteneridioma.php",
            data: {idioma: idiomaSeleccionado},
            dataType: "json"
        })
            .done(function (data) {
                if (data.datos) {
                    textos = data.datos;
                    $("#textoTiempo").html(textos.tiempo);
                    $("#score").html(textos.puntaje)
                    $("#buttonInicio").html(textos.boton_empezar);
                    $("#buttonPausa").html(textos.boton_pausar);
                    $("#buttonReglas").html(textos.boton_reglas);
                    $("#buttonTop10").html(textos.boton_top10);
                    $("#vistaPausa > h2").html(textos.pausado);
                    $("#vistaPausa > span").html(textos.tiempo_restante + "<label id='tiempoRestante'>-:--</label>");
                    $("#buttonContinuar").html(textos.boton_continuar);
                    $("#vistaReglas > h2").html(textos.titulo_reglas);
                    $("#vistaReglas .paso1 > h3").html(textos.titulo_paso1);
                    $("#vistaReglas .paso1 > p").html(textos.paso1);
                    $("#vistaReglas .paso2 > h3").html(textos.titulo_paso2);
                    $("#vistaReglas .paso2 > p").html(textos.paso2);
                    $("#vistaReglas .paso3 > h3").html(textos.titulo_paso3);
                    $("#vistaReglas .paso3 > p").html(textos.paso3);
                    $("#vistaReglas .paso4 > h3").html(textos.titulo_paso4);
                    $("#vistaReglas .paso4 > p").html(textos.paso4);
                    $("#vistaReglas > h3").html(textos.recordatorio);
                    $("#buttonSalirRegla").html(textos.boton_salir);
                    $("#vistaFinDeJuego > h2").html(textos.fin_juego);
                    $("#vistaFinDeJuego label[for='jugador']").html(textos.nombre_jugador);
                    $("#guardarJugador").html(textos.guardar_jugador);
                    $("#vistaFinDeJuego .findejuego > p").html(textos.indicacion_inicio);
                    $("#buttonVolverAJugar").html(textos.boton_volver_jugar);
                    $("#vistaTop10 > div > h2").html(textos.titulo_top_10);
                    $("#vistaTop10 > div > p").html(textos.volver_inicio);
                    $("#buttonVolverAInicio").html(textos.volver);
                    actualizarScore();
                }
            });
    }

    obtenerIdioma();
});