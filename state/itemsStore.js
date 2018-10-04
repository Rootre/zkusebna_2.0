import {action, observable} from 'mobx';

export class ItemsStore {

}


/**
 * @type ItemsStore
 */
let store;

/**
 * @returns {ItemsStore}
 */
export function getStore() {
    if (!store) {
        store = new ItemsStore();
    }

    return store;
}