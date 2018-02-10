import ScrollMagic from 'scrollmagic'
import TweenLite from 'TweenLite'
import 'animation.gsap'
//import 'debug.addIndicators'

import {breakpoints} from '../settings'
import {getViewportWidth} from './Helper'

const controller = new ScrollMagic.Controller()

const connect = ($logo, $home) => {
	if (!$logo.length) {
		return console.log('$logo element not found', $logo);
	}
	if (!$home.length) {
		return console.log('$home element not found', $home);
	}

	TweenLite.set($logo, { top: getViewportWidth() >= breakpoints.tablet ? 80 : 50 })

	let scene = new ScrollMagic.Scene({
		duration: '70%',
		offset: 0,
		triggerElement: $home[0],
		triggerHook: 0,
	})
		.setTween(TweenLite.to($logo, 1, { top: 10 }))
		.addTo(controller)

	//scene.addIndicators({name:'logo'})

	return scene
}

export default {
	connect
}