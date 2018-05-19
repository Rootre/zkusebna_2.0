require('es6-promise').polyfill();
require('isomorphic-fetch');
require('babel-polyfill');

import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-client-preset'
import graphql from 'mobx-apollo'

import getAllItemsQuery from '../data/queries/getAllItemsQuery.gql'
import getAllCategoriesQuery from '../data/queries/getAllCategoriesQuery.gql'
import getStructuredCategoriesQuery from '../data/queries/getStructuredCategoriesQuery.gql'
import getReservationsWithinRangeQuery from '../data/queries/getReservationsWithinRangeQuery.gql'
import updateItemNameMutation from '../data/queries/updateItemNameMutation.gql'
import updateItemPriceMutation from '../data/queries/updateItemPriceMutation.gql'

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:3003/graphql',
        credentials: 'same-origin'
    }),
    cache: new InMemoryCache()
});

export const getAllItems = graphql({client, query: getAllItemsQuery})
export const getAllCategories = graphql({client, query: getAllCategoriesQuery})
export const getStructuredCategories = graphql({client, query: getStructuredCategoriesQuery})
export const getReservationsWithinRange = (since, until) => client.query({
    query: getReservationsWithinRangeQuery,
    variables: {since, until},
})

export const updateItemName = (id, name) =>
    _updateColumn({
        mutation: updateItemNameMutation,
        variables: {id, name},
        //refetchQueries: [{query: allItemsQuery}]
    })
export const updateItemPrice = (id, price) =>
    _updateColumn({
        mutation: updateItemPriceMutation,
        variables: {id, price},
    })

const _updateColumn = mutation => client
    .mutate(mutation)
    .then(() => console.info('Updated item', mutation.variables))
    .catch(error => console.error('Failed to update item', error.message))