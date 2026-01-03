import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
 } from "typeorm";
 import { Order } from "./Order.entity";
 import { Client } from "./Client.entity"; // Assuming Client is another entity
 
 @Entity({ name: "payments" })
 export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;
 
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  amount: number;
 
  @Column({ type: "enum", enum: ["Cash", "Phone", "Bank"], default: "Cash" })
  paymentMode: string;
 
  @CreateDateColumn()
  paymentDate: Date;
 
  @ManyToOne(() => Client, (client) => client.payments)
  @JoinColumn({ name: "clientId" })
  clientId: Client;
  
  @ManyToOne(() => Order, (order) => order.payment)
  @JoinColumn({ name: "orderId" })
  order: Order;
 
  @Column({ type: "enum", enum: ["Paid", "Unpaid", "Overdue","PartiallyPaid"], default: "Unpaid" })
  status: string;
 
  @CreateDateColumn()
  createdAt: Date;
 
  @UpdateDateColumn()
  updatedAt: Date;
 }