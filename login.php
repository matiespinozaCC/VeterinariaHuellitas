<?php
session_start();

// Verifica si el usuario y la contraseña son correctos
if ($_POST['username'] == 'usuario' && $_POST['password'] == 'contraseña') {
	// Si son correctos, crea una sesión y redirecciona al usuario a la página principal
	$_SESSION['loggedin'] = true;
	header('Location: inicio.html');
	exit;
} else {
	// Si no son correctos, muestra un mensaje de error
	echo 'Usuario o contraseña incorrectos';
}
?>