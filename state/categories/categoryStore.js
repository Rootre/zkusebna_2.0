import {action, observable} from 'mobx';

class CategoryStore {
    @observable
    structuredCategories = [];

    @action
    setStructuredCategories(categories) {
        this.structuredCategories = categories;
    }
}

/**
 * @type CategoryStore
 */
let store;

/**
 * @returns {CategoryStore}
 */
export function getStore() {
    if (!store) {
        store = new CategoryStore();
    }

    return store;
}