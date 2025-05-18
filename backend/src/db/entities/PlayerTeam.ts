import { Entity, PrimaryKey, Property, OneToMany, OneToOne, Collection, ManyToOne } from '@mikro-orm/core';
import { Player } from './Player';
import { Team } from './Team';

@Entity()
export class PlayerTeam {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Player)
  player!: Player;

  @ManyToOne(() => Team)
  team!: Team;

  @Property()
  season!: string; // e.g. "2025"

  @Property({ nullable: true })
  startDate?: Date;

  @Property({ nullable: true })
  endDate?: Date;
}
