function acceptCookies() {
	localStorage.setItem('cookieAccepted', 'true')
	document.getElementById('cookie-banner').style.display = 'none'
}

window.onload = function () {
	if (!localStorage.getItem('cookieAccepted')) {
		document.getElementById('cookie-banner').style.display = 'block'
	}
}
