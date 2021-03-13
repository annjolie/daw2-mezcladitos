<?php
	require("conexion.php");

	$consulta = "SELECT * FROM partidas ORDER BY puntaje DESC, fecha_juego DESC";

	$partidas = [];
	$resultado = $conexion->query($consulta);

	if ($resultado->num_rows > 0) {
		while($partida = $resultado->fetch_assoc()) {
            $partidas[] = $partida;
		}
	}
	
	$conexion->close();

	$salida = array("partidas" => $partidas);
	echo json_encode($salida);

?>