<?php
	$servidor="localhost";
	$usuario="user_mezcladito";
	$contraseña="Mezcladit02.";
	$baseDatos="mezcladitos";

	// Creamos a conexión
	$conexion = new mysqli($servidor, $usuario, $contraseña, $baseDatos);
	$conexion->query("SET NAMES 'utf8'");
?>