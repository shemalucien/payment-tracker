
import { AppDataSource } from "../database/data-source";
import { Between } from "typeorm";
import { Request, Response } from "express";
import { Payment } from "../entity/Payment.entity";

export class PaymentController {
  static getYearlyPayments(year: number) {
      throw new Error("Method not implemented.");
  }
  static async getAllPayments(req: Request, res: Response) {
    const data = await AppDataSource.manager.find(Payment);
    return res.status(200).json({ data });  
} 


}

