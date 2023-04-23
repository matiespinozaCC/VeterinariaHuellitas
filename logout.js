window.onload = function() {
	var message = document.getElementById("message");
	if (message.innerHTML == "Has cerrado sesión correctamente.") {
		setTimeout(function(){message.innerHTML = "";}, 3000);
	}
}

function logout() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'logout.php', true);
	xhr.send();
	document.getElementById("message").innerHTML = "Has cerrado sesión correctamente.";
}