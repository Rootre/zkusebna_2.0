import {observable} from 'mobx'

import {
	getAllItems,
	getAllCategories,
	getStructuredCategories,
    getReservationsWithinRange,
    updateItemName,
    updateItemPrice
} from '../data/apollo'

export class Store {
	@observable items = []
	@observable idle = false

	getAllItems() {
		return getAllItems
	}
	getAllCategories() {
		return getAllCategories
	}
	getStructuredCategories() {
		return getStructuredCategories;
    }

    getReservationsWithinRange = (since, until) => getReservationsWithinRange(since, until)
	updateItemName = (id, name) => updateItemName(id, name)
	updateItemPrice = (id, price) => updateItemPrice(id, price)
}