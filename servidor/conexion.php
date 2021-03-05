<?php
	$servidor="localhost";
	$usuario="mezcladito";
	$contraseña="Mezcladit02.";
	$baseDatos="mezcladitos";

	// Creamos a conexión
	$conexion = new mysqli($servidor, $usuario, $contraseña, $baseDatos);
	$conexion->query("SET NAMES 'utf8'");
?>