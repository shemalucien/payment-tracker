import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { Client } from "./Client.entity";
import { Product } from "./Product.entity";
import { Payment } from "./Payment.entity";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // @ManyToOne(() => Client, client => client.orders)
  // clientid: Client;

  // @ManyToMany(() => Product)
  // @JoinTable()
  // products: Product[];

  @Column({ nullable: false })
  clientid: string;

  @Column({ nullable: true })
  paymentid: string;


  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalamount: number;

  // @OneToOne(() => Payment)
  // @JoinColumn()
  // payment: Payment;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
