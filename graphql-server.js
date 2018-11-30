import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './data/typeDefs';
import resolvers from './data/resolvers';

const GRAPHQL_PORT = 3003;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });

app.listen({ port: GRAPHQL_PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${GRAPHQL_PORT}${server.graphqlPath}`);
});