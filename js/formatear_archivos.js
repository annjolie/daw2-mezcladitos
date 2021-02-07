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
    const listaPalabras = [];
    for (const linea of lineas) {
        if (linea.length > 2 && /^[a-z]*,[^,]+$/.test(linea)) {
            const palabras = linea.replaceAll(" ", "").split(",");
            if (listaPalabras.indexOf(palabras[0]) < 0) {
                // Si entra aqui es porque no tenemos esa palabra
                listaPalabras.push(palabras[0]);
            }
            if (palabras[1]) {
                // Si entra aqui es porque hay que revisar si tenemos esta palabra adicional
                const nuevaPalabra = palabras[0].slice(0, palabras[0].lastIndexOf(palabras[1][0])) + palabras[1];

                if (listaPalabras.indexOf(nuevaPalabra) < 0) {
                    // Si entra aqui es porque no tenemos esa palabra
                    listaPalabras.push(palabras[0]);
                }
            }
        }
    }
}

for (const letra of "abcdefghijklmnñopqrstuvxyz") {
    leerArchivoTXT(letra, formatearTexto);
}
