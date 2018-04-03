import {observable} from 'mobx'

import {
	getAllItems,
	getAllCategories,
	getStructuredCategories,
	updateItemName,
	updateItemPrice
} from '../data/apollo'

export class Store {
	@observable items = []
	@observable idle = false

	get allItems() {
		return getAllItems
	}
	get allCategories() {
		return getAllCategories
	}
	get structuredCategories() {
		return getStructuredCategories
	}

	updateItemName = (id, name) => updateItemName(id, name)
	updateItemPrice = (id, price) => updateItemPrice(id, price)
}