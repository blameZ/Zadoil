document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
	const link = dropdown.querySelector('a')
	const menu = dropdown.querySelector('.dropdown-menu')

	if (window.innerWidth > 768) {
		const dropdowns = document.querySelectorAll('.nav-item.dropdown')

		dropdowns.forEach(dropdown => {
			const menu = dropdown.querySelector('.dropdown-menu')
			let timeout

			dropdown.addEventListener('mouseenter', () => {
				clearTimeout(timeout)
				menu.style.display = 'block'
			})

			dropdown.addEventListener('mouseleave', () => {
				timeout = setTimeout(() => {
					menu.style.display = 'none'
				}, 100)
			})
		})

		dropdowns.forEach(dropdown => {
			dropdown.addEventListener('click', () => {
				menu.style.display = 'none'
			})
		})
	}

	menu.querySelectorAll('a').forEach(itemLink => {
		itemLink.addEventListener('click', () => {
			menu.classList.remove('show')
		})
	})
})
