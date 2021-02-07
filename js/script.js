$(document).ready(function() {
    var activo;
    var tiempo_restante;


    function actualizarScore(score) {
        $("#score").html("score: " + score);
    }

    function listaPalabras(palabras) {
        $("#listaPalabras").html("");
        for (var element of palabras) {
            $("#listaPalabras").append("<li>" + element + "</li>");
        }
    }

    function iniciarJuego() {
        $("#buttonInicio").click(function() {
            actualizarScore(0);
            listaPalabras([]);
            activo = true;
            tiempo_restante = 180;
            tiempoRestante();
            setInterval(tiempoRestante, 1000);
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
            $("#tiempo").html("0" + minutos + ":" + segundos);
            if (tiempo_restante == 0) {
                activo = false;
            }
            tiempo_restante -= 1;
        }

    }

    function pausarJuego() {

    }

    iniciarJuego();

});