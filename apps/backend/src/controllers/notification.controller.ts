// src/controllers/notificationController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Notification } from "../entity/Notification.entity";
import { Client } from "../entity/Client.entity";
import { Payment } from "../entity/Payment.entity";


export class NotificationController {

     static async checkPaymentsAndSendNotifications(req: Request, res: Response) {
        const client = AppDataSource.manager.find(Client);
        const notification = AppDataSource.manager.find(Notification);
        const payment = AppDataSource.manager.find(Payment);

        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const clientsWithoutPayments = await AppDataSource.manager
            .createQueryBuilder(Client, "client")
            .where("client.lastPaymentDate < :threeDaysAgo", { threeDaysAgo: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) })
            .getMany();


        // Create and send notifications for these clients
        for (const client of clientsWithoutPayments) {
            const notification = new Notification();
            notification.client = client;
            notification.type = "Email"; // Assuming you want to send an email notification
            notification.message = "You have not made a payment in the last three days.";
            notification.status = "Pending";

            // Save the notification
            await AppDataSource.manager.save(notification);
        }

        res.status(200).json({ message: "Notifications sent successfully." });
    }
    static async getAllNotifications(req: Request, res: Response) {
        try {
            const notifications = await AppDataSource.manager.find(Notification);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch notifications.", error: (error as Error).message });
        }
    }
}
