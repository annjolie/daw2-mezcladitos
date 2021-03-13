<?php
	require("conexion.php");

	$jugador = $_POST["jugador"];
	$puntaje = intval($_POST["puntaje"]);

	$consulta = "SELECT * FROM partidas ORDER BY puntaje DESC, fecha_juego DESC";

	$partidas = [];
	$resultado = $conexion->query($consulta);

	if ($resultado->num_rows > 0) {
		$agregado = false;
		while($partida = $resultado->fetch_assoc()) {
			if ($agregado == false && $puntaje >= intval($partida["puntaje"]))
			{
				$partidas[] = ["jugador" => $jugador, "puntaje" => $puntaje];
				$agregado = true;
			}
			$partidas[] = ["jugador" => $partida["nombre_jugador"], "puntaje" => $partida["puntaje"], "fecha_juego" => $partida["fecha_juego"]];
		}
		if ($agregado == false) {
			$partidas[] = ["jugador" => $jugador, "puntaje" => $puntaje];
		}
	}
	else {
		$partidas[] = ["jugador" => $jugador, "puntaje" => $puntaje];
	}

	$consulta = "DELETE FROM partidas;";
	$conexion->query($consulta);
	$contador = 0;
	foreach ($partidas as $partida) {
		if (isset($partida["fecha_juego"])) { 
			$consulta = "INSERT INTO partidas (nombre_jugador, puntaje, fecha_juego) VALUES('".$partida["jugador"]."', '".$partida["puntaje"]."', '".$partida["fecha_juego"]."')";
		}
		else {
			$consulta = "INSERT INTO partidas (nombre_jugador, puntaje) VALUES('".$partida["jugador"]."', '".$partida["puntaje"]."')";
		}
		$conexion->query($consulta);
		if (++$contador == 10) {
			break;
		}
	}
	
	$conexion->close();

	$salida = array("finalizado" => true);
	echo json_encode($salida);

?>