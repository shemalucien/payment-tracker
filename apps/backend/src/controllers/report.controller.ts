import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { Report } from "../entity/Report.entity";
import { Payment } from "../entity/Payment.entity";
import { Between, DeepPartial } from "typeorm";

export class ReportController {
  private reportRepository = AppDataSource.getRepository(Report);
  private paymentRepository = AppDataSource.getRepository(Payment);

  async generateYearlyReport(req: Request, res: Response) {
    try {
      const year = new Date().getFullYear(); // Get the current year
      const startDate = new Date(year, 0, 1); // January 1st of the specified year
      const endDate = new Date(year, 11, 31, 23, 59, 59); // December 31st of the specified year

      // Implement logic to fetch yearly payment data from your database
      const yearlyPayments = await this.paymentRepository.find({
        where: {
          createdAt: Between(startDate, endDate)
        }
      });

      // Calculate yearly payment data based on fetched payments
      const yearlyPaymentData = {
        totalAmount: yearlyPayments.reduce((total, payment) => total + payment.amount, 0),
        count: yearlyPayments.length,
        // Add other payment data as needed
      };

      const reportData: DeepPartial<Report> = {
        date: new Date(),
        type: "Yearly",
        payments: [yearlyPaymentData], // Wrap yearlyPaymentData in an array
      };
      
      // Save the report to the database
      const newReport = this.reportRepository.create(reportData);
      await this.reportRepository.save(newReport);
      

      res.status(201).json(newReport);
    } catch (error) {
      res.status(500).json({ message: "Error generating yearly report", error: error });
    }
  }
}
