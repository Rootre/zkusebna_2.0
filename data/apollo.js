import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-client-preset'
import graphql from 'mobx-apollo'

import allItemsQuery from '../data/queries/allItems.gql'
import allCategoriesQuery from '../data/queries/allCategories.gql'
import structuredCategoriesQuery from '../data/queries/structuredCategories.gql'
import updateItemNameMutation from '../data/queries/updateItemName.gql'
import updateItemPriceMutation from '../data/queries/updateItemPrice.gql'

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:3003/graphql',
        credentials: 'same-origin'
    }),
    cache: new InMemoryCache()
});

export const getAllItems = graphql({client, query: allItemsQuery})
export const getAllCategories = graphql({client, query: allCategoriesQuery})
export const getStructuredCategories = graphql({client, query: structuredCategoriesQuery})

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