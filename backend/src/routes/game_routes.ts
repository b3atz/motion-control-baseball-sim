import { FastifyInstance } from "fastify";
import { Game } from "../db/entities/Game.js";
import { newGame, newScore, PlayInput, RecordStatsBody, statBat, statField, statPitch } from "../types.js";
import { Team } from "../db/entities/Team.js";
import { Player } from "../db/entities/Player.js";
import { EntityManager } from "@mikro-orm/core";
import { StatlineBat } from "../db/entities/StatlineBat.js";
import { StatlineField } from "../db/entities/StatlineField.js";
import { StatlinePitch } from "../db/entities/StatlinePitch.js";
import { Score } from "../db/entities/Score.js";


export function GameRoutes(app:FastifyInstance){
    //Create Game
    app.post<{Body: newGame}>("/game", async (req,reply) => {
        const { innings, home_id, away_id } = req.body;
        try {
            const home = await req.em.findOne(Team,{id:home_id});
            const away = await req.em.findOne(Team,{id:away_id});
			const newPlayer = await req.em.create(Game, {
                innings,
                home,
                away				
			});

			await req.em.flush();
			return reply.send(newPlayer);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
    });
    //Get all Games
    app.get("/games",async (req, reply) => {
		try {
			const gameList = await req.em.find(Game, {}, {  populate: ['home','away'],});
			reply.send(gameList);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
    //Get Game by ID
    app.get("/game/:id", async (req,reply) => {
        const {id} = req.params as {id: string}

        const game = await req.em.findOne(Game, {id: parseInt(id)});

        if (!game){
            return reply.code(404).send({ message: 'game not found'})
        }

        return game;
    });
    //Add stat to game
    app.post<{ Body: RecordStatsBody }>("/record-stats", async (req, reply) => {
        const { game_id, plays } = req.body;

        const batKeys = ['B1', 'B2', 'B3', 'HR', 'BB', 'HBP', 'K', 'AB', 'PA', 'SB', 'CS', 'SF', 'R', 'RBI', 'GS'];
        const pitchKeys = ['IP', 'H', 'BB', 'K', 'HR', 'ER', 'BF', 'HB', 'GS'];
        const fieldKeys = ['E', 'PO', 'A'];

        for (const [_, play] of Object.entries(plays)) {
            const { player_id, key, stat, pos } = play;

            if (!player_id || !key) continue;

            const player = await req.em.findOne(Player, {id:player_id})
            const game = await req.em.findOne(Game, {id:game_id})
            try {
                if (batKeys.includes(key) && stat === 'bat') {
                    let statline = await req.em.findOne(StatlineBat, { player, game});
                    if (!statline) {
                        statline = req.em.create(StatlineBat, { player, game });
                    }
                    (statline as any)[key] = ((statline as any)[key] || 0) + 1;
                } else if (pitchKeys.includes(key) && stat == 'pitch') {
                    let statline = await req.em.findOne(StatlinePitch, { player: player_id, game: game_id });
                    if (!statline) {
                        statline = req.em.create(StatlinePitch, { player, game });
                    }
                    (statline as any)[key] = ((statline as any)[key] || 0) + 1;
                } else if (fieldKeys.includes(key) && stat == 'field') {
                    let statline = await req.em.findOne(StatlineField, { player: player_id, game: game_id });
                    if (!statline) {
                        statline = req.em.create(StatlineField, { player, game, pos});
                    }
                    (statline as any)[key] = ((statline as any)[key] || 0) + 1;
                }
            } catch (err) {
                console.error(`Failed to update stat for player ${player_id}:`, err);
            }
        }

        await req.em.flush();
        return reply.send({ message: "Stats recorded" });
    });
    //Get game batting stats
    app.get<{ Params: { id: string } }>("/games/:id/statBat", async (req, reply) => {
        try {
            const gameId = Number(req.params.id);

            if (isNaN(gameId)) {
                return reply.status(400).send({ message: "Invalid game ID" });
            }

            const statlines = await req.em.find(StatlineBat, {
            game: gameId,
            }, {
            populate: ['player'],
            });

            const result = statlines.map(stat => {
                const entry = {
                    id: stat.id,
                    playerName: stat.player?.name ?? null,
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
                };

                console.log(`📊 Batting Stats for ${entry.playerName ?? `Player ${entry.id}`}:`);
                console.table(entry);

                return entry;
            });

            return reply.send(result);
        } catch (err: any) {
            return reply.status(500).send({ message: err.message });
        }
    });
    //Get game pitching stats
    app.get<{ Params: { id: string } }>("/games/:id/statPitch", async (req, reply) => {
        try {
            const gameId = Number(req.params.id);

            if (isNaN(gameId)) {
                return reply.status(400).send({ message: "Invalid game ID" });
            }

            const statlines = await req.em.find(StatlinePitch, {
                game: gameId,
            }, {
                populate: ['player'],
            });

            const result = statlines.map(stat => {
                const entry = {
                    id: stat.id,
                    playerName: stat.player?.name ?? null,
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
                };

                console.log(`📊 Pitching Stats for ${entry.playerName ?? `Player ${entry.id}`}:`);
                console.table(entry);

                return entry;
            });

            return reply.send(result);
        } catch (err: any) {
            console.error("❌ Failed to fetch pitching stats:", err);
            return reply.status(500).send({ message: err.message });
        }
    });
    //get game fielding stats
    app.get<{ Params: { id: string } }>("/games/:id/statField", async (req, reply) => {
        try {
            const gameId = Number(req.params.id);

            if (isNaN(gameId)) {
                return reply.status(400).send({ message: "Invalid game ID" });
            }

            const statlines = await req.em.find(StatlineField, {
                game: gameId,
            }, {
                populate: ['player'],
            });

            const result = statlines.map(stat => {
                const entry = {
                    id: stat.id,
                    playerName: stat.player?.name ?? null,
                    pos: stat.pos,
                    E: stat.E,
                    PO: stat.PO,
                    A: stat.A,
                };

                console.log(`🧤 Fielding Stats for ${entry.playerName ?? `Player ${entry.id}`}:`);
                console.table(entry);

                return entry;
            });

            return reply.send(result);
        } catch (err: any) {
            console.error("❌ Failed to fetch fielding stats:", err);
            return reply.status(500).send({ message: err.message });
        }
    });
    //Add score
    app.post<{ Params: { id:string},Body: newScore}>("/game/:id/score", async (req,reply) => {
        try{
            const { team_id, inning, score} = req.body;
            const id = Number(req.params.id);

            const game = await req.em.findOne(Game, id);
            const team = await req.em.findOne(Team, {id:team_id});

            const newScore = await req.em.create(Score, {
                inning,
                score,
                team,
                game				
			});

			await req.em.flush();
			return reply.send(newScore);
        }catch(err){
            return reply.status(500).send({ message: err.message });
        }
    });
    //Display score for game
    app.get<{ Params: { id:string}}>("/game/:id/score", async (req,reply) => {
        try{
            const id = Number(req.params.id);

            const game = await req.em.findOne(Game, id);

            const scores = await req.em.find(Score, {
                game
            }, {
                populate: ['team'],
            });

            const result = scores.map(score => {
                const entry = {
                    teamName: score.team?.name ?? null,
                    inning: score.inning,
                    score: score.score
                };
                return entry;
            });
            return reply.send(result);
            }catch(err){
                return reply.status(500).send({ message: err.message });
            }
    });
}
