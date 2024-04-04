import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "reports" })
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ nullable: false })
  type: string; // Daily, Monthly, Yearly, etc.

  @Column({ type: "jsonb", nullable: false })
  payments: any[]; // Array of payment data

  @Column({ type: "jsonb", nullable: false })
  income: any[]; // Array of income data

  @Column({ type: "jsonb", nullable: false })
  clients: any[]; // Array of client data

  @Column({ type: "jsonb", nullable: false })
  products: any[]; // Array of product data

  @CreateDateColumn()
  createdAt: Date;
}
