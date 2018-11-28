import {action, observable} from 'mobx';

export class FormStore {
    @observable.shallow
    errors = new Map();
    @observable.shallow
    validations = new Map();
    /**
     * @type {Map<number, Map>}
     */
    @observable
    forms = new Map();

    @action
    addFormValidation(formId, validationId, validation) {
        this.forms.get(formId).set(validationId, true);

        this.setValidation(validationId, validation);
    }
    @action
    deleteError(id) {
        this.errors.delete(id);
    }
    @action
    deleteValidation(id) {
        this.validations.delete(id);
    }
    getError(id) {
        return this.errors.get(id);
    }
    getValidation(id) {
        return this.validations.get(id);
    }
    hasError(id) {
        return this.errors.has(id);
    }
    @action
    setError(id, message = '') {
        this.errors.set(id, message);
    }
    @action
    setForm(id) {
        this.forms.set(id, new Map());
    }
    @action
    setValidation(id, validation) {
        this.validations.set(id, validation);
    }

    validateInput(id, value) {
        if (this.validations.get(id).validate(value)) {
            this.deleteError(id);

            return true;
        }

        this.setError(id, this.validations.get(id).message);
    }
    validateForm(id, values) {
        let isValid = true;

        [...this.forms.get(id).keys()].forEach(validationId => {
            if (!this.validateInput(validationId, values[validationId])) {
                isValid = false;
            }
        });

        return isValid;
    }
}


/**
 * @type FormStore
 */
let store;

/**
 * @returns {FormStore}
 */
export function getStore() {
    if (!store) {
        store = new FormStore();
    }

    return store;
}