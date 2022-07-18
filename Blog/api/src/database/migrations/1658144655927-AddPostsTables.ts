import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostsTables1658144655927 implements MigrationInterface {
  name = 'AddPostsTables1658144655927';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blog" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "slug" character varying NOT NULL, "text" character varying(1000) NOT NULL, "media" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "UQ_0dc7e58d73a1390874a663bd599" UNIQUE ("slug"), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" DROP CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb"`,
    );
    await queryRunner.query(`DROP TABLE "blog"`);
  }
}
