import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { Report } from "../entity/Report.entity";
import { Payment } from "../entity/Payment.entity";
import { Between, DeepPartial } from "typeorm";
import { Client } from "../entity/Client.entity";

export class ReportController {

  static async generateReport(req: Request, res: Response) {
    try {
      const { clientId, reportType } = req.body;

      if (!clientId) {
        throw new Error("clientId is required");
      }

      let startDate, endDate;

      switch (reportType) {
        case "Daily":
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 1);
          endDate = new Date();
          break;
        case "Weekly":
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          endDate = new Date();
          break;
        case "Monthly":
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1);
          endDate = new Date();
          break;
        case "Yearly":
          startDate = new Date(new Date().getFullYear(), 0, 1);
          endDate = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
          break;
        default:
          throw new Error("Invalid report type");
      }

      // Fetch client details for the report
      const client = await AppDataSource.manager.findOne(Client, {
        where: { id: clientId },
        relations: ["payments"],
      });

      if (!client) {
        throw new Error("Client not found");
      }

      // console.log(client.payments[0].amount);

      client.payments.forEach(payment => {
        // console.log('Payment date:', payment.paymentDate);
      });


      // Assuming startDate and endDate are Date objects
      // Convert paymentDate to a Date object for comparison
      const filteredPayments = client.payments
        .filter((payment) => {
          const paymentDate = new Date(payment.paymentDate);
          // console.log('Payment date:', paymentDate, 'Start date:', startDate, 'End date:', endDate);
          return paymentDate >= startDate && paymentDate <= endDate;
        });

     //  console.log('Filtered payments:', filteredPayments); // Debugging log

      const totalAmount = filteredPayments.reduce((sum, payment) => {
       // console.log('Payment amount:', payment.amount); // Debugging log
        return sum + Number(payment.amount); // Ensure amount is treated as a number
      }, 0);

      // console.log('Total amount:', totalAmount);



      // Create a new report entity
      const newReport: DeepPartial<Report> = {
        date: new Date(),
        type: reportType,
        client: client,
        payments: client.payments
          .filter((payment) => payment.paymentDate >= startDate && payment.paymentDate <= endDate)
          .map(payment => ({
            id: payment.id,
            amount: payment.amount,
            status: payment.status,
            // Add other payment data as needed
          })),
        totalPayments: totalAmount,
        income: [], // Placeholder for income data
        clients: [], // Placeholder for client data
        products: [], // Placeholder for product data
      };

      // console.log(JSON.stringify(newReport, null, 2));

      console.log(newReport);


      // Attempt to save the report to the database
      const savedReport = await AppDataSource.manager.save(Report, newReport);
      console.log('Report saved successfully:', savedReport);

      res.status(201).json({
        message: "Report generated successfully",
        report: newReport,
      });
    } catch (error) {
      res.status(500).json({ message: "Error generating report", error: error });
    }
  }

  static async getReports(req: Request, res: Response) {
    // Fetch all reports
    const reports = await AppDataSource.manager.find(Report);
    return res.status(200).json({ reports });
  }
}
