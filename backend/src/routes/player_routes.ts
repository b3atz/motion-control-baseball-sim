
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "../db/entities/Player.js";
import { PlayerSeeder } from "../db/seeder/PlayerSeeder.js";
import { request } from "http";
import { newPlayer } from "../types.js";

export function PlayerRoutes(app:FastifyInstance){
    //Create player
    app.post<{Body: newPlayer}>("/player", async (req,reply) => {
        const { name, profilePictureUrl } = req.body;
        try {
			const newPlayer = await req.em.create(Player, {
                name,
                profilePictureUrl				
			});

			await req.em.flush();
			return reply.send(newPlayer);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
    });
    //Get all players
    app.get("/players",async (req, reply) => {
		try {
			const playerList = await req.em.find(Player, {});
			reply.send(playerList);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
    //Get player by ID
    app.get("/player/:id", async (req,reply) => {
        const {id} = req.params as {id: string}

        const player = await req.em.findOne(Player, {id: parseInt(id)});

        if (!player){
            return reply.code(404).send({ message: 'Player not found'})
        }

        return player;
    });
    //Display statHit
    app.get<{ Params: { id: string } }>("/players/:id/statBat", async (req, reply) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return reply.status(400).send({ message: "Invalid player ID" });
        }

        const player = await req.em.findOne(Player, { id }, {
            populate: [
                'statlinesBat',
                'statlinesBat.game',
                'statlinesBat.game.home',
                'statlinesBat.game.away',
            ],
        });

        if (!player) {
            return reply.status(404).send({ message: "Player not found" });
        }

        const statBat = player.statlinesBat.getItems().map(stat => ({
            id: stat.id,
            gameName: stat.game.home.name + ' vs ' + stat.game.away.name,
            B1: stat.B1,
            B2: stat.B2,
            B3: stat.B3,
            HR: stat.HR,
            BB: stat.BB,
            HBP: stat.HBP,
            K: stat.K,
            AB: stat.AB,
            PA: stat.PA,
            SB: stat.SB,
            CS: stat.CS,
            SF: stat.SF,
            R: stat.R,
            RBI: stat.RBI,
            GS: stat.GS,
            H: stat.H,
            BA: stat.BA,
            OBP: stat.OBP,
            SLG: stat.SLG,
            OPS: stat.OPS,
            ISO: stat.ISO,
            TB: stat.TB,
            BABIP: stat.BABIP,
        }));

        return reply.send(statBat);
        } catch (err: any) {
            return reply.status(500).send({ message: err.message });
        }
    }); 
    //Display statPitch
     app.get<{ Params: { id: string } }>("/players/:id/statPitch", async (req, reply) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return reply.status(400).send({ message: "Invalid player ID" });
        }

        const player = await req.em.findOne(Player, { id }, {
            populate: [
                'statlinesPitch',
                'statlinesPitch.game',
                'statlinesPitch.game.home',
                'statlinesPitch.game.away',
            ],
            
        });

        if (!player) {
            return reply.status(404).send({ message: "Player not found" });
        }

        const statPitch = player.statlinesPitch.getItems().map(stat => ({
            gameName: stat.game.home.name + ' vs ' + stat.game.away.name,
            IP: stat.IP,
            H: stat.H,
            BB: stat.BB,
            K: stat.K,
            HR: stat.HR,
            ER: stat.ER,
            BF: stat.BF,
            HB: stat.HB,
            GS: stat.GS,
            ERA: stat.ERA,
            WHIP: stat.WHIP,
            K_per_9: stat.K_per_9,
            BB_per_9: stat.BB_per_9,
            HR_per_9: stat.HR_per_9,
            OBA: stat.OBA,
        }));

        return reply.send(statPitch);
        } catch (err: any) {
            return reply.status(500).send({ message: err.message });
        }
    });
    //Display statField
     app.get<{ Params: { id: string } }>("/players/:id/statField", async (req, reply) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return reply.status(400).send({ message: "Invalid player ID" });
        }

        const player = await req.em.findOne(Player, { id }, {
            populate: [
                'statlinesField',
                'statlinesField.game',
                'statlinesField.game.home',
                'statlinesField.game.away',
            ],
        });

        if (!player) {
            return reply.status(404).send({ message: "Player not found" });
        }

        const statBat = player.statlinesField.getItems().map(stat => ({
            id: stat.id,
            gameName: stat.game.home.name + ' vs ' + stat.game.away.name,
            pos: stat.pos,
            E: stat.E,
            PO: stat.PO,
            A: stat.A,
        }));

        return reply.send(statBat);
        } catch (err: any) {
            return reply.status(500).send({ message: err.message });
        }
    });
    //Display teamHistory
    app.get<{ Params: { id: string } }>("/players/:id/team-history", async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: "Invalid player ID" });
            }

            const player = await req.em.findOne(Player, { id }, {
                populate: ['teamHistory.team'],
            });

            if (!player) {
                return reply.status(404).send({ message: "Player not found" });
            }

            const pastTeams = player.teamHistory.getItems();
            return reply.send(pastTeams);
        } catch (err: any) {
            return reply.status(500).send({ message: err.message });
        }
    });

}