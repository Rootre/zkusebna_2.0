import {action, computed, observable} from 'mobx';

export class DiscountStore {
    @observable.shallow
    discounts = [];
    @observable
    current_discount_index = 7; // Osobní účel, 97%

    @computed
    get currentDiscount() {
        return this.discounts[this.current_discount_index];
    }

    @action
    setCurrentDiscountIndex(current_discount_index) {
        this.current_discount_index = current_discount_index;
    }

    @action
    setDiscounts(discounts) {
        this.discounts = discounts;
    }
}


/**
 * @type DiscountStore
 */
let store;

/**
 * @returns {DiscountStore}
 */
export function getStore() {
    if (!store) {
        store = new DiscountStore();
    }

    return store;
}