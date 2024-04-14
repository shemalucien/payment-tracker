import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Order } from "./Order.entity";
import { Payment } from "./Payment.entity";
import { Notification } from "./Notification.entity";
import { Report } from "./Report.entity";


@Entity({ name: "clients" })
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    type: "enum",
    enum: ["Permanent", "Temporary"],
    default: "Permanent",
  })
  clientType: string;

  @Column({ nullable: false })
  tinNumber: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  contact: string;

  @Column({ nullable: false })
  address1: string;

  @Column({ nullable: false })
  address2: string;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
  
  @OneToMany(() => Payment, (payment) => payment.clientId)
  payments: Payment[];

  @OneToMany(() => Notification, (notification) => notification.client)
  notifications: Notification[];

  @OneToMany(() => Report, (report) => report.client)
  reports: Report[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}

