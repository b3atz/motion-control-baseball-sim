import { MikroORM } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';

async function main() {
  const orm = await MikroORM.init(mikroConfig);
  const generator = orm.getSchemaGenerator();

  console.log('Connected to DB');
  // Uncomment to create schema from scratch
  // await generator.dropSchema();
  // await generator.createSchema();
  // await generator.refreshDatabase();

  await orm.close();
}

main().catch((err) => {
  console.error(err);
});
