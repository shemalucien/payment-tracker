import { MigrationInterface, QueryRunner } from "typeorm";

export class Clients1712176545981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            -- Table Definition for Clients
            CREATE TABLE "clients" (
              "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
              "name" character varying NOT NULL,
              "tinNumber" character varying NOT NULL,
              "contact" character varying NOT NULL,
              "address" character varying NOT NULL,
              "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
              "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
              CONSTRAINT "PK_clients_id" PRIMARY KEY ("id")
            )
            `,
            undefined
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE "clients"`, undefined);
    }

}
