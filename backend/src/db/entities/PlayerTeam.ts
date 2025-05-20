import { Entity, PrimaryKey, Property, OneToMany, OneToOne, Collection, ManyToOne, type Rel } from '@mikro-orm/core';
import { Player } from './Player.js';
import { Team } from './Team.js';

@Entity()
export class PlayerTeam {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Player)
  player!: Rel<Player>;

  @ManyToOne(() => Team)
  team!: Rel<Team>;

  @Property()
  season!: string; 

  @Property({ nullable: true })
  startDate?: Date;

  @Property({ nullable: true })
  endDate?: Date;
}
