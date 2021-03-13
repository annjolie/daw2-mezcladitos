<?php
	require("conexion.php");

	$puntaje = intval($_POST["puntaje"]);

	$consulta = "SELECT puntaje FROM partidas ORDER BY puntaje LIMIT 1;";
	$esvalido = false;

	if ($datos = $conexion->query($consulta))
	{
		$resultado = $datos->fetch_object();
		if ($resultado) {
			if ($puntaje >= intval($resultado->puntaje))
			{
				$esvalido = true;
			}
		}
		else {
			$esvalido = true;
		}
		$datos->close();
	}
	else {
		$esvalido = true;
	}
	
	$conexion->close();

	$salida = array("esvalido" => $esvalido);
	echo json_encode($salida);
?>