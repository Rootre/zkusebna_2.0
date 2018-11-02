import {getAllDiscountsQuery} from '../data/queries/getAllDiscountsQuery.graphql';

import {getQuery} from './api';

/**
 * @returns {Promise<resolvers.Query.allDiscounts>}
 */
export function getAllDiscounts() {
    return getQuery({
        query: getAllDiscountsQuery,
    }).then(result => result.data.allDiscounts);
}