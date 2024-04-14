import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Order } from "../entity/Order.entity";

export class OrderController {

  static async getAllOrders(req: Request, res: Response) {
    const orders = await AppDataSource.manager.find(Order);
    res.json(orders);
  }

  static async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    const order = await AppDataSource.manager.findOne(Order, { where: { id } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  }
  
  static async createOrder(req: Request, res: Response) {
    const { clientId, products, totalAmount, paymentId } = req.body;
    console.log(clientId, products, totalAmount, paymentId);
    const order = new Order();
    order.client = clientId;
    order.products = products;
    order.totalamount = totalAmount;
    order.payment = paymentId;
    const savedOrder = await AppDataSource.manager.save(order);
    return res.status(200).json({ message: "Order created successfully", savedOrder });
  }
  static async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { clientid, products, totalAmount, payment } = req.body;
        const order = await AppDataSource.manager.findOne(Order, { where: { id } });
        if (order) {
            order.client = clientid;
            order.products = products;
            order.totalamount = totalAmount;
            order.payment = payment;
            await AppDataSource.manager.save(order);
            return res.status(200).json({ message: "Order updated successfully", order });
        } else {
            return res.status(404).json({ message: "Order not found" });
        }
  }

  static async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;
    const order = await AppDataSource.manager.findOne(Order, { where: { id } });
    if (order) {
        await AppDataSource.manager.remove(order);
        return res.status(200).json({ message: "Order deleted successfully" });
    } else {
        return res.status(404).json({ message: "Order not found" });
    }

  }

}
