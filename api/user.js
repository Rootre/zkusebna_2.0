import {getUserByCredentialsQuery} from '../data/queries/getUserByCredentialsQuery.graphql';
import {createNewUserMutation} from '../data/queries/createNewUserMutation.graphql';

import {getQuery, mutateQuery} from './api';

/**
 * @returns {Promise<resolvers.Query.userByCredentials>}
 */
export function getUserByCredentials(email, phone, name) {
    return getQuery({
        query: getUserByCredentialsQuery,
        variables: {
            email,
            phone,
            name,
        },
    }).then(result => result.data.userByCredentials);
}

/**
 * @returns {Promise<resolvers.Query.createNewUser>}
 */
export function createNewUser(email, phone, name) {
    return mutateQuery({
        mutation: createNewUserMutation,
        update: (store, {data: {createNewUser}}) => {
            try {
                store.writeQuery({
                    data: {
                        userByCredentials: createNewUser,
                    },
                    query: getUserByCredentialsQuery,
                    variables: {
                        email,
                        phone,
                        name,
                    },
                });
            } catch (e) {
                console.error(e);
            }
        },
        variables: {
            email,
            phone,
            name,
        },
    }).then(result => result.data.createNewUser);
}