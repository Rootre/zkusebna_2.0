export function getPriceWithDiscount(price, discount) {
    return Math.round(price * (100 - discount) / 100);
}