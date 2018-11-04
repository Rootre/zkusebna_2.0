import {action, observable} from 'mobx';

export class FormStore {
    @observable
    errors = new Map();

    @action
    deleteError(id) {
        this.errors.delete(id);
    }
    getError(id) {
        return this.errors.get(id);
    }
    hasError(id) {
        return this.errors.has(id);
    }
    @action
    setError(id, message = '') {
        this.errors.set(id, message);
    }
}


/**
 * @type FormStore
 */
let store;

/**
 * @returns {FormStore}
 */
export function getStore() {
    if (!store) {
        store = new FormStore();
    }

    return store;
}