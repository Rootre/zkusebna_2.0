import {action, observable} from 'mobx';

export class ReservationStore {
    @observable.shallow
    current_reservations = [];

    @action
    setCurrentReservations(reservations) {
        this.current_reservations = reservations;
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