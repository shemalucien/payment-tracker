import { MigrationInterface, QueryRunner } from "typeorm";

export class Products1712216643237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE products (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR NOT NULL,
                description VARCHAR NOT NULL,
                price NUMERIC(10, 2) NOT NULL,
                createdat TIMESTAMP NOT NULL DEFAULT now(),
                updatedat TIMESTAMP NOT NULL DEFAULT now()
              );
            `,
            undefined
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE products`, undefined);
    }

}
