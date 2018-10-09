import getTopCategoriesQuery from '../data/queries/getTopCategoriesQuery.graphql';
import getCategoriesByParentIdQuery from '../data/queries/getCategoriesByParentIdQuery.graphql';

import {getQuery} from './api';

export async function getTopCategories() {
    return await getQuery({
        query: getTopCategoriesQuery,
    }).then(result => result.data.topCategories);
}

export async function getCategoriesByParentId(parent_id) {
    return await getQuery({
        query: getCategoriesByParentIdQuery,
        variables: {
            parent_id
        }
    }).then(result => result.data.categoriesByParentId);
}