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
		} else if (window.location.pathname.includes('rental')) {
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

	addShadow()

	window.addEventListener('scroll', addShadow)
})

document.addEventListener('DOMContentLoaded', function () {
	const navLinks = document.querySelectorAll('.nav-link')
	const sections = document.querySelectorAll('section')

	if (!window.location.pathname.includes('rental')) {
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
	}
})

document.addEventListener('DOMContentLoaded', function () {
	const navLinks = document.querySelectorAll('.nav-link')
	const currentPath = window.location.pathname

	navLinks.forEach(link => link.classList.remove('active'))

	if (currentPath.includes('rental')) {
		document.getElementById('nav-rental').classList.add('active')
	}
})

document.addEventListener('DOMContentLoaded', function () {
	const modal = document.getElementById('photo-modal')
	const modalImage = document.querySelector('.photo-modal-image')
	const modalCaption = document.querySelector('.photo-modal-caption')
	const modalDescription = document.querySelector('.photo-modal-description') // Opis w modalu
	const modalThumbnailsContainer = document.querySelector('.photo-modal-thumbnails')
	const modalClose = document.querySelector('.photo-modal-close')
	const modalPrev = document.querySelector('.photo-modal-prev')
	const modalNext = document.querySelector('.photo-modal-next')

	let currentIndex = 0
	let images = []

	function openModal(rentalOffer) {
		const title = rentalOffer.querySelector('.rental-offer__title').textContent
		const description = rentalOffer.querySelector('.rental-offer__description')?.textContent || ''
		images = JSON.parse(rentalOffer.getAttribute('data-images')) || []
		currentIndex = 0

		if (images.length > 0) {
			modalImage.src = images[currentIndex]
			modalCaption.textContent = title
			modalDescription.textContent = description

			modalThumbnailsContainer.innerHTML = ''
			images.forEach((src, index) => {
				const thumbnail = document.createElement('img')
				thumbnail.src = src
				thumbnail.classList.add('photo-modal-thumbnail')
				if (index === currentIndex) thumbnail.classList.add('active')
				thumbnail.addEventListener('click', function () {
					currentIndex = index
					modalImage.src = src
					updateActiveThumbnail()
				})
				modalThumbnailsContainer.appendChild(thumbnail)
			})

			modal.style.display = 'block'
		}
	}

	function updateActiveThumbnail() {
		const thumbnails = modalThumbnailsContainer.querySelectorAll('.photo-modal-thumbnail')
		thumbnails.forEach((thumbnail, index) => {
			thumbnail.classList.toggle('active', index === currentIndex)
		})
	}

	const moreButtons = document.querySelectorAll('.btn')
	moreButtons.forEach(button => {
		button.addEventListener('click', function (event) {
			event.preventDefault()

			const rentalOffer = button.closest('.rental-offer')
			openModal(rentalOffer)
		})
	})

	modalClose.addEventListener('click', function () {
		modal.style.display = 'none'
	})

	modalPrev.addEventListener('click', function () {
		if (images.length > 0) {
			currentIndex = (currentIndex - 1 + images.length) % images.length
			modalImage.src = images[currentIndex]
			updateActiveThumbnail()
		}
	})

	modalNext.addEventListener('click', function () {
		if (images.length > 0) {
			currentIndex = (currentIndex + 1) % images.length
			modalImage.src = images[currentIndex]
			updateActiveThumbnail()
		}
	})

	window.addEventListener('click', function (event) {
		if (event.target === modal) {
			modal.style.display = 'none'
		}
	})
})
