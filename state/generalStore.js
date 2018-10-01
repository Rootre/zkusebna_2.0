import {action, observable} from 'mobx';

class GeneralStore {
    @observable.shallow
    fetching = new Map();

    @action
    setFetching(id) {
        this.fetching.set(id, true);
    }
    @action
    deleteFetching(id) {
        this.fetching.delete(id);
    }
}

/**
 * @type GeneralStore
 */
let store;

/**
 * @returns {GeneralStore}
 */
export function getStore() {
    if (!store) {
        store = new GeneralStore();
    }

    return store;
}