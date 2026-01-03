import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Client } from "../entity/Client.entity";

export class ClientController {
    static async getClients(req: Request, res: Response) {
        const data = await AppDataSource.manager.find(Client, {
            relations: ["orders","payments","notifications","reports"]
           });
        return res.status(200).json({ data });  
    }
    static async createClient(req: Request, res: Response) {
        const { name,clientType, tinNumber, email,contact, address1, address2,orders,payments,notifications,reports } = req.body;
        // console.log(name,clientType,tinNumber,email,contact, address1, address2,orders,payments,notifications,reports);
        const client = new Client();
        client.name = name;
        client.clientType = clientType;
        client.tinNumber = tinNumber; 
        client.email = email;   
        client.contact = contact;
        client.address1 = address1;
        client.address2 = address2;
        client.orders = orders;
        client.payments = payments;
        client.notifications = notifications;
        client.reports = reports;
        await AppDataSource.manager.save(client);
        return res.status(200).json({ message: "Client created successfully", client });
    }

    static async updateClient(req: Request, res: Response) {
        const { id } = req.params;
        const { name, clienttype, tinNumber, email,contact, address1, address2} = req.body;
        const client = await AppDataSource.manager.findOne(Client, { where: { id } });
        if (client) {
            client.name = name;
            client.clientType = clienttype;
            client.tinNumber = tinNumber;
            client.email = email;
            client.contact = contact;
            client.address1 = address1;
            client.address2 = address2;
            await AppDataSource.manager.save(client);
            return res.status(200).json({ message: "Client updated successfully", client });
        } else {
            return res.status(404).json({ message: "Client not found" });
        }
    }

    static async deleteClient(req: Request, res: Response) {
        const { id } = req.params;
        const client = await AppDataSource.manager.findOne(Client, { where: { id } });
        if (client) {
            await AppDataSource.manager.remove(client);
            return res.status(200).json({ message: "Client deleted successfully" });
        } else {
            return res.status(404).json({ message: "Client not found" });
        }
    }

}