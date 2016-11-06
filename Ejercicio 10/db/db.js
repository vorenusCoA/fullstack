// Se inicia la DB con un usuario admin a modo de testeo
var users = [
	{username: "admin", pass: 123, token:"admin123"}
];

var listasDeActividades = [
	{username: "admin", actividades: ["Activar usuarios", "Delegar tareas"]}
];

module.exports = {
	users : users,
	listasDeActividades : listasDeActividades
}
