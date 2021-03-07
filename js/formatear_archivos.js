const todasLasLetras = "abcdefghijklmnñopqrstuvxyz";
let data = "";
let contador = 0;

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
        if (linea.length > 2 && linea.indexOf("-") === -1) {
            const palabras = linea.replaceAll(" ", "")
            .replaceAll("á", "a").replaceAll("é", "e")
            .replaceAll("í", "i").replaceAll("ó", "o")
            .replaceAll("ú", "u").replaceAll("1", "")
            .replaceAll("2", "").replaceAll("3", "")
            .replaceAll("4", "").replaceAll("5", "")
            .replaceAll("6", "").replaceAll("7", "")
            .replaceAll("8", "").replaceAll("9", "")
            .replaceAll("\n", "").replaceAll("\r", "").split(",");
            let repetida = false;
            for (const p of listaPalabras) {
                if (p === palabras[0]) {
                    repetida = true;
                    break;
                }
            }
            if (!repetida) {
                // Si entra aqui es porque no tenemos esa palabra
                if (palabras[0].length > 2) {
                    listaPalabras.push(palabras[0]);
                }
            }
            if (palabras[1]) {
                // Si entra aqui es porque hay que revisar si tenemos esta palabra adicional
                const nuevaPalabra = palabras[0].slice(0, palabras[0].lastIndexOf(palabras[1][0])) + palabras[1];

                let repetida = false;
                for (const p of listaPalabras) {
                    if (p === nuevaPalabra) {
                        repetida = true;
                        break;
                    }
                }
                if (!repetida) {
                    // Si entra aqui es porque no tenemos esa palabra
                    if (nuevaPalabra.length > 2) {
                        listaPalabras.push(nuevaPalabra);
                    }
                }
            }
        }
    }
    for (const palabra of listaPalabras) {
        data += `INSERT INTO palabras_${palabra[0]} (palabra, puntaje) VALUE('${palabra}',${palabra.length - 2});\n`;
    }
    data += '\n\n';
    contador++;
    console.log(contador, todasLasLetras.length);
    if (contador === todasLasLetras.length) {
        descargarArchivo(data, "letras.sql");
    }
}

// Function to download data to a file
function descargarArchivo(data, nombreArchivo) {
    var file = new Blob([data], {type: "text/plain"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, nombreArchivo);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = nombreArchivo;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

for (const letra of todasLasLetras) {
    leerArchivoTXT(letra, formatearTexto);
}
