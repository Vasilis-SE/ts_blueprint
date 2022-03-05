import * as redis from 'redis'

export default class RedisClient {
    static client: any;
    
    static async init() {
        this.client = redis.createClient();
    
        this.client.on('error', async (err) => {
            console.error(`Redis connect error: ${err}`);
            process.exit(1);
        });
    }
}