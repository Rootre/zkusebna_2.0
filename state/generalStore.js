import {action, observable} from 'mobx';

class GeneralStore {
    @observable
    idle = false;

    @action
    setIdle(idle) {
        this.idle = idle;
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