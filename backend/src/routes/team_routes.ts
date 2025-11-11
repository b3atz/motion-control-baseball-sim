import { FastifyInstance } from "fastify";
import { Team } from "../db/entities/Team.js";
import { newTeam, trade } from "../types.js";
import { PlayerTeam } from "../db/entities/PlayerTeam.js";
import { Player } from "../db/entities/Player.js";

export function TeamRoutes(app:FastifyInstance){
    //Create Team
    app.post<{Body: newTeam}>("/team", async (req,reply) => {
        const { name } = req.body;
        try {
			const newTeam = await req.em.create(Team, {
                name				
			});

			await req.em.flush();
			return reply.send(newTeam);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
    });
    //Get all Teams
    app.get("/teams",async (req, reply) => {
		try {
			const teamList = await req.em.find(Team, {});
			reply.send(teamList);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
    //Get Team by ID
    app.get("/team/:id", async (req,reply) => {
        const {id} = req.params as {id: string}
        try{
            const team = await req.em.findOne(Team, {id: parseInt(id)});

            if (!team){
                return reply.code(404).send({ message: 'team not found'})
            }

            return team;
        }catch(err){
            return reply.status(500).send({ message: err.message });
        }
        
    });
    //Add player to team
    app.put<{Body:trade }>("/teamAdd", async (req,reply) => {
        const { player_id, team_id, season} = req.body;
        try {
            const player = await req.em.findOneOrFail(Player, { id: player_id });
            const team = await req.em.findOneOrFail(Team, { id: team_id });
			const PlayerTeamNew = await req.em.create(PlayerTeam, {
                player,
                team,
                season,
                startDate: new Date(),
                endDate: null
			});

			await req.em.flush();
			return reply.send(PlayerTeamNew);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
    });
    // Remove player from team
    app.put<{ Body: trade }>("/teamRemove", async (req, reply) => {
        const { player_id, team_id } = req.body;
        try {

            const playerTeam = await req.em.findOne(PlayerTeam, {
                player: player_id,
                team: team_id,
                endDate: null,
            });

            if (!playerTeam) {
                return reply.status(404).send({ message: "Active player-team relationship not found" });
            }
            playerTeam.endDate = new Date();
            await req.em.persistAndFlush(playerTeam);

            return reply.send(playerTeam);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });
    //Display rosterHistory
    app.get<{ Params: { id: string } }>("/team/:id/roster-history", async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: "Invalid player ID" });
            }

            const player = await req.em.findOne(Team, { id }, {
                populate: ['rosterHistory.player'],
            });

            if (!player) {
                return reply.status(404).send({ message: "Player not found" });
            }

            const pastTeams = player.rosterHistory.getItems();
            return reply.send(pastTeams);
        } catch (err: any) {
            return reply.status(500).send({ message: err.message });
        }
    });
}