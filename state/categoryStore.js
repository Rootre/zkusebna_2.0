import {action, observable} from 'mobx';

class CategoryStore {
    /**
     * @type {Object[]} top_categories - top level categories
     * @property {number} top_categories[].id
     * @property {string} top_categories[].name
     */
    @observable.shallow
    top_categories = [];

    @action
    setTopCategories(categories) {
        this.top_categories = categories;
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