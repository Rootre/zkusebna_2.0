import SVG from 'svg.js'
import {add as RRadd, init as RRinit} from './ResponsiveRatio'

/**
 * Takes srcset from given element/s and generates svg <image> accordingly which also makes responsive
 * The width is calculated from element and svg is inserted as a child
 * This is useful for svg clipping path as a cross-browser solution
 * @module ResponsiveSVG
 */

/**
 *
 * @alias breakpoints
 * @default
 * @type {{mobile: number, phablet: number, tablet: number, desktop: number, desktop-lg: number}}
 */
let breakpoints = {
	"mobile": 240,
	"phablet": 560,
	"tablet": 768,
	"desktop": 1024,
	"desktop-lg": 1500
}
let elements

/**
 * Generates new SVG image from data-srcset
 * @param {string} selector - selector of elements with data-srcset defined
 */
export const add = (selector, srcset = '') => {
	elements = _filterElements(document.querySelectorAll(selector))
	_generateSVGs(elements, srcset)
}
/**
 * Search for srcsets and generates responsive <svg> <image>
 * @param {Object} custom_breakpoints - set of custom breakpoint
 */
export const init = (custom_breakpoints) => {
	if (typeof custom_breakpoints === "object" && Object.keys(custom_breakpoints).length) {
		breakpoints = custom_breakpoints
	}

	RRinit()
}

/**
 * Filter only elements with data-srcset attribute
 * @param {nodelist.iterable} elements
 * @returns {Array}
 * @private
 */
const _filterElements = elements => {
	return Array.from(elements).filter(element => {
		return element.getAttribute('data-srcset')
	})
}

/**
 * Get device from {@link breakpoints} array based on viewport width
 * @returns {string}
 * @private
 */
const _getDevice = () => {
	let viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	for (let device in breakpoints) {
		if (breakpoints.hasOwnProperty(device) && parseInt(breakpoints[device]) > viewport_width) {
			return device
		}
	}
	return Object.keys(breakpoints).pop()
}
const _getResponsiveImage = (element, srcset) => {
	let source = srcset || _getSrcset(element)
	let device = _getDevice()
	return source[device] || ''
}
const _getSrcset = element => JSON.parse(element.getAttribute('data-srcset'))

const _generateSVGs = (elements, srcset) => {
	elements.forEach(element => {
		let imageURL = _getResponsiveImage(element, srcset)

		if (imageURL) {
			element.innerHTML = ''
			let draw = SVG(element)

			draw.image(imageURL).loaded(function(loader) {
				let ratio = loader.width / loader.height
				let dim = {
					width: '100%',
					height: Math.round(element.clientWidth / ratio)
				}

				draw.size(dim.width, dim.height)
				this.size(dim.width, dim.height)

				RRadd(`#${draw.id()}`)
				RRadd(`#${this.id()}`)
			})
		}
	})
}