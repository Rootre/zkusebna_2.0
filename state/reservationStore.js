import {action, computed, observable} from 'mobx';

export class ReservationStore {
    @observable.shallow
    current_reservations = [];
    @observable.shallow
    current_reservation = {};
    @observable.shallow
    reservation = {
        from: null,
        items: observable.map(new Map(), {deep: false}),
        to: null,
    };

    @observable
    start_day = null;
    @observable
    end_day = null;
    @observable
    start_time = null;
    @observable
    end_time = null;


    @computed
    get hasReservationItems() {
        return this.reservation.items.size > 0;
    }

    @computed
    get reservationItems() {
        return [...this.reservation.items.values()];
    }


    @action
    deleteReservationItem(id) {
        this.reservation.items.delete(id);
    }

    @action
    deleteAllReservationItems() {
        this.reservation.items.clear();
    }

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
    setReservationItem(id, item) {
        this.reservation.items.set(id, item);
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