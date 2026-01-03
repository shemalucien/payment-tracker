import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  OneToMany,
 } from "typeorm";
 import { Client } from "./Client.entity";
 import { Product } from "./Product.entity";
 import { Payment } from "./Payment.entity";
import { OrderDetail } from "./OrderDetail.entity";
 
 @Entity({ name: "orders" })
 export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;
 
  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: "clientId" })
  client: Client;

  @ManyToMany(() => Product)
  @JoinTable(
    {
      name: "order_products",
      joinColumn: {
        name: "orderId",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "productId",
        referencedColumnName: "id",
      },
    }
  )
  products: Product[];

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalamount: number;
 
  @OneToOne(() => Payment, (payment) => payment.order,{nullable: true})
  @JoinColumn({ name: "paymentId" })
  payment: Payment;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
 public orderDetails: OrderDetail[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
 }
 