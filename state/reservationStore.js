import {action, computed, observable} from 'mobx';

import {isSameDayFromMoment} from '../helpers/dates';

export class ReservationStore {
    @observable.shallow
    current_reservations = [];
    @observable.shallow
    current_reservation = {};
    @observable.shallow
    reservation = {
        end: observable(null),
        items: observable.map(new Map(), {deep: false}),
        name: '',
        start: observable(null),
    };

    @computed
    get hasReservationItems() {
        return this.reservation.items.size > 0;
    }

    @computed
    get isOneDayReservation() {
        return isSameDayFromMoment(this.reservation.start, this.reservation.end);
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

    /**
     * @param {moment} end
     */
    @action
    setReservationEnd(end) {
        this.reservation.end = end;
    }

    @action
    setReservationItem(id, item) {
        this.reservation.items.set(id, item);
    }

    @action
    setReservationName(name) {
        this.reservation.name = name;
    }

    /**
     * @param {moment} start
     */
    @action
    setReservationStart(start) {
        this.reservation.start = start;
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