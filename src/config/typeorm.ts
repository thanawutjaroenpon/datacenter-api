import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig();

const config = {
    type: 'postgres',
    host: `${process.env.DB_HOST}`,
    port: parseInt(process.env.DB_PORT),
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`,
    database: `${process.env.DB_NAME}`,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
    migrationsTableName: 'migrations',
    // migrationsRun: true,
    seeds: [__dirname + '/../database/seeds/**/*.seeder.{ts,js}'],
    // logging: true
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);