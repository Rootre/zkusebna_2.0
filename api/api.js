import {getClient} from '../data/apollo';
import {NETWORK_STATUS} from '../consts/apollo';

/**
 * Apollo get query
 * @param {object} query
 * @param {GraphQL} query.query
 * @param {object} query.variables
 * @returns {Promise<ApolloQueryResult<any> | void>}
 */
export function getQuery(query) {
    return getClient().query(query).then(result => {
        if (result.networkStatus !== NETWORK_STATUS.READY) {
            console.log('Apollo fetch not ready', result);
        }

        return result;
    }).catch(error => console.error('Apollo fetch error', error));
}

/**
 * Apollo mutation
 * @param {object} mutation
 * @param {GraphQL} mutation.mutation
 * @param {object} mutation.variables
 * @returns {Promise<ApolloQueryResult<any> | void>}
 */
export function mutateQuery(mutation) {
    return getClient()
        .mutate(mutation)
        .catch(error => console.error('Apollo failed to update', error));
}