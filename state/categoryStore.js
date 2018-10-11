import {action, computed, observable} from 'mobx';

class CategoryStore {
    /**
     * @type {Object[]} categories - all categories
     * @property {number} top_categories[].id
     * @property {string} top_categories[].name
     */
    @observable.shallow
    categories = [];

    /**
     * @type {Map<level: number, id: number>}
     */
    @observable.shallow
    active_categories = new Map();

    @computed
    get topCategories() {
        return this.categories.filter(category => category.category_id === null);
    }
    @computed
    get activeTopCategory() {
        return this.active_categories.get(0);
    }

    getCategoriesByParentId(id) {
        return this.categories.filter(category => category.category_id == id);
    }

    isCategoryActive(id) {
        return [...this.active_categories.values()].indexOf(id) >= 0;
    }

    @action
    deleteActiveCategory(level) {
        this.active_categories.delete(level);
    }

    @action
    setCategories(categories) {
        this.categories = categories;
    }

    @action
    setActiveCategory(level, id) {
        this.active_categories.set(level, id);
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