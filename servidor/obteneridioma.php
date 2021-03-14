<?php
	require("conexion.php");

	$idioma = $_POST["idioma"];

	$consulta = "SELECT * FROM idiomas WHERE idioma='$idioma'";

	$resultado = [];
	if ($datos = $conexion->query($consulta))
	{
		$resultado = $datos->fetch_object();
		$datos->close();
	}
	
	$conexion->close();

	$salida = array("datos" => $resultado);
	echo json_encode($salida);

?>