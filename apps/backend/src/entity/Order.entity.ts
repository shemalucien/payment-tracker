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
 } from "typeorm";
 import { Client } from "./Client.entity";
 import { Product } from "./Product.entity";
 import { Payment } from "./Payment.entity";
 
 @Entity({ name: "orders" })
 export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;
 
  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: "clientId" })
  client: Client;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalamount: number;
 
  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn({ name: "paymentId" })
  payment: Payment;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
 }
 