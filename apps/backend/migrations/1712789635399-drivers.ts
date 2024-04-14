import { MigrationInterface, QueryRunner } from "typeorm";

export class Drivers1712789635399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            ` 
                --Table Definitions --
                CREATE TABLE "drivers" (
                 "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                 "name" character varying NOT NULL,
                 "IdNumber" character varying NOT NULL,
                 "contact" character varying NOT NULL,
                 "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                 "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                 CONSTRAINT "PK_drivers_id" PRIMARY KEY ("id")
                )
                `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "drivers"`, undefined);
    }

}
