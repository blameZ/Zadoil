document.addEventListener('DOMContentLoaded', function () {
	const nav = document.querySelector('.navbar')
	const allNavItems = document.querySelectorAll('.nav-link')
	const navList = document.querySelector('.navbar-collapse')

	function addShadow() {
		if (window.scrollY >= 300) {
			nav.classList.add('shadow-bg')
		} else {
			nav.classList.remove('shadow-bg')
		}
	}

	allNavItems.forEach(item =>
		item.addEventListener('click', () => {
			navList.classList.remove('show')
		})
	)

	window.addEventListener('scroll', addShadow)
})

document.addEventListener('DOMContentLoaded', function () {
	const navLinks = document.querySelectorAll('.nav-link')

	navLinks.forEach(link => {
		link.addEventListener('click', function () {
			navLinks.forEach(nav => nav.classList.remove('active'))

			this.classList.add('active')
		})
	})
})
