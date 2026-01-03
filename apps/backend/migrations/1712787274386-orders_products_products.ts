import { MigrationInterface, QueryRunner } from "typeorm";

export class OrdersProductsProducts1712787274386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "orders_products_products" (
                "orderId" uuid NOT NULL,
                "productId" uuid NOT NULL,
                PRIMARY KEY ("orderId", "productId"),
                CONSTRAINT "FK_orders_products_orders_orderId" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE CASCADE,
                CONSTRAINT "FK_orders_products_products_productId" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE
            )
        `),
        undefined
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE "orders_products_products"`, undefined);
    }

}
