<?php
	require("conexion.php");

	try
	{
		$palabra = strtolower($_POST["palabra"]);
		$primera_letra = substr($palabra, 0, 1);

		$consulta = "SELECT puntaje FROM palabras_$primera_letra WHERE palabra='$palabra' LIMIT 1;";
		$puntaje = -1;

		if ($datos = $conexion->query($consulta))
		{
			$resultado = $datos->fetch_object();
			if ($resultado) {
				$puntaje = intval($resultado->puntaje);
			}
			$datos->close();
		}
		
		$conexion->close();
	}
	catch (Exception $e)
	{
		error_log("Error $e", 3, "error.log");
	}
	$salida = array("puntaje" => $puntaje);
	echo json_encode($salida);
?>