import {action, observable} from 'mobx';

export class ReservationStore {
    @observable.shallow
    current_reservations = [];
    @observable.shallow
    current_reservation = {};

    @observable
    start_day = null;
    @observable
    end_day = null;
    @observable
    start_time = null;
    @observable
    end_time = null;

    @action
    setCurrentReservations(reservations) {
        this.current_reservations = reservations;
    }
    @action
    setCurrentReservation(reservation) {
        this.current_reservation = reservation;
    }
    @action
    setStartDay(start) {
        this.start_day = new Date(start);
    }
    @action
    setEndDay(end) {
        this.end_day = new Date(end);
    }
    @action
    setStartTime(start) {
        this.start_time = new Date(start);
    }
    @action
    setEndTime(end) {
        this.end_time = new Date(end);
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