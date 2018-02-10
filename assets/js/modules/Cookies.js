/**
 * Module for simple manipulation of js cookies
 * @module Cookies
 */

/**
 * Gets cookie information
 * @param {string} name - name of the cookie
 * @returns {*|T}
 */
export function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}