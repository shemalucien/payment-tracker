import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Client } from "../entity/Client.entity";

export class ClientController {
    static async getClients(req: Request, res: Response) {
        const data = await AppDataSource.manager.find(Client);
        return res.status(200).json({ data });  
    }

    static async createClient(req: Request, res: Response) {
        const { name, tinNumber, contact, address } = req.body;
        const client = new Client();
        client.name = name;
        client.tinnumber = tinNumber;    
        client.contact = contact;
        client.address = address;
        await AppDataSource.manager.save(client);

        return res.status(200).json({ message: "Client created successfully", client });
    }

    static async updateClient(req: Request, res: Response) {
        const { id } = req.params;
        const { name, tinNumber, contact, address } = req.body;
        const client = await AppDataSource.manager.findOne(Client, { where: { id } });
        if (client) {
            client.name = name;
            client.tinnumber = tinNumber;
            client.contact = contact;
            client.address = address;
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