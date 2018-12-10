require('es6-promise').polyfill();
require('isomorphic-fetch');

import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';

let _cache = new InMemoryCache();
let _client = null;

export function hydrateCache(cache) {
    _cache.restore(cache);
}

export function getClient() {
    if (!_client) {
        _client = createApolloClient();
    }

    return _client;
}

function createApolloClient() {
    return new ApolloClient({
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
        cache: _cache,
    });
}