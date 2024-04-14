import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
 } from "typeorm";
 
 @Entity({ name: "users" })
 export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
 
  @Column({ nullable: false })
  name: string;
 
  @Column({ nullable: false, unique: true })
  email: string;
 
  @Column({ nullable: false })
  password: string;
 
  @Column({ default: "user" })
  role: string;
 
  @Column({ type: "enum", enum: ["Gmail", "Email/Password", "Two-Factor"], default: "Email/Password" })
  authType: string;
 
  @Column({ nullable: true })
  contact: string; // Contact information for notifications
 
  @CreateDateColumn()
  createdAt: Date;
 
  @UpdateDateColumn()
  updatedAt: Date;
 
 }
 