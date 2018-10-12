export function getDay(date) {
    return `${date.getDate()}. ${date.getMonth() + 1}.`;
}

export function getTime(date) {
    return `${date.getHours()}:${date.getMinutes() < 10 ? 0 : ''}${date.getMinutes()}`;
}

export function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate()
        && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear();
}