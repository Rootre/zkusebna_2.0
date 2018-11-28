import {removeAccents} from './strings';

export const VALIDATE = {
    IS_TIME_FILLED: Symbol('is-time-filled'),
    NOT_EMPTY: Symbol('not-empty'),
    IS_EMAIL: Symbol('is-email'),
    IS_NAME: Symbol('is-name'),
    IS_PHONE: Symbol('is-phone'),
};

const RULES = {
    [VALIDATE.IS_EMAIL]: {
        message: 'Toto není email',
        validate: value => value.match(/^[a-z]+@[a-z]+\.[a-z]{2,5}$/ig),
    },
    [VALIDATE.IS_NAME]: {
        message: 'Uveďte jméno i příjmení',
        validate: value => removeAccents(value).match(/^[a-z]{2,} ([a-z]{2,} ?){1,}$/ig),
    },
    [VALIDATE.IS_PHONE]: {
        message: 'Telefonní číslo nemá správný formát',
        validate: value => value.match(/^([0-9]{3} ?){3}$/ig),
    },
    [VALIDATE.IS_TIME_FILLED]: {
        message: 'Musíte vyplnit čas',
        validate: time => time && (time.hour() !== 0 || time.minute() !== 0),
    },
    [VALIDATE.NOT_EMPTY]: {
        message: 'Toto pole je povinné',
        validate: value => !!value,
    },
};

export const Validation = (type, options = {}) => Object.assign(RULES[type], options);