import { observable, action, reaction } from 'mobx';

require('es6-promise').polyfill();
require('isomorphic-fetch');

let store

export const getStore = () => store
export const setStore = (_store) => store = _store
export class ObservableItems {
	@observable items = []
	@observable activeItem

	@action async setActiveItem(item_id) {
		try {
			await fetch(`/api/items/${item_id}`)
				.then(response => {
					if (response.status >= 400) {
						throw new Error("Bad response from server");
					}
					return response.json()
				})
				.then(item => {
					this.activeItem = JSON.parse(item)[0]
				})
		}
		catch(err) {
			console.error(err)
		}
	}
	@action async setItems() {
		try {
			await fetch(`/api/items`)
				.then(response => {
					if (response.status >= 400) {
						throw new Error("Bad response from server");
					}
					return response.json()
				})
				.then(items => {
					this.items = JSON.parse(items)
				})
		}
		catch(err) {
			console.error(err)
		}
	}
}