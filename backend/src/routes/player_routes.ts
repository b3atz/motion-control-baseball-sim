
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "../db/entities/Player.js";
import { PlayerSeeder } from "../db/seeder/PlayerSeeder.js";

export function PlayerRoutes(app:FastifyInstance){
    //Create player
    /*app.post(){

    }*/
    //Get all players
    app.get("/players",async (req, reply) => {
		try {
			const playerList = await req.em.find(Player, {});
			reply.send(playerList);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
    /*Get player by ID
    app.get(){

    }
    //Display statHit
    app.get(){

    }
    //Display statPitch
    app.get(){
        
    }
    //Display statField
    app.get(){
        
    }
    //Display teamHistory
    app.get(){
        
    }
    //Add profile Pciture
    app.put(){

    }*/
}