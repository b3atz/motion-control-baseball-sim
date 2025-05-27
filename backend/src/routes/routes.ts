import { FastifyInstance } from "fastify";
import { PlayerRoutes } from "./player_routes.js";
import { GameRoutes } from "./game_routes.js";
import { TeamRoutes } from "./team_routes.js";

async function DBRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
    PlayerRoutes(app);
	GameRoutes(app);
	TeamRoutes(app);
}
export default DBRoutes;