<?php
	require("conexion.php");

    $palabra = $_POST["palabra"];
    $primera_letra = $palabra[0];

    $consulta = "SELECT puntaje FROM palabras_$primera_letra 
        WHERE palabra=$palabra LIMIT 1";

    $puntaje = -1;
	if ($datos = $conexion->query($consulta))
	{
		$resultado = $datos->fetch_object(); 
		$puntaje = $palabra->puntaje;
        $datos->close();
	}
	
	$conexion->close();
    $salida = array("puntaje" => $puntaje);
	echo json_encode($salida);
?>