import { Entity, ManyToOne, PrimaryKey, Property, type Rel } from "@mikro-orm/core";
import { Game } from "./Game.js";
import { Team } from "./Team.js";

@Entity()
export class Score {
  @PrimaryKey()
  id!: number;
  
  @ManyToOne(() => Game)
  game!: Rel<Game>;

  @ManyToOne(() => Team)
  team!: Rel<Team>;

  @Property()
  inning!: number;

  @Property()
  score!: number;
}