let nodes = []

export const add = (source, custom_ratio = '') => {
	if (typeof source === 'string') {
		let elms = document.querySelectorAll(source)

		if ( !elms.length) {
			return false
		}

		elms.forEach(element => _hydrateElement(element, custom_ratio))

		nodes = [...nodes, ...elms]
	}
	else if (source instanceof NodeList) {
		if ( !source.length) {
			return false
		}

		source.forEach(element => _hydrateElement(element, custom_ratio))

		nodes = [...nodes, ...source]
	}
	else if (source instanceof Element) {
		_hydrateElement(source, custom_ratio)

		node.push(source)
	}

	return true
}
export const init = () => {
	_removeWatch()
	_watch()
}

const _hydrateElement = (element, custom_ratio) => {
	let box = element.getBoundingClientRect()
	let ratio = element.getAttribute('data-ratio') || box.width / box.height

	element.responsiveRatio = custom_ratio || ratio
}
const _hydrateRatio = element => {
	if ( !element.responsiveRatio) {
		return false
	}

	let width = element.getBoundingClientRect().width

	element.style.height = Math.round(width / element.responsiveRatio)
}
const _removeWatch = () => {
	window.removeEventListener('resize', _viewportChanged)
}
const _viewportChanged = () => {
	nodes.forEach(element => {
		_hydrateRatio(element)
	})
}
const _watch = () => {
	window.addEventListener('resize', _viewportChanged)
}
