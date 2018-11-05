export const VALIDATE = {
    IS_TIME_FILLED: Symbol('is-time-filled'),
    NOT_EMPTY: Symbol('not-empty'),
};

const RULES = {
    [VALIDATE.IS_TIME_FILLED]: {
        message: 'Musíte vyplnit čas',
        validate: time => time && (time.hour() !== 0 || time.minute() !== 0),
    },
    [VALIDATE.NOT_EMPTY]: {
        message: 'Toto pole je povinné',
        validate: value => !value,
    },
};

export const Validation = (type, options = {}) => Object.assign(RULES[type], options);