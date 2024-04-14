import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { Report } from "../entity/Report.entity";
import { Payment } from "../entity/Payment.entity";
import { Between, DeepPartial } from "typeorm";
import { Client } from "../entity/Client.entity";

export class ReportController {

  static async generateReport(req: Request, res: Response) {
    try {
      // const { clientId, clientType, area, paymentStatus, reportType } = req.body;
      const { clientId, reportType } = req.body;
      console.log("body", req.body);
      // Check if clientId is provided
      if (!clientId) {
        throw new Error("clientId is required");
      }

      // Define date ranges based on reportType
      let startDate, endDate;
      switch (reportType) {
        case "Daily":
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 1);
          endDate = new Date();
          console.log("date", startDate, endDate);
          break;
        case "Weekly":
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          endDate = new Date();
          console.log("date", startDate, endDate);
          break;
        case "Monthly":
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1);
          endDate = new Date();
          console.log("date", startDate, endDate);
          break;
        case "Yearly":
          startDate = new Date(new Date().getFullYear(), 0, 1);
          endDate = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
          console.log("date", startDate, endDate);
          break;
        default:
          throw new Error("Invalid report type");
      }
      // Fetch payments based on criteria
      const payments = await AppDataSource.getRepository(Payment).find({
        where: {
          createdAt: Between(startDate, endDate),
          clientId: clientId,
          // Add other criteria as needed
        }
      });

      // Log the payments array to the console for debugging
      console.log(payments);


      // Calculate report data based on fetched payments
      const reportData: DeepPartial<Report> = {
        date: new Date(),
        type: reportType,
        payments: payments.map(payment => ({
          id: payment.id,
          amount: payment.amount,
          status: payment.status,
          // Add other payment data as needed
        })),
        // Add other report data as needed
      };

      // Save the report to the database
      const newReport = AppDataSource.getRepository(Report).create(reportData);
      await AppDataSource.getRepository(Report).save(newReport);

      res.status(201).json({
        message: "Report generated successfully",
        report: newReport,
      });

    } catch (error) {
      res.status(500).json({ message: "Error generating report", error: error });
    }
  }
}
