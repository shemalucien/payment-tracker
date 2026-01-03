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


export enum ClientType {
  Permanent = "Permanent",
  Temporary = "Temporary",
}

@Entity({ name: "clients" })
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    type: "enum",
    enum: ClientType,
    default: ClientType.Permanent
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

  @OneToMany(() => Order, (order) => order.client, { nullable: true })
  orders: Order[];
  
  @OneToMany(() => Payment, (payment) => payment.clientId, { nullable: true })
  payments: Payment[];

  @OneToMany(() => Notification, (notification) => notification.client, { nullable: true })
  notifications: Notification[];

  @OneToMany(() => Report, (report) => report.client, { nullable: true })
  reports: Report[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}

