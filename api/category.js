import {getAllCategoriesQuery} from '../data/queries/getAllCategoriesQuery.graphql';

import {getQuery} from './api';

export async function getAllCategories() {
    return await getQuery({
        query: getAllCategoriesQuery,
    }).then(result => result.data.allCategories);
}