import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1706273284920 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
		await queryRunner.query(`
            CREATE TYPE "user_status_enum" AS ENUM('active', 'blocked');
        `);
		await queryRunner.query(`
          CREATE TABLE "user"
          (
              "id"           uuid PRIMARY KEY                  DEFAULT uuid_generate_v4(),
              "createdAt"    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
              "updatedAt"    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
              "deletedAt"    TIMESTAMP WITH TIME ZONE,
              "username"     text                     NOT NULL,
              "status"       "user_status_enum"       NOT NULL,
              "password"     text                     NOT NULL,
              "refreshToken" text,
              "balance"      DECIMAL(10, 2)           NOT NULL DEFAULT 0
          );
		`);
		await queryRunner.query(
			`CREATE TYPE payment_status_enum AS ENUM('pending', 'success', 'refund', 'canceled');`,
		);
		await queryRunner.query(`CREATE TYPE payment_type_enum AS ENUM('income', 'withdrawal');`);
		await queryRunner.query(`
          CREATE TABLE "payment"
          (
              "id"        uuid PRIMARY KEY                  DEFAULT uuid_generate_v4(),
              "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
              "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
              "deletedAt" TIMESTAMP WITH TIME ZONE,
              "userId"    uuid REFERENCES "user",
              "status"    "payment_status_enum"    NOT NULL,
              "type"      "payment_type_enum"      NOT NULL,
              "amount"    decimal(10, 2)           NOT NULL,
              "data"      jsonb                             DEFAULT '{}',
              CONSTRAINT "FK_user_payment" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE
          );
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "user";`);
		await queryRunner.query(`DROP TYPE "user_status_enum";`);
		await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
		await queryRunner.query(`DROP TABLE "payment";`);
		await queryRunner.query(`DROP TYPE payment_status_enum;`);
		await queryRunner.query(`DROP TYPE payment_type_enum;`);
	}
}
