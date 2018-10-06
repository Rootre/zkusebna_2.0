import {action, observable} from 'mobx';

export class ReservationStore {
    @observable.shallow
    current_reservations = [];
    @observable.shallow
    current_reservation = {};

    @action
    setCurrentReservations(reservations) {
        this.current_reservations = reservations;
    }
    @action
    setCurrentReservation(reservation) {
        this.current_reservation = reservation;
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