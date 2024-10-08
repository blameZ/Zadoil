document.addEventListener('DOMContentLoaded', function () {
	const currentYearElement = document.getElementById('current-year')
	const currentYear = new Date().getFullYear()
	currentYearElement.textContent = currentYear
})

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

document.addEventListener('DOMContentLoaded', function () {
	const navLinks = document.querySelectorAll('.nav-link')
	const sections = document.querySelectorAll('section')

	window.addEventListener('scroll', function () {
		let currentSection = ''

		sections.forEach(section => {
			const sectionTop = section.offsetTop
			const sectionHeight = section.clientHeight

			if (pageYOffset >= sectionTop - sectionHeight / 3) {
				currentSection = section.getAttribute('id')
			}
		})

		navLinks.forEach(link => {
			link.classList.remove('active')
			if (link.getAttribute('href').includes(currentSection)) {
				link.classList.add('active')
			}
		})
	})
})
