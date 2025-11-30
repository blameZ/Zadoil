document.addEventListener('DOMContentLoaded', () => {
	const popup = document.getElementById('wigilia-popup')
	if (!popup) return

	const popupImg = popup.querySelector('.wigilia-popup__img')
	const closeBtn = popup.querySelector('.wigilia-popup__close')
	const overlay = popup.querySelector('.wigilia-popup__overlay')

	const expirationDate = new Date(2026, 0, 1)
	const now = new Date()

	if (now >= expirationDate) return

	const openPopup = () => {
		popup.style.display = ''
		popup.classList.add('is-flex')

		requestAnimationFrame(() => {
			popup.classList.add('is-visible')
		})
	}

	const closePopup = () => {
		popup.classList.remove('is-visible')
		setTimeout(() => {
			popup.classList.remove('is-flex')
			popup.style.display = 'none'
		}, 300)
	}

	if (popupImg.complete) {
		setTimeout(openPopup, 100)
	} else {
		popupImg.onload = () => {
			setTimeout(openPopup, 100)
		}
	}

	closeBtn.addEventListener('click', closePopup)
	overlay.addEventListener('click', closePopup)

	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && popup.classList.contains('is-visible')) {
			closePopup()
		}
	})
})
