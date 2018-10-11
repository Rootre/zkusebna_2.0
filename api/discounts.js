import {getAllDiscountsQuery} from '../data/queries/getAllDiscountsQuery.graphql';

import {getQuery} from './api';

export async function getAllDiscounts() {
    return await getQuery({
        query: getAllDiscountsQuery,
    }).then(result => result.data.allDiscounts);
}