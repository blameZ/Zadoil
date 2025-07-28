document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
	const link = dropdown.querySelector('a')
	const menu = dropdown.querySelector('.dropdown-menu')

	dropdown.addEventListener('mouseenter', () => {
		menu.classList.add('show')
	})
	dropdown.addEventListener('mouseleave', () => {
		menu.classList.remove('show')
	})

	link.addEventListener('click', e => {
		menu.classList.toggle('show')
	})

	menu.querySelectorAll('a').forEach(itemLink => {
		itemLink.addEventListener('click', () => {
			menu.classList.remove('show')
		})
	})
})
