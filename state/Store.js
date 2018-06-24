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
    @observable items = [];
    @observable idle = false;
    structuredCategories = null;

    getAllItems() {
        return getAllItems
    }

    getAllCategories() {
        return getAllCategories
    }

    async setStructuredCategories() {
        let categories;

        try {
            categories = await getStructuredCategories();
        } catch (e) {
            console.error('FAILED TO FETCH CATEGORIES', e.message);
        }

        return categories;
    }
    getStructuredCategories() {
        return this.structuredCategories;
    }

    getReservationsWithinRange = (since, until) => getReservationsWithinRange(since, until)
    updateItemName = (id, name) => updateItemName(id, name)
    updateItemPrice = (id, price) => updateItemPrice(id, price)
}