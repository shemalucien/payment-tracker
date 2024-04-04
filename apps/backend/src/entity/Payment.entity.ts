import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,OneToOne, JoinColumn } from "typeorm";
import { Order } from "./Order.entity";

@Entity({ name: "payments" })
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ nullable: false })
  paymentmode: string;

  @Column({ type: "date", nullable: false })
  paymentdate: Date;

  @Column({ nullable: false })
  clientid: string;

  @Column({ nullable: false })
  orderid: string;

  @Column({ nullable: false })
  status: string;

  // @OneToOne(() => Order)
  // @JoinColumn()
  // order: Order;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}