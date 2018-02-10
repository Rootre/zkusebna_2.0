import TweenLite from 'TweenLite'

import Anchors from './modules/Anchors'
import Forms from './modules/Forms'
import FormValidator from './modules/FormValidator'
import Openers from './modules/Openers'
import {init as ResponsiveSVGInit, add as ResponsiveSVGAdd} from './modules/ResponsiveSVG'
import {init as GoogleMapInit} from './modules/GoogleMap'
import Scroll from './modules/Scroll'
import {detectIE} from './modules/Helper'

import './polyfills/Array.forEach'
import './polyfills/Array.from'
import './polyfills/NodeList.forEach'
import './polyfills/Object.assign'


const $home = $('#home')
const $intro_visual = $('.visual.-intro')
const $menu = $('#menu')
const $logo = $('#logo')
const $gallery = $('#menu .gallery')


$(document).ready(() => {
	Anchors.init($('.anchor'), $logo)
	Openers.init()
	Forms.init()
})
$(window).on('load', () => {

	if (detectIE()) {
		ResponsiveSVGAdd('.visual .image')
		ResponsiveSVGInit()
	}

	// loading transition
	$home.removeClass('loading')
	$logo.addClass('animating')
	setTimeout(() => {
		$home.addClass('loaded')
		$logo.removeClass('animating')
	}, 1000)

	// adding parallax
	Scroll.parallaxBound($('.visual:not(.-intro)'))

	// animation of wrapper content
	$('.section:not(.intro, .footer) .wrapper').each(function () {
		Scroll.addTransition($(this).find('h1, .h1'), $(this), { autoAlpha : 0, y: 100 }, { autoAlpha : 1, y: 0 }, { duration: 0, triggerHook: .9 }, .5)
		Scroll.addTransition($(this).find('.content').children(':not(h1, .h1)'), $(this), { autoAlpha : 0, y: 50 }, { autoAlpha : 1, y: 0 }, { duration: 0, triggerHook: .7 }, .5)
	})
	// animation intro image
	Scroll.addTransition($('.image', $intro_visual), $home, { autoAlpha : .9, y: 50 }, { autoAlpha : 1, y: 0 }, { duration: 0 }, .5)
	let picture_parallax_top = Math.round($intro_visual.height() * .1)
	Scroll.addTransition($('.picture', $intro_visual), $home, { top: -picture_parallax_top }, { top: picture_parallax_top }, { duration: '100%', triggerHook: 0 })

	// logo moving after hamburger trigger
	$menu.on({
		'opener.opening': () => TweenLite.to($logo, .5, {autoAlpha :0}),
		'opener.closing': () => TweenLite.to($logo, .5, {autoAlpha :1}),
	}).find('a').on('click', () => { Openers.closeAllOpeners(true) })

	// gallery init
	$('.gallery--item').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
			tCounter: '%curr% / %total%',
			arrowMarkup: '<button type="button" class="arrow arrow-%dir%"></button>'
		},
		mainClass: 'mfp-fade',
		removalDelay: 300,
	})
	$gallery.on('click', e => {
		e.preventDefault()
		$('.gallery--item').magnificPopup('open')
	})

	//google map init
	GoogleMapInit()

	// js validation
	$('form.validate-me').each(function() {
		let validator = new FormValidator($(this))
		validator.watch()
	})
})



// hot reload
if (module.hot) {
	module.hot.accept();
}