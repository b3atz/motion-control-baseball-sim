import { Migration } from '@mikro-orm/migrations';

export class Migration20250520172451 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`player\` (\`id\` integer not null primary key autoincrement, \`name\` text not null, \`profile_picture_url\` text null);`);

    this.addSql(`create table \`team\` (\`id\` integer not null primary key autoincrement, \`name\` text not null);`);

    this.addSql(`create table \`player_team\` (\`id\` integer not null primary key autoincrement, \`player_id\` integer not null, \`team_id\` integer not null, \`season\` text not null, \`start_date\` datetime null, \`end_date\` datetime null, constraint \`player_team_player_id_foreign\` foreign key(\`player_id\`) references \`player\`(\`id\`) on update cascade, constraint \`player_team_team_id_foreign\` foreign key(\`team_id\`) references \`team\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`player_team_player_id_index\` on \`player_team\` (\`player_id\`);`);
    this.addSql(`create index \`player_team_team_id_index\` on \`player_team\` (\`team_id\`);`);

    this.addSql(`create table \`game\` (\`id\` integer not null primary key autoincrement, \`innings\` integer not null, \`home_id\` integer not null, \`away_id\` integer not null, constraint \`game_home_id_foreign\` foreign key(\`home_id\`) references \`team\`(\`id\`) on update cascade, constraint \`game_away_id_foreign\` foreign key(\`away_id\`) references \`team\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`game_home_id_index\` on \`game\` (\`home_id\`);`);
    this.addSql(`create index \`game_away_id_index\` on \`game\` (\`away_id\`);`);

    this.addSql(`create table \`statline_pitch\` (\`id\` integer not null primary key autoincrement, \`player_id\` integer not null, \`game_id\` integer not null, \`ip\` integer not null default 0, \`h\` integer not null default 0, \`bb\` integer not null default 0, \`k\` integer not null default 0, \`hr\` integer not null default 0, \`er\` integer not null default 0, \`bf\` integer not null default 0, \`hb\` integer not null default 0, \`gs\` integer not null default false, constraint \`statline_pitch_player_id_foreign\` foreign key(\`player_id\`) references \`player\`(\`id\`) on update cascade, constraint \`statline_pitch_game_id_foreign\` foreign key(\`game_id\`) references \`game\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`statline_pitch_player_id_index\` on \`statline_pitch\` (\`player_id\`);`);
    this.addSql(`create index \`statline_pitch_game_id_index\` on \`statline_pitch\` (\`game_id\`);`);

    this.addSql(`create table \`statline_field\` (\`id\` integer not null primary key autoincrement, \`player_id\` integer not null, \`game_id\` integer not null, \`e\` integer not null default 0, \`po\` integer not null default 0, \`a\` integer not null default 0, constraint \`statline_field_player_id_foreign\` foreign key(\`player_id\`) references \`player\`(\`id\`) on update cascade, constraint \`statline_field_game_id_foreign\` foreign key(\`game_id\`) references \`game\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`statline_field_player_id_index\` on \`statline_field\` (\`player_id\`);`);
    this.addSql(`create index \`statline_field_game_id_index\` on \`statline_field\` (\`game_id\`);`);

    this.addSql(`create table \`statline_bat\` (\`id\` integer not null primary key autoincrement, \`player_id\` integer not null, \`game_id\` integer not null, \`b1\` integer not null default 0, \`b2\` integer not null default 0, \`b3\` integer not null default 0, \`hr\` integer not null default 0, \`bb\` integer not null default 0, \`hbp\` integer not null default 0, \`k\` integer not null default 0, \`ab\` integer not null default 0, \`pa\` integer not null default 0, \`sb\` integer not null default 0, \`cs\` integer not null default 0, \`sf\` integer not null default 0, \`r\` integer not null default 0, \`rbi\` integer not null default 0, \`gs\` integer not null default false, constraint \`statline_bat_player_id_foreign\` foreign key(\`player_id\`) references \`player\`(\`id\`) on update cascade, constraint \`statline_bat_game_id_foreign\` foreign key(\`game_id\`) references \`game\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`statline_bat_player_id_index\` on \`statline_bat\` (\`player_id\`);`);
    this.addSql(`create index \`statline_bat_game_id_index\` on \`statline_bat\` (\`game_id\`);`);

    this.addSql(`create table \`score\` (\`id\` integer not null primary key autoincrement, \`game_id\` integer not null, \`team_id\` integer not null, \`inning\` integer not null, \`score\` integer not null, constraint \`score_game_id_foreign\` foreign key(\`game_id\`) references \`game\`(\`id\`) on update cascade, constraint \`score_team_id_foreign\` foreign key(\`team_id\`) references \`team\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`score_game_id_index\` on \`score\` (\`game_id\`);`);
    this.addSql(`create index \`score_team_id_index\` on \`score\` (\`team_id\`);`);
  }

}
