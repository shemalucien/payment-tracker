import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
   } from "typeorm";
   import { Client } from "./Client.entity";
   
   @Entity({ name: "notifications" })
   export class Notification {
    @PrimaryGeneratedColumn("uuid")
    notificationId: string;
   
    @ManyToOne(() => Client, (client) => client.notifications)
    client: Client;
   
    @Column({ type: "enum", enum: ["Email", "SMS","Push"], default: "Email" })
    type: string;
   
    @Column({ nullable: false })
    message: string;
   
    @Column({ type: "enum", enum: ["Sent", "Pending"], default: "Pending" })
    status: string;
   
    @CreateDateColumn()
    createdAt: Date;
   
    @UpdateDateColumn()
    updatedAt: Date;
   }
   