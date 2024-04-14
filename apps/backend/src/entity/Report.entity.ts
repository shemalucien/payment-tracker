import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
 } from "typeorm";
 import { Client } from "./Client.entity";
 
 @Entity({ name: "reports" })
 export class Report {
  @PrimaryGeneratedColumn("uuid")
  reportid: string;
 
  @Column({ type: "date", nullable: false })
  date: Date;
 
  @Column({ nullable: false })
  type: string; // Daily, Monthly, Yearly, etc.
 
  @Column({
    type: 'jsonb',
    array: true,
    default: () => 'ARRAY[]::jsonb[]',
    nullable: false,
  })
  payments: Array<{ id: string }> = []; // Array of payment data
 
  @Column({
    type: 'jsonb',
    array: true,
    default: () => 'ARRAY[]::jsonb[]',
    nullable: false,
  })
  income: Array<{ id: string }> = []; // Array of income data
 
  @Column({
    type: 'jsonb',
    array: true,
    default: () => 'ARRAY[]::jsonb[]',
    nullable: false,
  })
  clients: Array<{ id: string }> = []; // Array of client data
 
  @Column({
    type: 'jsonb',
    array: true,
    default: () => 'ARRAY[]::jsonb[]',
    nullable: false,
  })
  products: Array<{ id: string }> = []; // Array of product data
 
  @ManyToOne(() => Client, (client) => client.reports)
  client: Client;
 
  @CreateDateColumn()
  createdAt: Date;
 }
 