import {action, observable} from 'mobx';

export class UserStore {
    @observable
    name = '';
    @observable
    phone = '';
    @observable
    email = '';

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