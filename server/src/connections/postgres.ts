import { DataSource } from 'typeorm';

export default class PostgreSQL {
    static client: DataSource;

    static async init() {
        try {
            this.client = new DataSource({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS,
                database: process.env.DATABASE_NAME,
            });

            this.client
                .initialize()
                .then(() => {
                    console.info(`Postgres ${process.env.DATABASE_NAME} is connected...`);
                })
                .catch((err) => {
                    console.error(`Could not connect with Postgres...`);
                });
        } catch (error) {
            console.error(`Postgres error: ${error}`);
            process.exit(1);
        }
    }

    static async close() {
        await this.client.destroy();
    }
}
