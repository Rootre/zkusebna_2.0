import {createNewReservationMutation} from '../data/queries/createNewReservationMutation.graphql';
import {getCalendarReservationsForRangeQuery} from '../data/queries/getCalendarReservationsForRangeQuery.graphql';
import {getReservationByIdQuery} from '../data/queries/getReservationByIdQuery.graphql';
import {getQuery, mutateQuery} from './api';

/**
 *
 * @param {object} variables
 * @param {number} variables.discount_id
 * @param {string} variables.name
 * @param {number} variables.price
 * @param {string} variables.since
 * @param {string} variables.until
 * @param {number} variables.user_id
 * @returns {Promise<resolvers.Query.calendarReservationsForRange>}
 */
export function createNewReservation(variables) {
    return mutateQuery({
        mutation: createNewReservationMutation,
        variables,
    }).then(result => result.data.createNewReservation);
}

export function getCalendarReservationsForRange(since, until) {
    return getQuery({
        query: getCalendarReservationsForRangeQuery,
        variables: {
            since,
            until,
        },
    }).then(result => result.data.calendarReservationsForRange);
}

export function getReservationById(id) {
    return getQuery({
        query: getReservationByIdQuery,
        variables: {
            id,
        },
    }).then(result => result.data.reservationById);
}