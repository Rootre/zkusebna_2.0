import {action, observable} from 'mobx';

export class FormStore {
    @observable
    errors = new Map();

    @action
    deleteError(id) {
        this.errors.delete(id);
    }
    hasError(id) {
        return this.errors.has(id);
    }
    @action
    setError(id) {
        this.errors.set(id, true);
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