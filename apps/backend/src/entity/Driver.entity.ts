import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
   } from "typeorm";
   
   @Entity({ name: "drivers" })
   export class Driver {
    @PrimaryGeneratedColumn("uuid")
    id: string;
   
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    IdNumber: string;
   
    @Column({ nullable: true })
    contact: string; 

    @CreateDateColumn()
    createdAt: Date;
   
    @UpdateDateColumn()
    updatedAt: Date;
   
   }
   