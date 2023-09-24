import Application from './app';
// import PostgreSQL from '../connections/postgres';
// import RedisClient from '../connections/redis';

// // Initialize connections
// PostgreSQL.init();
// RedisClient.init();

const app = new Application();
app.run();
