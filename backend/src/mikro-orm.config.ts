import { Options } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations'
import dotenv from 'dotenv';
dotenv.config();;
import { SeedManager } from '@mikro-orm/seeder';
import cors from '@fastify/cors';
import plugin from 'fastify-plugin';



import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
const entitiesTSPath = path.join(__dirname,"db" ,"entities");
const entitiesJSPath = path.join(__dirname, "..", "dist", "db", "entities");
const migrationsJSPath = path.join(__dirname,  "..", "dist", "db", "migrations");
const migrationsTSPath = path.join(__dirname, "db", "migrations");

const config: Options = {
  driver: PostgreSqlDriver, // or 'postgresql', etc
  dbName: process.env.DB_NAME,
	port: Number(process.env.DB_PORT),
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
  entities: [entitiesJSPath],     // for production build
  entitiesTs: [entitiesTSPath],         // for dev with TS
  migrations: {
    path: migrationsJSPath,
    pathTs: migrationsTSPath, 
    glob: '!(*.d).{js,ts}', 
  },
  seeder: {
    path: './db/seeder', // your seeder directory
    defaultSeeder: 'PlayerSeeder',
  },
  debug: true,
  extensions: [SeedManager,Migrator]
};

export default config;
