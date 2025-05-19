import { Entity, PrimaryKey, Property, OneToMany, OneToOne, Collection, ManyToOne } from '@mikro-orm/core';
import { StatlineBat } from './StatlineBat';
import { StatlinePitch } from './StatlinePitch';
import { StatlineField } from './StatlineField';
import { Team } from './Team';
import { Score } from './Score';


@Entity()
export class Game {
  @PrimaryKey()
  id!: number;

  @Property()
  innings!: number;

  @OneToMany(() => Score, score => score.game)
  scores = new Collection<Score>(this);

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

  get homeTotal(): number {
  return this.scores
    .filter(score => score.team.id === this.home.id)
    .reduce((sum, score) => sum + score.score, 0);
}

get awayTotal(): number {
  return this.scores
    .filter(score => score.team.id === this.away.id)
    .reduce((sum, score) => sum + score.score, 0);
}
}