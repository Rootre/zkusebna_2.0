import {action, computed, observable} from 'mobx';

import {isSameDayFromMoment} from '../helpers/dates';

export class ReservationStore {
    /**
     * calendar reservations
     * @type {object[]}
     */
    @observable.shallow
    current_reservations = [];
    /**
     * calendar detail reservation
     * @type {{}}
     */
    @observable.shallow
    current_reservation = {};
    /**
     * user created reservation
     * @type {{end: null, excluded_items: ObservableMap<any>, items: ObservableMap<any>, name: string, start: null}}
     */
    @observable.shallow
    reservation = {
        end: null,
        excluded_items: observable.map([], {deep: false}),
        items: observable.map(new Map(), {deep: false}),
        name: 'Testovací',
        start: null,
    };
    @observable
    reservation_step = 1;

    @computed
    get hasReservationItems() {
        return this.reservation.items.size > 0;
    }

    @computed
    get isOneDayReservation() {
        return isSameDayFromMoment(this.reservation.start, this.reservation.end);
    }

    @computed
    get priceSummary() {
        return this.reservationItems.reduce((accumulator, item) => accumulator + item.price, 0);
    }

    @computed
    get reservationItems() {
        return [...this.reservation.items.values()];
    }

    @computed
    get reservationExcludedItems() {
        return [...this.reservation.excluded_items.values()];
    }

    hasReservationExcludedItem(item_id) {
        return this.reservation.excluded_items.has(item_id);
    }

    @action
    addCurrentReservation(reservation) {
        this.current_reservations.push(reservation);
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
    deleteAllExcludedReservationItems() {
        this.reservation.excluded_items.clear();
    }

    @action
    resetReservation() {
        this.deleteAllReservationItems();
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
    setReservationStep(step) {
        this.reservation_step = step;
    }

    @action
    setNextStep() {
        this.setReservationStep(this.reservation_step + 1);
    }

    @action
    setPrevStep() {
        this.setReservationStep(this.reservation_step - 1);
    }

    /**
     * @param {moment} end
     */
    @action
    setReservationEnd(end) {
        this.reservation.end = end;
    }

    @action
    setReservationExcludedItem(item_id) {
        this.reservation.excluded_items.set(item_id, true);
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