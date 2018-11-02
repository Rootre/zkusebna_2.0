import {createNewReservationMutation, createReservationItemsMutation} from '../data/queries/createNewReservationMutation.graphql';
import {getCalendarReservationsInRangeQuery} from '../data/queries/getCalendarReservationsInRangeQuery.graphql';
import {getReservationByIdQuery} from '../data/queries/getReservationByIdQuery.graphql';
import {getReservedItemsInRangeQuery} from '../data/queries/getReservedItemsInRangeQuery.graphql';
import {getQuery, mutateQuery} from './api';

/**
 * @param {object} variables
 * @param {number} variables.discount_id
 * @param {string} variables.name
 * @param {number} variables.price
 * @param {string} variables.since
 * @param {string} variables.until
 * @param {number} variables.user_id
 * @returns {Promise<resolvers.Mutation.createNewReservation>}
 */
export function createNewReservation(variables) {
    return mutateQuery({
        mutation: createNewReservationMutation,
        variables,
    }).then(result => result.data.createNewReservation);
}

/**
 * @param {object[]} items
 * @param {number} items[].item_id
 * @param {number} items[].reservation_id
 * @returns {Promise<resolvers.Mutation.createReservationItems>}
 */
export function createReservationItems(items) {
    return mutateQuery({
        mutation: createReservationItemsMutation,
        variables: {
            items,
        },
    }).then(result => result.data.createReservationItems);
}

/**
 * @param {string} since
 * @param {string} until
 * @returns {Promise<resolvers.Query.reservationsInRange>}
 */
export function getCalendarReservationsInRange(since, until) {
    return getQuery({
        query: getCalendarReservationsInRangeQuery,
        variables: {
            since,
            until,
        },
    }).then(result => result.data.reservationsInRange);
}

/**
 * @param {string} since
 * @param {string} until
 * @returns {Promise<resolvers.Query.reservationsInRange>}
 */
export function getReservedItemsForRange(since, until) {
    return getQuery({
        query: getReservedItemsInRangeQuery,
        variables: {
            since,
            until,
        },
    }).then(result => result.data.reservationsInRange);
}

/**
 * @param {number} id
 * @returns {Promise<resolvers.Query.reservationById>}
 */
export function getReservationById(id) {
    return getQuery({
        query: getReservationByIdQuery,
        variables: {
            id,
        },
    }).then(result => result.data.reservationById);
}