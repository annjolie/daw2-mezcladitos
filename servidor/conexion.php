<?php
	$servidor="localhost";
	$usuario="root";
	$contraseña="";
	$baseDatos="mezcladitos";

	// Creamos a conexión
	$conexion = new mysqli($servidor, $usuario, $contraseña, $baseDatos);
	$conexion->query("SET NAMES 'utf8'");
?>