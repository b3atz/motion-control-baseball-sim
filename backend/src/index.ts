import dotenv from "dotenv";
import app from "./app.js";
import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config.js";
import { DemoSeeder } from "./db/seeder/DemoSeeder.js";

dotenv.config();

async function bootstrap() {
  try {
    const orm = await MikroORM.init(config);

    
    await orm.getMigrator().up();

    
    const playerCount = await orm.em.count('Player');
    if (playerCount === 0) {
      const seeder = orm.getSeeder();
      await seeder.seed(DemoSeeder);
      console.log('Seeded initial player data');
    }

    
    await app.listen({
      port: Number(process.env.PORT),
      host: process.env.HOST
    });

    app.log.info(`Started server at http://${process.env.HOST}:${process.env.PORT}`);
  } catch (err) {
    console.error("Error starting app:", err);
    process.exit(1);
  }
}

bootstrap();
