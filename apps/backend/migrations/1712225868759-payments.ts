import { MigrationInterface, QueryRunner } from "typeorm";

export class Payments1712225868759 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            -- Table Definition for Payments
            CREATE TABLE payments (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                clientId UUID NOT NULL,
                orderId UUID NOT NULL,
                paymentmode VARCHAR NOT NULL,
                amount NUMERIC(10, 2) NOT NULL,
                status VARCHAR NOT NULL,
                paymentdate DATE NOT NULL,
                createdAt TIMESTAMP NOT NULL DEFAULT now(),
                updatedAt TIMESTAMP NOT NULL DEFAULT now(),
                FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE
            );
            `,
            undefined
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE payments`, undefined);
    }

}
