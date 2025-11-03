document.addEventListener('DOMContentLoaded', () => {
	// --- SELEKTORY (Elementy, które łapiemy ze strony) ---
	const productGrid = document.getElementById('product-grid')
	const categoryList = document.getElementById('category-list')
	const searchInput = document.getElementById('search-input')
	const allCountSpan = document.getElementById('count-all')

	// NOWE SELEKTORY DLA LICZNIKA WYNIKÓW
	const resultsCounter = document.getElementById('results-counter')
	const countStart = document.getElementById('count-start')
	const countVisible = document.getElementById('count-visible')
	const countTotal = document.getElementById('count-total')
	const noResultsMessage = document.getElementById('no-results-message')

	// Sprawdzamy, czy kluczowe elementy istnieją
	if (!productGrid || !categoryList || !searchInput || !allCountSpan || !resultsCounter) {
		console.error('Brakuje kluczowych elementów JS do filtrowania lub zliczania.')
		return // Przerwij skrypt, jeśli czegoś brakuje
	}

	const allProducts = productGrid.querySelectorAll('.col-xl-4.col-md-6[data-category]')
	const categoryLinks = categoryList.querySelectorAll('a[data-category]')

	// ----------------------------------------------------
	// NOWA FUNKCJA: Aktualizowanie licznika "Wyświetlanie 1-X z Y..."
	// ----------------------------------------------------
	function updateResultsCount() {
		const totalCount = allProducts.length
		let visibleCount = 0

		// Liczymy widoczne produkty
		allProducts.forEach(product => {
			if (product.style.display !== 'none') {
				visibleCount++
			}
		})

		// Aktualizujemy tekst
		countTotal.textContent = totalCount
		countVisible.textContent = visibleCount

		// Logika dla "startu" i komunikatu "Brak wyników"
		if (visibleCount === 0) {
			countStart.textContent = '0' // Pokaż "Wyświetlanie 0-0 z Y"
			noResultsMessage.style.display = 'block' // Pokaż komunikat "Brak wyników"
		} else {
			countStart.textContent = '1' // Pokaż "Wyświetlanie 1-X z Y"
			noResultsMessage.style.display = 'none' // Ukryj komunikat "Brak wyników"
		}
	}

	// ----------------------------------------------------
	// FUNKCJA 1: Dynamiczne zliczanie kategorii (bez zmian)
	// ----------------------------------------------------
	function updateCategoryCounts() {
		let totalProductCount = 0
		categoryLinks.forEach(link => {
			const category = link.dataset.category
			const countSpan = link.querySelector('span')
			if (!countSpan) return
			if (category === 'all') return

			const count = productGrid.querySelectorAll(`[data-category="${category}"]`).length
			totalProductCount += count
			countSpan.textContent = `(${count})`
		})
		allCountSpan.textContent = `(${totalProductCount})`
	}

	// ----------------------------------------------------
	// FUNKCJA 2: Filtrowanie po kategoriach (ZAKTUALIZOWANA)
	// ----------------------------------------------------
	function setupCategoryFilter() {
		categoryList.addEventListener('click', e => {
			e.preventDefault()
			const targetLink = e.target.closest('a[data-category]')
			if (!targetLink) return

			const categoryToFilter = targetLink.dataset.category

			allProducts.forEach(product => {
				const productCategory = product.dataset.category
				if (categoryToFilter === 'all' || productCategory === categoryToFilter) {
					product.style.display = 'block'
				} else {
					product.style.display = 'none'
				}
			})

			categoryLinks.forEach(link => link.classList.remove('active-filter'))
			targetLink.classList.add('active-filter')

			// WYWOŁANIE NOWEJ FUNKCJI
			updateResultsCount()
		})
	}

	// ----------------------------------------------------
	// FUNKCJA 3: Wyszukiwanie "na żywo" (ZAKTUALIZOWANA)
	// ----------------------------------------------------
	function setupSearchFilter() {
		searchInput.addEventListener('input', e => {
			const searchTerm = e.target.value.toLowerCase().trim()

			allProducts.forEach(product => {
				const title = product.querySelector('.card-title')?.textContent.toLowerCase() || ''
				const model = product.querySelector('.card-model')?.textContent.toLowerCase() || ''
				const productText = title + ' ' + model

				if (productText.includes(searchTerm)) {
					product.style.display = 'block'
				} else {
					product.style.display = 'none'
				}
			})

			// WYWOŁANIE NOWEJ FUNKCJI
			updateResultsCount()
		})

		searchInput.closest('form').addEventListener('submit', e => e.preventDefault())
	}

	// --- URUCHOMIENIE FUNKCJI PRZY STARCIE STRONY ---
	updateCategoryCounts()
	setupCategoryFilter()
	setupSearchFilter()
	updateResultsCount() // Uruchom też licznik wyników na starcie
})
