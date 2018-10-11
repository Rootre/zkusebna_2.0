import {action, computed, observable} from 'mobx';

export class ReservationStore {
    @observable.shallow
    current_reservations = [];
    @observable.shallow
    discounts = [];
    @observable.shallow
    current_reservation = {};
    @observable
    current_discount_index = 7; // Osobní účel, 97%

    @observable
    start_day = null;
    @observable
    end_day = null;
    @observable
    start_time = null;
    @observable
    end_time = null;

    @computed
    get currentDiscount() {
        return this.discounts[this.current_discount_index];
    }

    @action
    setCurrentDiscountIndex(current_discount_index) {
        this.current_discount_index = current_discount_index;
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
    setDiscounts(discounts) {
        this.discounts = discounts;
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