import {action, observable} from 'mobx';

export class ItemStore {
    @observable.shallow
    items = [];

    getItemsByCategoryId(id) {
        return this.items.filter(item => item.category_id == id);
    }

    @action
    setItems(items) {
        this.items = items;
    }
}


/**
 * @type ItemStore
 */
let store;

/**
 * @returns {ItemStore}
 */
export function getStore() {
    if (!store) {
        store = new ItemStore();
    }

    return store;
}