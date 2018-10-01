import {action, computed, observable} from 'mobx';

export class ReservationStore {
    @observable
    current_day = new Date();

    @computed
    get currentMonth() {
        return this.current_day.getMonth();
    }

    @action
    setCurrentDay(day) {
        this.current_day = new Date(day);
    }
}


/**
 * @type ReservationStore
 */
let store;

/**
 * @returns {ReservationStore}
 */
export function getStore() {
    if (!store) {
        store = new ReservationStore();
    }

    return store;
}