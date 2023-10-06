import path from 'path';
import fs from 'fs';

const indexOfEnvArg = process.argv.indexOf('--env');
if (indexOfEnvArg === -1) process.exit(0);

const envFile = process.argv[indexOfEnvArg + 1];
if (!fs.existsSync(`./env/${envFile}`)) process.exit(0);

require('dotenv').config({ path: path.join(__dirname, `../../env/${envFile}`) });
