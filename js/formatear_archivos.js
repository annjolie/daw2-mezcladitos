function leerArchivoTXT(archivo, callback)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "./dics/" + archivo + ".txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                callback(rawFile.responseText);
            }
        }
    }
    rawFile.send(null);
}

function formatearTexto(texto) {
    const lineas = texto.split("\n");
    for (const linea of lineas) {
        if (linea.length > 2 && /^[a-z]*,[^,]+$/.test(linea)) {
            
        }
    }
}

for (const letra of "abcdefghijklmnñopqrstuvxyz") {
    leerArchivoTXT(letra, formatearTexto);
}
