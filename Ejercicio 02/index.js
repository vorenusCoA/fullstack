// Modulo personalizado con las funciones de lectura
var reader = require("./api");
// Directorio donde se encuentran los archivos
var path = __dirname + "/archivos/";
var archivoALeer = "archivo01.txt";

// Descomentar funciones para testear
// reader.leerDirectorio(path);
// reader.readFile(path + archivoALeer);
// reader.readFileSync(path + archivoALeer);
