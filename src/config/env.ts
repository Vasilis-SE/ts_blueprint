import arg from 'arg';
import path from 'path';

const args = arg({ '--env': String });
const envFile = args['--env'];

require('dotenv').config({
    path: path.join(__dirname, `../../env/${envFile}`),
});
