export const VALIDATE = {
    IS_TIME_FILLED: Symbol('is-time-filled'),
};

const RULES = {
    [VALIDATE.IS_TIME_FILLED]: {
        message: 'Time has to be filled',
        validate: time => time && (time.hour() !== 0 || time.minute() !== 0),
    },
};

export const Validation = (type) => RULES[type];