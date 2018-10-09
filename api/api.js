import {client} from '../data/apollo';
import {NETWORK_STATUS} from '../consts/apollo';

/**
 * Apollo get query
 * @param {object} query
 * @param {GraphQL} query.query
 * @param {object} query.variables
 * @returns {Promise<ApolloQueryResult<any> | void>}
 */
export async function getQuery(query) {
    return await client.query(query).then(result => {
        if (result.networkStatus !== NETWORK_STATUS.READY) {
            console.log('Apollo fetch not ready', result);
        }

        return result;
    }).catch(error => console.error('Apollo fetch error', error));
}

/**
 * Apollo get query
 * @param {object} query
 * @param {GraphQL} query.mutation
 * @param {object} query.variables
 * @returns {Promise<ApolloQueryResult<any> | void>}
 */
export async function mutateQuery(query) {
    return await client
        .mutate(query)
        .catch(error => console.error('Apollo failed to update', error));
}

/*
import getAllItemsQuery from '../data/queries/getAllItemsQuery.graphql'
import getAllCategoriesQuery from '../data/queries/getAllCategoriesQuery.graphql'
import getStructuredCategoriesQuery from '../data/queries/getStructuredCategoriesQuery.graphql'
import getReservationsWithinRangeQuery from '../data/queries/getReservationsWithinRangeQuery.graphql'
import updateItemNameMutation from '../data/queries/updateItemNameMutation.graphql'
import updateItemPriceMutation from '../data/queries/updateItemPriceMutation.graphql'

export const getAllItems = client.query({query: getAllItemsQuery});
export const getAllCategories = client.query({query: getAllCategoriesQuery});
export const getStructuredCategories = client.query({query: getStructuredCategoriesQuery});
export const getReservationsWithinRange = (since, until) => client.query({
    query: getReservationsWithinRangeQuery,
    variables: {since, until},
});

export const updateItemName = (id, name) =>
    _updateColumn({
        mutation: updateItemNameMutation,
        variables: {id, name},
        //refetchQueries: [{query: allItemsQuery}]
    });

export const updateItemPrice = (id, price) =>
    _updateColumn({
        mutation: updateItemPriceMutation,
        variables: {id, price},
    });

const _updateColumn = mutation => client
    .mutate(mutation)
    .then(() => console.info('Updated item', mutation.variables))
    .catch(error => console.error('Failed to update item', error.message));
*/