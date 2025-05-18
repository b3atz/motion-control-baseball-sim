import { Entity, PrimaryKey, Property, OneToMany, OneToOne, Collection } from '@mikro-orm/core';
import { StatlineBat } from './statlineBat';
import { StatlinePitch } from './statlinePitch';
import { StatlineField } from './statlineField';


@Entity()
export class Player {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany(() => StatlineBat, statline => statline.player)
  statlinesBat = new Collection<StatlineBat>(this);

  @OneToMany(() => StatlinePitch, statline => statline.player)
  statlinesPitch = new Collection<StatlinePitch>(this);

  @OneToMany(() => StatlineField, statline => statline.player)
  statlinesField = new Collection<StatlineField>(this);
}
