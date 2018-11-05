import {ACCENTS_IN, ACCENTS_OUT} from '../consts/strings';

export function normalizeString(string) {
    return removeAccents(string).toLocaleLowerCase();
}

export function removeAccents(string, accentsIn = ACCENTS_IN, accentsOut = ACCENTS_OUT) {
    return string.split('')
        .map((letter) => {
            const accentIndex = accentsIn.indexOf(letter);

            return accentIndex < 0
                ? letter
                : accentsOut[accentIndex];
        })
        .join('');
}

export function escapeString(string) {
    return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

export function highlightString(string, query) {
    const startIndex = normalizeString(string).indexOf(query);

    if (startIndex < 0) {
        return string;
    }

    const endIndex = startIndex + query.length;

    return string.substring(0, startIndex)
        + `<b>${string.substring(startIndex, endIndex)}</b>`
        + string.substring(endIndex);
}

export function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}