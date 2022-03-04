import arg from 'arg';
import Server from './server';
import path from 'path'; 

const args = arg({'--env': String });
let confFile = '.env';
if(args['--env'] == 'dev')
    confFile = '.env.dev';

require('dotenv').config({ path: path.join(__dirname, `../config/${confFile}`) });
    
const server: Server = new Server();
server.run(Number(process.env.PORT), () => 
    console.log(`Server started on port: ${process.env.PORT}`));
