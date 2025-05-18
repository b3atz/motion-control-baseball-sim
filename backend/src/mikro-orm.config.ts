import { Options } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { SqliteDriver } from '@mikro-orm/sqlite';

import path from 'path';
const entitiesTSPath = path.join(__dirname,"db" ,"entities");
const entitiesJSPath = path.join(__dirname, "..", "dist", "db", "entities");
const migrationsJSPath = path.join(__dirname,  "..", "dist", "db", "migrations");
const migrationsTSPath = path.join(__dirname, "db", "migrations");

const config: Options = {
  driver: SqliteDriver, // or 'postgresql', etc
  dbName: 'mariobaseball.db',
  entities: [entitiesJSPath],     // for production build
  entitiesTs: [entitiesTSPath],         // for dev with TS
  migrations: {
    path: migrationsJSPath,
    pathTs: migrationsTSPath, 
    glob: '!(*.d).{js,ts}', 
  },
  debug: true,
  extensions: [SeedManager,Migrator]
};

export default config;
