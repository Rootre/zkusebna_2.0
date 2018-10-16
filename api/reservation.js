import getCalendarReservationsForRangeQuery from '../data/queries/getCalendarReservationsForRangeQuery.graphql';
import getReservationByIdQuery from '../data/queries/getReservationByIdQuery.graphql';
import {getQuery} from './api';

export async function getCalendarReservationsForRange(since, until) {
    return await getQuery({
        query: getCalendarReservationsForRangeQuery,
        variables: {
            since,
            until,
        },
    }).then(result => result.data.calendarReservationsForRange);
}

export async function getReservationById(id) {
    return await getQuery({
        query: getReservationByIdQuery,
        variables: {
            id,
        },
    }).then(result => result.data.reservationById);
}