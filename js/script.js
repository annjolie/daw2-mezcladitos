function actualizarScore(score) {
    $("#score").html("score: " + score);
}

function listaPalabras(palabras) {
    $("#listaPalabras").html("");
    for (var element of palabras) {
        $("#listaPalabras").append("<li>" + element + "</li>");
    }
}