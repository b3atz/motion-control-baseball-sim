import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Game } from "./Game";
import { Team } from "./Team";

@Entity()
export class Score {
  @ManyToOne(() => Game)
  game!: Game;

  @ManyToOne(() => Team)
  team!: Team;

  @Property()
  inning!: number;

  @Property()
  score!: number;
}