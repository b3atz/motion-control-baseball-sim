export type newPlayer = {
    name: string,
    profilePictureUrl: string
}
export type trade = {
    player_id:number,
    team_id:number,
    season: string
}
export type newTeam = {
    name: string
}
export type newGame = {
    innings: number,
    home_id: number,
    away_id: number
}
export type statBat = {
    player_id:number,
    game_id:number,
    B1: number,
    B2: number,
    B3: number,
    HR: number,
    BB: number,
    HBP: number,
    K: number,
    AB: number,
    PA: number,
    SB: number,
    CS: number,
    SF: number,
    R:number,
    RBI:number,
    GS: boolean,
}
export type statPitch = {
    player_id:number,
    game_id:number,
    IP: number,
    H: number,
    BB: number,
    K: number,
    HR: number,
    ER: number,
    BF: number,
    HB: number,
    GS: boolean,
}
export type statField = {
    player_id:number,
    game_id:number,
    pos:string,
    E: number,
    PO: number,
    A: number,
}
export type PlayInput = {
  player_id: number;
  key: string,
  stat: string;
};

export type RecordStatsBody = {
  game_id: number;
  plays: {
    [playId: string]: Partial<PlayInput>;
  };
};
export type newScore = {
  game_id: number,
  team_id:number,
  inning: number,
  score: number
}


  
