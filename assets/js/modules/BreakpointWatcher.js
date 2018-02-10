import {getViewportWidth} from './Helper'
import {breakpoints} from '../settings'

let buffer = []
let breakpoint = {
	name: '',
	start: 0,
}

const _breakpointChanged = hydrated_breakpoint => {
	breakpoint = hydrated_breakpoint
	buffer.map(callback => callback(breakpoint))
}
const _viewportChanged = () => {
	let hydrated_breakpoint = _getHydratedBreakpoint()

	if (hydrated_breakpoint.name != breakpoint.name) {
		_breakpointChanged(hydrated_breakpoint)
	}
}
const _getHydratedBreakpoint = () => {
	let vw = getViewportWidth()
	let breakpoint, previous_breakpoint

	for (breakpoint in breakpoints) {
		if ( !breakpoints.hasOwnProperty(breakpoint) || breakpoints[breakpoint] <= vw) {
			previous_breakpoint = breakpoint
			continue
		}
		break
	}

	return {
		name: previous_breakpoint,
		start: breakpoints[previous_breakpoint],
	}
}

export const init = () => {
	_breakpointChanged( _getHydratedBreakpoint() )
	removeWatch()
	watch()
}
export const watch = () => {
	window.addEventListener('resize', _viewportChanged)
}
export const removeWatch = () => {
	window.removeEventListener('resize', _viewportChanged)
}
export const register = callback => {
	if (typeof callback !== 'function') {
		return false
	}
	return buffer.push(callback)
}