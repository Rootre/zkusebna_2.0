import {action, computed, observable} from 'mobx';

class VisualStore {
    @observable
    current_popup = '';
    @observable
    reservation_expanded = false;

    @computed
    get popup_visible() {
        return this.current_popup !== '';
    }

    @action
    deleteCurrentPopup() {
        this.current_popup = '';
    }

    @action
    setCurrentPopup(id) {
        this.current_popup = id;
    }

    @action
    setReservationExpanded(expanded) {
        this.reservation_expanded = expanded;
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