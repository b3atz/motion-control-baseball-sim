import {Entity, PrimaryKey, Property, ManyToOne} from '@mikro-orm/core'
import { Player } from './Player';
import { Game } from './Game';

@Entity()
export class StatlineField{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Player)
    player!: Player;
    
    @ManyToOne(() => Game)
    game!: Game;
    
    @Property()
    E: number = 0;
   
    @Property()
    PO: number = 0;
    
    @Property()
    A: number = 0;
}