import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,OneToMany } from "typeorm";
import { Order } from "./Order.entity";

@Entity({ name: "clients" })
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  tinnumber: string;

  @Column({ nullable: false })
  contact: string;

  @Column({ nullable: false })
  address: string; // Assuming 'address' refers to the sector

  // Other properties can be added as needed

  @OneToMany(() => Order, order => order.clientid)

  orders: Order[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
