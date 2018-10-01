import {action, computed, observable} from 'mobx';

import {escapeString, highlightString, normalizeString} from 'Helpers/strings';

class FilterItemsStore {
    /** @type {Array<Object>} */
    @observable
    items = [];

    /** @type {Array<Object>} */
    @observable
    filteredItems = [];

    /**
     * Key of item which holds value to search in
     * @type {string}
     */
    @observable
    searchKey = '';

    /**
     * Search filter text
     * @type {string}
     */
    @observable
    searchText = '';

    @computed
    get hasSearchText() {
        return this.searchText.length > 0;
    }

    @computed
    get hasNoSearchResult() {
        return this.searchText.length > 0 && this.filteredItems.length === 0;
    }

    /**
     * @param {Object.<string, any>} item
     * @param {string} query
     * @return {boolean}
     */
    filterItem(item, query)
    {
        if (!item[this.searchKey]) {
            return;
        }

        const regex = new RegExp(query);
        const string = normalizeString(item[this.searchKey]);

        return regex.test(string);
    }

    /**
     * @param {Object<string, any>} item
     * @param {string} query
     * @returns {Object<string, any>}
     */
    highlightItem(item, query)
    {
        if (!item[this.searchKey]) {
            return item;
        }

        const highlighted_text = highlightString(item[this.searchKey], query);

        return {
            ...item,
            [this.searchKey]: highlighted_text,
        };
    }

    @action
    setItems(items) {
        this.items = items;
    }

    @action
    setFilteredItems() {
        if (this.searchText.length === 0) {
            this.resetFilteredItems();
            return;
        }

        const query = escapeString(normalizeString(this.searchText));

        this.filteredItems = this.items
            .filter(item => this.filterItem(item, query))
            .map(item => this.highlightItem(item, query));
    }

    @action
    resetFilteredItems() {
        this.filteredItems = [];
    }

    @action
    setSearchKey(key) {
        this.searchKey = key;
    }

    @action
    setSearchText(text) {
        this.searchText = text;
    }

    @action
    resetSearchText() {
        this.searchText = '';
    }
}

/**
 * @type {Map<string, FilterItemsStore>}
 */
let filterItemsStores = new Map();

/**
 * @param {string} id
 * @returns {FilterItemsStore}
 */
export function getFilterItemsStoreById(id) {
    let store = filterItemsStores.get(id);

    if (typeof store === 'undefined') {
        store = new FilterItemsStore();
        filterItemsStores.set(id, store);
    }

    return store;
}