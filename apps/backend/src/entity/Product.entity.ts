import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Order } from "./Order.entity";
import { OrderDetail } from './OrderDetail.entity';

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;
  
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false , default: 1})
  quantity: number;
  
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number;

  @ManyToMany(() => Order, order => order.products,{ nullable: true })
  @JoinTable( 
    {
      name: "order_products",
      joinColumn: { name: "productId", referencedColumnName: "id" },
      inverseJoinColumn: { name: "orderId", referencedColumnName: "id" },
    }
  )
  orders: Order[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}

