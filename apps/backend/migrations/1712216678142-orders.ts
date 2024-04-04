import { MigrationInterface, QueryRunner } from "typeorm";

export class Orders1712216678142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            -- Table Definition for Orders
            CREATE TABLE orders (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                clientId UUID NOT NULL,
                totalAmount NUMERIC(10, 2) NOT NULL,
                paymentId UUID,
                createdAt TIMESTAMP NOT NULL DEFAULT now(),
                updatedAt TIMESTAMP NOT NULL DEFAULT now(),
                FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
                FOREIGN KEY (paymentId) REFERENCES payments(id) ON DELETE SET NULL
            );
            `,
            undefined
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE orders`, undefined);
    }

}
