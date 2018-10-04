import {action, computed, observable} from 'mobx';

export class CalendarStore {
    @observable
    current_day = new Date('01-06-2018');
    //current_day = new Date();

    @computed
    get currentMonth() {
        return this.current_day.getMonth();
    }
    @computed
    get currentMonthFirstDay() {
        return new Date(this.current_day.getFullYear(), this.current_day.getMonth(), 1);
    }
    @computed
    get currentMonthLastDay() {
        return new Date(this.current_day.getFullYear(), this.current_day.getMonth() + 1, 0);
    }

    @action
    setCurrentDay(day) {
        this.current_day = new Date(day);
    }
}


/**
 * @type CalendarStore
 */
let store;

/**
 * @returns {CalendarStore}
 */
export function getStore() {
    if (!store) {
        store = new CalendarStore();
    }

    return store;
}