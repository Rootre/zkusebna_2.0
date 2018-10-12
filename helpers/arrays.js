export function arrayFillRange(start, end) {
    return Array(end - start + 1).fill().map((item, index) => start + index);
};