require('es6-promise').polyfill();
require('isomorphic-fetch');
require('babel-polyfill');

import {observable} from 'mobx'
import graphql from 'mobx-apollo'
import gql from 'graphql-tag'
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-client-preset'


import allItemsQuery from '../data/queries/allItems.gql'
//import allCategoriesQuery from '../data/queries/allCategories.gql'
import updateItemNameMutation from '../data/queries/updateItemName.gql'
import updateItemPriceMutation from '../data/queries/updateItemPrice.gql'

const allCategoriesQuery = gql`
query allCategoriesQuery {
	allCategories {
		id
		name
		items {
			id
			active
			name
			price
		}
		parent {
			id
			name
		}
	}
}
`


const client = new ApolloClient({
	link: new HttpLink({
		uri: 'http://localhost:3003/graphql',
		credentials: 'same-origin'
	}),
	cache: new InMemoryCache()
});

let store

export const getStore = () => store
export const setStore = (_store) => store = _store

export class ObservableItems {
	@observable items = []
	@observable activeItem
	@observable loading = false

	get allItems() {
		return graphql({client, query: allItemsQuery})
	}
	get allCategories() {
		return graphql({client, query: allCategoriesQuery})
	}

	updateItemName = (id, name) =>
		this.updateItem({
			mutation: updateItemNameMutation,
			variables: {id, name},
			refetchQueries: [{query: allItemsQuery}]
		})
	updateItemPrice = (id, price) =>
		this.updateItem({
			mutation: updateItemPriceMutation,
			variables: {id, price},
			refetchQueries: [{query: allItemsQuery}]
		})
	updateItem = (mutation) =>
		client
			.mutate(mutation)
			.then(() => console.log('Updated item', mutation.variables))
			.catch(error => console.error('Failed to update item', error.message))
}