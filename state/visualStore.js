import {action, computed, observable} from 'mobx';

class VisualStore {
    @observable
    current_popup = '';
    @observable
    show_order_items = false;

    @computed
    get popup_visible() {
        return this.current_popup !== '';
    }

    @action
    setCurrentPopup(id) {
        this.current_popup = id;
    }

    @action
    setShowOrderItems(show) {
        this.show_order_items = show;
    }

    @action
    deleteCurrentPopup() {
        this.current_popup = '';
    }
}

/**
 * @type VisualStore
 */
let store;

/**
 * @returns {VisualStore}
 */
export function getStore() {
    if (!store) {
        store = new VisualStore();
    }

    return store;
}