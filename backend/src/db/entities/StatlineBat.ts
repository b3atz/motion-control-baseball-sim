import {Entity, PrimaryKey, Property, ManyToOne, type Rel} from '@mikro-orm/core'
import { Player } from './Player.js';
import { Game } from './Game.js';

@Entity()
export class StatlineBat{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Player)
    player!: Rel<Player>;
    
    @ManyToOne(() => Game)
    game!: Rel<Game>;

    @Property()
    B1: number = 0;

    @Property()
    B2: number = 0;

    @Property()
    B3: number = 0;
    
    @Property()
    HR: number = 0;

    @Property()
    BB: number = 0;

    @Property()
    HBP: number = 0;

    @Property()
    K: number = 0;

    @Property()
    AB: number = 0;
    
    @Property()
    PA: number = 0;
    
    @Property()
    SB: number = 0;
    
    @Property()
    CS: number = 0;

    @Property()
    SF: number = 0;
    
    @Property()
    R: number = 0;
    
    @Property()
    RBI: number = 0;
    
    @Property()
    GS: boolean = false;

    get H(): number {
        return this.B1 + this.B2 + this.B3 + this.HR;
    }

    get BA(): number {
        return this.AB > 0 ? this.H / this.AB : 0;
    }

    get OBP(): number {
        const denom = this.AB + this.BB + this.HBP + this.SF;
        return denom > 0 ? (this.H + this.BB + this.HBP) / denom : 0;
    }

    get SLG(): number {
        const totalBases = this.TB;
        return this.AB > 0 ? totalBases / this.AB : 0;
    }

    get OPS(): number {
        return this.OBP + this.SLG;
    }

    get ISO(): number {
        return this.SLG - this.BA;
    }

    get TB(): number {
        return (1 * this.B1) + (2 * this.B2) + (3 * this.B3) + (4 * this.HR);
    }

    get BABIP(): number {
        const denom = this.AB - this.K - this.HR + this.SF;
        return denom > 0 ? (this.H - this.HR) / denom : 0;
    }
}