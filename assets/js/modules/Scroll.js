/**
 * @module Scroll
 */

import ScrollMagic from 'scrollmagic'
import TweenLite from 'TweenLite'
import 'animation.gsap'
//import 'debug.addIndicators'

import {getViewportHeight, getViewportWidth} from './Helper'

const controller = new ScrollMagic.Controller()

/**
 * Adds scroll dependant transition to elements
 * @param {jQuery} $nodes - set of element to transition
 * @param {Object.<string, string>} from - object of css properties to be transitioned from
 * @param {Object.<string, string>} to - object of css properties to be transitioned to
 * @param {Object.<string, string>} settings - ScrollMagic.Scene parameters {@link http://scrollmagic.io/docs/ScrollMagic.Scene.html#toc14}
 */
const addTransition = ($nodes, $trigger, from, to, settings = { duration: '50%', offset: 0 }, timing) => {
	let elm

	$nodes.each(function () {
		elm = $(this)[0]

		if (Object.keys(from).length) {
			TweenLite.set(elm, from)
		}

		let scene = new ScrollMagic.Scene(Object.assign({}, settings, {
			triggerElement: $trigger[0]
		}))
			.setTween(
				TweenLite.to(elm, timing || 1, to)
			)
			//.addIndicators() // add indicators (requires plugin)
			.addTo(controller)
	})
}
/**
 * Adds animation to bound group
 * @param {string} bound_selector - bound selector
 * @param {int} [distance] - distance which both elements will be transitioning from
 */
const parallaxBound = ($nodes, distance) => {
	let $elm, $animate, is_aside, $picture
	let duration = '120%'
	let distance_koeficient = .1
	let triggerHook = .6

	if (!distance) {
		distance = distance_koeficient * getViewportHeight()
	}

	$nodes.each(function () {
		$elm = $(this)
		$animate = $(this).find('.animate')
		$picture = $(this).find('.picture')

		$picture.each(function () {
			let picture_parallax_top = Math.round($(this).height() * .05)
			addTransition($(this), $elm, { top: -picture_parallax_top }, { top: picture_parallax_top }, { duration: '150%', triggerHook: .6 })
		})

		$animate.each(function () {
			is_aside = $(this).hasClass('aside')

			addTransition($(this), $elm, { autoAlpha: 0 }, { autoAlpha: 1 }, { duration: 0, triggerHook: .9 }, .7)

			addTransition($(this), $elm, {
				top: is_aside ? distance * 2 : distance
			}, {
				//ease: SlowMo.ease.config(.1, 1, false),
				top: is_aside ? -distance * 2 : -distance
			}, {
				duration,
				triggerHook
			})
		})
	})
}

export default {
	addTransition,
	parallaxBound
}