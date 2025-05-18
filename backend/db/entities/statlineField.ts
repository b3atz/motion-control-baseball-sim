import {Entity, PrimaryKey, Property, ManyToOne} from '@mikro-orm/core'
import { Player } from './player';

@Entity()
export class StatlineField{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Player)
    player!: Player;
    
    @Property()
    E: number = 0;
   
    @Property()
    PO: number = 0;
    
    @Property()
    A: number = 0;
}