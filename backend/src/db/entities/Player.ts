import { Entity, PrimaryKey, Property, OneToMany, OneToOne, Collection } from '@mikro-orm/core';
import { StatlineBat } from './StatlineBat.js';
import { StatlinePitch } from './StatlinePitch.js';
import { StatlineField } from './StatlineField.js';
import { PlayerTeam } from './PlayerTeam.js';


@Entity()
export class Player {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ nullable: true })
  profilePictureUrl?: string;
  
  @OneToMany(() => StatlineBat, statline => statline.player)
  statlinesBat = new Collection<StatlineBat>(this);

  @OneToMany(() => StatlinePitch, statline => statline.player)
  statlinesPitch = new Collection<StatlinePitch>(this);

  @OneToMany(() => StatlineField, statline => statline.player)
  statlinesField = new Collection<StatlineField>(this);

  @OneToMany(() => PlayerTeam, pt => pt.player)
  teamHistory = new Collection<PlayerTeam>(this);
}
