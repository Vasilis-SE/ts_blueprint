import * as Redis from 'redis';

import { RedisClientType } from 'redis';
import Logger from '@config/logger';

class RedisConnector {
	private static instance: RedisConnector;
	private connector: RedisClientType;

	private constructor() {
		this.connector = Redis.createClient({
			password: process.env.REDIS_PASS
		});

		this.setup();
	}

	public static getInstance(): RedisConnector {
		if (!RedisConnector.instance) RedisConnector.instance = new RedisConnector();

		return RedisConnector.instance;
	}

	public async setup(): Promise<void> {
		await this.connector.connect();

		this.connector.on('error', (err: any) => {
			Logger.error(`Fatal error! Could not connect to redis reason: ${err}...`, __filename);
			process.exit(1);
		});

		this.connector.on('connect', async () => {
			Logger.info(`Connected to redis...`, __filename);
		});
	}

	public quit(): void {
		this.connector.quit();
	}

	public redis(): RedisClientType {
		return this.connector;
	}
}

export default RedisConnector.getInstance();
