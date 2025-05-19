import { FastifyInstance } from "fastify";
import { PlayerRoutes } from "./player_routes.js";
async function DBRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
    PlayerRoutes(app);
}
export default DBRoutes;