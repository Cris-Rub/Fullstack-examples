import resolvers from './graphql/index.js'
import { GraphQLServer } from 'graphql-yoga';
import path from 'path';
import { fileURLToPath } from 'url';

// ------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname( __filename );
// ------------

const server = new GraphQLServer({
    typeDefs: path.join(__dirname, 'graphql/schema.graphql'),
    resolvers
});

export default server;
