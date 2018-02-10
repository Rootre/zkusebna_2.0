/**
 * @module Anchors
 */
/**
 * Animates scrolling to anchors with GSAP
 * @param {jQuery} $nodes - links with anchors
 * @param {jQuery} $logo - logo element
 */
const init = ($nodes, $logo) => {
	$nodes.on('click', function (e) {
		const id = $(this).attr('href')

		if (id && $(id).length) {
			e.preventDefault()

			$('html, body').animate({scrollTop: $(id).offset().top - $logo.height() - 70}, 1000);

			if (window.history && window.history.pushState) {
				history.pushState("", document.title, id)
			}
		}
	})
}

export default {
	init
}