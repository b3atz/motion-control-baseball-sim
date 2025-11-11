import { Migration } from '@mikro-orm/migrations';

export class Migration20250521060247 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`statline_field\` add column \`pos\` text not null;`);
  }

}
