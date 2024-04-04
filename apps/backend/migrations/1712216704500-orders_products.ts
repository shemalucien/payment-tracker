import { MigrationInterface, QueryRunner } from "typeorm";

export class OrdersProducts1712216704500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            -- Table Definition for Join Table: orders_products
            CREATE TABLE orders_products (
            orderId UUID NOT NULL,
            productId UUID NOT NULL,
            PRIMARY KEY (orderId, productId),
            FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
            );
            `,
            undefined
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
