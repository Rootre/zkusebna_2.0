import getTopCategoriesQuery from '../data/queries/getTopCategoriesQuery.graphql';

import {getQuery} from './api';

export async function getTopCategories() {
    return await getQuery({
        query: getTopCategoriesQuery,
    }).then(result => result.data.topCategories);
}