import {action, computed, observable} from 'mobx';

export class UserStore {
    @observable
    name = 'Lama Su';
    @observable
    phone = '123123123';
    @observable
    email = 'lama@su.email';

    @computed
    get hasFilledCredentials() {
        return this.name && this.phone && this.email;
    }

    @action
    setEmail(email) {
        this.email = email;
    }

    @action
    setName(name) {
        this.name = name;
    }

    @action
    setPhone(phone) {
        this.phone = phone;
    }
}


/**
 * @type UserStore
 */
let store;

/**
 * @returns {UserStore}
 */
export function getStore() {
    if (!store) {
        store = new UserStore();
    }

    return store;
}