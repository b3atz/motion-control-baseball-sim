import { Entity, PrimaryKey, Property, OneToMany, OneToOne, Collection, ManyToOne } from '@mikro-orm/core';
import { PlayerTeam } from './PlayerTeam.js';


@Entity()
export class Team {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
    
  @OneToMany(() => PlayerTeam, pt => pt.team)
  rosterHistory = new Collection<PlayerTeam>(this);
}