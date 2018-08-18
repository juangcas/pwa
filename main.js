// Service Worker
if ('serviceWorker' in navigator) {
	console.log("Puedes usar los SW en tu navegador");

	navigator.serviceWorker.register('./sw.js')
						   .then(res => console.log("SW cargado", res))
						   .catch(err => console.log("Eror al cargar el SW", err));
} else {
	console.log("NO Puedes usar los SW en tu navegador");
}

// Scroll Suavizado
$(document).ready(function() {
	$("#menu a").click(function(event) {
		event.preventDefault();

		console.log($("#services").offset().top);

		$("html, body").animate({
			scrollTop: $($(this).attr('href')).offset().top
		});

		return false;
	});
});