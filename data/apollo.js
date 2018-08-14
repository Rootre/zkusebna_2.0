require('es6-promise').polyfill();
require('isomorphic-fetch');

import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {graphql} from 'react-apollo';

import getAllItemsQuery from '../data/queries/getAllItemsQuery.graphql'
import getAllCategoriesQuery from '../data/queries/getAllCategoriesQuery.graphql'
import getStructuredCategoriesQuery from '../data/queries/getStructuredCategoriesQuery.graphql'
import getReservationsWithinRangeQuery from '../data/queries/getReservationsWithinRangeQuery.graphql'
import updateItemNameMutation from '../data/queries/updateItemNameMutation.graphql'
import updateItemPriceMutation from '../data/queries/updateItemPriceMutation.graphql'


const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors)
                graphQLErrors.map(({message, locations, path}) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({
            uri: 'http://localhost:3003/graphql',
            credentials: 'same-origin'
        })
    ]),
    cache: new InMemoryCache()
});

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
    .catch(error => console.error('Failed to update item', error.message))