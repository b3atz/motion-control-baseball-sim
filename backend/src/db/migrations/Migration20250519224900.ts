import { Migration } from '@mikro-orm/migrations';

export class Migration20250519224900 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "player" ("id" serial primary key, "name" varchar(255) not null, "profile_picture_url" varchar(255) null);`);

    this.addSql(`create table "team" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "player_team" ("id" serial primary key, "player_id" int not null, "team_id" int not null, "season" varchar(255) not null, "start_date" timestamptz null, "end_date" timestamptz null);`);

    this.addSql(`create table "game" ("id" serial primary key, "innings" int not null, "home_id" int not null, "away_id" int not null);`);

    this.addSql(`create table "statline_pitch" ("id" serial primary key, "player_id" int not null, "game_id" int not null, "ip" int not null default 0, "h" int not null default 0, "bb" int not null default 0, "k" int not null default 0, "hr" int not null default 0, "er" int not null default 0, "bf" int not null default 0, "hb" int not null default 0, "gs" boolean not null default false);`);

    this.addSql(`create table "statline_field" ("id" serial primary key, "player_id" int not null, "game_id" int not null, "e" int not null default 0, "po" int not null default 0, "a" int not null default 0);`);

    this.addSql(`create table "statline_bat" ("id" serial primary key, "player_id" int not null, "game_id" int not null, "b1" int not null default 0, "b2" int not null default 0, "b3" int not null default 0, "hr" int not null default 0, "bb" int not null default 0, "hbp" int not null default 0, "k" int not null default 0, "ab" int not null default 0, "pa" int not null default 0, "sb" int not null default 0, "cs" int not null default 0, "sf" int not null default 0, "r" int not null default 0, "rbi" int not null default 0, "gs" boolean not null default false);`);

    this.addSql(`create table "score" ("id" serial primary key, "game_id" int not null, "team_id" int not null, "inning" int not null, "score" int not null);`);

    this.addSql(`alter table "player_team" add constraint "player_team_player_id_foreign" foreign key ("player_id") references "player" ("id") on update cascade;`);
    this.addSql(`alter table "player_team" add constraint "player_team_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade;`);

    this.addSql(`alter table "game" add constraint "game_home_id_foreign" foreign key ("home_id") references "team" ("id") on update cascade;`);
    this.addSql(`alter table "game" add constraint "game_away_id_foreign" foreign key ("away_id") references "team" ("id") on update cascade;`);

    this.addSql(`alter table "statline_pitch" add constraint "statline_pitch_player_id_foreign" foreign key ("player_id") references "player" ("id") on update cascade;`);
    this.addSql(`alter table "statline_pitch" add constraint "statline_pitch_game_id_foreign" foreign key ("game_id") references "game" ("id") on update cascade;`);

    this.addSql(`alter table "statline_field" add constraint "statline_field_player_id_foreign" foreign key ("player_id") references "player" ("id") on update cascade;`);
    this.addSql(`alter table "statline_field" add constraint "statline_field_game_id_foreign" foreign key ("game_id") references "game" ("id") on update cascade;`);

    this.addSql(`alter table "statline_bat" add constraint "statline_bat_player_id_foreign" foreign key ("player_id") references "player" ("id") on update cascade;`);
    this.addSql(`alter table "statline_bat" add constraint "statline_bat_game_id_foreign" foreign key ("game_id") references "game" ("id") on update cascade;`);

    this.addSql(`alter table "score" add constraint "score_game_id_foreign" foreign key ("game_id") references "game" ("id") on update cascade;`);
    this.addSql(`alter table "score" add constraint "score_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "player_team" drop constraint "player_team_player_id_foreign";`);

    this.addSql(`alter table "statline_pitch" drop constraint "statline_pitch_player_id_foreign";`);

    this.addSql(`alter table "statline_field" drop constraint "statline_field_player_id_foreign";`);

    this.addSql(`alter table "statline_bat" drop constraint "statline_bat_player_id_foreign";`);

    this.addSql(`alter table "player_team" drop constraint "player_team_team_id_foreign";`);

    this.addSql(`alter table "game" drop constraint "game_home_id_foreign";`);

    this.addSql(`alter table "game" drop constraint "game_away_id_foreign";`);

    this.addSql(`alter table "score" drop constraint "score_team_id_foreign";`);

    this.addSql(`alter table "statline_pitch" drop constraint "statline_pitch_game_id_foreign";`);

    this.addSql(`alter table "statline_field" drop constraint "statline_field_game_id_foreign";`);

    this.addSql(`alter table "statline_bat" drop constraint "statline_bat_game_id_foreign";`);

    this.addSql(`alter table "score" drop constraint "score_game_id_foreign";`);

    this.addSql(`drop table if exists "player" cascade;`);

    this.addSql(`drop table if exists "team" cascade;`);

    this.addSql(`drop table if exists "player_team" cascade;`);

    this.addSql(`drop table if exists "game" cascade;`);

    this.addSql(`drop table if exists "statline_pitch" cascade;`);

    this.addSql(`drop table if exists "statline_field" cascade;`);

    this.addSql(`drop table if exists "statline_bat" cascade;`);

    this.addSql(`drop table if exists "score" cascade;`);
  }

}
