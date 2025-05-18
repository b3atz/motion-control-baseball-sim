import { Entity, PrimaryKey, Property, OneToMany, OneToOne, Collection, ManyToOne } from '@mikro-orm/core';
import { StatlineBat } from './StatlineBat';
import { StatlinePitch } from './StatlinePitch';
import { StatlineField } from './StatlineField';
import { Team } from './Team';


@Entity()
export class Game {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  home!: Team;

  @ManyToOne()
  away!: Team;
    
  @OneToMany(() => StatlineBat, statline => statline.game)
  statlinesBat = new Collection<StatlineBat>(this);

  @OneToMany(() => StatlinePitch, statline => statline.game)
  statlinesPitch = new Collection<StatlinePitch>(this);

  @OneToMany(() => StatlineField, statline => statline.game)
  statlinesField = new Collection<StatlineField>(this);
}