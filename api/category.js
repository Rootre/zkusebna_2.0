import {getAllCategoriesQuery} from '../data/queries/getAllCategoriesQuery.graphql';

import {getQuery} from './api';

/**
 * @returns {Promise<resolvers.Query.allCategories>}
 */
export function getAllCategories() {
    return getQuery({
        query: getAllCategoriesQuery,
    }).then(result => result.data.allCategories);
}