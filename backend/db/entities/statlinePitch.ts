import {Entity, PrimaryKey, Property, ManyToOne} from '@mikro-orm/core'
import { Player } from './player';

@Entity()
export class StatlinePitch{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Player)
    player!: Player;

    @Property()
    IP: number = 0;
    
    @Property()
    H: number = 0;
    
    @Property()
    BB: number = 0;
    
    @Property()
    K: number = 0;
    
    @Property()
    HR: number = 0;
    
    @Property()
    ER: number = 0;
    
    @Property()
    BF: number = 0;
    
    @Property()
    HB: number = 0;
    
    @Property()
    GS: boolean = false;
    get ERA(): number {
    return this.IP > 0 ? (this.ER * 9) / this.IP : 0;
  }

  get WHIP(): number {
    return this.IP > 0 ? (this.BB + this.H) / this.IP : 0;
  }

  get K_per_9(): number {
    return this.IP > 0 ? (this.K * 9) / this.IP : 0;
  }

  get BB_per_9(): number {
    return this.IP > 0 ? (this.BB * 9) / this.IP : 0;
  }

  get HR_per_9(): number {
    return this.IP > 0 ? (this.HR * 9) / this.IP : 0;
  }

  get OBA(): number {
    // OBA = H / (AB faced) ≈ H / (BF - BB - HB)
    const atBatsFaced = this.BF - this.BB - this.HB;
    return atBatsFaced > 0 ? this.H / atBatsFaced : 0;
  }
}