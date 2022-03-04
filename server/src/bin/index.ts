import arg from 'arg';
import path from 'path';
import Server from './server';
import PostgreSQL from '../connections/postgres';

const args = arg({ '--env': String });
let confFile = '.env';
if (args['--env'] == 'dev') confFile = '.env.dev';

require('dotenv').config({ path: path.join(__dirname, `../config/${confFile}`) });

const server: Server = new Server();

// Initialize connections
PostgreSQL.init();

server.run(Number(process.env.PORT), () => console.log(`Server started on port: ${process.env.PORT}`));
