import {Entity, PrimaryKey, Property, ManyToOne, Rel} from '@mikro-orm/core'
import { Player } from './Player.js';
import { Game } from './Game.js';

@Entity()
export class StatlineField{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Player)
    player!: Rel<Player>;
    
    @ManyToOne(() => Game)
    game!: Rel<Game>;
    
    @Property()
    E: number = 0;
   
    @Property()
    PO: number = 0;
    
    @Property()
    A: number = 0;
}