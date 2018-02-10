import GoogleMaps from 'google-maps'

import {init as InitBreakpoints, register as RegisterBreakpoint} from './BreakpointWatcher'
import {breakpoints, gmap_api_key, gmap_camovka_gps, gmap_options} from '../settings'


let map

const _breakpointChanged = breakpoint => {
	let map_center = _getMapCenterLatLng(breakpoint)

	map.setCenter({
		lat: map_center.lat,
		lng: map_center.lng,
	})
}
const _getMapCenterLatLng = breakpoint => ({
	lat: breakpoint.start > breakpoints.phablet ? gmap_camovka_gps.lat + .006 : gmap_camovka_gps.lat,
	lng: gmap_camovka_gps.lng,
})
const _googleMapLoaded = google => {
	map = new google.maps.Map(document.getElementById('google-map'), gmap_options)

	new google.maps.Marker({
		icon: {
			url: './dist/images/map-marker.png',
			scaledSize: new google.maps.Size(36, 36),
		},
		map,
		position: new google.maps.LatLng(gmap_camovka_gps.lat, gmap_camovka_gps.lng),
	})

	RegisterBreakpoint(breakpoint => _breakpointChanged(breakpoint))
	InitBreakpoints()
}

// google map init
export const init = () => {
	GoogleMaps.KEY = gmap_api_key
	GoogleMaps.load(google => _googleMapLoaded(google))
}