import { connect } from './database.js';
import server from './server.js';

connect();

server.start({ port: 3000 }, ({ port }) => {
    console.log('SEVER IS RUNNING ON ' + port);
} );