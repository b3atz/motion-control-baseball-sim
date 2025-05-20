import dotenv from "dotenv";
import app from "./app.js";
import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config.js";
import { PlayerSeeder } from "./db/seeder/PlayerSeeder.js";

dotenv.config();

async function bootstrap() {
  try {
    const orm = await MikroORM.init(config);

    // ✅ Apply pending migrations
    await orm.getMigrator().up();

    // ✅ Seed only if player table is empty
    const playerCount = await orm.em.count('Player');
    if (playerCount === 0) {
      const seeder = orm.getSeeder();
      await seeder.seed(PlayerSeeder);
      console.log('Seeded initial player data');
    }

    // ✅ Start the server
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
