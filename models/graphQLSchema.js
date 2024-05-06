import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './typeDefs.js';
import { resolvers } from '../controllers/resolvers.js';

// Create executable schema with resolvers
export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});