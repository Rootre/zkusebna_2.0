import {action, computed, observable} from 'mobx';

export class ReservationStore {
    @observable.shallow
    current_reservations = [];
    @observable.shallow
    current_reservation = {};
    @observable.shallow
    reservation = {
        end_day: null,
        end_time: null,
        start_day: null,
        start_time: null,
        items: observable.map(new Map(), {deep: false}),
    };

    @computed
    get hasReservationItems() {
        return this.reservation.items.size > 0;
    }

    @computed
    get isOneDayReservation() {
        return this.reservation.start_day.getTime() === this.reservation.end_day.getTime();
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
    setReservationEndDay(end) {
        this.reservation.end_day = new Date(end);
    }

    @action
    setReservationEndTime(end) {
        this.reservation.end_time = new Date(end);
    }

    @action
    setReservationStartDay(start) {
        this.reservation.start_day = new Date(start);
    }

    @action
    setReservationStartTime(start) {
        this.reservation.start_time = new Date(start);
    }

    @action
    setReservationItem(id, item) {
        this.reservation.items.set(id, item);
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