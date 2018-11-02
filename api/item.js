import {getAllItemsQuery} from '../data/queries/getAllItemsQuery.graphql';

import {getQuery} from './api';

/**
 * @returns {Promise<resolvers.Query.allItems>}
 */
export async function getAllItems() {
    return await getQuery({
        query: getAllItemsQuery,
    }).then(result => result.data.allItems);
}