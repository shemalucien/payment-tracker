import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Order } from "../entity/Order.entity";
import { Product } from "../entity/Product.entity";

export class OrderController {

  static async getAllOrders(req: Request, res: Response) {
    const orders = await AppDataSource.manager.find(Order, {
      relations: ["client", "products", "payment", "orderDetails"],
    });
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
    const { clientId, products, paymentId } = req.body;
    console.log(clientId, products, paymentId);

    // Assuming products is an array of objects with 'id' and 'quantity' properties
    // Fetch product details to calculate total amount
    const productDetails = await AppDataSource.manager.findByIds(Product, products.map(product => product.id));

    // Calculate total amount using the quantity passed for each product
    const totalAmount = productDetails.reduce((total, product, index) => {
      // Find the corresponding product object in the request to get the quantity
      const productRequest = products.find(p => p.id === product.id);
      // Use the quantity from the request, or default to 1 if not provided
      const quantity = productRequest ? productRequest.quantity : 1;
      return total + (product.price * quantity);
    }, 0);

    const order = new Order();
    order.client = clientId;
    order.products = products; // Assuming products is an array of product IDs
    order.totalamount = totalAmount;
    order.payment = paymentId;

    const savedOrder = await AppDataSource.manager.save(order);
    return res.status(200).json({ message: "Order created successfully", savedOrder });
  }


  static async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { clientId, products, paymentId } = req.body;

    const order = await AppDataSource.manager.findOne(Order, { where: { id } });
    if (order) {
      // Fetch product details to calculate total amount
      const productDetails = await AppDataSource.manager.findByIds(Product, products.map(product => product.id));
      const totalAmount = productDetails.reduce((total, product) => total + (product.price * product.quantity), 0);

      order.client = clientId;
      order.products = products; // Assuming products is an array of product IDs
      order.totalamount = totalAmount;
      order.payment = paymentId;

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
