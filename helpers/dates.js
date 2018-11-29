export function getDatabaseTimeFromMoment(date) {
    return date.format('YYYY-MM-DD HH:mm:ss');
}
export function getDayFromMoment(date) {
    return date.format('D.M.');
}
export function getTimeFromMoment(date) {
    return date.format('HH:mm');
}
export function isSameDayFromMoment(date1, date2) {
    return date1.isSame(date2, 'days');
}
export function isTimeEmptyFromMoment(time) {
    return time.hour() === 0 && time.minute() === 0;
}

export function getDayFromDate(date) {
    return `${date.getDate()}. ${date.getMonth() + 1}.`;
}

export function getTimeFromDate(date) {
    return `${date.getHours()}:${date.getMinutes() < 10 ? 0 : ''}${date.getMinutes()}`;
}

export function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate()
        && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear();
}